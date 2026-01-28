import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Media } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import upload from '../config/upload';
import { processImageOnUpload, validateImageFile } from '../utils/imageUtils';
import { asyncHandler, createError } from '../middleware/errorHandler';
import path from 'path';
import fs from 'fs/promises';

/**
 * List all media (admin)
 */
export const list = asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const mimeType = req.query.mime_type as string | undefined;
    const search = req.query.search as string | undefined;

    const whereClause: any = {};

    if (mimeType) {
        whereClause.mime_type = mimeType;
    }

    if (search) {
        whereClause[Op.or] = [
            { filename: { [Op.like]: `%${search}%` } },
            { original_filename: { [Op.like]: `%${search}%` } },
        ];
    }

    const { count, rows } = await Media.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['created_at', 'DESC']],
    });

    // Add URLs to each media item
    const mediaItems = rows.map((media) => {
        const mediaData = media.toJSON();
        return {
            ...mediaData,
            urls: {
                original: media.getOriginalUrl(),
                optimized: media.getOptimizedUrl(),
                thumbnail: media.getThumbnailUrl(),
            },
        };
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
});

/**
 * Upload file (admin) - processes once at upload
 */
export const uploadFile = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Use multer middleware
    upload.single('file')(req, res, async (err: any) => {
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
        const validation = validateImageFile(req.file);
        if (!validation.valid) {
            // Clean up uploaded file
            await fs.unlink(req.file.path).catch(() => { });
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
            const { optimizedPath, thumbnailPath, metadata } = await processImageOnUpload(
                req.file.path,
                req.file.filename,
                process.env.UPLOAD_DIR || './public/uploads'
            );

            // Create media record
            const media = await Media.create({
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
                uploaded_by: req.user?.id || null,
            });

            res.status(201).json({
                success: true,
                data: {
                    ...media.toJSON(),
                    urls: {
                        original: media.getOriginalUrl(),
                        optimized: media.getOptimizedUrl(),
                        thumbnail: media.getThumbnailUrl(),
                    },
                },
            });
        } catch (error: any) {
            // Clean up uploaded file on error
            await fs.unlink(req.file.path).catch(() => { });
            throw createError(
                `Image processing failed: ${error.message}`,
                500,
                'PROCESSING_ERROR'
            );
        }
    });
});

/**
 * Get media by ID (admin)
 */
export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;

    const media = await Media.findByPk(id);
    if (!media) {
        throw createError('Media not found', 404, 'NOT_FOUND');
    }

    res.json({
        success: true,
        data: {
            ...media.toJSON(),
            urls: {
                original: media.getOriginalUrl(),
                optimized: media.getOptimizedUrl(),
                thumbnail: media.getThumbnailUrl(),
            },
        },
    });
});

/**
 * Update media metadata (admin) - no re-processing
 */
export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { alt_text, caption } = req.body;

    const media = await Media.findByPk(id);
    if (!media) {
        throw createError('Media not found', 404, 'NOT_FOUND');
    }

    // Only allow updating metadata, not file paths
    await media.update({
        alt_text: alt_text || media.alt_text,
        caption: caption || media.caption,
    });

    res.json({
        success: true,
        data: {
            ...media.toJSON(),
            urls: {
                original: media.getOriginalUrl(),
                optimized: media.getOptimizedUrl(),
                thumbnail: media.getThumbnailUrl(),
            },
        },
    });
});

/**
 * Delete media (admin) - removes all versions
 */
export const deleteMedia = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;

    const media = await Media.findByPk(id);
    if (!media) {
        throw createError('Media not found', 404, 'NOT_FOUND');
    }

    // Delete all file versions
    const filesToDelete = [
        media.file_path,
        media.optimized_path,
        media.thumbnail_path,
    ].filter(Boolean);

    for (const filePath of filesToDelete) {
        if (filePath) {
            await fs.unlink(filePath).catch((err) => {
                console.error(`Failed to delete file ${filePath}:`, err);
            });
        }
    }

    // Delete database record
    await media.destroy();

    res.json({
        success: true,
        message: 'Media deleted successfully',
    });
});

/**
 * Get all version URLs (admin)
 */
export const getUrls = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;

    const media = await Media.findByPk(id);
    if (!media) {
        throw createError('Media not found', 404, 'NOT_FOUND');
    }

    res.json({
        success: true,
        data: {
            original: media.getOriginalUrl(),
            optimized: media.getOptimizedUrl(),
            thumbnail: media.getThumbnailUrl(),
        },
    });
});
