"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class BlogTag extends sequelize_1.Model {
}
BlogTag.init({
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
}, {
    sequelize: database_1.default,
    tableName: 'blog_tags',
    timestamps: true,
    updatedAt: false,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['blog_id', 'tag_id'],
        },
    ],
});
exports.default = BlogTag;
