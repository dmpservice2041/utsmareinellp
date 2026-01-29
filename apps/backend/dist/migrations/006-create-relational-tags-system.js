"use strict";
/**
 * Migration: Create relational tags system (Tag, ProductTag, BlogTag tables)
 * CRITICAL REFINEMENT: Replaces comma-separated tags
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create tags table
        yield queryInterface.createTable('tags', {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            slug: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            usage_count: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: database_1.default.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: database_1.default.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        });
        // Create product_tags junction table
        yield queryInterface.createTable('product_tags', {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            product_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            tag_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'tags',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: database_1.default.literal('CURRENT_TIMESTAMP'),
            },
        });
        // Create blog_tags junction table
        yield queryInterface.createTable('blog_tags', {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            blog_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'blogs',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            tag_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'tags',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: database_1.default.literal('CURRENT_TIMESTAMP'),
            },
        });
        // Add unique constraints
        yield queryInterface.addIndex('tags', ['name'], {
            unique: true,
            name: 'idx_tags_name_unique'
        });
        yield queryInterface.addIndex('tags', ['slug'], {
            unique: true,
            name: 'idx_tags_slug_unique'
        });
        yield queryInterface.addIndex('product_tags', ['product_id', 'tag_id'], {
            unique: true,
            name: 'idx_product_tags_unique'
        });
        yield queryInterface.addIndex('blog_tags', ['blog_id', 'tag_id'], {
            unique: true,
            name: 'idx_blog_tags_unique'
        });
        // Add indexes for performance
        yield queryInterface.addIndex('tags', ['slug'], { name: 'idx_tags_slug' });
        yield queryInterface.addIndex('product_tags', ['product_id'], { name: 'idx_product_tags_product_id' });
        yield queryInterface.addIndex('product_tags', ['tag_id'], { name: 'idx_product_tags_tag_id' });
        yield queryInterface.addIndex('blog_tags', ['blog_id'], { name: 'idx_blog_tags_blog_id' });
        yield queryInterface.addIndex('blog_tags', ['tag_id'], { name: 'idx_blog_tags_tag_id' });
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeIndex('blog_tags', 'idx_blog_tags_tag_id');
        yield queryInterface.removeIndex('blog_tags', 'idx_blog_tags_blog_id');
        yield queryInterface.removeIndex('product_tags', 'idx_product_tags_tag_id');
        yield queryInterface.removeIndex('product_tags', 'idx_product_tags_product_id');
        yield queryInterface.removeIndex('tags', 'idx_tags_slug');
        yield queryInterface.removeIndex('blog_tags', 'idx_blog_tags_unique');
        yield queryInterface.removeIndex('product_tags', 'idx_product_tags_unique');
        yield queryInterface.removeIndex('tags', 'idx_tags_slug_unique');
        yield queryInterface.removeIndex('tags', 'idx_tags_name_unique');
        yield queryInterface.dropTable('blog_tags');
        yield queryInterface.dropTable('product_tags');
        yield queryInterface.dropTable('tags');
    });
}
