import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Blog, Tag, BlogTag } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import { generateSlug, generateCanonicalUrl, generateMetaDefaults, generateBlogSchema, validateSEOForPublish } from '../utils/seoUtils';
import { ensureUniqueSlug } from '../utils/slugUtils';
import { asyncHandler, createError } from '../middleware/errorHandler';
import sanitizeHtml from 'sanitize-html';

// Public Endpoints

/**
 * Get published blogs (public)
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

    const { count, rows } = await Blog.findAndCountAll({
        where: whereClause,
        include: [{ model: Tag, as: 'blogTags', through: { attributes: [] } }],
        limit,
        offset,
        order: [['createdAt', 'DESC'], ['published_at', 'DESC']], // Newest blogs first
        distinct: true,
    });

    const blogs = rows.map((blog: any) => {
        const blogData = blog.toJSON();
        blogData.tags = blogData.blogTags?.map((tag: any) => tag.name) || [];
        return blogData;
    });

    res.json({
        success: true,
        data: blogs,
        meta: {
            page,
            limit,
            total: count,
            pages: Math.ceil(count / limit),
        },
    });
});

/**
 * Get single blog by slug (public) - with SEO data and schema
 */
export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { preview } = req.query; // Allow preview mode for draft blogs

    // Build where clause - allow draft blogs if preview=true
    const whereClause: any = { slug, is_active: true };
    if (preview !== 'true') {
        whereClause.status = 'published';
    }

    const blog = await Blog.findOne({
        where: whereClause,
        include: [{ model: Tag, as: 'blogTags', through: { attributes: [] } }],
    });

    if (!blog) {
        throw createError('Blog not found', 404, 'NOT_FOUND');
    }

    const blogData = blog.toJSON();

    // Generate schema server-side from schema_overrides
    const schema = generateBlogSchema(blog, blog.schema_overrides);

    // Validate schema
    const { validateSchemaJSON } = await import('../utils/seoUtils');
    const schemaValidation = validateSchemaJSON(schema, blog.schema_type);

    // Transform tags to array
    blogData.tags = blogData.blogTags?.map((tag: any) => tag.name) || [];

    // Add SEO data with dynamically generated schema
    blogData.seo = {
        metaTitle: blog.meta_title,
        metaDescription: blog.meta_description,
        canonicalUrl: blog.canonical_url,
        ogTitle: blog.og_title || blog.meta_title,
        ogDescription: blog.og_description || blog.meta_description,
        ogImage: blog.og_image || blog.featured_image,
        schema: schemaValidation.valid ? schema : null,
    };

    res.json({
        success: true,
        data: blogData,
    });
});

// Admin Endpoints

/**
 * Get all blogs (admin) - with filters
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
            { excerpt: { [Op.like]: `%${search}%` } },
        ];
    }

    const includeOptions: any[] = [
        { model: Tag, as: 'blogTags', through: { attributes: [] } },
    ];

    if (tag) {
        includeOptions.push({
            model: Tag,
            as: 'blogTags',
            where: { slug: tag },
            through: { attributes: [] },
            required: true,
        });
    }

    const { count, rows } = await Blog.findAndCountAll({
        where: whereClause,
        include: includeOptions,
        limit,
        offset,
        order: [['published_at', 'DESC']],
        distinct: true,
    });

    const blogs = rows.map((blog: any) => {
        const blogData = blog.toJSON();
        blogData.tags = blogData.blogTags?.map((tag: any) => tag.name) || [];
        return blogData;
    });

    res.json({
        success: true,
        data: blogs,
        meta: {
            page,
            limit,
            total: count,
            pages: Math.ceil(count / limit),
        },
    });
});

/**
 * Get single blog by ID (admin)
 */
export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const blog = await Blog.findByPk(id, {
        include: [{ model: Tag, as: 'blogTags', through: { attributes: [] } }],
    });

    if (!blog) {
        throw createError('Blog not found', 404, 'NOT_FOUND');
    }

    const blogData = blog.toJSON();
    blogData.tags = blogData.blogTags?.map((tag: any) => tag.name) || [];
    blogData.schema_overrides = blog.schema_overrides; // Include for admin editing

    res.json({
        success: true,
        data: blogData,
    });
});

/**
 * Create blog (admin)
 */
