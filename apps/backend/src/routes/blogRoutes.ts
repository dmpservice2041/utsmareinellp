import { Router } from 'express';
import { getBlogs, getBlogBySlug, createBlog } from '../controllers/blogController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getBlogs as any);
router.get('/:slug', getBlogBySlug as any);
router.post('/', authenticateToken, createBlog as any); // Protected

export default router;
