import { Request, Response } from 'express';
import { Product, ProductImage } from '../models';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Product.findAndCountAll({
            where: { is_active: true },
            include: [{ model: ProductImage, as: 'images' }],
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
    } catch (error) {
        console.error('Get products error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProductBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({
            where: { slug, is_active: true },
            include: [{ model: ProductImage, as: 'images' }],
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json(product);
    } catch (error) {
        console.error('Get product by slug error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { title, slug, short_description, long_description, seo_title, seo_description } = req.body;

        const product = await Product.create({
            title,
            slug,
            short_description,
            long_description,
            seo_title,
            seo_description,
        });

        return res.status(201).json(product);
    } catch (error) {
        console.error('Create product error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
