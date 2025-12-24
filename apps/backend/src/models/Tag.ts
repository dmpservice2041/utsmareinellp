import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Tag extends Model {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description!: string | null;
    public usage_count!: number;

    // Instance methods
    public async incrementUsage(): Promise<void> {
        this.usage_count += 1;
        await this.save();
    }

    public async decrementUsage(): Promise<void> {
        if (this.usage_count > 0) {
            this.usage_count -= 1;
            await this.save();
        }
    }

    public getUsageCount(): number {
        return this.usage_count;
    }
}

Tag.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        usage_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'tags',
        timestamps: true,
        underscored: true,
    }
);

export default Tag;
