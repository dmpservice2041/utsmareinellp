"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thumbnailDir = exports.optimizedDir = exports.originalDir = exports.uploadDir = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure upload directories exist
const uploadDir = process.env.UPLOAD_DIR || './public/uploads';
exports.uploadDir = uploadDir;
const originalDir = path_1.default.join(uploadDir, 'original');
exports.originalDir = originalDir;
const optimizedDir = path_1.default.join(uploadDir, 'optimized');
exports.optimizedDir = optimizedDir;
const thumbnailDir = path_1.default.join(uploadDir, 'thumbnails');
exports.thumbnailDir = thumbnailDir;
[originalDir, optimizedDir, thumbnailDir].forEach((dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
});
// Configure storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, originalDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path_1.default.extname(file.originalname);
        const name = path_1.default.basename(file.originalname, ext)
            .replace(/\s+/g, '_') // Replace spaces with underscores
            .replace(/[^a-zA-Z0-9_-]/g, '') // Remove special characters
            .toLowerCase(); // Convert to lowercase
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
});
// File filter - only allow images
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = (process.env.ALLOWED_IMAGE_TYPES || 'jpg,jpeg,png,webp')
        .split(',')
        .map((type) => `image/${type.trim()}`);
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`));
    }
};
// Configure multer
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
    },
});
exports.default = upload;
