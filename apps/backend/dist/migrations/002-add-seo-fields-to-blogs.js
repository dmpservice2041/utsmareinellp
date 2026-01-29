"use strict";
/**
 * Migration: Add comprehensive SEO fields to blogs table
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
        yield queryInterface.addColumn('blogs', 'excerpt', {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        });
        yield queryInterface.renameColumn('blogs', 'thumbnail', 'featured_image');
        yield queryInterface.addColumn('blogs', 'author', {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'category', {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'status', {
            type: sequelize_1.DataTypes.ENUM('draft', 'published', 'disabled'),
            defaultValue: 'draft',
            allowNull: false,
        });
        // SEO Fields
        yield queryInterface.renameColumn('blogs', 'seo_title', 'meta_title');
        yield queryInterface.renameColumn('blogs', 'seo_description', 'meta_description');
        yield queryInterface.addColumn('blogs', 'focus_keyword', {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'meta_keywords', {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'canonical_url', {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'og_title', {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'og_description', {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'og_image', {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'schema_type', {
            type: sequelize_1.DataTypes.STRING(50),
            defaultValue: 'BlogPosting',
            allowNull: false,
        });
        yield queryInterface.addColumn('blogs', 'schema_overrides', {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true,
        });
        yield queryInterface.addColumn('blogs', 'schema_version', {
            type: sequelize_1.DataTypes.STRING(10),
            defaultValue: '1.0',
            allowNull: false,
        });
        // Replace is_active with status (keep is_active for backward compatibility during migration)
        // Status enum already added above
        // Add indexes for performance
        yield queryInterface.addIndex('blogs', ['status'], { name: 'idx_blogs_status' });
        yield queryInterface.addIndex('blogs', ['published_at'], { name: 'idx_blogs_published_at' });
        yield queryInterface.addIndex('blogs', ['category'], { name: 'idx_blogs_category' });
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeIndex('blogs', 'idx_blogs_category');
        yield queryInterface.removeIndex('blogs', 'idx_blogs_published_at');
        yield queryInterface.removeIndex('blogs', 'idx_blogs_status');
        yield queryInterface.removeColumn('blogs', 'schema_version');
        yield queryInterface.removeColumn('blogs', 'schema_overrides');
        yield queryInterface.removeColumn('blogs', 'schema_type');
        yield queryInterface.removeColumn('blogs', 'og_image');
        yield queryInterface.removeColumn('blogs', 'og_description');
        yield queryInterface.removeColumn('blogs', 'og_title');
        yield queryInterface.removeColumn('blogs', 'canonical_url');
        yield queryInterface.removeColumn('blogs', 'meta_keywords');
        yield queryInterface.removeColumn('blogs', 'focus_keyword');
        yield queryInterface.removeColumn('blogs', 'status');
        yield queryInterface.removeColumn('blogs', 'category');
        yield queryInterface.removeColumn('blogs', 'author');
        yield queryInterface.renameColumn('blogs', 'featured_image', 'thumbnail');
        yield queryInterface.removeColumn('blogs', 'excerpt');
        yield queryInterface.renameColumn('blogs', 'meta_description', 'seo_description');
        yield queryInterface.renameColumn('blogs', 'meta_title', 'seo_title');
    });
}
