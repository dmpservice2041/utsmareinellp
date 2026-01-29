"use strict";
/**
 * Migration: Create media library table with optimized and thumbnail paths
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
        yield queryInterface.createTable('media', {
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
        // Add indexes
        yield queryInterface.addIndex('media', ['uploaded_by'], { name: 'idx_media_uploaded_by' });
        yield queryInterface.addIndex('media', ['processing_status'], { name: 'idx_media_processing_status' });
        yield queryInterface.addIndex('media', ['mime_type'], { name: 'idx_media_mime_type' });
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeIndex('media', 'idx_media_mime_type');
        yield queryInterface.removeIndex('media', 'idx_media_processing_status');
        yield queryInterface.removeIndex('media', 'idx_media_uploaded_by');
        yield queryInterface.dropTable('media');
    });
}
