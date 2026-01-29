"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Blog extends sequelize_1.Model {
    // Instance methods
    generateSlug() {
        return this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    generateExcerpt(maxLength = 160) {
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
    generateCanonicalUrl(baseUrl) {
        const url = baseUrl || process.env.BASE_URL || 'https://yourdomain.com';
        return `${url}/blog/${this.slug}`;
    }
    getSchemaJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            // This will be implemented in seoUtils, but method signature here
            return {
                '@context': 'https://schema.org',
                '@type': this.schema_type || 'BlogPosting',
                headline: this.title,
                description: this.excerpt || this.meta_description,
                // Additional fields from schema_overrides will be merged by utility
            };
        });
    }
}
Blog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: false,
    },
    excerpt: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    featured_image: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    author: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('draft', 'published', 'disabled'),
        defaultValue: 'draft',
        allowNull: false,
    },
    published_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    meta_title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    meta_description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    focus_keyword: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    meta_keywords: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    canonical_url: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    og_title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    og_description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    og_image: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    schema_type: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'BlogPosting',
        allowNull: false,
    },
    schema_overrides: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    schema_version: {
        type: sequelize_1.DataTypes.STRING(10),
        defaultValue: '1.0',
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    tags: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'blogs',
    timestamps: true,
    underscored: false, // Database uses camelCase (createdAt, updatedAt)
    hooks: {
        beforeCreate: (blog) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        beforeUpdate: (blog) => __awaiter(void 0, void 0, void 0, function* () {
            // Update excerpt if content changed
            if (blog.changed('content') && blog.content && !blog.excerpt) {
                blog.excerpt = blog.generateExcerpt();
            }
            // Update canonical URL if slug changed
            if (blog.changed('slug') && blog.slug) {
                const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
                blog.canonical_url = blog.generateCanonicalUrl(baseUrl);
            }
        }),
    },
    indexes: [
        { fields: ['status'] },
        { fields: ['category'] },
        { fields: ['published_at'] },
        { fields: ['created_at'] },
    ],
});
exports.default = Blog;
