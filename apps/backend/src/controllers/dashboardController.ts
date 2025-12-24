import { Request, Response } from 'express';
import { Product, Blog, Media, ActivityLog } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/errorHandler';

/**
 * Get dashboard statistics (admin)
 */
export const getStats = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Count New Arrivals by status
    const newArrivalsTotal = await Product.count();
    const newArrivalsPublished = await Product.count({ where: { status: 'published' } });
    const newArrivalsDraft = await Product.count({ where: { status: 'draft' } });
    const newArrivalsDisabled = await Product.count({ where: { status: 'disabled' } });

    // Count Blogs by status
    const blogsTotal = await Blog.count();
    const blogsPublished = await Blog.count({ where: { status: 'published' } });
    const blogsDraft = await Blog.count({ where: { status: 'draft' } });
    const blogsDisabled = await Blog.count({ where: { status: 'disabled' } });

    // Count Media
    const mediaCount = await Media.count();

    // Get recent activity (last 10 actions)
    const { User } = await import('../models');
    const recentActivity = await ActivityLog.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'email'],
            },
        ],
    });

    res.json({
        success: true,
        data: {
            newArrivals: {
                total: newArrivalsTotal,
                published: newArrivalsPublished,
                draft: newArrivalsDraft,
                disabled: newArrivalsDisabled,
            },
            blogs: {
                total: blogsTotal,
                published: blogsPublished,
                draft: blogsDraft,
                disabled: blogsDisabled,
            },
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
