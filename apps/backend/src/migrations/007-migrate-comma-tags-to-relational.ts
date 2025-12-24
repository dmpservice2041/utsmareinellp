/**
 * Migration: Migrate existing comma-separated tags to relational system
 * CRITICAL REFINEMENT: Maintains backward compatibility
 */

import { QueryInterface, QueryTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    const sequelize = queryInterface.sequelize;

    // Migrate product tags
    const products: any[] = await sequelize.query(
        'SELECT id, meta_keywords FROM products WHERE meta_keywords IS NOT NULL AND meta_keywords != ""',
        { type: QueryTypes.SELECT }
    );

    for (const product of products) {
        if (product.meta_keywords) {
            const tags = product.meta_keywords.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
            
            for (const tagName of tags) {
                // Normalize tag name (lowercase, slugify)
                const normalizedName = tagName.toLowerCase().trim();
                const slug = normalizedName.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                
                if (!slug) continue;

                // Find or create tag
                const [tag]: any[] = await sequelize.query(
                    `SELECT id FROM tags WHERE slug = :slug`,
                    {
                        replacements: { slug },
                        type: QueryTypes.SELECT
                    }
                );

                let tagId;
                if (tag && tag.id) {
                    tagId = tag.id;
                    // Increment usage count
                    await sequelize.query(
                        `UPDATE tags SET usage_count = usage_count + 1 WHERE id = :tagId`,
                        { replacements: { tagId }, type: QueryTypes.UPDATE }
                    );
                } else {
                    // Create new tag
                    const [result]: any = await sequelize.query(
                        `INSERT INTO tags (name, slug, usage_count, created_at, updated_at) 
                         VALUES (:name, :slug, 1, NOW(), NOW())`,
                        {
                            replacements: { name: normalizedName, slug },
                            type: QueryTypes.INSERT
                        }
                    );
                    tagId = result;
                }

                // Link product to tag (ignore if already exists)
                await sequelize.query(
                    `INSERT IGNORE INTO product_tags (product_id, tag_id, created_at) 
                     VALUES (:productId, :tagId, NOW())`,
                    {
                        replacements: { productId: product.id, tagId },
                        type: QueryTypes.INSERT
                    }
                );
            }
        }
    }

    // Migrate blog tags (from tags column if it exists, or from meta_keywords)
    const blogs: any[] = await sequelize.query(
        'SELECT id, tags, meta_keywords FROM blogs WHERE (tags IS NOT NULL AND tags != "") OR (meta_keywords IS NOT NULL AND meta_keywords != "")',
        { type: QueryTypes.SELECT }
    );

    for (const blog of blogs) {
        const tagString = blog.tags || blog.meta_keywords || '';
        if (tagString) {
            const tags = tagString.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
            
            for (const tagName of tags) {
                const normalizedName = tagName.toLowerCase().trim();
                const slug = normalizedName.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                
                if (!slug) continue;

                const [tag]: any[] = await sequelize.query(
                    `SELECT id FROM tags WHERE slug = :slug`,
                    {
                        replacements: { slug },
                        type: QueryTypes.SELECT
                    }
                );

                let tagId;
                if (tag && tag.id) {
                    tagId = tag.id;
                    await sequelize.query(
                        `UPDATE tags SET usage_count = usage_count + 1 WHERE id = :tagId`,
                        { replacements: { tagId }, type: QueryTypes.UPDATE }
                    );
                } else {
                    const [result]: any = await sequelize.query(
                        `INSERT INTO tags (name, slug, usage_count, created_at, updated_at) 
                         VALUES (:name, :slug, 1, NOW(), NOW())`,
                        {
                            replacements: { name: normalizedName, slug },
                            type: QueryTypes.INSERT
                        }
                    );
                    tagId = result;
                }

                await sequelize.query(
                    `INSERT IGNORE INTO blog_tags (blog_id, tag_id, created_at) 
                     VALUES (:blogId, :tagId, NOW())`,
                    {
                        replacements: { blogId: blog.id, tagId },
                        type: QueryTypes.INSERT
                    }
                );
            }
        }
    }
}

export async function down(queryInterface: QueryInterface) {
    // This migration is data-only, no schema changes to revert
    // Data migration reversal would require reconstructing comma-separated tags
    // which is complex and not recommended. Keep relational tags.
    console.log('Migration 007 down: Data migration reversal not implemented. Relational tags preserved.');
}
