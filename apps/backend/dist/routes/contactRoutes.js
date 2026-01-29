"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rateLimitMiddleware_1 = require("../middleware/rateLimitMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = (0, express_1.Router)();
router.post('/', rateLimitMiddleware_1.contactLimiter, validationMiddleware_1.validateContact, validationMiddleware_1.handleValidationErrors, contactController_1.submitContact);
router.get('/', authMiddleware_1.authenticateToken, contactController_1.getMessages); // Protected admin route
exports.default = router;
