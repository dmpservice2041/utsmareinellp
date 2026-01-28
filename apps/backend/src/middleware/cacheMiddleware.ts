import { Request, Response, NextFunction } from 'express';
import { generateETag, setCacheHeaders, checkETagMatch } from '../utils/cacheUtils';

/**
 * Cache middleware for public API endpoints
 * Sets cache headers and handles ETag validation
 */
export const cacheMiddleware = (maxAge: number = 3600) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Store original json method
        const originalJson = res.json.bind(res);

        // Override json to add ETag
        res.json = function (data: any) {
            // Generate ETag from response data
            const etag = generateETag(JSON.stringify(data));

            // Check if client has cached version
            if (checkETagMatch(req, etag)) {
                res.status(304).end(); // Not Modified
                return res;
            }

            // Set cache headers
            setCacheHeaders(res, maxAge, etag);

            // Send response
            return originalJson(data);
        };

        next();
    };
};

/**
 * Cache invalidation middleware
 * Called after admin updates to invalidate cache
 */
export const invalidateCache = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    // After response is sent, invalidate cache
    res.on('finish', async () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            // Invalidate cache for the entity
            const path = req.path;
            let entityType = '';
            let entityId: number | null = null;

            if (path.includes('/new-arrivals')) {
                entityType = 'product';
            } else if (path.includes('/blogs')) {
                entityType = 'blog';
            } else if (path.includes('/media')) {
                entityType = 'media';
            }

            if (req.params.id) {
                entityId = parseInt(req.params.id as string);
            } else if (res.locals.entityId) {
                entityId = res.locals.entityId;
            }

            if (entityType) {
                // Import here to avoid circular dependency
                const { invalidateCacheForEntity } = await import('../utils/cacheUtils');
                await invalidateCacheForEntity(entityType, entityId || 0);
            }
        }
    });

    next();
};
