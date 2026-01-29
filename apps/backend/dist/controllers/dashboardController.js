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
exports.getStats = void 0;
const models_1 = require("../models");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * Get dashboard statistics (admin)
 */
exports.getStats = (0, errorHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { User } = yield Promise.resolve().then(() => __importStar(require('../models')));
    // Run independent queries in parallel
    const [newArrivalsTotal, newArrivalsPublished, newArrivalsDraft, newArrivalsDisabled, blogsTotal, blogsPublished, blogsDraft, blogsDisabled, mediaCount, recentActivity] = yield Promise.all([
        models_1.Product.count(),
        models_1.Product.count({ where: { status: 'published' } }),
        models_1.Product.count({ where: { status: 'draft' } }),
        models_1.Product.count({ where: { status: 'disabled' } }),
        models_1.Blog.count(),
        models_1.Blog.count({ where: { status: 'published' } }),
        models_1.Blog.count({ where: { status: 'draft' } }),
        models_1.Blog.count({ where: { status: 'disabled' } }),
        models_1.Media.count(),
        models_1.ActivityLog.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email'],
                },
            ],
        })
    ]);
    const newArrivals = {
        total: newArrivalsTotal,
        published: newArrivalsPublished,
        draft: newArrivalsDraft,
        disabled: newArrivalsDisabled
    };
    const blogs = {
        total: blogsTotal,
        published: blogsPublished,
        draft: blogsDraft,
        disabled: blogsDisabled
    };
    res.json({
        success: true,
        data: {
            newArrivals,
            blogs,
            mediaCount,
            recentActivity: recentActivity.map((log) => ({
                id: log.id,
                action: log.action,
                entityType: log.entity_type,
                entityId: log.entity_id,
                user: log.user ? { id: log.user.id, email: log.user.email } : null,
                createdAt: log.created_at,
            })),
        },
    });
}));
