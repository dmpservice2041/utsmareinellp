/**
 * Migration: Create relational tags system (Tag, ProductTag, BlogTag tables)
 * CRITICAL REFINEMENT: Replaces comma-separated tags
 */

import { QueryInterface, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export async function up(queryInterface: QueryInterface) {
    // Create tags table
    await queryInterface.createTable('tags', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        usage_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
    });

    // Create product_tags junction table
    await queryInterface.createTable('product_tags', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        tag_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tags',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });

    // Create blog_tags junction table
    await queryInterface.createTable('blog_tags', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        blog_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'blogs',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        tag_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tags',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });

    // Add unique constraints
    await queryInterface.addIndex('tags', ['name'], { 
        unique: true, 
        name: 'idx_tags_name_unique' 
    });
    await queryInterface.addIndex('tags', ['slug'], { 
        unique: true, 
        name: 'idx_tags_slug_unique' 
    });
    await queryInterface.addIndex('product_tags', ['product_id', 'tag_id'], { 
        unique: true, 
        name: 'idx_product_tags_unique' 
    });
    await queryInterface.addIndex('blog_tags', ['blog_id', 'tag_id'], { 
        unique: true, 
        name: 'idx_blog_tags_unique' 
    });

    // Add indexes for performance
    await queryInterface.addIndex('tags', ['slug'], { name: 'idx_tags_slug' });
    await queryInterface.addIndex('product_tags', ['product_id'], { name: 'idx_product_tags_product_id' });
    await queryInterface.addIndex('product_tags', ['tag_id'], { name: 'idx_product_tags_tag_id' });
    await queryInterface.addIndex('blog_tags', ['blog_id'], { name: 'idx_blog_tags_blog_id' });
    await queryInterface.addIndex('blog_tags', ['tag_id'], { name: 'idx_blog_tags_tag_id' });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex('blog_tags', 'idx_blog_tags_tag_id');
    await queryInterface.removeIndex('blog_tags', 'idx_blog_tags_blog_id');
    await queryInterface.removeIndex('product_tags', 'idx_product_tags_tag_id');
    await queryInterface.removeIndex('product_tags', 'idx_product_tags_product_id');
    await queryInterface.removeIndex('tags', 'idx_tags_slug');
    await queryInterface.removeIndex('blog_tags', 'idx_blog_tags_unique');
    await queryInterface.removeIndex('product_tags', 'idx_product_tags_unique');
    await queryInterface.removeIndex('tags', 'idx_tags_slug_unique');
    await queryInterface.removeIndex('tags', 'idx_tags_name_unique');
    
    await queryInterface.dropTable('blog_tags');
    await queryInterface.dropTable('product_tags');
    await queryInterface.dropTable('tags');
}
