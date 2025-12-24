import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

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
                model: 'products',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        sort_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'product_images',
        timestamps: false, // Table doesn't have created_at/updated_at columns
    }
);

export default ProductImage;
