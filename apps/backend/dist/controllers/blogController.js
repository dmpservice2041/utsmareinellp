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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.deleteBlog = exports.update = exports.create = exports.getById = exports.getAll = exports.getBySlug = exports.getPublicList = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const seoUtils_1 = require("../utils/seoUtils");
const slugUtils_1 = require("../utils/slugUtils");
const errorHandler_1 = require("../middleware/errorHandler");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
// Public Endpoints
/**
 * Get published blogs (public)
 */
exports.getPublicList = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const whereClause = {
        status: 'published',
        is_active: true,
    };
    if (category) {
        whereClause.category = category;
    }
    const { count, rows } = yield models_1.Blog.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['content', 'schema_overrides'] },
        include: [{ model: models_1.Tag, as: 'blogTags', through: { attributes: [] } }],
        limit,
        offset,
        order: [['createdAt', 'DESC'], ['published_at', 'DESC']], // Newest blogs first
        distinct: true,
    });
    const blogs = rows.map((blog) => {
        var _a;
        const blogData = blog.toJSON();
        blogData.tags = ((_a = blogData.blogTags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
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
}));
/**
 * Get single blog by slug (public) - with SEO data and schema
 */
exports.getBySlug = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { slug } = req.params;
    const { preview } = req.query; // Allow preview mode for draft blogs
    // Build where clause - allow draft blogs if preview=true
    const whereClause = { slug, is_active: true };
    if (preview !== 'true') {
        whereClause.status = 'published';
    }
    const blog = yield models_1.Blog.findOne({
        where: whereClause,
        include: [{ model: models_1.Tag, as: 'blogTags', through: { attributes: [] } }],
    });
    if (!blog) {
        throw (0, errorHandler_1.createError)('Blog not found', 404, 'NOT_FOUND');
    }
    const blogData = blog.toJSON();
    // Generate schema server-side from schema_overrides
    const schema = (0, seoUtils_1.generateBlogSchema)(blog, blog.schema_overrides);
    // Validate schema
    const { validateSchemaJSON } = yield Promise.resolve().then(() => __importStar(require('../utils/seoUtils')));
    const schemaValidation = validateSchemaJSON(schema, blog.schema_type);
    // Transform tags to array
    blogData.tags = ((_a = blogData.blogTags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
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
}));
// Admin Endpoints
/**
 * Get all blogs (admin) - with filters
 */
exports.getAll = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const category = req.query.category;
    const search = req.query.search;
    const tag = req.query.tag;
    const whereClause = {};
    if (status) {
        whereClause.status = status;
    }
    if (category) {
        whereClause.category = category;
    }
    if (search) {
        whereClause[sequelize_1.Op.or] = [
            { title: { [sequelize_1.Op.like]: `%${search}%` } },
            { excerpt: { [sequelize_1.Op.like]: `%${search}%` } },
        ];
    }
    const includeOptions = [
        { model: models_1.Tag, as: 'blogTags', through: { attributes: [] } },
    ];
    if (tag) {
        includeOptions.push({
            model: models_1.Tag,
            as: 'blogTags',
            where: { slug: tag },
            through: { attributes: [] },
            required: true,
        });
    }
    const { count, rows } = yield models_1.Blog.findAndCountAll({
        where: whereClause,
        include: includeOptions,
        limit,
        offset,
        order: [['published_at', 'DESC']],
        distinct: true,
    });
    const blogs = rows.map((blog) => {
        var _a;
        const blogData = blog.toJSON();
        blogData.tags = ((_a = blogData.blogTags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
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
}));
/**
 * Get single blog by ID (admin)
 */
exports.getById = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const blog = yield models_1.Blog.findByPk(id, {
        include: [{ model: models_1.Tag, as: 'blogTags', through: { attributes: [] } }],
    });
    if (!blog) {
        throw (0, errorHandler_1.createError)('Blog not found', 404, 'NOT_FOUND');
    }
    const blogData = blog.toJSON();
    blogData.tags = ((_a = blogData.blogTags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
    blogData.schema_overrides = blog.schema_overrides; // Include for admin editing
    res.json({
        success: true,
        data: blogData,
    });
}));
/**
 * Create blog (admin)
 */
