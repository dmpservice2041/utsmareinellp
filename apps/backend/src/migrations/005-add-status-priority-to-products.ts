/**
 * Migration: Add status and priority fields to products (if not already added)
 * This is a safety migration in case 001 didn't run
 */

import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    // Check if status column exists, if not add it
    const tableDescription = await queryInterface.describeTable('products');
    
    if (!tableDescription.status) {
        await queryInterface.addColumn('products', 'status', {
            type: DataTypes.ENUM('draft', 'published', 'disabled'),
            defaultValue: 'draft',
            allowNull: false,
        });
    }

    if (!tableDescription.priority) {
        await queryInterface.addColumn('products', 'priority', {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        });
    }

    if (!tableDescription.is_featured) {
        await queryInterface.addColumn('products', 'is_featured', {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        });
    }
}

export async function down(queryInterface: QueryInterface) {
    const tableDescription = await queryInterface.describeTable('products');
    
    if (tableDescription.is_featured) {
        await queryInterface.removeColumn('products', 'is_featured');
    }
    if (tableDescription.priority) {
        await queryInterface.removeColumn('products', 'priority');
    }
    if (tableDescription.status) {
        await queryInterface.removeColumn('products', 'status');
    }
}
