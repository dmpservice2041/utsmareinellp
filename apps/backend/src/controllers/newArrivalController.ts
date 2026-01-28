import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Product, ProductImage, Tag, ProductTag } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import { generateSlug, generateCanonicalUrl, generateMetaDefaults, generateProductSchema, validateSEOForPublish } from '../utils/seoUtils';
import { ensureUniqueSlug } from '../utils/slugUtils';
import { asyncHandler, createError } from '../middleware/errorHandler';
import sanitizeHtml from 'sanitize-html';

// Public Endpoints

/**
 * Get published New Arrivals (public)
 */
export const getPublicList = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const category = req.query.category as string | undefined;

    const whereClause: any = {
        status: 'published',
        is_active: true,
    };

    if (category) {
        whereClause.category = category;
    }

    const { count, rows } = await Product.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['long_description', 'specifications', 'technical_details', 'schema_overrides'] },
        include: [
            { model: ProductImage, as: 'images', limit: 1 },
            { model: Tag, as: 'tags', through: { attributes: [] } },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC'], ['priority', 'DESC'], ['published_at', 'DESC']], // Newest products first
        distinct: true,
    });

    // Transform tags to array for API response
    const products = rows.map((product: any) => {
        const productData = product.toJSON();
        productData.tags = productData.tags?.map((tag: any) => tag.name) || [];
        return productData;
    });

    res.json({
        success: true,
        data: products,
        meta: {
            page,
            limit,
            total: count,
            pages: Math.ceil(count / limit),
        },
    });
});

/**
 * Get featured New Arrivals (public)
 */
export const getFeatured = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 4;

    const products = await Product.findAll({
        where: {
            status: 'published',
            is_active: true,
            is_featured: true,
        },
        include: [
            { model: ProductImage, as: 'images', limit: 1 },
            { model: Tag, as: 'tags', through: { attributes: [] } },
        ],
        limit,
        order: [['createdAt', 'DESC'], ['priority', 'DESC'], ['published_at', 'DESC']], // Newest products first
    });

    const transformed = products.map((product: any) => {
        const productData = product.toJSON();
        productData.tags = productData.tags?.map((tag: any) => tag.name) || [];
        return productData;
    });

    res.json({
        success: true,
        data: transformed,
    });
});

/**
 * Get single New Arrival by slug (public) - with SEO data and schema
 */
export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { preview } = req.query; // Allow preview mode for draft products

    // Build where clause - allow draft products if preview=true
    const whereClause: any = { slug, is_active: true };
    if (preview !== 'true') {
        whereClause.status = 'published';
    }

    const product = await Product.findOne({
        where: whereClause,
        include: [
            { model: ProductImage, as: 'images', order: [['sort_order', 'ASC']] },
            { model: Tag, as: 'tags', through: { attributes: [] } },
        ],
    });

    if (!product) {
        throw createError('New Arrival not found', 404, 'NOT_FOUND');
    }

    const productData = product.toJSON();

    // Generate schema server-side from schema_overrides
    const schema = generateProductSchema(product, product.schema_overrides);

    // Validate schema
    const { validateSchemaJSON } = await import('../utils/seoUtils');
    const schemaValidation = validateSchemaJSON(schema, product.schema_type);

    // Transform tags to array
    productData.tags = productData.tags?.map((tag: any) => tag.name) || [];

    // Add SEO data with dynamically generated schema
    productData.seo = {
        metaTitle: product.meta_title,
        metaDescription: product.meta_description,
        canonicalUrl: product.canonical_url,
        ogTitle: product.og_title || product.meta_title,
        ogDescription: product.og_description || product.meta_description,
        ogImage: product.og_image || product.featured_image,
        schema: schemaValidation.valid ? schema : null,
    };

    res.json({
        success: true,
        data: productData,
    });
});

// Admin Endpoints

/**
 * Get all New Arrivals (admin) - with filters
 */
export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status as string | undefined;
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const tag = req.query.tag as string | undefined;

    const whereClause: any = {};

    if (status) {
        whereClause.status = status;
    }

    if (category) {
        whereClause.category = category;
    }

    if (search) {
        whereClause[Op.or] = [
            { title: { [Op.like]: `%${search}%` } },
            { short_description: { [Op.like]: `%${search}%` } },
        ];
    }

    const includeOptions: any[] = [
        { model: ProductImage, as: 'images' },
        { model: Tag, as: 'tags', through: { attributes: [] } },
    ];

    if (tag) {
        includeOptions.push({
            model: Tag,
            as: 'tags',
            where: { slug: tag },
            through: { attributes: [] },
            required: true,
        });
    }

    const { count, rows } = await Product.findAndCountAll({
        where: whereClause,
        include: includeOptions,
        limit,
        offset,
        order: [['createdAt', 'DESC'], ['priority', 'DESC']], // Newest products first
        distinct: true,
    });

    const products = rows.map((product: any) => {
        const productData = product.toJSON();
        productData.tags = productData.tags?.map((tag: any) => tag.name) || [];
        return productData;
    });

    res.json({
        success: true,
        data: products,
        meta: {
            page,
            limit,
            total: count,
            pages: Math.ceil(count / limit),
        },
    });
});

