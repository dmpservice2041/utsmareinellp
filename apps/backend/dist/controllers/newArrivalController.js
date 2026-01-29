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
exports.updatePriority = exports.updateStatus = exports.deleteProduct = exports.update = exports.create = exports.getById = exports.getAll = exports.getBySlug = exports.getFeatured = exports.getPublicList = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const seoUtils_1 = require("../utils/seoUtils");
const slugUtils_1 = require("../utils/slugUtils");
const errorHandler_1 = require("../middleware/errorHandler");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
// Public Endpoints
/**
 * Get published New Arrivals (public)
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
    const { count, rows } = yield models_1.Product.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['long_description', 'specifications', 'technical_details', 'schema_overrides'] },
        include: [
            { model: models_1.ProductImage, as: 'images', limit: 1 },
            { model: models_1.Tag, as: 'tags', through: { attributes: [] } },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC'], ['priority', 'DESC'], ['published_at', 'DESC']], // Newest products first
        distinct: true,
    });
    // Transform tags to array for API response
    const products = rows.map((product) => {
        var _a;
        const productData = product.toJSON();
        productData.tags = ((_a = productData.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
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
}));
/**
 * Get featured New Arrivals (public)
 */
exports.getFeatured = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 4;
    const products = yield models_1.Product.findAll({
        where: {
            status: 'published',
            is_active: true,
            is_featured: true,
        },
        include: [
            { model: models_1.ProductImage, as: 'images', limit: 1 },
            { model: models_1.Tag, as: 'tags', through: { attributes: [] } },
        ],
        limit,
        order: [['createdAt', 'DESC'], ['priority', 'DESC'], ['published_at', 'DESC']], // Newest products first
    });
    const transformed = products.map((product) => {
        var _a;
        const productData = product.toJSON();
        productData.tags = ((_a = productData.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
        return productData;
    });
    res.json({
        success: true,
        data: transformed,
    });
}));
/**
 * Get single New Arrival by slug (public) - with SEO data and schema
 */
exports.getBySlug = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { slug } = req.params;
    const { preview } = req.query; // Allow preview mode for draft products
    // Build where clause - allow draft products if preview=true
    const whereClause = { slug, is_active: true };
    if (preview !== 'true') {
        whereClause.status = 'published';
    }
    const product = yield models_1.Product.findOne({
        where: whereClause,
        include: [
            { model: models_1.ProductImage, as: 'images', order: [['sort_order', 'ASC']] },
            { model: models_1.Tag, as: 'tags', through: { attributes: [] } },
        ],
    });
    if (!product) {
        throw (0, errorHandler_1.createError)('New Arrival not found', 404, 'NOT_FOUND');
    }
    const productData = product.toJSON();
    // Generate schema server-side from schema_overrides
    const schema = (0, seoUtils_1.generateProductSchema)(product, product.schema_overrides);
    // Validate schema
    const { validateSchemaJSON } = yield Promise.resolve().then(() => __importStar(require('../utils/seoUtils')));
    const schemaValidation = validateSchemaJSON(schema, product.schema_type);
    // Transform tags to array
    productData.tags = ((_a = productData.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
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
}));
// Admin Endpoints
/**
 * Get all New Arrivals (admin) - with filters
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
            { short_description: { [sequelize_1.Op.like]: `%${search}%` } },
        ];
    }
    const includeOptions = [
        { model: models_1.ProductImage, as: 'images' },
        { model: models_1.Tag, as: 'tags', through: { attributes: [] } },
    ];
    if (tag) {
        includeOptions.push({
            model: models_1.Tag,
            as: 'tags',
            where: { slug: tag },
            through: { attributes: [] },
            required: true,
        });
    }
    const { count, rows } = yield models_1.Product.findAndCountAll({
        where: whereClause,
        include: includeOptions,
        limit,
        offset,
        order: [['createdAt', 'DESC'], ['priority', 'DESC']], // Newest products first
        distinct: true,
    });
    const products = rows.map((product) => {
        var _a;
        const productData = product.toJSON();
        productData.tags = ((_a = productData.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
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
}));
/**
 * Get single New Arrival by ID (admin)
 */
exports.getById = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const product = yield models_1.Product.findByPk(id, {
        include: [
            { model: models_1.ProductImage, as: 'images', order: [['sort_order', 'ASC']] },
            { model: models_1.Tag, as: 'tags', through: { attributes: [] } },
        ],
    });
    if (!product) {
        throw (0, errorHandler_1.createError)('New Arrival not found', 404, 'NOT_FOUND');
    }
    const productData = product.toJSON();
    productData.tags = ((_a = productData.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
    productData.schema_overrides = product.schema_overrides; // Include for admin editing
    res.json({
        success: true,
        data: productData,
    });
}));
/**
 * Create New Arrival (admin)
 */
