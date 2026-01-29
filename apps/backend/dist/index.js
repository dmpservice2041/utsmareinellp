"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error('FATAL ERROR: JWT_SECRET is missing or too short (min 32 chars).');
    process.exit(1);
}
const app = (0, express_1.default)();
// Trust proxy is required when running behind Nginx (or other proxies)
// to correctly identify the client IP address.
app.set('trust proxy', 1);
// Use PORT from env if provided (VPS), otherwise default to 5001 (Local).
// CAUTION: Ensure your local .env file does NOT set PORT=5000 on macOS as it conflicts with ControlCenter.
const port = process.env.PORT || 8002;
// Environment variables for URLs
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${port}`;
// Parse allowed origins from env or use defaults
const getAllowedOrigins = () => {
    if (process.env.CORS_ORIGINS) {
        return process.env.CORS_ORIGINS.split(',').map(origin => origin.trim());
    }
    return [
        FRONTEND_URL,
        BACKEND_URL,
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003'
    ];
};
// Middleware
app.use((0, cors_1.default)({
    origin: getAllowedOrigins(),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
}));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            // Only allow unsafe-inline/eval in development
            scriptSrc: process.env.NODE_ENV === 'production'
                ? ["'self'", FRONTEND_URL]
                : ["'self'", "'unsafe-inline'", "'unsafe-eval'", FRONTEND_URL],
            styleSrc: ["'self'", "'unsafe-inline'"], // Needed for many UI libs
            imgSrc: ["'self'", "data:", "https:", FRONTEND_URL],
            connectSrc: ["'self'", FRONTEND_URL],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            frameAncestors: ["'self'"],
            upgradeInsecureRequests: [],
        },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
}));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
app.use((0, compression_1.default)()); // Compress all responses
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Static files - serve all upload versions
const uploadsPath = path_1.default.join(__dirname, '../public/uploads');
console.log('[server]: Uploads directory:', uploadsPath);
console.log('[server]: Uploads directory exists:', require('fs').existsSync(uploadsPath));
// Custom static file handler to properly decode URLs with spaces
app.use('/uploads', (req, res, next) => {
    // Log upload requests for debugging
    if (process.env.NODE_ENV === 'development') {
        console.log(`[server]: Upload request: ${req.method} ${req.path}`);
    }
    // Decode the URL path to handle spaces and special characters
    try {
        const decodedPath = decodeURIComponent(req.path);
        req.url = decodedPath;
    }
    catch (err) {
        // If decoding fails, continue with original path
        console.warn('[server]: Failed to decode upload path:', req.path);
    }
    next();
}, express_1.default.static(uploadsPath, {
    setHeaders: (res) => {
        // Remove wildcard. Allow specific origins or let global CORS handle it (via OPTIONS).
        // Since this is static, we can use a safer policy:
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
}));
// Serve admin panel
app.use('/admin', express_1.default.static(path_1.default.join(__dirname, '../public/admin')));
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimitMiddleware_1 = require("./middleware/rateLimitMiddleware");
const csrfMiddleware_1 = require("./middleware/csrfMiddleware");
// Public routes (no auth required)
app.use('/api', rateLimitMiddleware_1.apiLimiter); // Apply rate limiting to all API routes
app.use('/api', csrfMiddleware_1.csrfProtection); // Apply CSRF protection (GET/HEAD/OPTIONS skipped)
app.use('/api', publicRoutes_1.default);
// Auth routes
app.use('/api/auth', authRoutes_1.default);
// Contact routes (public)
app.use('/api/contact', contactRoutes_1.default);
// Admin routes (protected)
app.use('/api/admin', adminRoutes_1.default);
// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Marine LLP Backend Running',
        version: '1.0.0',
        adminPanel: `${BACKEND_URL}/admin`,
        frontendUrl: FRONTEND_URL,
        backendUrl: BACKEND_URL,
    });
});
// Error handling middleware (must be last)
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
    console.log(`[server]: Backend URL: ${BACKEND_URL}`);
    console.log(`[server]: Frontend URL: ${FRONTEND_URL}`);
    console.log(`[server]: CORS Origins: ${getAllowedOrigins().join(', ')}`);
});
