/**
 * Migration: Create media library table with optimized and thumbnail paths
 */

import { QueryInterface, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('media', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        filename: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        original_filename: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        file_path: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        optimized_path: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        thumbnail_path: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        file_size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        optimized_size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        thumbnail_size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        mime_type: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        optimized_width: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        optimized_height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        thumbnail_width: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        thumbnail_height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        processing_status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            defaultValue: 'pending',
            allowNull: false,
        },
        alt_text: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        uploaded_by: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'SET NULL',
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

    // Add indexes
    await queryInterface.addIndex('media', ['uploaded_by'], { name: 'idx_media_uploaded_by' });
    await queryInterface.addIndex('media', ['processing_status'], { name: 'idx_media_processing_status' });
    await queryInterface.addIndex('media', ['mime_type'], { name: 'idx_media_mime_type' });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex('media', 'idx_media_mime_type');
    await queryInterface.removeIndex('media', 'idx_media_processing_status');
    await queryInterface.removeIndex('media', 'idx_media_uploaded_by');
    await queryInterface.dropTable('media');
}