export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
        title,
        slug,
        content,
        excerpt,
        featured_image,
        author,
        category,
        status,
        meta_title,
        meta_description,
        focus_keyword,
        meta_keywords,
        canonical_url,
        og_title,
        og_description,
        og_image,
        schema_overrides,
        tags, // Array of tag names
    } = req.body;

    // Generate slug if not provided
    let finalSlug = slug || generateSlug(title);
    finalSlug = await ensureUniqueSlug(finalSlug, Blog);

    // Generate canonical URL if not provided
    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
    const finalCanonicalUrl = canonical_url || generateCanonicalUrl(finalSlug, 'blog');

    // Auto-generate excerpt if not provided
    let finalExcerpt = excerpt;
    if (!finalExcerpt && content) {
        const textContent = content.replace(/<[^>]*>/g, '').trim();
        finalExcerpt = textContent.length > 160 ? textContent.substring(0, 157) + '...' : textContent;
    }

    // Auto-generate SEO defaults if not provided
    const metaDefaults = generateMetaDefaults(title, finalExcerpt);
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
    const sanitizedContent = sanitizeHtml(content, {
        allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'blockquote', 'pre', 'code'],
        allowedAttributes: {
            a: ['href', 'target'],
            img: ['src', 'alt', 'width', 'height'],
        },
    });

    // Create blog
    const blog = await Blog.create({
        title,
        slug: finalSlug,
        content: sanitizedContent,
        excerpt: finalExcerpt,
        featured_image,
        author: author || req.user?.email || 'Admin',
        category,
        status: status || 'draft',
        published_at: status === 'published' ? new Date() : null,
        meta_title: finalMetaTitle,
        meta_description: finalMetaDescription,
        focus_keyword,
        meta_keywords,
        canonical_url: finalCanonicalUrl,
        og_title: og_title || finalMetaTitle,
        og_description: og_description || finalMetaDescription,
        og_image: og_image || featured_image,
        schema_overrides: schema_overrides || null,
    });

    // Handle tags (relational system)
    if (tags && Array.isArray(tags) && tags.length > 0) {
        await setBlogTags(blog.id, tags);
    }

    // Fetch with relations
    const createdBlog = await Blog.findByPk(blog.id, {
        include: [{ model: Tag, as: 'blogTags', through: { attributes: [] } }],
    });

    const blogData = createdBlog?.toJSON();
    if (blogData) {
        blogData.tags = blogData.blogTags?.map((tag: any) => tag.name) || [];
    }

    res.status(201).json({
        success: true,
        data: blogData,
    });
});

/**
 * Update blog (admin)
 */
export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const blog = await Blog.findByPk(id);
    if (!blog) {
        throw createError('Blog not found', 404, 'NOT_FOUND');
    }

    // Handle slug update - ensure uniqueness
    if (updateData.slug && updateData.slug !== blog.slug) {
        updateData.slug = await ensureUniqueSlug(updateData.slug, Blog, blog.id);
    }

    // Handle status change to published - validate SEO
    if (updateData.status === 'published' && blog.status !== 'published') {
        const seoValidation = validateSEOForPublish({
            metaTitle: updateData.meta_title || blog.meta_title,
            metaDescription: updateData.meta_description || blog.meta_description,
            canonicalUrl: updateData.canonical_url || blog.canonical_url,
            slug: updateData.slug || blog.slug,
        });

        if (!seoValidation.canPublish) {
            throw createError(
                `Cannot publish: ${seoValidation.errors.join(', ')}`,
                400,
                'SEO_VALIDATION_FAILED'
            );
        }

        if (!blog.published_at) {
            updateData.published_at = new Date();
        }
    }

    // Sanitize HTML if content is being updated
    if (updateData.content) {
        updateData.content = sanitizeHtml(updateData.content, {
            allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'blockquote', 'pre', 'code'],
            allowedAttributes: {
                a: ['href', 'target'],
                img: ['src', 'alt', 'width', 'height'],
            },
        });
    }

    // Handle tags update
    if (updateData.tags && Array.isArray(updateData.tags)) {
        await setBlogTags(blog.id, updateData.tags);
        delete updateData.tags; // Remove from update data, handled separately
    }

    // Update blog
    await blog.update(updateData);

    // Fetch updated blog with relations
    const updatedBlog = await Blog.findByPk(id, {
        include: [{ model: Tag, as: 'blogTags', through: { attributes: [] } }],
    });

    const blogData = updatedBlog?.toJSON();
    if (blogData) {
        blogData.tags = blogData.blogTags?.map((tag: any) => tag.name) || [];
    }

    res.json({
        success: true,
        data: blogData,
    });
});

/**
 * Delete blog (admin)
 */
export const deleteBlog = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
        throw createError('Blog not found', 404, 'NOT_FOUND');
    }

    await blog.destroy();

    res.json({
        success: true,
        message: 'Blog deleted successfully',
    });
});

/**
 * Update status (admin)
 */
export const updateStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'disabled'].includes(status)) {
        throw createError('Invalid status', 400, 'INVALID_STATUS');
    }

    const blog = await Blog.findByPk(id);
    if (!blog) {
        throw createError('Blog not found', 404, 'NOT_FOUND');
    }

    // Validate SEO before allowing publish
    if (status === 'published') {
        const seoValidation = validateSEOForPublish({
            metaTitle: blog.meta_title,
            metaDescription: blog.meta_description,
            canonicalUrl: blog.canonical_url,
            slug: blog.slug,
        });

        if (!seoValidation.canPublish) {
            throw createError(
                `Cannot publish: ${seoValidation.errors.join(', ')}`,
                400,
                'SEO_VALIDATION_FAILED'
            );
        }

        if (!blog.published_at) {
            blog.published_at = new Date();
        }
    }

    await blog.update({ status, published_at: status === 'published' ? new Date() : blog.published_at });

    res.json({
        success: true,
        data: blog.toJSON(),
    });
});

/**
 * Helper function: Set blog tags (relational system)
 */
async function setBlogTags(blogId: number, tagNames: string[]): Promise<void> {
    // Remove existing tags
    await BlogTag.destroy({ where: { blog_id: blogId } });

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

        // Link blog to tag
        await BlogTag.findOrCreate({
            where: { blog_id: blogId, tag_id: tag.id },
            defaults: {
                blog_id: blogId,
                tag_id: tag.id,
            },
        });
    }
}
