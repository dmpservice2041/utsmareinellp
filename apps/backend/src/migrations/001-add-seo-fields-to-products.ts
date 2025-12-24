/**
 * Migration: Add comprehensive SEO fields to products table
 * Replaces schema_data with schema_overrides for safety
 */

import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('products', 'category', {
        type: DataTypes.STRING(100),
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'featured_image', {
        type: DataTypes.STRING(500),
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'status', {
        type: DataTypes.ENUM('draft', 'published', 'disabled'),
        defaultValue: 'draft',
        allowNull: false,
    });

    await queryInterface.addColumn('products', 'priority', {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    });

    await queryInterface.addColumn('products', 'is_featured', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    });

    await queryInterface.addColumn('products', 'published_at', {
        type: DataTypes.DATE,
        allowNull: true,
    });

    // SEO Fields
    await queryInterface.renameColumn('products', 'seo_title', 'meta_title');
    await queryInterface.renameColumn('products', 'seo_description', 'meta_description');

    await queryInterface.addColumn('products', 'meta_keywords', {
        type: DataTypes.STRING(500),
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'canonical_url', {
        type: DataTypes.STRING(500),
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'og_title', {
        type: DataTypes.STRING(255),
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'og_description', {
        type: DataTypes.TEXT,
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'og_image', {
        type: DataTypes.STRING(500),
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'schema_type', {
        type: DataTypes.STRING(50),
        defaultValue: 'Product',
        allowNull: false,
    });

    await queryInterface.addColumn('products', 'schema_overrides', {
        type: DataTypes.JSON,
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'schema_version', {
        type: DataTypes.STRING(10),
        defaultValue: '1.0',
        allowNull: false,
    });

    // Technical fields
    await queryInterface.addColumn('products', 'specifications', {
        type: DataTypes.JSON,
        allowNull: true,
    });

    await queryInterface.addColumn('products', 'technical_details', {
        type: DataTypes.TEXT,
        allowNull: true,
    });

    // Add indexes for performance
    await queryInterface.addIndex('products', ['status'], { name: 'idx_products_status' });
    await queryInterface.addIndex('products', ['priority'], { name: 'idx_products_priority' });
    await queryInterface.addIndex('products', ['is_featured'], { name: 'idx_products_featured' });
    await queryInterface.addIndex('products', ['category'], { name: 'idx_products_category' });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex('products', 'idx_products_category');
    await queryInterface.removeIndex('products', 'idx_products_featured');
    await queryInterface.removeIndex('products', 'idx_products_priority');
    await queryInterface.removeIndex('products', 'idx_products_status');

    await queryInterface.removeColumn('products', 'technical_details');
    await queryInterface.removeColumn('products', 'specifications');
    await queryInterface.removeColumn('products', 'schema_version');
    await queryInterface.removeColumn('products', 'schema_overrides');
    await queryInterface.removeColumn('products', 'schema_type');
    await queryInterface.removeColumn('products', 'og_image');
    await queryInterface.removeColumn('products', 'og_description');
    await queryInterface.removeColumn('products', 'og_title');
    await queryInterface.removeColumn('products', 'canonical_url');
    await queryInterface.removeColumn('products', 'meta_keywords');

    await queryInterface.renameColumn('products', 'meta_description', 'seo_description');
    await queryInterface.renameColumn('products', 'meta_title', 'seo_title');

    await queryInterface.removeColumn('products', 'published_at');
    await queryInterface.removeColumn('products', 'is_featured');
    await queryInterface.removeColumn('products', 'priority');
    await queryInterface.removeColumn('products', 'status');
    await queryInterface.removeColumn('products', 'featured_image');
    await queryInterface.removeColumn('products', 'category');
}
