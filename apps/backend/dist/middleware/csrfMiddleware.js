"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfProtection = exports.generateCsrfToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generate a random CSRF token
 */
const generateCsrfToken = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
exports.generateCsrfToken = generateCsrfToken;
/**
 * CSRF Protection Middleware (Double Submit Cookie Pattern)
 * Requirements:
 * 1. 'csrf_token' cookie must exist
 * 2. 'X-CSRF-Token' header must match the cookie
 */
const csrfProtection = (req, res, next) => {
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
exports.csrfProtection = csrfProtection;
