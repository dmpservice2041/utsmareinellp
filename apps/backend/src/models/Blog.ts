import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Blog extends Model {
    public id!: number;
    public title!: string;
    public slug!: string;
    public content!: string;
    public excerpt!: string | null;
    public featured_image!: string | null;
    public author!: string | null;
    public category!: string | null;
    public status!: 'draft' | 'published' | 'disabled';
    public published_at!: Date | null;
    public meta_title!: string | null;
    public meta_description!: string | null;
    public focus_keyword!: string | null;
    public meta_keywords!: string | null;
    public canonical_url!: string | null;
    public og_title!: string | null;
    public og_description!: string | null;
    public og_image!: string | null;
    public schema_type!: string;
    public schema_overrides!: object | null;
    public schema_version!: string;
    public is_active!: boolean; // Keep for backward compatibility
    public tags!: string | null; // Keep for backward compatibility during migration

    // Instance methods
    public generateSlug(): string {
        return this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    public generateExcerpt(maxLength: number = 160): string {
        if (this.excerpt) {
            return this.excerpt;
        }
        if (this.content) {
            // Strip HTML tags for excerpt
            const textContent = this.content.replace(/<[^>]*>/g, '').trim();
            if (textContent.length <= maxLength) {
                return textContent;
            }
            return textContent.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
        }
        return '';
    }

    public generateCanonicalUrl(baseUrl?: string): string {
        const url = baseUrl || process.env.BASE_URL || 'https://yourdomain.com';
        return `${url}/blog/${this.slug}`;
    }

    public async getSchemaJSON(): Promise<object> {
        // This will be implemented in seoUtils, but method signature here
        return {
            '@context': 'https://schema.org',
            '@type': this.schema_type || 'BlogPosting',
            headline: this.title,
            description: this.excerpt || this.meta_description,
            // Additional fields from schema_overrides will be merged by utility
        };
    }
}

Blog.init(
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
        content: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        excerpt: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        featured_image: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        author: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('draft', 'published', 'disabled'),
            defaultValue: 'draft',
            allowNull: false,
        },
        published_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        meta_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        meta_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        focus_keyword: {
            type: DataTypes.STRING(100),
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
            defaultValue: 'BlogPosting',
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
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        tags: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'blogs',
        timestamps: true,
        underscored: false, // Database uses camelCase (createdAt, updatedAt)
        hooks: {
            beforeCreate: async (blog: Blog) => {
                // Auto-generate slug if not provided
                if (!blog.slug && blog.title) {
                    blog.slug = blog.generateSlug();
                }
                // Auto-generate excerpt if not provided
                if (!blog.excerpt && blog.content) {
                    blog.excerpt = blog.generateExcerpt();
                }
                // Auto-generate canonical URL if not provided
                if (!blog.canonical_url && blog.slug) {
                    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
                    blog.canonical_url = blog.generateCanonicalUrl(baseUrl);
                }
                // Auto-generate meta defaults if not provided
                if (!blog.meta_title && blog.title) {
                    blog.meta_title = blog.title;
                }
                if (!blog.meta_description && blog.excerpt) {
                    blog.meta_description = blog.excerpt.substring(0, 160);
                }
            },
            beforeUpdate: async (blog: Blog) => {
                // Update excerpt if content changed
                if (blog.changed('content') && blog.content && !blog.excerpt) {
                    blog.excerpt = blog.generateExcerpt();
                }
                // Update canonical URL if slug changed
                if (blog.changed('slug') && blog.slug) {
                    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
                    blog.canonical_url = blog.generateCanonicalUrl(baseUrl);
                }
            },
        },
    }
);

export default Blog;
