import sequelize from './config/database';
import { User, Product, ProductImage, Blog, Message, Media, Tag, ProductTag, BlogTag, ActivityLog } from './models';
import dotenv from 'dotenv';

dotenv.config();

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync all models
        // force: false to avoid dropping tables, alter: true to update schema if changed
        // Note: For production, use migrations instead of sync
        await sequelize.sync({ alter: true });

        console.log('All models were synchronized successfully.');
        console.log('Note: For production, use migrations (runMigrations.ts) instead of sync.');
        process.exit(0);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

syncDatabase();
