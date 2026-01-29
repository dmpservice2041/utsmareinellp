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
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
exports.validateSlugFormat = validateSlugFormat;
exports.ensureUniqueSlug = ensureUniqueSlug;
/**
 * Convert text to URL-friendly slug
 */
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
/**
 * Validate slug format (alphanumeric, hyphens only)
 */
function validateSlugFormat(slug) {
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
function ensureUniqueSlug(slug, model, excludeId) {
    return __awaiter(this, void 0, void 0, function* () {
        let uniqueSlug = slug;
        let counter = 1;
        while (true) {
            const whereClause = { slug: uniqueSlug };
            if (excludeId) {
                const { Op } = require('sequelize');
                whereClause.id = { [Op.ne]: excludeId };
            }
            const existing = yield model.findOne({ where: whereClause });
            if (!existing) {
                return uniqueSlug;
            }
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }
    });
}
