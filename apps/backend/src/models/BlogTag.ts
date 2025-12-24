import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BlogTag extends Model {
    public id!: number;
    public blog_id!: number;
    public tag_id!: number;
}

BlogTag.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        blog_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'blogs',
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
        tableName: 'blog_tags',
        timestamps: true,
        updatedAt: false,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['blog_id', 'tag_id'],
            },
        ],
    }
);

export default BlogTag;