/**
 * Get single New Arrival by ID (admin)
 */
export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;

    const product = await Product.findByPk(id, {
        include: [
            { model: ProductImage, as: 'images', order: [['sort_order', 'ASC']] },
            { model: Tag, as: 'tags', through: { attributes: [] } },
        ],
    });

    if (!product) {
        throw createError('New Arrival not found', 404, 'NOT_FOUND');
    }

    const productData = product.toJSON();
    productData.tags = productData.tags?.map((tag: any) => tag.name) || [];
    productData.schema_overrides = product.schema_overrides; // Include for admin editing

    res.json({
        success: true,
        data: productData,
    });
});

/**
 * Create New Arrival (admin)
 */
export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
        title,
        slug,
        short_description,
        long_description,
        category,
        featured_image,
        status,
        priority,
        is_featured,
        meta_title,
        meta_description,
        meta_keywords,
        canonical_url,
        og_title,
        og_description,
        og_image,
        schema_overrides,
        specifications,
        technical_details,
        tags, // Array of tag names
    } = req.body;

    // Generate slug if not provided
    let finalSlug = slug || generateSlug(title);
    finalSlug = await ensureUniqueSlug(finalSlug, Product);

    // Generate canonical URL if not provided
    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
    const finalCanonicalUrl = canonical_url || generateCanonicalUrl(finalSlug, 'product');

    // Auto-generate SEO defaults if not provided
    const metaDefaults = generateMetaDefaults(title, short_description);
    const finalMetaTitle = meta_title || metaDefaults.metaTitle;
    const finalMetaDescription = meta_description || metaDefaults.metaDescription;

    // Validate SEO before allowing publish
    if (status === 'published') {
        const seoValidation = validateSEOForPublish({
            metaTitle: finalMetaTitle,
            metaDescription: finalMetaDescription,
            canonicalUrl: finalCanonicalUrl,
            slug: finalSlug,
        });

        if (!seoValidation.canPublish) {
            throw createError(
                `Cannot publish: ${seoValidation.errors.join(', ')}`,
                400,
                'SEO_VALIDATION_FAILED'
            );
        }
    }

    // Sanitize HTML content
    const sanitizedLongDescription = long_description
        ? sanitizeHtml(long_description, {
            allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img'],
            allowedAttributes: {
                a: ['href'],
                img: ['src', 'alt'],
            },
        })
        : null;

    // Create product
    const product = await Product.create({
        title,
        slug: finalSlug,
        short_description: short_description || null,
        long_description: sanitizedLongDescription,
        category: category || null,
        featured_image: featured_image || null,
        status: status || 'draft',
        priority: priority ? parseInt(String(priority)) : 0,
        is_featured: is_featured || false,
        published_at: status === 'published' ? new Date() : null,
        meta_title: finalMetaTitle,
        meta_description: finalMetaDescription,
        meta_keywords,
        canonical_url: finalCanonicalUrl,
        og_title: og_title || finalMetaTitle,
        og_description: og_description || finalMetaDescription,
        og_image: og_image || featured_image,
        schema_overrides: schema_overrides || null,
        specifications: specifications || null,
        technical_details,
    });

    // Handle tags (relational system)
    if (tags && Array.isArray(tags) && tags.length > 0) {
        await setProductTags(product.id, tags);
    }

    // Fetch with relations
    const createdProduct = await Product.findByPk(product.id, {
        include: [
            { model: ProductImage, as: 'images' },
            { model: Tag, as: 'tags', through: { attributes: [] } },
        ],
    });

    const productData = createdProduct?.toJSON();
    if (productData) {
        productData.tags = productData.tags?.map((tag: any) => tag.name) || [];
    }

    res.status(201).json({
        success: true,
        data: productData,
    });
});

/**
 * Update New Arrival (admin)
 */
