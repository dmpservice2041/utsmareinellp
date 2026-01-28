import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

dotenv.config();

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error('FATAL ERROR: JWT_SECRET is missing or too short (min 32 chars).');
    process.exit(1);
}

const app: Express = express();

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
const getAllowedOrigins = (): string[] => {
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
app.use(cors({
    origin: getAllowedOrigins(),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
}));
app.use(helmet({
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
import cookieParser from 'cookie-parser';
import compression from 'compression';

app.use(compression()); // Compress all responses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files - serve all upload versions
const uploadsPath = path.join(__dirname, '../public/uploads');
console.log('[server]: Uploads directory:', uploadsPath);
console.log('[server]: Uploads directory exists:', require('fs').existsSync(uploadsPath));

// Custom static file handler to properly decode URLs with spaces
app.use('/uploads', (req: Request, res: Response, next: express.NextFunction) => {
    // Log upload requests for debugging
    if (process.env.NODE_ENV === 'development') {
        console.log(`[server]: Upload request: ${req.method} ${req.path}`);
    }

    // Decode the URL path to handle spaces and special characters
    try {
        const decodedPath = decodeURIComponent(req.path);
        req.url = decodedPath;
    } catch (err) {
        // If decoding fails, continue with original path
        console.warn('[server]: Failed to decode upload path:', req.path);
    }

    next();
}, express.static(uploadsPath, {
    setHeaders: (res) => {
        // Remove wildcard. Allow specific origins or let global CORS handle it (via OPTIONS).
        // Since this is static, we can use a safer policy:
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
}));

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));

// Routes
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';

import { apiLimiter } from './middleware/rateLimitMiddleware';
import { csrfProtection } from './middleware/csrfMiddleware';

// Public routes (no auth required)
app.use('/api', apiLimiter); // Apply rate limiting to all API routes
app.use('/api', csrfProtection); // Apply CSRF protection (GET/HEAD/OPTIONS skipped)
app.use('/api', publicRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Contact routes (public)
app.use('/api/contact', contactRoutes);

// Admin routes (protected)
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
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
app.use(errorHandler);

app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
    console.log(`[server]: Backend URL: ${BACKEND_URL}`);
    console.log(`[server]: Frontend URL: ${FRONTEND_URL}`);
    console.log(`[server]: CORS Origins: ${getAllowedOrigins().join(', ')}`);
});
