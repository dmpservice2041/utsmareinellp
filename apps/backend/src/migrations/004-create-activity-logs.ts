/**
 * Migration: Create activity logs table for audit trail
 */

import { QueryInterface, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('activity_logs', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
        action: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        entity_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        entity_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        changes: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        ip_address: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        user_agent: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });

    // Add indexes for performance
    await queryInterface.addIndex('activity_logs', ['user_id'], { name: 'idx_activity_logs_user_id' });
    await queryInterface.addIndex('activity_logs', ['entity_type', 'entity_id'], { name: 'idx_activity_logs_entity' });
    await queryInterface.addIndex('activity_logs', ['action'], { name: 'idx_activity_logs_action' });
    await queryInterface.addIndex('activity_logs', ['created_at'], { name: 'idx_activity_logs_created_at' });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex('activity_logs', 'idx_activity_logs_created_at');
    await queryInterface.removeIndex('activity_logs', 'idx_activity_logs_action');
    await queryInterface.removeIndex('activity_logs', 'idx_activity_logs_entity');
    await queryInterface.removeIndex('activity_logs', 'idx_activity_logs_user_id');
    await queryInterface.dropTable('activity_logs');
}
