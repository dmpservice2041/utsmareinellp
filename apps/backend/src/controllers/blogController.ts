import { Request, Response } from 'express';
import { Blog } from '../models';

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Blog.findAndCountAll({
            where: { is_active: true },
            limit,
            offset,
            order: [['published_at', 'DESC']],
        });

        return res.json({
            total: count,
            blogs: rows,
            page,
            pages: Math.ceil(count / limit),
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({
            where: { slug, is_active: true },
        });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.json(blog);
    } catch (error) {
        console.error('Get blog by slug error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, slug, content, thumbnail, tags, seo_title, seo_description } = req.body;

        const blog = await Blog.create({
            title,
            slug,
            content,
            thumbnail,
            tags,
            seo_title,
            seo_description,
            published_at: new Date(),
        });

        return res.status(201).json(blog);
    } catch (error) {
        console.error('Create blog error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
