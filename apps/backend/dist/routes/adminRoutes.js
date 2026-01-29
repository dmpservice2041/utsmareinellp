"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const activityLogMiddleware_1 = require("../middleware/activityLogMiddleware");
const cacheMiddleware_1 = require("../middleware/cacheMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
// Controllers
const dashboardController = __importStar(require("../controllers/dashboardController"));
const newArrivalController = __importStar(require("../controllers/newArrivalController"));
const blogController = __importStar(require("../controllers/blogController"));
const mediaController = __importStar(require("../controllers/mediaController"));
const seoController = __importStar(require("../controllers/seoController"));
const validationMiddleware_2 = require("../middleware/validationMiddleware");
const router = (0, express_1.Router)();
// All admin routes require authentication AND admin privileges
router.use(authMiddleware_1.authenticateToken);
router.use(authMiddleware_1.requireAdmin);
router.use(activityLogMiddleware_1.logActivity);
// Dashboard
router.get('/dashboard/stats', dashboardController.getStats);
// New Arrivals (Admin)
router.get('/new-arrivals', newArrivalController.getAll);
router.get('/new-arrivals/:id', newArrivalController.getById);
router.post('/new-arrivals', validationMiddleware_2.validateNewArrival, validationMiddleware_1.handleValidationErrors, cacheMiddleware_1.invalidateCache, newArrivalController.create);
router.put('/new-arrivals/:id', validationMiddleware_2.validateNewArrival, validationMiddleware_1.handleValidationErrors, cacheMiddleware_1.invalidateCache, newArrivalController.update);
router.delete('/new-arrivals/:id', cacheMiddleware_1.invalidateCache, newArrivalController.deleteProduct);
router.patch('/new-arrivals/:id/status', cacheMiddleware_1.invalidateCache, newArrivalController.updateStatus);
router.patch('/new-arrivals/:id/priority', cacheMiddleware_1.invalidateCache, newArrivalController.updatePriority);
// Blogs (Admin)
router.get('/blogs', blogController.getAll);
router.get('/blogs/:id', blogController.getById);
router.post('/blogs', validationMiddleware_2.validateBlog, validationMiddleware_1.handleValidationErrors, cacheMiddleware_1.invalidateCache, blogController.create);
router.put('/blogs/:id', validationMiddleware_2.validateBlog, validationMiddleware_1.handleValidationErrors, cacheMiddleware_1.invalidateCache, blogController.update);
router.delete('/blogs/:id', cacheMiddleware_1.invalidateCache, blogController.deleteBlog);
router.patch('/blogs/:id/status', cacheMiddleware_1.invalidateCache, blogController.updateStatus);
// Media (Admin)
router.get('/media', mediaController.list);
router.post('/media/upload', cacheMiddleware_1.invalidateCache, mediaController.uploadFile);
router.get('/media/:id', mediaController.getById);
router.put('/media/:id', mediaController.update);
router.delete('/media/:id', cacheMiddleware_1.invalidateCache, mediaController.deleteMedia);
router.get('/media/:id/urls', mediaController.getUrls);
// SEO (Admin)
router.get('/seo/validate/:entityType/:id', seoController.validate);
router.post('/seo/generate/:entityType/:id', seoController.generate);
router.get('/seo/validate-schema/:entityType/:id', seoController.validateSchema);
exports.default = router;
