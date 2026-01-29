"use strict";
/**
 * Migration: Migrate existing comma-separated tags to relational system
 * CRITICAL REFINEMENT: Maintains backward compatibility
 */
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
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const sequelize = queryInterface.sequelize;
        // Migrate product tags
        const products = yield sequelize.query('SELECT id, meta_keywords FROM products WHERE meta_keywords IS NOT NULL AND meta_keywords != ""', { type: sequelize_1.QueryTypes.SELECT });
        for (const product of products) {
            if (product.meta_keywords) {
                const tags = product.meta_keywords.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0);
                for (const tagName of tags) {
                    // Normalize tag name (lowercase, slugify)
                    const normalizedName = tagName.toLowerCase().trim();
                    const slug = normalizedName.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                    if (!slug)
                        continue;
                    // Find or create tag
                    const [tag] = yield sequelize.query(`SELECT id FROM tags WHERE slug = :slug`, {
                        replacements: { slug },
                        type: sequelize_1.QueryTypes.SELECT
                    });
                    let tagId;
                    if (tag && tag.id) {
                        tagId = tag.id;
                        // Increment usage count
                        yield sequelize.query(`UPDATE tags SET usage_count = usage_count + 1 WHERE id = :tagId`, { replacements: { tagId }, type: sequelize_1.QueryTypes.UPDATE });
                    }
                    else {
                        // Create new tag
                        const [result] = yield sequelize.query(`INSERT INTO tags (name, slug, usage_count, created_at, updated_at) 
                         VALUES (:name, :slug, 1, NOW(), NOW())`, {
                            replacements: { name: normalizedName, slug },
                            type: sequelize_1.QueryTypes.INSERT
                        });
                        tagId = result;
                    }
                    // Link product to tag (ignore if already exists)
                    yield sequelize.query(`INSERT IGNORE INTO product_tags (product_id, tag_id, created_at) 
                     VALUES (:productId, :tagId, NOW())`, {
                        replacements: { productId: product.id, tagId },
                        type: sequelize_1.QueryTypes.INSERT
                    });
                }
            }
        }
        // Migrate blog tags (from tags column if it exists, or from meta_keywords)
        const blogs = yield sequelize.query('SELECT id, tags, meta_keywords FROM blogs WHERE (tags IS NOT NULL AND tags != "") OR (meta_keywords IS NOT NULL AND meta_keywords != "")', { type: sequelize_1.QueryTypes.SELECT });
        for (const blog of blogs) {
            const tagString = blog.tags || blog.meta_keywords || '';
            if (tagString) {
                const tags = tagString.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0);
                for (const tagName of tags) {
                    const normalizedName = tagName.toLowerCase().trim();
                    const slug = normalizedName.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                    if (!slug)
                        continue;
                    const [tag] = yield sequelize.query(`SELECT id FROM tags WHERE slug = :slug`, {
                        replacements: { slug },
                        type: sequelize_1.QueryTypes.SELECT
                    });
                    let tagId;
                    if (tag && tag.id) {
                        tagId = tag.id;
                        yield sequelize.query(`UPDATE tags SET usage_count = usage_count + 1 WHERE id = :tagId`, { replacements: { tagId }, type: sequelize_1.QueryTypes.UPDATE });
                    }
                    else {
                        const [result] = yield sequelize.query(`INSERT INTO tags (name, slug, usage_count, created_at, updated_at) 
                         VALUES (:name, :slug, 1, NOW(), NOW())`, {
                            replacements: { name: normalizedName, slug },
                            type: sequelize_1.QueryTypes.INSERT
                        });
                        tagId = result;
                    }
                    yield sequelize.query(`INSERT IGNORE INTO blog_tags (blog_id, tag_id, created_at) 
                     VALUES (:blogId, :tagId, NOW())`, {
                        replacements: { blogId: blog.id, tagId },
                        type: sequelize_1.QueryTypes.INSERT
                    });
                }
            }
        }
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        // This migration is data-only, no schema changes to revert
        // Data migration reversal would require reconstructing comma-separated tags
        // which is complex and not recommended. Keep relational tags.
        console.log('Migration 007 down: Data migration reversal not implemented. Relational tags preserved.');
    });
}
