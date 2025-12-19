import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {
    public id!: number;
    public title!: string;
    public slug!: string;
    public short_description!: string;
    public long_description!: string; // HTML content
    public seo_title!: string;
    public seo_description!: string;
    public is_active!: boolean;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        short_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        long_description: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        seo_title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        seo_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'products',
    }
);

export default Product;
