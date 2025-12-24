import sequelize from '../config/database';
import User from '../models/User';

const fixSchema = async () => {
    try {
        console.log('Authenticating with database...');
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        console.log('Syncing User model with database...');
        // Sync with alter: true adds missing columns without dropping tables
        await User.sync({ alter: true });

        console.log('User table synced successfully!');

        // Log the table description to verify
        const [results] = await sequelize.query('DESCRIBE users');
        console.log('Current users table structure:', results);

        process.exit(0);
    } catch (error) {
        console.error('Unable to sync database:', error);
        process.exit(1);
    }
};

fixSchema();
