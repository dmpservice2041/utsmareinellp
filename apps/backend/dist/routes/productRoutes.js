"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', productController_1.getProducts);
router.get('/:slug', productController_1.getProductBySlug);
router.post('/', authMiddleware_1.authenticateToken, productController_1.createProduct); // Protected
exports.default = router;
