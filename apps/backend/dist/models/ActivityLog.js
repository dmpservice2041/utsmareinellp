"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class ActivityLog extends sequelize_1.Model {
}
ActivityLog.init({
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
}, {
    sequelize: database_1.default,
    tableName: 'activity_logs',
    timestamps: true,
    updatedAt: false,
    underscored: true,
    indexes: [
        { fields: ['user_id'] },
        { fields: ['entity_type', 'entity_id'] },
        { fields: ['created_at'] },
    ],
});
exports.default = ActivityLog;