export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const updateData = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
        throw createError('New Arrival not found', 404, 'NOT_FOUND');
    }

    // Handle slug update - ensure uniqueness
    if (updateData.slug && updateData.slug !== product.slug) {
        updateData.slug = await ensureUniqueSlug(updateData.slug, Product, product.id);
    }

    // Handle status change to published - validate SEO
    if (updateData.status === 'published' && product.status !== 'published') {
        const seoValidation = validateSEOForPublish({
            metaTitle: updateData.meta_title || product.meta_title,
            metaDescription: updateData.meta_description || product.meta_description,
            canonicalUrl: updateData.canonical_url || product.canonical_url,
            slug: updateData.slug || product.slug,
        });

        if (!seoValidation.canPublish) {
            throw createError(
                `Cannot publish: ${seoValidation.errors.join(', ')}`,
                400,
                'SEO_VALIDATION_FAILED'
            );
        }

        if (!product.published_at) {
            updateData.published_at = new Date();
        }
    }

    // Sanitize HTML if long_description is being updated
    if (updateData.long_description) {
        updateData.long_description = sanitizeHtml(updateData.long_description, {
            allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img'],
            allowedAttributes: {
                a: ['href'],
                img: ['src', 'alt'],
            },
        });
    }

    // Handle tags update
    if (updateData.tags && Array.isArray(updateData.tags)) {
        await setProductTags(product.id, updateData.tags);
        delete updateData.tags; // Remove from update data, handled separately
    }

    // Update product
    await product.update(updateData);

    // Fetch updated product with relations
    const updatedProduct = await Product.findByPk(id, {
        include: [
            { model: ProductImage, as: 'images' },
            { model: Tag, as: 'tags', through: { attributes: [] } },
        ],
    });

    const productData = updatedProduct?.toJSON();
    if (productData) {
        productData.tags = productData.tags?.map((tag: any) => tag.name) || [];
    }

    res.json({
        success: true,
        data: productData,
    });
});

/**
 * Delete New Arrival (admin)
 */
export const deleteProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;

    const product = await Product.findByPk(id);
    if (!product) {
        throw createError('New Arrival not found', 404, 'NOT_FOUND');
    }

    await product.destroy();

    res.json({
        success: true,
        message: 'New Arrival deleted successfully',
    });
});

/**
 * Update status (admin)
 */
export const updateStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!['draft', 'published', 'disabled'].includes(status)) {
        throw createError('Invalid status', 400, 'INVALID_STATUS');
    }

    const product = await Product.findByPk(id);
    if (!product) {
        throw createError('New Arrival not found', 404, 'NOT_FOUND');
    }

    // Validate SEO before allowing publish
    if (status === 'published') {
        const seoValidation = validateSEOForPublish({
            metaTitle: product.meta_title,
            metaDescription: product.meta_description,
            canonicalUrl: product.canonical_url,
            slug: product.slug,
        });

        if (!seoValidation.canPublish) {
            throw createError(
                `Cannot publish: ${seoValidation.errors.join(', ')}`,
                400,
                'SEO_VALIDATION_FAILED'
            );
        }

        if (!product.published_at) {
            product.published_at = new Date();
        }
    }

    await product.update({ status, published_at: status === 'published' ? new Date() : product.published_at });

    res.json({
        success: true,
        data: product.toJSON(),
    });
});

/**
 * Update priority (admin)
 */
export const updatePriority = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { priority } = req.body;

    if (typeof priority !== 'number' || priority < 0) {
        throw createError('Priority must be a non-negative number', 400, 'INVALID_PRIORITY');
    }

    const product = await Product.findByPk(id);
    if (!product) {
        throw createError('New Arrival not found', 404, 'NOT_FOUND');
    }

    await product.update({ priority });

    res.json({
        success: true,
        data: product.toJSON(),
    });
});

/**
 * Helper function: Set product tags (relational system)
 */
async function setProductTags(productId: number, tagNames: string[]): Promise<void> {
    // Remove existing tags
    await ProductTag.destroy({ where: { product_id: productId } });

    // Create or find tags and link them
    for (const tagName of tagNames) {
        if (!tagName || typeof tagName !== 'string') continue;

        const normalizedName = tagName.toLowerCase().trim();
        const slug = generateSlug(normalizedName);

        if (!slug) continue;

        // Find or create tag
        let [tag] = await Tag.findOrCreate({
            where: { slug },
            defaults: {
                name: normalizedName,
                slug,
                usage_count: 0,
            },
        });

        // Increment usage count
        await tag.incrementUsage();

        // Link product to tag
        await ProductTag.findOrCreate({
            where: { product_id: productId, tag_id: tag.id },
            defaults: {
                product_id: productId,
                tag_id: tag.id,
            },
        });
    }
}