exports.create = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { title, slug, content, excerpt, featured_image, author, category, status, meta_title, meta_description, focus_keyword, meta_keywords, canonical_url, og_title, og_description, og_image, schema_overrides, tags, // Array of tag names
     } = req.body;
    // Generate slug if not provided
    let finalSlug = slug || (0, seoUtils_1.generateSlug)(title);
    finalSlug = yield (0, slugUtils_1.ensureUniqueSlug)(finalSlug, models_1.Blog);
    // Generate canonical URL if not provided
    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
    const finalCanonicalUrl = canonical_url || (0, seoUtils_1.generateCanonicalUrl)(finalSlug, 'blog');
    // Auto-generate excerpt if not provided
    let finalExcerpt = excerpt;
    if (!finalExcerpt && content) {
        const textContent = content.replace(/<[^>]*>/g, '').trim();
        finalExcerpt = textContent.length > 160 ? textContent.substring(0, 157) + '...' : textContent;
    }
    // Auto-generate SEO defaults if not provided
    const metaDefaults = (0, seoUtils_1.generateMetaDefaults)(title, finalExcerpt);
    const finalMetaTitle = meta_title || metaDefaults.metaTitle;
    const finalMetaDescription = meta_description || metaDefaults.metaDescription;
    // Validate SEO before allowing publish
    if (status === 'published') {
        const seoValidation = (0, seoUtils_1.validateSEOForPublish)({
            metaTitle: finalMetaTitle,
            metaDescription: finalMetaDescription,
            canonicalUrl: finalCanonicalUrl,
            slug: finalSlug,
        });
        if (!seoValidation.canPublish) {
            throw (0, errorHandler_1.createError)(`Cannot publish: ${seoValidation.errors.join(', ')}`, 400, 'SEO_VALIDATION_FAILED');
        }
    }
    // Sanitize HTML content
    const sanitizedContent = (0, sanitize_html_1.default)(content, {
        allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'blockquote', 'pre', 'code'],
        allowedAttributes: {
            a: ['href', 'target'],
            img: ['src', 'alt', 'width', 'height'],
        },
    });
    // Create blog
    const blog = yield models_1.Blog.create({
        title,
        slug: finalSlug,
        content: sanitizedContent,
        excerpt: finalExcerpt,
        featured_image,
        author: author || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.email) || 'Admin',
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
        yield setBlogTags(blog.id, tags);
    }
    // Fetch with relations
    const createdBlog = yield models_1.Blog.findByPk(blog.id, {
        include: [{ model: models_1.Tag, as: 'blogTags', through: { attributes: [] } }],
    });
    const blogData = createdBlog === null || createdBlog === void 0 ? void 0 : createdBlog.toJSON();
    if (blogData) {
        blogData.tags = ((_b = blogData.blogTags) === null || _b === void 0 ? void 0 : _b.map((tag) => tag.name)) || [];
    }
    res.status(201).json({
        success: true,
        data: blogData,
    });
}));
/**
 * Update blog (admin)
 */
