/**
 * Migration: Add comprehensive SEO fields to blogs table
 * Replaces schema_data with schema_overrides for safety
 */

import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('blogs', 'excerpt', {
        type: DataTypes.TEXT,
        allowNull: true,
    });

    await queryInterface.renameColumn('blogs', 'thumbnail', 'featured_image');

    await queryInterface.addColumn('blogs', 'author', {
        type: DataTypes.STRING(100),
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'category', {
        type: DataTypes.STRING(100),
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'status', {
        type: DataTypes.ENUM('draft', 'published', 'disabled'),
        defaultValue: 'draft',
        allowNull: false,
    });

    // SEO Fields
    await queryInterface.renameColumn('blogs', 'seo_title', 'meta_title');
    await queryInterface.renameColumn('blogs', 'seo_description', 'meta_description');

    await queryInterface.addColumn('blogs', 'focus_keyword', {
        type: DataTypes.STRING(100),
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'meta_keywords', {
        type: DataTypes.STRING(500),
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'canonical_url', {
        type: DataTypes.STRING(500),
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'og_title', {
        type: DataTypes.STRING(255),
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'og_description', {
        type: DataTypes.TEXT,
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'og_image', {
        type: DataTypes.STRING(500),
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'schema_type', {
        type: DataTypes.STRING(50),
        defaultValue: 'BlogPosting',
        allowNull: false,
    });

    await queryInterface.addColumn('blogs', 'schema_overrides', {
        type: DataTypes.JSON,
        allowNull: true,
    });

    await queryInterface.addColumn('blogs', 'schema_version', {
        type: DataTypes.STRING(10),
        defaultValue: '1.0',
        allowNull: false,
    });

    // Replace is_active with status (keep is_active for backward compatibility during migration)
    // Status enum already added above

    // Add indexes for performance
    await queryInterface.addIndex('blogs', ['status'], { name: 'idx_blogs_status' });
    await queryInterface.addIndex('blogs', ['published_at'], { name: 'idx_blogs_published_at' });
    await queryInterface.addIndex('blogs', ['category'], { name: 'idx_blogs_category' });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex('blogs', 'idx_blogs_category');
    await queryInterface.removeIndex('blogs', 'idx_blogs_published_at');
    await queryInterface.removeIndex('blogs', 'idx_blogs_status');

    await queryInterface.removeColumn('blogs', 'schema_version');
    await queryInterface.removeColumn('blogs', 'schema_overrides');
    await queryInterface.removeColumn('blogs', 'schema_type');
    await queryInterface.removeColumn('blogs', 'og_image');
    await queryInterface.removeColumn('blogs', 'og_description');
    await queryInterface.removeColumn('blogs', 'og_title');
    await queryInterface.removeColumn('blogs', 'canonical_url');
    await queryInterface.removeColumn('blogs', 'meta_keywords');
    await queryInterface.removeColumn('blogs', 'focus_keyword');
    await queryInterface.removeColumn('blogs', 'status');
    await queryInterface.removeColumn('blogs', 'category');
    await queryInterface.removeColumn('blogs', 'author');

    await queryInterface.renameColumn('blogs', 'featured_image', 'thumbnail');

    await queryInterface.removeColumn('blogs', 'excerpt');

    await queryInterface.renameColumn('blogs', 'meta_description', 'seo_description');
    await queryInterface.renameColumn('blogs', 'meta_title', 'seo_title');
}
