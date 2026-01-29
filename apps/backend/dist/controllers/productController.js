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
exports.createProduct = exports.getProductBySlug = exports.getProducts = void 0;
const models_1 = require("../models");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { count, rows } = yield models_1.Product.findAndCountAll({
            where: { is_active: true },
            attributes: { exclude: ['long_description', 'specifications', 'technical_details'] },
            include: [{ model: models_1.ProductImage, as: 'images' }],
            limit,
            offset,
            order: [['id', 'DESC']],
            distinct: true, // For correct count with include
        });
        return res.json({
            total: count,
            products: rows,
            page,
            pages: Math.ceil(count / limit),
        });
    }
    catch (error) {
        console.error('Get products error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProducts = getProducts;
const getProductBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const product = yield models_1.Product.findOne({
            where: { slug, is_active: true },
            include: [{ model: models_1.ProductImage, as: 'images' }],
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(product);
    }
    catch (error) {
        console.error('Get product by slug error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProductBySlug = getProductBySlug;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, slug, short_description, long_description, seo_title, seo_description } = req.body;
        const product = yield models_1.Product.create({
            title,
            slug,
            short_description,
            long_description,
            seo_title,
            seo_description,
        });
        return res.status(201).json(product);
    }
    catch (error) {
        console.error('Create product error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createProduct = createProduct;
