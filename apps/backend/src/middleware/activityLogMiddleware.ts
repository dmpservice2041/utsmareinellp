import { Request, Response, NextFunction } from 'express';
import { ActivityLog } from '../models';
import { AuthRequest } from './authMiddleware';

/**
 * Log admin activity for create, update, delete operations
 */
export const logActivity = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    // Store original methods to capture response
    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);

    // Capture response data
    let responseData: any = null;

    res.json = function (data: any) {
        responseData = data;
        return originalJson(data);
    };

    res.send = function (data: any) {
        responseData = data;
        return originalSend(data);
    };

    // Log after response is sent
    res.on('finish', async () => {
        try {
            const user = req.user;
            if (!user) return; // Skip if not authenticated

            const method = req.method;
            const path = req.path;
            let action = '';
            let entityType = '';
            let entityId: number | null = null;

            // Determine action and entity type from route
            if (path.includes('/new-arrivals')) {
                entityType = 'product';
                if (method === 'POST') action = 'create';
                else if (method === 'PUT' || method === 'PATCH') action = 'update';
                else if (method === 'DELETE') action = 'delete';
                else if (path.includes('/status')) action = 'update_status';
                else if (path.includes('/priority')) action = 'update_priority';
            } else if (path.includes('/blogs')) {
                entityType = 'blog';
                if (method === 'POST') action = 'create';
                else if (method === 'PUT' || method === 'PATCH') action = 'update';
                else if (method === 'DELETE') action = 'delete';
                else if (path.includes('/status')) action = 'update_status';
            } else if (path.includes('/media')) {
                entityType = 'media';
                if (method === 'POST') action = 'upload';
                else if (method === 'PUT') action = 'update';
                else if (method === 'DELETE') action = 'delete';
            }

            // Extract entity ID from response or params
            if (responseData && responseData.data && responseData.data.id) {
                entityId = responseData.data.id;
            } else if (req.params.id) {
                entityId = parseInt(req.params.id as string);
            }

            // Only log if we have meaningful action
            if (action && entityType) {
                await ActivityLog.create({
                    user_id: user.id,
                    action,
                    entity_type: entityType,
                    entity_id: entityId,
                    changes: responseData ? JSON.stringify(responseData) : null,
                    ip_address: req.ip || req.socket.remoteAddress || null,
                    user_agent: req.get('user-agent') || null,
                });
            }
        } catch (error) {
            // Don't fail request if logging fails
            console.error('Activity log error:', error);
        }
    });

    next();
};
