import { Model, ModelStatic } from 'sequelize';

/**
 * Convert text to URL-friendly slug
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Validate slug format (alphanumeric, hyphens only)
 */
export function validateSlugFormat(slug: string): { valid: boolean; error?: string } {
    if (!slug || slug.length === 0) {
        return { valid: false, error: 'Slug cannot be empty' };
    }

    // Check for valid characters (alphanumeric and hyphens)
    if (!/^[a-z0-9-]+$/.test(slug)) {
        return { valid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' };
    }

    // Check for consecutive hyphens
    if (slug.includes('--')) {
        return { valid: false, error: 'Slug cannot contain consecutive hyphens' };
    }

    // Check for leading/trailing hyphens
    if (slug.startsWith('-') || slug.endsWith('-')) {
        return { valid: false, error: 'Slug cannot start or end with a hyphen' };
    }

    return { valid: true };
}

/**
 * Ensure slug is unique by appending number if needed
 */
export async function ensureUniqueSlug(
    slug: string,
    model: ModelStatic<any>,
    excludeId?: number
): Promise<string> {
    let uniqueSlug = slug;
    let counter = 1;

    while (true) {
        const whereClause: any = { slug: uniqueSlug };
        if (excludeId) {
            const { Op } = require('sequelize');
            whereClause.id = { [Op.ne]: excludeId };
        }

        const existing = await model.findOne({ where: whereClause });

        if (!existing) {
            return uniqueSlug;
        }

        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }
}
