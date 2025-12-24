import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { validateSlugFormat } from '../utils/slugUtils';

/**
 * Validation middleware for New Arrival (Product) creation/update
 */
export const validateNewArrival: ValidationChain[] = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 255 })
        .withMessage('Title must be between 3 and 255 characters'),
    body('slug')
        .optional()
        .custom((value) => {
            if (value) {
                const validation = validateSlugFormat(value);
                if (!validation.valid) {
                    throw new Error(validation.error);
                }
            }
            return true;
        }),
    body('short_description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Short description must be less than 500 characters'),
    body('meta_title')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Meta title must be less than 255 characters'),
    body('meta_description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Meta description must be less than 500 characters'),
    body('canonical_url')
        .optional()
        .isURL()
        .withMessage('Canonical URL must be a valid URL'),
    body('status')
        .optional()
        .isIn(['draft', 'published', 'disabled'])
        .withMessage('Status must be draft, published, or disabled'),
    body('priority')
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
export const validateBlog: ValidationChain[] = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 255 })
        .withMessage('Title must be between 3 and 255 characters'),
    body('slug')
        .optional()
        .custom((value) => {
            if (value) {
                const validation = validateSlugFormat(value);
                if (!validation.valid) {
                    throw new Error(validation.error);
                }
            }
            return true;
        }),
    body('content')
        .notEmpty()
        .withMessage('Content is required'),
    body('meta_title')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Meta title must be less than 255 characters'),
    body('meta_description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Meta description must be less than 500 characters'),
    body('canonical_url')
        .optional()
        .isURL()
        .withMessage('Canonical URL must be a valid URL'),
    body('status')
        .optional()
        .isIn(['draft', 'published', 'disabled'])
        .withMessage('Status must be draft, published, or disabled'),
];

/**
 * Handle validation errors
 */
export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const errors = validationResult(req);
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