exports.create = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, slug, short_description, long_description, category, featured_image, status, priority, is_featured, meta_title, meta_description, meta_keywords, canonical_url, og_title, og_description, og_image, schema_overrides, specifications, technical_details, tags, // Array of tag names
     } = req.body;
    // Generate slug if not provided
    let finalSlug = slug || (0, seoUtils_1.generateSlug)(title);
    finalSlug = yield (0, slugUtils_1.ensureUniqueSlug)(finalSlug, models_1.Product);
    // Generate canonical URL if not provided
    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
    const finalCanonicalUrl = canonical_url || (0, seoUtils_1.generateCanonicalUrl)(finalSlug, 'product');
    // Auto-generate SEO defaults if not provided
    const metaDefaults = (0, seoUtils_1.generateMetaDefaults)(title, short_description);
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
    const sanitizedLongDescription = long_description
        ? (0, sanitize_html_1.default)(long_description, {
            allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img'],
            allowedAttributes: {
                a: ['href'],
                img: ['src', 'alt'],
            },
        })
        : null;
    // Create product
    const product = yield models_1.Product.create({
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
        yield setProductTags(product.id, tags);
    }
    // Fetch with relations
    const createdProduct = yield models_1.Product.findByPk(product.id, {
        include: [
            { model: models_1.ProductImage, as: 'images' },
            { model: models_1.Tag, as: 'tags', through: { attributes: [] } },
        ],
    });
    const productData = createdProduct === null || createdProduct === void 0 ? void 0 : createdProduct.toJSON();
    if (productData) {
        productData.tags = ((_a = productData.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
    }
    res.status(201).json({
        success: true,
        data: productData,
    });
}));
/**
 * Update New Arrival (admin)
 */
exports.update = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const updateData = req.body;
    const product = yield models_1.Product.findByPk(id);
    if (!product) {
        throw (0, errorHandler_1.createError)('New Arrival not found', 404, 'NOT_FOUND');
    }
    // Handle slug update - ensure uniqueness
    if (updateData.slug && updateData.slug !== product.slug) {
        updateData.slug = yield (0, slugUtils_1.ensureUniqueSlug)(updateData.slug, models_1.Product, product.id);
    }
    // Handle status change to published - validate SEO
    if (updateData.status === 'published' && product.status !== 'published') {
        const seoValidation = (0, seoUtils_1.validateSEOForPublish)({
            metaTitle: updateData.meta_title || product.meta_title,
            metaDescription: updateData.meta_description || product.meta_description,
            canonicalUrl: updateData.canonical_url || product.canonical_url,
            slug: updateData.slug || product.slug,
        });
        if (!seoValidation.canPublish) {
            throw (0, errorHandler_1.createError)(`Cannot publish: ${seoValidation.errors.join(', ')}`, 400, 'SEO_VALIDATION_FAILED');
        }
        if (!product.published_at) {
            updateData.published_at = new Date();
        }
    }
    // Sanitize HTML if long_description is being updated
    if (updateData.long_description) {
        updateData.long_description = (0, sanitize_html_1.default)(updateData.long_description, {
            allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img'],
            allowedAttributes: {
                a: ['href'],
                img: ['src', 'alt'],
            },
        });
    }
    // Handle tags update
    if (updateData.tags && Array.isArray(updateData.tags)) {
        yield setProductTags(product.id, updateData.tags);
        delete updateData.tags; // Remove from update data, handled separately
    }
    // Update product
    yield product.update(updateData);
    // Fetch updated product with relations
    const updatedProduct = yield models_1.Product.findByPk(id, {
        include: [
            { model: models_1.ProductImage, as: 'images' },
            { model: models_1.Tag, as: 'tags', through: { attributes: [] } },
        ],
    });
    const productData = updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.toJSON();
    if (productData) {
        productData.tags = ((_a = productData.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.name)) || [];
    }
    res.json({
        success: true,
        data: productData,
    });
}));
/**
 * Delete New Arrival (admin)
 */
exports.deleteProduct = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield models_1.Product.findByPk(id);
    if (!product) {
        throw (0, errorHandler_1.createError)('New Arrival not found', 404, 'NOT_FOUND');
    }
    yield product.destroy();
    res.json({
        success: true,
        message: 'New Arrival deleted successfully',
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
    const product = yield models_1.Product.findByPk(id);
    if (!product) {
        throw (0, errorHandler_1.createError)('New Arrival not found', 404, 'NOT_FOUND');
    }
    // Validate SEO before allowing publish
    if (status === 'published') {
        const seoValidation = (0, seoUtils_1.validateSEOForPublish)({
            metaTitle: product.meta_title,
            metaDescription: product.meta_description,
            canonicalUrl: product.canonical_url,
            slug: product.slug,
        });
        if (!seoValidation.canPublish) {
            throw (0, errorHandler_1.createError)(`Cannot publish: ${seoValidation.errors.join(', ')}`, 400, 'SEO_VALIDATION_FAILED');
        }
        if (!product.published_at) {
            product.published_at = new Date();
        }
    }
    yield product.update({ status, published_at: status === 'published' ? new Date() : product.published_at });
    res.json({
        success: true,
        data: product.toJSON(),
    });
}));
/**
 * Update priority (admin)
 */
exports.updatePriority = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { priority } = req.body;
    if (typeof priority !== 'number' || priority < 0) {
        throw (0, errorHandler_1.createError)('Priority must be a non-negative number', 400, 'INVALID_PRIORITY');
    }
    const product = yield models_1.Product.findByPk(id);
    if (!product) {
        throw (0, errorHandler_1.createError)('New Arrival not found', 404, 'NOT_FOUND');
    }
    yield product.update({ priority });
    res.json({
        success: true,
        data: product.toJSON(),
    });
}));
/**
 * Helper function: Set product tags (relational system)
 */
function setProductTags(productId, tagNames) {
    return __awaiter(this, void 0, void 0, function* () {
        // Remove existing tags
        yield models_1.ProductTag.destroy({ where: { product_id: productId } });
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
            // Link product to tag
            yield models_1.ProductTag.findOrCreate({
                where: { product_id: productId, tag_id: tag.id },
                defaults: {
                    product_id: productId,
                    tag_id: tag.id,
                },
            });
        }
    });
}
