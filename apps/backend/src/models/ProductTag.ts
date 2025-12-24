import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ProductTag extends Model {
    public id!: number;
    public product_id!: number;
    public tag_id!: number;
}

ProductTag.init(
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
        tag_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tags',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        tableName: 'product_tags',
        timestamps: true,
        updatedAt: false,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['product_id', 'tag_id'],
            },
        ],
    }
);

export default ProductTag;
