"use strict";
/**
 * Migration: Add status and priority fields to products (if not already added)
 * This is a safety migration in case 001 didn't run
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
        // Check if status column exists, if not add it
        const tableDescription = yield queryInterface.describeTable('products');
        if (!tableDescription.status) {
            yield queryInterface.addColumn('products', 'status', {
                type: sequelize_1.DataTypes.ENUM('draft', 'published', 'disabled'),
                defaultValue: 'draft',
                allowNull: false,
            });
        }
        if (!tableDescription.priority) {
            yield queryInterface.addColumn('products', 'priority', {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            });
        }
        if (!tableDescription.is_featured) {
            yield queryInterface.addColumn('products', 'is_featured', {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            });
        }
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableDescription = yield queryInterface.describeTable('products');
        if (tableDescription.is_featured) {
            yield queryInterface.removeColumn('products', 'is_featured');
        }
        if (tableDescription.priority) {
            yield queryInterface.removeColumn('products', 'priority');
        }
        if (tableDescription.status) {
            yield queryInterface.removeColumn('products', 'status');
        }
    });
}
