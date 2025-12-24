import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Media extends Model {
    public id!: number;
    public filename!: string;
    public original_filename!: string | null;
    public file_path!: string;
    public optimized_path!: string | null;
    public thumbnail_path!: string | null;
    public file_size!: number | null;
    public optimized_size!: number | null;
    public thumbnail_size!: number | null;
    public mime_type!: string | null;
    public width!: number | null;
    public height!: number | null;
    public optimized_width!: number | null;
    public optimized_height!: number | null;
    public thumbnail_width!: number | null;
    public thumbnail_height!: number | null;
    public processing_status!: 'pending' | 'completed' | 'failed';
    public alt_text!: string | null;
    public caption!: string | null;
    public uploaded_by!: number | null;

    // Instance methods
    public getOriginalUrl(): string {
        return `/uploads/original/${this.filename}`;
    }

    public getOptimizedUrl(): string {
        if (this.optimized_path) {
            // Extract filename from path (handles both relative and absolute paths)
            const pathParts = this.optimized_path.replace(/\\/g, '/').split('/');
            const filename = pathParts[pathParts.length - 1];
            return `/uploads/optimized/${filename}`;
        }
        return this.getOriginalUrl();
    }

    public getThumbnailUrl(): string {
        if (this.thumbnail_path) {
            // Extract filename from path (handles both relative and absolute paths)
            const pathParts = this.thumbnail_path.replace(/\\/g, '/').split('/');
            const filename = pathParts[pathParts.length - 1];
            return `/uploads/thumbnails/${filename}`;
        }
        return this.getOptimizedUrl();
    }
}

Media.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        filename: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        original_filename: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        file_path: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        optimized_path: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        thumbnail_path: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        file_size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        optimized_size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        thumbnail_size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        mime_type: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        optimized_width: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        optimized_height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        thumbnail_width: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        thumbnail_height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        processing_status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            defaultValue: 'pending',
            allowNull: false,
        },
        alt_text: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        uploaded_by: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
    },
    {
        sequelize,
        tableName: 'media',
        timestamps: true,
        underscored: true,
    }
);

export default Media;
