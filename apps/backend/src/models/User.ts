import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public role!: string;
    public two_factor_secret!: string | null;
    public two_factor_enabled!: boolean;
    public password_reset_otp!: string | null;
    public password_reset_expiry!: Date | null;
    public two_factor_method!: 'app' | 'email';
    public two_factor_otp!: string | null;
    public two_factor_otp_expiry!: Date | null;

    public async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'admin',
        },
        two_factor_secret: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        two_factor_enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        password_reset_otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password_reset_expiry: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        two_factor_method: {
            type: DataTypes.ENUM('app', 'email'),
            defaultValue: 'app',
            allowNull: false,
        },
        two_factor_otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        two_factor_otp_expiry: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    }
);

export default User;
