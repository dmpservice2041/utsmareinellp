import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {
    public id!: number;
    public title!: string;
    public slug!: string;
    public short_description!: string | null;
    public long_description!: string | null;
    public category!: string | null;
    public featured_image!: string | null;
    public status!: 'draft' | 'published' | 'disabled';
    public priority!: number;
    public is_featured!: boolean;
    public published_at!: Date | null;
    public meta_title!: string | null;
    public meta_description!: string | null;
    public meta_keywords!: string | null;
    public canonical_url!: string | null;
    public og_title!: string | null;
    public og_description!: string | null;
    public og_image!: string | null;
    public schema_type!: string;
    public schema_overrides!: object | null;
    public schema_version!: string;
    public specifications!: object | null;
    public technical_details!: string | null;
    public is_active!: boolean; // Keep for backward compatibility

    // Instance methods
    public generateSlug(): string {
        return this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    public generateCanonicalUrl(baseUrl?: string): string {
        const url = baseUrl || process.env.BASE_URL || 'https://yourdomain.com';
        return `${url}/new-arrivals/${this.slug}`;
    }

    public async getSchemaJSON(): Promise<object> {
        // This will be implemented in seoUtils, but method signature here
        // Schema is generated server-side from schema_overrides
        return {
            '@context': 'https://schema.org',
            '@type': this.schema_type || 'Product',
            name: this.title,
            description: this.short_description || this.meta_description,
            // Additional fields from schema_overrides will be merged by utility
        };
    }
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
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
        category: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        featured_image: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('draft', 'published', 'disabled'),
            defaultValue: 'draft',
            allowNull: false,
        },
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        is_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        published_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        meta_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        meta_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        meta_keywords: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        canonical_url: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        og_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        og_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        og_image: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        schema_type: {
            type: DataTypes.STRING(50),
            defaultValue: 'Product',
            allowNull: false,
        },
        schema_overrides: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        schema_version: {
            type: DataTypes.STRING(10),
            defaultValue: '1.0',
            allowNull: false,
        },
        specifications: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        technical_details: {
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
        timestamps: true,
        underscored: false, // Database uses camelCase (createdAt, updatedAt)
        hooks: {
            beforeCreate: async (product: Product) => {
                // Auto-generate slug if not provided
                if (!product.slug && product.title) {
                    product.slug = product.generateSlug();
                }
                // Auto-generate canonical URL if not provided
                if (!product.canonical_url && product.slug) {
                    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
                    product.canonical_url = product.generateCanonicalUrl(baseUrl);
                }
                // Auto-generate meta defaults if not provided
                if (!product.meta_title && product.title) {
                    product.meta_title = product.title;
                }
                if (!product.meta_description && product.short_description) {
                    product.meta_description = product.short_description.substring(0, 160);
                }
            },
            beforeUpdate: async (product: Product) => {
                // Update canonical URL if slug changed
                if (product.changed('slug') && product.slug) {
                    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
                    product.canonical_url = product.generateCanonicalUrl(baseUrl);
                }
            },
        },
        indexes: [
            { fields: ['status'] },
            { fields: ['category'] },
            { fields: ['is_featured'] },
            { fields: ['priority'] },
            { fields: ['status', 'priority'] }, // For improved sorting/filtering
            { fields: ['created_at'] },
        ],
    }
);

export default Product;
