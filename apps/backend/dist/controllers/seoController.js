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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.generate = exports.validate = void 0;
const models_1 = require("../models");
const seoUtils_1 = require("../utils/seoUtils");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * Validate SEO fields (admin)
 */
exports.validate = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { entityType } = req.params;
    const id = req.params.id;
    let entity = null;
    if (entityType === 'product') {
        entity = yield models_1.Product.findByPk(id);
    }
    else if (entityType === 'blog') {
        entity = yield models_1.Blog.findByPk(id);
    }
    else {
        throw (0, errorHandler_1.createError)('Invalid entity type', 400, 'INVALID_ENTITY_TYPE');
    }
    if (!entity) {
        throw (0, errorHandler_1.createError)(`${entityType} not found`, 404, 'NOT_FOUND');
    }
    const validation = (0, seoUtils_1.validateSEO)({
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
}));
/**
 * Auto-generate SEO fields (admin)
 */
exports.generate = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { entityType } = req.params;
    const id = req.params.id;
    let entity = null;
    if (entityType === 'product') {
        entity = yield models_1.Product.findByPk(id);
    }
    else if (entityType === 'blog') {
        entity = yield models_1.Blog.findByPk(id);
    }
    else {
        throw (0, errorHandler_1.createError)('Invalid entity type', 400, 'INVALID_ENTITY_TYPE');
    }
    if (!entity) {
        throw (0, errorHandler_1.createError)(`${entityType} not found`, 404, 'NOT_FOUND');
    }
    // Generate defaults
    const metaDefaults = (0, seoUtils_1.generateMetaDefaults)(entity.title, entityType === 'product'
        ? (entity.short_description || undefined)
        : (entity.excerpt || undefined));
    // Update entity with generated defaults (only if fields are empty)
    const updateData = {};
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
        yield entity.update(updateData);
    }
    res.json({
        success: true,
        data: {
            message: 'SEO fields generated successfully',
            generated: updateData,
            entity: entity.toJSON(),
        },
    });
}));
/**
 * Validate JSON-LD schema (admin)
 */
exports.validateSchema = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { entityType } = req.params;
    const id = req.params.id;
    let entity = null;
    if (entityType === 'product') {
        entity = yield models_1.Product.findByPk(id);
    }
    else if (entityType === 'blog') {
        entity = yield models_1.Blog.findByPk(id);
    }
    else {
        throw (0, errorHandler_1.createError)('Invalid entity type', 400, 'INVALID_ENTITY_TYPE');
    }
    if (!entity) {
        throw (0, errorHandler_1.createError)(`${entityType} not found`, 404, 'NOT_FOUND');
    }
    // Generate schema
    let schema;
    if (entityType === 'product') {
        schema = (0, seoUtils_1.generateProductSchema)(entity, entity.schema_overrides);
    }
    else {
        schema = (0, seoUtils_1.generateBlogSchema)(entity, entity.schema_overrides);
    }
    // Validate schema
    const validation = (0, seoUtils_1.validateSchemaJSON)(schema, entity.schema_type);
    res.json({
        success: true,
        data: {
            valid: validation.valid,
            errors: validation.errors,
            schema,
        },
    });
}));
