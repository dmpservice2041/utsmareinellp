"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = exports.cacheMiddleware = void 0;
const cacheUtils_1 = require("../utils/cacheUtils");
/**
 * Cache middleware for public API endpoints
 * Sets cache headers and handles ETag validation
 */
const cacheMiddleware = (maxAge = 3600) => {
    return (req, res, next) => {
        // Store original json method
        const originalJson = res.json.bind(res);
        // Override json to add ETag
        res.json = function (data) {
            // Generate ETag from response data
            const etag = (0, cacheUtils_1.generateETag)(JSON.stringify(data));
            // Check if client has cached version
            if ((0, cacheUtils_1.checkETagMatch)(req, etag)) {
                res.status(304).end(); // Not Modified
                return res;
            }
            // Set cache headers
            (0, cacheUtils_1.setCacheHeaders)(res, maxAge, etag);
            // Send response
            return originalJson(data);
        };
        next();
    };
};
exports.cacheMiddleware = cacheMiddleware;
/**
 * Cache invalidation middleware
 * Called after admin updates to invalidate cache
 */
const invalidateCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // After response is sent, invalidate cache
    res.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            // Invalidate cache for the entity
            const path = req.path;
            let entityType = '';
            let entityId = null;
            if (path.includes('/new-arrivals')) {
                entityType = 'product';
            }
            else if (path.includes('/blogs')) {
                entityType = 'blog';
            }
            else if (path.includes('/media')) {
                entityType = 'media';
            }
            if (req.params.id) {
                entityId = parseInt(req.params.id);
            }
            else if (res.locals.entityId) {
                entityId = res.locals.entityId;
            }
            if (entityType) {
                // Import here to avoid circular dependency
                const { invalidateCacheForEntity } = yield Promise.resolve().then(() => __importStar(require('../utils/cacheUtils')));
                yield invalidateCacheForEntity(entityType, entityId || 0);
            }
        }
    }));
    next();
});
exports.invalidateCache = invalidateCache;
