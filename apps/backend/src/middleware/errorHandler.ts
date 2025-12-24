import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
    statusCode?: number;
    code?: string;
}

/**
 * Centralized error handling middleware
 */
export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'Internal server error';

    // Log error for debugging
    console.error('Error:', {
        code,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
    });

    // Send structured error response
    res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
};

/**
 * Create custom error
 */
export function createError(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_SERVER_ERROR'
): AppError {
    const error: AppError = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    return error;
}

/**
 * Async error wrapper - catches async errors and passes to error handler
 */
export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
