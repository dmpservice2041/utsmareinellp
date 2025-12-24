import { Response } from 'express';
import crypto from 'crypto';

/**
 * Generate ETag from data hash
 */
export function generateETag(data: object | string): string {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    const hash = crypto.createHash('md5').update(dataString).digest('hex');
    return `"${hash}"`;
}

/**
 * Set HTTP cache headers on response
 */
export function setCacheHeaders(
    res: Response,
    maxAge: number,
    etag?: string
): void {
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
export async function invalidateCacheForEntity(
    entityType: string,
    entityId: number
): Promise<void> {
    // Placeholder for future Redis/cache invalidation
    // When Redis is integrated, this will delete cache keys like:
    // `entity:${entityType}:${entityId}`
    // `entity:${entityType}:list`
    // etc.
    console.log(`Cache invalidation requested for ${entityType}:${entityId}`);
}

/**
 * Check if request has If-None-Match header matching ETag
 */
export function checkETagMatch(req: any, etag: string): boolean {
    const ifNoneMatch = req.headers['if-none-match'];
    return ifNoneMatch === etag;
}
