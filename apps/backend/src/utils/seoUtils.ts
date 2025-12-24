import Product from '../models/Product';
import Blog from '../models/Blog';

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(slug: string, type: 'product' | 'blog'): string {
    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
    if (type === 'product') {
        return `${baseUrl}/new-arrivals/${slug}`;
    }
    return `${baseUrl}/blog/${slug}`;
}

/**
 * Auto-generate SEO meta defaults from title and description
 */
export function generateMetaDefaults(title: string, description?: string): {
    metaTitle: string;
    metaDescription: string;
} {
    return {
        metaTitle: title.length > 60 ? title.substring(0, 57) + '...' : title,
        metaDescription: description
            ? (description.length > 160 ? description.substring(0, 157) + '...' : description)
            : '',
    };
}

/**
 * Validate SEO fields with warnings and errors
 */
export function validateSEO(data: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    slug?: string | null;
}): {
    valid: boolean;
    errors: string[];
    warnings: string[];
} {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Hard blocks (errors)
    if (!data.metaTitle || data.metaTitle.trim().length === 0) {
        errors.push('Meta title is required');
    }

    if (!data.metaDescription || data.metaDescription.trim().length === 0) {
        errors.push('Meta description is required');
    }

    if (data.canonicalUrl && !isValidUrl(data.canonicalUrl)) {
        errors.push('Canonical URL must be a valid URL');
    }

    // Warnings (suggestions)
    if (data.metaTitle) {
        if (data.metaTitle.length < 30) {
            warnings.push('Meta title is too short (recommended: 30-60 characters)');
        } else if (data.metaTitle.length > 60) {
            warnings.push('Meta title is too long (recommended: 30-60 characters)');
        }
    }

    if (data.metaDescription) {
        if (data.metaDescription.length < 120) {
            warnings.push('Meta description is too short (recommended: 120-160 characters)');
        } else if (data.metaDescription.length > 160) {
            warnings.push('Meta description is too long (recommended: 120-160 characters)');
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Strict validation before allowing publish
 */
export function validateSEOForPublish(data: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    slug?: string | null;
}): {
    canPublish: boolean;
    errors: string[];
    warnings: string[];
} {
    const validation = validateSEO(data);
    return {
        canPublish: validation.valid,
        errors: validation.errors,
        warnings: validation.warnings,
    };
}

/**
 * Generate Product JSON-LD schema from product and overrides
 * 
 * NOTE: This is for CATALOG/SHOWCASE websites (not e-commerce).
 * Pricing is OPTIONAL - Google does NOT require it for Product schema.
 * This schema is perfect for showcasing products you deal with.
 */
export function generateProductSchema(product: Product, overrides?: object | null): object {
    const baseSchema: any = {
        '@context': 'https://schema.org',
        '@type': product.schema_type || 'Product',
        name: product.title,
        description: product.short_description || product.meta_description || '',
        url: product.canonical_url || generateCanonicalUrl(product.slug, 'product'),
        // Note: 'offers' (pricing) is OPTIONAL - not required for catalog/showcase sites
    };

    // Merge overrides (admin-editable fields like brand, sku, etc.)
    // Pricing can be added via overrides if needed, but it's NOT required
    if (overrides && typeof overrides === 'object') {
        Object.assign(baseSchema, overrides);
    }

    // Add image if available
    if (product.featured_image) {
        baseSchema.image = product.featured_image;
    }

    // Add category if available (helps with SEO)
    if (product.category) {
        baseSchema.category = product.category;
    }

    return baseSchema;
}

/**
 * Generate Blog JSON-LD schema from blog and overrides
 */
export function generateBlogSchema(blog: Blog, overrides?: object | null): object {
    const baseSchema: any = {
        '@context': 'https://schema.org',
        '@type': blog.schema_type || 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt || blog.meta_description || '',
        url: blog.canonical_url || generateCanonicalUrl(blog.slug, 'blog'),
    };

    // Merge overrides (admin-editable fields)
    if (overrides && typeof overrides === 'object') {
        Object.assign(baseSchema, overrides);
    }

    // Add author if available
    if (blog.author) {
        baseSchema.author = {
            '@type': 'Person',
            name: blog.author,
        };
    }

    // Add publish date
    if (blog.published_at) {
        baseSchema.datePublished = blog.published_at.toISOString();
    }

    // Add image if available
    if (blog.featured_image) {
        baseSchema.image = blog.featured_image;
    }

    return baseSchema;
}

/**
 * Validate JSON-LD schema against Google requirements
 */
export function validateSchemaJSON(schema: object, schemaType: string): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (!schema || typeof schema !== 'object') {
        errors.push('Schema must be a valid object');
        return { valid: false, errors };
    }

    const schemaObj = schema as any;

    // Check required @context
    if (!schemaObj['@context'] || schemaObj['@context'] !== 'https://schema.org') {
        errors.push('Schema must include @context: "https://schema.org"');
    }

    // Check required @type
    if (!schemaObj['@type']) {
        errors.push('Schema must include @type');
    }

    // Product-specific validation
    // NOTE: Pricing (offers) is OPTIONAL - not required for catalog/showcase sites
    if (schemaType === 'Product' || schemaObj['@type'] === 'Product') {
        if (!schemaObj.name) {
            errors.push('Product schema must include "name"');
        }
        // Pricing is NOT required - this is for catalog/showcase, not e-commerce
    }

    // BlogPosting-specific validation
    if (schemaType === 'BlogPosting' || schemaObj['@type'] === 'BlogPosting') {
        if (!schemaObj.headline) {
            errors.push('BlogPosting schema must include "headline"');
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Helper: Validate URL format
 */
function isValidUrl(urlString: string): boolean {
    try {
        const url = new URL(urlString);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}
