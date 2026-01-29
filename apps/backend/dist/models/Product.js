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
class Product extends sequelize_1.Model {
    // Instance methods
    generateSlug() {
        return this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    generateCanonicalUrl(baseUrl) {
        const url = baseUrl || process.env.BASE_URL || 'https://yourdomain.com';
        return `${url}/new-arrivals/${this.slug}`;
    }
    getSchemaJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            // This will be implemented in seoUtils, but method signature here
            // Schema is generated server-side from schema_overrides
            return {
                '@context': 'https://schema.org',
                '@type': this.schema_type || 'Product',
                name: this.title,
                description: this.short_description || this.meta_description,
                // Additional fields from schema_overrides will be merged by utility
            };
        });
    }
}
Product.init({
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
    short_description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    long_description: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    featured_image: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('draft', 'published', 'disabled'),
        defaultValue: 'draft',
        allowNull: false,
    },
    priority: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    is_featured: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    published_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    meta_title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    meta_description: {
        type: sequelize_1.DataTypes.TEXT,
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
        defaultValue: 'Product',
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
    specifications: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    technical_details: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'products',
    timestamps: true,
    underscored: false, // Database uses camelCase (createdAt, updatedAt)
    hooks: {
        beforeCreate: (product) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        beforeUpdate: (product) => __awaiter(void 0, void 0, void 0, function* () {
            // Update canonical URL if slug changed
            if (product.changed('slug') && product.slug) {
                const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
                product.canonical_url = product.generateCanonicalUrl(baseUrl);
            }
        }),
    },
    indexes: [
        { fields: ['status'] },
        { fields: ['category'] },
        { fields: ['is_featured'] },
        { fields: ['priority'] },
        { fields: ['status', 'priority'] }, // For improved sorting/filtering
        { fields: ['created_at'] },
    ],
});
exports.default = Product;
