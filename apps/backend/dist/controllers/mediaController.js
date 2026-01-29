"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrls = exports.deleteMedia = exports.update = exports.getById = exports.uploadFile = exports.list = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const upload_1 = __importDefault(require("../config/upload"));
const imageUtils_1 = require("../utils/imageUtils");
const errorHandler_1 = require("../middleware/errorHandler");
const promises_1 = __importDefault(require("fs/promises"));
/**
 * List all media (admin)
 */
exports.list = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const mimeType = req.query.mime_type;
    const search = req.query.search;
    const whereClause = {};
    if (mimeType) {
        whereClause.mime_type = mimeType;
    }
    if (search) {
        whereClause[sequelize_1.Op.or] = [
            { filename: { [sequelize_1.Op.like]: `%${search}%` } },
            { original_filename: { [sequelize_1.Op.like]: `%${search}%` } },
        ];
    }
    const { count, rows } = yield models_1.Media.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['created_at', 'DESC']],
    });
    // Add URLs to each media item
    const mediaItems = rows.map((media) => {
        const mediaData = media.toJSON();
        return Object.assign(Object.assign({}, mediaData), { urls: {
                original: media.getOriginalUrl(),
                optimized: media.getOptimizedUrl(),
                thumbnail: media.getThumbnailUrl(),
            } });
    });
    res.json({
        success: true,
        data: mediaItems,
        meta: {
            page,
            limit,
            total: count,
            pages: Math.ceil(count / limit),
        },
    });
}));
/**
 * Upload file (admin) - processes once at upload
 */
exports.uploadFile = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Use multer middleware
    upload_1.default.single('file')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (err) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'UPLOAD_ERROR',
                    message: err.message,
                },
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'NO_FILE',
                    message: 'No file provided',
                },
            });
        }
        // Validate file
        const validation = (0, imageUtils_1.validateImageFile)(req.file);
        if (!validation.valid) {
            // Clean up uploaded file
            yield promises_1.default.unlink(req.file.path).catch(() => { });
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INVALID_FILE',
                    message: validation.error,
                },
            });
        }
        try {
            // Process image once at upload - generates all versions
            const { optimizedPath, thumbnailPath, metadata } = yield (0, imageUtils_1.processImageOnUpload)(req.file.path, req.file.filename, process.env.UPLOAD_DIR || './public/uploads');
            // Create media record
            const media = yield models_1.Media.create({
                filename: req.file.filename,
                original_filename: req.file.originalname,
                file_path: req.file.path,
                optimized_path: optimizedPath,
                thumbnail_path: thumbnailPath,
                file_size: metadata.original.size,
                optimized_size: metadata.optimized.size,
                thumbnail_size: metadata.thumbnail.size,
                mime_type: req.file.mimetype,
                width: metadata.original.width,
                height: metadata.original.height,
                optimized_width: metadata.optimized.width,
                optimized_height: metadata.optimized.height,
                thumbnail_width: metadata.thumbnail.width,
                thumbnail_height: metadata.thumbnail.height,
                processing_status: 'completed',
                uploaded_by: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || null,
            });
            res.status(201).json({
                success: true,
                data: Object.assign(Object.assign({}, media.toJSON()), { urls: {
                        original: media.getOriginalUrl(),
                        optimized: media.getOptimizedUrl(),
                        thumbnail: media.getThumbnailUrl(),
                    } }),
            });
        }
        catch (error) {
            // Clean up uploaded file on error
            yield promises_1.default.unlink(req.file.path).catch(() => { });
            throw (0, errorHandler_1.createError)(`Image processing failed: ${error.message}`, 500, 'PROCESSING_ERROR');
        }
    }));
}));
/**
 * Get media by ID (admin)
 */
exports.getById = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const media = yield models_1.Media.findByPk(id);
    if (!media) {
        throw (0, errorHandler_1.createError)('Media not found', 404, 'NOT_FOUND');
    }
    res.json({
        success: true,
        data: Object.assign(Object.assign({}, media.toJSON()), { urls: {
                original: media.getOriginalUrl(),
                optimized: media.getOptimizedUrl(),
                thumbnail: media.getThumbnailUrl(),
            } }),
    });
}));
/**
 * Update media metadata (admin) - no re-processing
 */
exports.update = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { alt_text, caption } = req.body;
    const media = yield models_1.Media.findByPk(id);
    if (!media) {
        throw (0, errorHandler_1.createError)('Media not found', 404, 'NOT_FOUND');
    }
    // Only allow updating metadata, not file paths
    yield media.update({
        alt_text: alt_text || media.alt_text,
        caption: caption || media.caption,
    });
    res.json({
        success: true,
        data: Object.assign(Object.assign({}, media.toJSON()), { urls: {
                original: media.getOriginalUrl(),
                optimized: media.getOptimizedUrl(),
                thumbnail: media.getThumbnailUrl(),
            } }),
    });
}));
/**
 * Delete media (admin) - removes all versions
 */
exports.deleteMedia = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const media = yield models_1.Media.findByPk(id);
    if (!media) {
        throw (0, errorHandler_1.createError)('Media not found', 404, 'NOT_FOUND');
    }
    // Delete all file versions
    const filesToDelete = [
        media.file_path,
        media.optimized_path,
        media.thumbnail_path,
    ].filter(Boolean);
    for (const filePath of filesToDelete) {
        if (filePath) {
            yield promises_1.default.unlink(filePath).catch((err) => {
                console.error(`Failed to delete file ${filePath}:`, err);
            });
        }
    }
    // Delete database record
    yield media.destroy();
    res.json({
        success: true,
        message: 'Media deleted successfully',
    });
}));
/**
 * Get all version URLs (admin)
 */
exports.getUrls = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const media = yield models_1.Media.findByPk(id);
    if (!media) {
        throw (0, errorHandler_1.createError)('Media not found', 404, 'NOT_FOUND');
    }
    res.json({
        success: true,
        data: {
            original: media.getOriginalUrl(),
            optimized: media.getOptimizedUrl(),
            thumbnail: media.getThumbnailUrl(),
        },
    });
}));
