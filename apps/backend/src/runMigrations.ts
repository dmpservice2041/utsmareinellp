/**
 * Migration Runner Script
 * 
 * This script runs all migrations in order.
 * Run with: npx ts-node src/runMigrations.ts
 */

import sequelize from './config/database';
import { QueryInterface } from 'sequelize';

async function runMigrations() {
    try {
        console.log('Starting migrations...');

        // Import all migrations
        const migration1 = require('./migrations/001-add-seo-fields-to-products');
        const migration2 = require('./migrations/002-add-seo-fields-to-blogs');
        const migration3 = require('./migrations/003-create-media-library');
        const migration4 = require('./migrations/004-create-activity-logs');
        const migration5 = require('./migrations/005-add-status-priority-to-products');
        const migration6 = require('./migrations/006-create-relational-tags-system');
        const migration7 = require('./migrations/007-migrate-comma-tags-to-relational');
        const migration8 = require('./migrations/008-add-2fa-and-password-reset-to-users');

        const queryInterface = sequelize.getQueryInterface();

        // Run migrations in order
        console.log('Running migration 001: Add SEO fields to products...');
        await migration1.up(queryInterface, sequelize);

        console.log('Running migration 002: Add SEO fields to blogs...');
        await migration2.up(queryInterface, sequelize);

        console.log('Running migration 003: Create media library...');
        await migration3.up(queryInterface, sequelize);

        console.log('Running migration 004: Create activity logs...');
        await migration4.up(queryInterface, sequelize);

        console.log('Running migration 005: Add status/priority to products...');
        await migration5.up(queryInterface, sequelize);

        console.log('Running migration 006: Create relational tags system...');
        await migration6.up(queryInterface, sequelize);

        console.log('Running migration 007: Migrate comma tags to relational...');
        await migration7.up(queryInterface, sequelize);

        console.log('Running migration 008: Add 2FA and password reset to users...');
        await migration8.up(queryInterface, sequelize);

        console.log('✅ All migrations completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigrations();
