import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product';

class ProductImage extends Model {
    public id!: number;
    public product_id!: number;
    public url!: string;
    public sort_order!: number;
}

ProductImage.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sort_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'product_images',
        timestamps: false,
    }
);

export default ProductImage;
