import { Request, Response } from 'express';
import { Product, Blog, Media, ActivityLog } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/errorHandler';

/**
 * Get dashboard statistics (admin)
 */
export const getStats = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { User } = await import('../models');

    // Run independent queries in parallel
    const [
        newArrivalsTotal,
        newArrivalsPublished,
        newArrivalsDraft,
        newArrivalsDisabled,
        blogsTotal,
        blogsPublished,
        blogsDraft,
        blogsDisabled,
        mediaCount,
        recentActivity
    ] = await Promise.all([
        Product.count(),
        Product.count({ where: { status: 'published' } }),
        Product.count({ where: { status: 'draft' } }),
        Product.count({ where: { status: 'disabled' } }),
        Blog.count(),
        Blog.count({ where: { status: 'published' } }),
        Blog.count({ where: { status: 'draft' } }),
        Blog.count({ where: { status: 'disabled' } }),
        Media.count(),
        ActivityLog.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email'],
                },
            ],
        })
    ]);

    const newArrivals = {
        total: newArrivalsTotal,
        published: newArrivalsPublished,
        draft: newArrivalsDraft,
        disabled: newArrivalsDisabled
    };

    const blogs = {
        total: blogsTotal,
        published: blogsPublished,
        draft: blogsDraft,
        disabled: blogsDisabled
    };

    res.json({
        success: true,
        data: {
            newArrivals,
            blogs,
            mediaCount,
            recentActivity: recentActivity.map((log: any) => ({
                id: log.id,
                action: log.action,
                entityType: log.entity_type,
                entityId: log.entity_id,
                user: log.user ? { id: log.user.id, email: log.user.email } : null,
                createdAt: log.created_at,
            })),
        },
    });
});
