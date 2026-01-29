"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateContact = exports.validateBlog = exports.validateNewArrival = void 0;
const express_validator_1 = require("express-validator");
const slugUtils_1 = require("../utils/slugUtils");
/**
 * Validation middleware for New Arrival (Product) creation/update
 */
exports.validateNewArrival = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 255 })
        .withMessage('Title must be between 3 and 255 characters'),
    (0, express_validator_1.body)('slug')
        .optional()
        .custom((value) => {
        if (value) {
            const validation = (0, slugUtils_1.validateSlugFormat)(value);
            if (!validation.valid) {
                throw new Error(validation.error);
            }
        }
        return true;
    }),
    (0, express_validator_1.body)('short_description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Short description must be less than 500 characters'),
    (0, express_validator_1.body)('meta_title')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Meta title must be less than 255 characters'),
    (0, express_validator_1.body)('meta_description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Meta description must be less than 500 characters'),
    (0, express_validator_1.body)('canonical_url')
        .optional()
        .isURL()
        .withMessage('Canonical URL must be a valid URL'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['draft', 'published', 'disabled'])
        .withMessage('Status must be draft, published, or disabled'),
    (0, express_validator_1.body)('priority')
        .optional()
        .customSanitizer((value) => {
        if (value === '' || value === null || value === undefined) {
            return 0;
        }
        return parseInt(String(value)) || 0;
    })
        .isInt({ min: 0 })
        .withMessage('Priority must be a non-negative integer'),
];
/**
 * Validation middleware for Blog creation/update
 */
exports.validateBlog = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 255 })
        .withMessage('Title must be between 3 and 255 characters'),
    (0, express_validator_1.body)('slug')
        .optional()
        .custom((value) => {
        if (value) {
            const validation = (0, slugUtils_1.validateSlugFormat)(value);
            if (!validation.valid) {
                throw new Error(validation.error);
            }
        }
        return true;
    }),
    (0, express_validator_1.body)('content')
        .notEmpty()
        .withMessage('Content is required'),
    (0, express_validator_1.body)('meta_title')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Meta title must be less than 255 characters'),
    (0, express_validator_1.body)('meta_description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Meta description must be less than 500 characters'),
    (0, express_validator_1.body)('canonical_url')
        .optional()
        .isURL()
        .withMessage('Canonical URL must be a valid URL'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['draft', 'published', 'disabled'])
        .withMessage('Status must be draft, published, or disabled'),
];
/**
 * Validation middleware for Contact Form
 */
exports.validateContact = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name must be less than 100 characters')
        .escape(), // Basic XSS protection
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail(),
    (0, express_validator_1.body)('phone')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Phone number too long')
        .escape(),
    (0, express_validator_1.body)('subject')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Subject must be less than 200 characters')
        .escape(),
    (0, express_validator_1.body)('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ max: 5000 })
        .withMessage('Message must be less than 5000 characters')
        .escape(),
];
/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Validation failed',
                details: errors.array(),
            },
        });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
