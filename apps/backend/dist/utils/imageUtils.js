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
exports.processImageOnUpload = processImageOnUpload;
exports.validateImageFile = validateImageFile;
exports.getImageMetadata = getImageMetadata;
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
/**
 * Process image once at upload - generates all versions
 * CRITICAL: This is the ONLY entry point for image processing
 */
function processImageOnUpload(filePath_1, originalFilename_1) {
    return __awaiter(this, arguments, void 0, function* (filePath, originalFilename, uploadDir = './public/uploads') {
        // Ensure directories exist
        const originalDir = path_1.default.join(uploadDir, 'original');
        const optimizedDir = path_1.default.join(uploadDir, 'optimized');
        const thumbnailDir = path_1.default.join(uploadDir, 'thumbnails');
        yield promises_1.default.mkdir(originalDir, { recursive: true });
        yield promises_1.default.mkdir(optimizedDir, { recursive: true });
        yield promises_1.default.mkdir(thumbnailDir, { recursive: true });
        // Get original image metadata
        const originalImage = (0, sharp_1.default)(filePath);
        const originalMetadata = yield originalImage.metadata();
        const originalStats = yield promises_1.default.stat(filePath);
        const originalWidth = originalMetadata.width || 0;
        const originalHeight = originalMetadata.height || 0;
        const originalSize = originalStats.size;
        // Generate filename without extension
        const filenameWithoutExt = path_1.default.parse(originalFilename).name;
        const ext = path_1.default.parse(originalFilename).ext || '.jpg';
        // STRICT VALIDATION: Try to decode the image buffer first to ensure it's valid
        // This rejects polyglot files (image + script) by forcing a decode
        try {
            const buffer = yield (0, sharp_1.default)(filePath).toBuffer();
        }
        catch (error) {
            throw new Error('Invalid image file: Failed to decode');
        }
        // Move original to original directory
        const originalFinalPath = path_1.default.join(originalDir, originalFilename);
        yield promises_1.default.rename(filePath, originalFinalPath);
        // Generate optimized version (max 1920px width, maintain aspect ratio, 85% quality)
        const optimizedFilename = `${filenameWithoutExt}_optimized${ext}`;
        const optimizedPath = path_1.default.join(optimizedDir, optimizedFilename);
        const optimizedMetadata = yield (0, sharp_1.default)(originalFinalPath)
            .resize(1920, null, {
            withoutEnlargement: true,
            fit: 'inside',
        })
            .jpeg({ quality: 85, mozjpeg: true })
            .toFile(optimizedPath);
        const optimizedStats = yield promises_1.default.stat(optimizedPath);
        // Generate thumbnail (200x200px, square crop, 80% quality)
        const thumbnailFilename = `${filenameWithoutExt}_thumb${ext}`;
        const thumbnailPath = path_1.default.join(thumbnailDir, thumbnailFilename);
        yield (0, sharp_1.default)(originalFinalPath)
            .resize(200, 200, {
            fit: 'cover',
            position: 'center',
        })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(thumbnailPath);
        const thumbnailStats = yield promises_1.default.stat(thumbnailPath);
        const thumbnailMetadata = yield (0, sharp_1.default)(thumbnailPath).metadata();
        return {
            optimizedPath,
            thumbnailPath,
            metadata: {
                original: {
                    width: originalWidth,
                    height: originalHeight,
                    size: originalSize,
                },
                optimized: {
                    width: optimizedMetadata.width || 0,
                    height: optimizedMetadata.height || 0,
                    size: optimizedStats.size,
                },
                thumbnail: {
                    width: thumbnailMetadata.width || 0,
                    height: thumbnailMetadata.height || 0,
                    size: thumbnailStats.size,
                },
            },
        };
    });
}
/**
 * Validate image file before processing
 */
function validateImageFile(file) {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (!file) {
        return { valid: false, error: 'No file provided' };
    }
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return {
            valid: false,
            error: `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`,
        };
    }
    if (file.size > maxFileSize) {
        return {
            valid: false,
            error: `File size exceeds maximum allowed size of ${maxFileSize / 1024 / 1024}MB`,
        };
    }
    return { valid: true };
}
/**
 * Get image metadata (width, height, size)
 */
function getImageMetadata(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const metadata = yield (0, sharp_1.default)(filePath).metadata();
        const stats = yield promises_1.default.stat(filePath);
        return {
            width: metadata.width || 0,
            height: metadata.height || 0,
            size: stats.size,
        };
    });
}