exports.update = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const updateData = req.body;
    const blog = yield models_1.Blog.findByPk(id);
    if (!blog) {
        throw (0, errorHandler_1.createError)('Blog not found', 404, 'NOT_FOUND');
    }
    // Handle slug update - ensure uniqueness
    if (updateData.slug && updateData.slug !== blog.slug) {
        updateData.slug = yield (0, slugUtils_1.ensureUniqueSlug)(updateData.slug, models_1.Blog, blog.id);
    }
    // Handle status change to published - validate SEO
    if (updateData.status === 'published' && blog.status !== 'published') {
        const seoValidation = (0, seoUtils_1.validateSEOForPublish)({
            metaTitle: updateData.meta_title || blog.meta_title,
            metaDescription: updateData.meta_description || blog.meta_description,
            canonicalUrl: updateData.canonical_url || blog.canonical_url,
            slug: updateData.slug || blog.slug,
        });
        if (!seoValidation.canPublish) {
            throw (0, errorHandler_1.createError)(`Cannot publish: ${seoValidation.errors.join(', ')}`, 400, 'SEO_VALIDATION_FAILED');
        }
        if (!blog.published_at) {
            updateData.published_at = new Date();
        }
    }
    // Sanitize HTML if content is being updated
    if (updateData.content) {
        updateData.content = (0, sanitize_html_1.default)(updateData.content, {
            allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'blockquote', 'pre', 'code'],
            allowedAttributes: {
                a: ['href', 'target'],
                img: ['src', 'alt', 'width', 'height'],
            },
        });
    }
    // Handle tags update
    if (updateData.tags && Array.isArray(updateData.tags)) {
        yield setBlogTags(blog.id, updateData.tags);
        delete updateData.tags; // Remove from update data, handled separately
    }
    // Update blog
    yield blog.update(updateData);
    // Fetch updated blog with relations
    const updatedBlog = yield models_1.Blog.findByPk(id, {
        include: [{ model: models_1.Tag, as: 'blogTags', through: { attributes: [] } }],
    });
    const blogData = updatedBlog === null || updatedBlog === void 0 ? void 0 : updatedBlog.toJSON();
    if (blogData) {
        blogData.tags = ((_a = blogData.blogTags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
    }
    res.json({
        success: true,
        data: blogData,
    });
}));
/**
 * Delete blog (admin)
 */
exports.deleteBlog = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blog = yield models_1.Blog.findByPk(id);
    if (!blog) {
        throw (0, errorHandler_1.createError)('Blog not found', 404, 'NOT_FOUND');
    }
    yield blog.destroy();
    res.json({
        success: true,
        message: 'Blog deleted successfully',
    });
}));
/**
 * Update status (admin)
 */
exports.updateStatus = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    if (!['draft', 'published', 'disabled'].includes(status)) {
        throw (0, errorHandler_1.createError)('Invalid status', 400, 'INVALID_STATUS');
    }
    const blog = yield models_1.Blog.findByPk(id);
    if (!blog) {
        throw (0, errorHandler_1.createError)('Blog not found', 404, 'NOT_FOUND');
    }
    // Validate SEO before allowing publish
    if (status === 'published') {
        const seoValidation = (0, seoUtils_1.validateSEOForPublish)({
            metaTitle: blog.meta_title,
            metaDescription: blog.meta_description,
            canonicalUrl: blog.canonical_url,
            slug: blog.slug,
        });
        if (!seoValidation.canPublish) {
            throw (0, errorHandler_1.createError)(`Cannot publish: ${seoValidation.errors.join(', ')}`, 400, 'SEO_VALIDATION_FAILED');
        }
        if (!blog.published_at) {
            blog.published_at = new Date();
        }
    }
    yield blog.update({ status, published_at: status === 'published' ? new Date() : blog.published_at });
    res.json({
        success: true,
        data: blog.toJSON(),
    });
}));
/**
 * Helper function: Set blog tags (relational system)
 */
function setBlogTags(blogId, tagNames) {
    return __awaiter(this, void 0, void 0, function* () {
        // Remove existing tags
        yield models_1.BlogTag.destroy({ where: { blog_id: blogId } });
        // Create or find tags and link them
        for (const tagName of tagNames) {
            if (!tagName || typeof tagName !== 'string')
                continue;
            const normalizedName = tagName.toLowerCase().trim();
            const slug = (0, seoUtils_1.generateSlug)(normalizedName);
            if (!slug)
                continue;
            // Find or create tag
            let [tag] = yield models_1.Tag.findOrCreate({
                where: { slug },
                defaults: {
                    name: normalizedName,
                    slug,
                    usage_count: 0,
                },
            });
            // Increment usage count
            yield tag.incrementUsage();
            // Link blog to tag
            yield models_1.BlogTag.findOrCreate({
                where: { blog_id: blogId, tag_id: tag.id },
                defaults: {
                    blog_id: blogId,
                    tag_id: tag.id,
                },
            });
        }
    });
}
