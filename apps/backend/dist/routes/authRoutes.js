"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rateLimitMiddleware_1 = require("../middleware/rateLimitMiddleware");
const router = (0, express_1.Router)();
router.get('/csrf', authController_1.getCsrfToken); // Public endpoint to get CSRF cookie
router.post('/login', rateLimitMiddleware_1.authLimiter, authController_1.login);
// router.post('/register', authLimiter, register as any); // Disabled for security
router.post('/forgot-password', rateLimitMiddleware_1.authLimiter, authController_1.forgotPassword);
router.post('/reset-password', rateLimitMiddleware_1.authLimiter, authController_1.resetPassword);
router.post('/change-password', authMiddleware_1.authenticateToken, authController_1.changePassword);
router.post('/change-email', authMiddleware_1.authenticateToken, authController_1.changeEmail);
router.get('/me', authMiddleware_1.authenticateToken, authController_1.getCurrentUser);
router.post('/2fa/enable', authMiddleware_1.authenticateToken, rateLimitMiddleware_1.authLimiter, authController_1.enable2FA);
router.post('/2fa/verify-setup', authMiddleware_1.authenticateToken, rateLimitMiddleware_1.authLimiter, authController_1.verify2FASetup);
router.post('/2fa/disable', authMiddleware_1.authenticateToken, authController_1.disable2FA);
router.get('/2fa/status', authMiddleware_1.authenticateToken, authController_1.get2FAStatus);
router.post('/logout', authController_1.logout);
exports.default = router;
