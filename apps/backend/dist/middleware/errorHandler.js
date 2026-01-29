"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = void 0;
exports.createError = createError;
/**
 * Centralized error handling middleware
 */
const errorHandler = (err, req, res, next) => {
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
        error: Object.assign({ code,
            message }, (process.env.NODE_ENV === 'development' && { stack: err.stack })),
    });
};
exports.errorHandler = errorHandler;
/**
 * Create custom error
 */
function createError(message, statusCode = 500, code = 'INTERNAL_SERVER_ERROR') {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    return error;
}
/**
 * Async error wrapper - catches async errors and passes to error handler
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
