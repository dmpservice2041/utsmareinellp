import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directories exist
const uploadDir = process.env.UPLOAD_DIR || './public/uploads';
const originalDir = path.join(uploadDir, 'original');
const optimizedDir = path.join(uploadDir, 'optimized');
const thumbnailDir = path.join(uploadDir, 'thumbnails');

[originalDir, optimizedDir, thumbnailDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, originalDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext)
            .replace(/\s+/g, '_')           // Replace spaces with underscores
            .replace(/[^a-zA-Z0-9_-]/g, '') // Remove special characters
            .toLowerCase();                  // Convert to lowercase
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
});

// File filter - only allow images
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = (process.env.ALLOWED_IMAGE_TYPES || 'jpg,jpeg,png,webp')
        .split(',')
        .map((type) => `image/${type.trim()}`);

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`));
    }
};

// Configure multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
    },
});

export default upload;
export { uploadDir, originalDir, optimizedDir, thumbnailDir };
