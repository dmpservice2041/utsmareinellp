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
const newArrivalController = __importStar(require("../controllers/newArrivalController"));
const blogController = __importStar(require("../controllers/blogController"));
const cacheMiddleware_1 = require("../middleware/cacheMiddleware");
const router = (0, express_1.Router)();
// New Arrivals (Public) - with cache headers
router.get('/new-arrivals', (0, cacheMiddleware_1.cacheMiddleware)(3600), newArrivalController.getPublicList);
router.get('/new-arrivals/featured', (0, cacheMiddleware_1.cacheMiddleware)(3600), newArrivalController.getFeatured);
router.get('/new-arrivals/:slug', (0, cacheMiddleware_1.cacheMiddleware)(86400), newArrivalController.getBySlug);
// Blogs (Public) - with cache headers
router.get('/blogs', (0, cacheMiddleware_1.cacheMiddleware)(3600), blogController.getPublicList);
router.get('/blogs/:slug', (0, cacheMiddleware_1.cacheMiddleware)(86400), blogController.getBySlug);
exports.default = router;
