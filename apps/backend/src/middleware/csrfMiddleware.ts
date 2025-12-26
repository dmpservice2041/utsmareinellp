import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

/**
 * Generate a random CSRF token
 */
export const generateCsrfToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
};

/**
 * CSRF Protection Middleware (Double Submit Cookie Pattern)
 * Requirements:
 * 1. 'csrf_token' cookie must exist
 * 2. 'X-CSRF-Token' header must match the cookie
 */
export const csrfProtection = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Skip for GET, HEAD, OPTIONS
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next();
    }

    const csrfCookie = req.cookies['csrf_token'];
    const csrfHeader = req.headers['x-csrf-token'];

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
        return res.status(403).json({
            success: false,
            error: {
                code: 'CSRF_ERROR',
                message: 'Invalid or missing CSRF token'
            }
        });
    }

    next();
};
