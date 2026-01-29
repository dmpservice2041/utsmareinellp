"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', blogController_1.getPublicList);
router.get('/:slug', blogController_1.getBySlug);
router.post('/', authMiddleware_1.authenticateToken, blogController_1.create); // Protected
exports.default = router;
