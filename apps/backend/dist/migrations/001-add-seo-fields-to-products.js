"use strict";
/**
 * Migration: Add comprehensive SEO fields to products table
 * Replaces schema_data with schema_overrides for safety
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
        yield queryInterface.addColumn('products', 'category', {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'featured_image', {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'status', {
            type: sequelize_1.DataTypes.ENUM('draft', 'published', 'disabled'),
            defaultValue: 'draft',
            allowNull: false,
        });
        yield queryInterface.addColumn('products', 'priority', {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        });
        yield queryInterface.addColumn('products', 'is_featured', {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        });
        yield queryInterface.addColumn('products', 'published_at', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        });
        // SEO Fields
        yield queryInterface.renameColumn('products', 'seo_title', 'meta_title');
        yield queryInterface.renameColumn('products', 'seo_description', 'meta_description');
        yield queryInterface.addColumn('products', 'meta_keywords', {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'canonical_url', {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'og_title', {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'og_description', {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'og_image', {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'schema_type', {
            type: sequelize_1.DataTypes.STRING(50),
            defaultValue: 'Product',
            allowNull: false,
        });
        yield queryInterface.addColumn('products', 'schema_overrides', {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'schema_version', {
            type: sequelize_1.DataTypes.STRING(10),
            defaultValue: '1.0',
            allowNull: false,
        });
        // Technical fields
        yield queryInterface.addColumn('products', 'specifications', {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true,
        });
        yield queryInterface.addColumn('products', 'technical_details', {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        });
        // Add indexes for performance
        yield queryInterface.addIndex('products', ['status'], { name: 'idx_products_status' });
        yield queryInterface.addIndex('products', ['priority'], { name: 'idx_products_priority' });
        yield queryInterface.addIndex('products', ['is_featured'], { name: 'idx_products_featured' });
        yield queryInterface.addIndex('products', ['category'], { name: 'idx_products_category' });
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeIndex('products', 'idx_products_category');
        yield queryInterface.removeIndex('products', 'idx_products_featured');
        yield queryInterface.removeIndex('products', 'idx_products_priority');
        yield queryInterface.removeIndex('products', 'idx_products_status');
        yield queryInterface.removeColumn('products', 'technical_details');
        yield queryInterface.removeColumn('products', 'specifications');
        yield queryInterface.removeColumn('products', 'schema_version');
        yield queryInterface.removeColumn('products', 'schema_overrides');
        yield queryInterface.removeColumn('products', 'schema_type');
        yield queryInterface.removeColumn('products', 'og_image');
        yield queryInterface.removeColumn('products', 'og_description');
        yield queryInterface.removeColumn('products', 'og_title');
        yield queryInterface.removeColumn('products', 'canonical_url');
        yield queryInterface.removeColumn('products', 'meta_keywords');
        yield queryInterface.renameColumn('products', 'meta_description', 'seo_description');
        yield queryInterface.renameColumn('products', 'meta_title', 'seo_title');
        yield queryInterface.removeColumn('products', 'published_at');
        yield queryInterface.removeColumn('products', 'is_featured');
        yield queryInterface.removeColumn('products', 'priority');
        yield queryInterface.removeColumn('products', 'status');
        yield queryInterface.removeColumn('products', 'featured_image');
        yield queryInterface.removeColumn('products', 'category');
    });
}
