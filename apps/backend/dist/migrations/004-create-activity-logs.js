"use strict";
/**
 * Migration: Create activity logs table for audit trail
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
        yield queryInterface.createTable('activity_logs', {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            action: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            entity_type: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            entity_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            changes: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: true,
            },
            ip_address: {
                type: sequelize_1.DataTypes.STRING(45),
                allowNull: true,
            },
            user_agent: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: database_1.default.literal('CURRENT_TIMESTAMP'),
            },
        });
        // Add indexes for performance
        yield queryInterface.addIndex('activity_logs', ['user_id'], { name: 'idx_activity_logs_user_id' });
        yield queryInterface.addIndex('activity_logs', ['entity_type', 'entity_id'], { name: 'idx_activity_logs_entity' });
        yield queryInterface.addIndex('activity_logs', ['action'], { name: 'idx_activity_logs_action' });
        yield queryInterface.addIndex('activity_logs', ['created_at'], { name: 'idx_activity_logs_created_at' });
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeIndex('activity_logs', 'idx_activity_logs_created_at');
        yield queryInterface.removeIndex('activity_logs', 'idx_activity_logs_action');
        yield queryInterface.removeIndex('activity_logs', 'idx_activity_logs_entity');
        yield queryInterface.removeIndex('activity_logs', 'idx_activity_logs_user_id');
        yield queryInterface.dropTable('activity_logs');
    });
}
