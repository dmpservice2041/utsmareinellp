import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Blog extends Model {
    public id!: number;
    public title!: string;
    public slug!: string;
    public content!: string; // HTML content
    public thumbnail!: string;
    public tags!: string; // Comma separated tags
    public seo_title!: string;
    public seo_description!: string;
    public published_at!: Date;
    public is_active!: boolean;
}

Blog.init(
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
        content: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tags: {
            type: DataTypes.STRING, // e.g. "engine, spare parts"
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
        published_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'blogs',
    }
);

export default Blog;
