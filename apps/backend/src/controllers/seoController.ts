import { Request, Response } from 'express';
import { Product, Blog } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import { validateSEO, validateSEOForPublish, generateMetaDefaults, generateProductSchema, generateBlogSchema, validateSchemaJSON } from '../utils/seoUtils';
import { asyncHandler, createError } from '../middleware/errorHandler';

/**
 * Validate SEO fields (admin)
 */
export const validate = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { entityType, id } = req.params;

    let entity: Product | Blog | null = null;

    if (entityType === 'product') {
        entity = await Product.findByPk(id);
    } else if (entityType === 'blog') {
        entity = await Blog.findByPk(id);
    } else {
        throw createError('Invalid entity type', 400, 'INVALID_ENTITY_TYPE');
    }

    if (!entity) {
        throw createError(`${entityType} not found`, 404, 'NOT_FOUND');
    }

    const validation = validateSEO({
        metaTitle: entity.meta_title,
        metaDescription: entity.meta_description,
        canonicalUrl: entity.canonical_url,
        slug: entity.slug,
    });

    // Calculate SEO score (0-100)
    let score = 100;
    score -= validation.errors.length * 30; // Each error reduces score significantly
    score -= validation.warnings.length * 5; // Each warning reduces score slightly
    score = Math.max(0, score);

    res.json({
        success: true,
        data: {
            valid: validation.valid,
            canPublish: validation.errors.length === 0,
            errors: validation.errors,
            warnings: validation.warnings,
            score,
        },
    });
});

/**
 * Auto-generate SEO fields (admin)
 */
export const generate = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { entityType, id } = req.params;

    let entity: Product | Blog | null = null;

    if (entityType === 'product') {
        entity = await Product.findByPk(id);
    } else if (entityType === 'blog') {
        entity = await Blog.findByPk(id);
    } else {
        throw createError('Invalid entity type', 400, 'INVALID_ENTITY_TYPE');
    }

    if (!entity) {
        throw createError(`${entityType} not found`, 404, 'NOT_FOUND');
    }

    // Generate defaults
    const metaDefaults = generateMetaDefaults(
        entity.title,
        entityType === 'product' 
            ? ((entity as Product).short_description || undefined)
            : ((entity as Blog).excerpt || undefined)
    );

    // Update entity with generated defaults (only if fields are empty)
    const updateData: any = {};
    if (!entity.meta_title) {
        updateData.meta_title = metaDefaults.metaTitle;
    }
    if (!entity.meta_description) {
        updateData.meta_description = metaDefaults.metaDescription;
    }
    if (!entity.og_title) {
        updateData.og_title = metaDefaults.metaTitle;
    }
    if (!entity.og_description) {
        updateData.og_description = metaDefaults.metaDescription;
    }

    if (Object.keys(updateData).length > 0) {
        await entity.update(updateData);
    }

    res.json({
        success: true,
        data: {
            message: 'SEO fields generated successfully',
            generated: updateData,
            entity: entity.toJSON(),
        },
    });
});

/**
 * Validate JSON-LD schema (admin)
 */
export const validateSchema = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { entityType, id } = req.params;

    let entity: Product | Blog | null = null;

    if (entityType === 'product') {
        entity = await Product.findByPk(id);
    } else if (entityType === 'blog') {
        entity = await Blog.findByPk(id);
    } else {
        throw createError('Invalid entity type', 400, 'INVALID_ENTITY_TYPE');
    }

    if (!entity) {
        throw createError(`${entityType} not found`, 404, 'NOT_FOUND');
    }

    // Generate schema
    let schema: object;
    if (entityType === 'product') {
        schema = generateProductSchema(entity as Product, (entity as Product).schema_overrides);
    } else {
        schema = generateBlogSchema(entity as Blog, (entity as Blog).schema_overrides);
    }

    // Validate schema
    const validation = validateSchemaJSON(schema, entity.schema_type);

    res.json({
        success: true,
        data: {
            valid: validation.valid,
            errors: validation.errors,
            schema,
        },
    });
});
