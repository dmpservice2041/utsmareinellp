import { Router } from 'express';
import { getPublicList, getBySlug, create } from '../controllers/blogController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getPublicList as any);
router.get('/:slug', getBySlug as any);
router.post('/', authenticateToken, create as any); // Protected

export default router;
