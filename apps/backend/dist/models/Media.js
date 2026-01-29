"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Media extends sequelize_1.Model {
    // Instance methods
    getOriginalUrl() {
        return `/uploads/original/${this.filename}`;
    }
    getOptimizedUrl() {
        if (this.optimized_path) {
            // Extract filename from path (handles both relative and absolute paths)
            const pathParts = this.optimized_path.replace(/\\/g, '/').split('/');
            const filename = pathParts[pathParts.length - 1];
            return `/uploads/optimized/${filename}`;
        }
        return this.getOriginalUrl();
    }
    getThumbnailUrl() {
        if (this.thumbnail_path) {
            // Extract filename from path (handles both relative and absolute paths)
            const pathParts = this.thumbnail_path.replace(/\\/g, '/').split('/');
            const filename = pathParts[pathParts.length - 1];
            return `/uploads/thumbnails/${filename}`;
        }
        return this.getOptimizedUrl();
    }
}
Media.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    filename: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    original_filename: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    file_path: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
    },
    optimized_path: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    thumbnail_path: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    file_size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    optimized_size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    thumbnail_size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    mime_type: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    width: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    height: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    optimized_width: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    optimized_height: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    thumbnail_width: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    thumbnail_height: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    processing_status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
        allowNull: false,
    },
    alt_text: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    caption: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    uploaded_by: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
}, {
    sequelize: database_1.default,
    tableName: 'media',
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ['created_at'] },
        { fields: ['original_filename'] },
        { fields: ['mime_type'] },
    ],
});
exports.default = Media;
