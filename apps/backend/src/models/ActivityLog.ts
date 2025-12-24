import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ActivityLog extends Model {
    public id!: number;
    public user_id!: number | null;
    public action!: string;
    public entity_type!: string;
    public entity_id!: number | null;
    public changes!: object | null;
    public ip_address!: string | null;
    public user_agent!: string | null;
}

ActivityLog.init(
    {
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
    },
    {
        sequelize,
        tableName: 'activity_logs',
        timestamps: true,
        updatedAt: false,
        underscored: true,
    }
);

export default ActivityLog;
