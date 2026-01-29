"use strict";
/**
 * Migration: Add 2FA and password reset fields to users table
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
        yield queryInterface.addColumn('users', 'two_factor_secret', {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true,
        });
        yield queryInterface.addColumn('users', 'two_factor_enabled', {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        });
        yield queryInterface.addColumn('users', 'password_reset_otp', {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: true,
        });
        yield queryInterface.addColumn('users', 'password_reset_expiry', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        });
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn('users', 'password_reset_expiry');
        yield queryInterface.removeColumn('users', 'password_reset_otp');
        yield queryInterface.removeColumn('users', 'two_factor_enabled');
        yield queryInterface.removeColumn('users', 'two_factor_secret');
    });
}
