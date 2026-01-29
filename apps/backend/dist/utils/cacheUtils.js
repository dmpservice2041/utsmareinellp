"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateETag = generateETag;
exports.setCacheHeaders = setCacheHeaders;
exports.invalidateCacheForEntity = invalidateCacheForEntity;
exports.checkETagMatch = checkETagMatch;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generate ETag from data hash
 */
function generateETag(data) {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    const hash = crypto_1.default.createHash('md5').update(dataString).digest('hex');
    return `"${hash}"`;
}
/**
 * Set HTTP cache headers on response
 */
function setCacheHeaders(res, maxAge, etag) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    if (etag) {
        res.setHeader('ETag', etag);
    }
    res.setHeader('Last-Modified', new Date().toUTCString());
}
/**
 * Invalidate cache for entity (future Redis integration)
 * For now, this is a placeholder for future cache invalidation logic
 */
function invalidateCacheForEntity(entityType, entityId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Placeholder for future Redis/cache invalidation
        // When Redis is integrated, this will delete cache keys like:
        // `entity:${entityType}:${entityId}`
        // `entity:${entityType}:list`
        // etc.
        console.log(`Cache invalidation requested for ${entityType}:${entityId}`);
    });
}
/**
 * Check if request has If-None-Match header matching ETag
 */
function checkETagMatch(req, etag) {
    const ifNoneMatch = req.headers['if-none-match'];
    return ifNoneMatch === etag;
}
