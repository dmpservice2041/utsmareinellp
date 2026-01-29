"use strict";
/**
 * Migration Runner Script
 *
 * This script runs all migrations in order.
 * Run with: npx ts-node src/runMigrations.ts
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
const database_1 = __importDefault(require("./config/database"));
function runMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const queryInterface = database_1.default.getQueryInterface();
            // Run migrations in order
            console.log('Running migration 001: Add SEO fields to products...');
            yield migration1.up(queryInterface, database_1.default);
            console.log('Running migration 002: Add SEO fields to blogs...');
            yield migration2.up(queryInterface, database_1.default);
            console.log('Running migration 003: Create media library...');
            yield migration3.up(queryInterface, database_1.default);
            console.log('Running migration 004: Create activity logs...');
            yield migration4.up(queryInterface, database_1.default);
            console.log('Running migration 005: Add status/priority to products...');
            yield migration5.up(queryInterface, database_1.default);
            console.log('Running migration 006: Create relational tags system...');
            yield migration6.up(queryInterface, database_1.default);
            console.log('Running migration 007: Migrate comma tags to relational...');
            yield migration7.up(queryInterface, database_1.default);
            console.log('Running migration 008: Add 2FA and password reset to users...');
            yield migration8.up(queryInterface, database_1.default);
            console.log('✅ All migrations completed successfully!');
            process.exit(0);
        }
        catch (error) {
            console.error('❌ Migration failed:', error);
            process.exit(1);
        }
    });
}
runMigrations();
