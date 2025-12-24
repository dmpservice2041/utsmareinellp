import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

/**
 * Process image once at upload - generates all versions
 * CRITICAL: This is the ONLY entry point for image processing
 */
export async function processImageOnUpload(
    filePath: string,
    originalFilename: string,
    uploadDir: string = './public/uploads'
): Promise<{
    optimizedPath: string;
    thumbnailPath: string;
    metadata: {
        original: { width: number; height: number; size: number };
        optimized: { width: number; height: number; size: number };
        thumbnail: { width: number; height: number; size: number };
    };
}> {
    // Ensure directories exist
    const originalDir = path.join(uploadDir, 'original');
    const optimizedDir = path.join(uploadDir, 'optimized');
    const thumbnailDir = path.join(uploadDir, 'thumbnails');

    await fs.mkdir(originalDir, { recursive: true });
    await fs.mkdir(optimizedDir, { recursive: true });
    await fs.mkdir(thumbnailDir, { recursive: true });

    // Get original image metadata
    const originalImage = sharp(filePath);
    const originalMetadata = await originalImage.metadata();
    const originalStats = await fs.stat(filePath);

    const originalWidth = originalMetadata.width || 0;
    const originalHeight = originalMetadata.height || 0;
    const originalSize = originalStats.size;

    // Generate filename without extension
    const filenameWithoutExt = path.parse(originalFilename).name;
    const ext = path.parse(originalFilename).ext || '.jpg';

    // Move original to original directory
    const originalFinalPath = path.join(originalDir, originalFilename);
    await fs.rename(filePath, originalFinalPath);

    // Generate optimized version (max 1920px width, maintain aspect ratio, 85% quality)
    const optimizedFilename = `${filenameWithoutExt}_optimized${ext}`;
    const optimizedPath = path.join(optimizedDir, optimizedFilename);

    const optimizedMetadata = await sharp(originalFinalPath)
        .resize(1920, null, {
            withoutEnlargement: true,
            fit: 'inside',
        })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(optimizedPath);

    const optimizedStats = await fs.stat(optimizedPath);

    // Generate thumbnail (200x200px, square crop, 80% quality)
    const thumbnailFilename = `${filenameWithoutExt}_thumb${ext}`;
    const thumbnailPath = path.join(thumbnailDir, thumbnailFilename);

    await sharp(originalFinalPath)
        .resize(200, 200, {
            fit: 'cover',
            position: 'center',
        })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(thumbnailPath);

    const thumbnailStats = await fs.stat(thumbnailPath);
    const thumbnailMetadata = await sharp(thumbnailPath).metadata();

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
}

/**
 * Validate image file before processing
 */
export function validateImageFile(file: Express.Multer.File): {
    valid: boolean;
    error?: string;
} {
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
export async function getImageMetadata(filePath: string): Promise<{
    width: number;
    height: number;
    size: number;
}> {
    const metadata = await sharp(filePath).metadata();
    const stats = await fs.stat(filePath);

    return {
        width: metadata.width || 0,
        height: metadata.height || 0,
        size: stats.size,
    };
}
