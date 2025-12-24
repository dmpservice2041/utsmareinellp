/**
 * Migration: Add 2FA and password reset fields to users table
 */

import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('users', 'two_factor_secret', {
        type: DataTypes.STRING(255),
        allowNull: true,
    });

    await queryInterface.addColumn('users', 'two_factor_enabled', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    });

    await queryInterface.addColumn('users', 'password_reset_otp', {
        type: DataTypes.STRING(10),
        allowNull: true,
    });

    await queryInterface.addColumn('users', 'password_reset_expiry', {
        type: DataTypes.DATE,
        allowNull: true,
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('users', 'password_reset_expiry');
    await queryInterface.removeColumn('users', 'password_reset_otp');
    await queryInterface.removeColumn('users', 'two_factor_enabled');
    await queryInterface.removeColumn('users', 'two_factor_secret');
}

