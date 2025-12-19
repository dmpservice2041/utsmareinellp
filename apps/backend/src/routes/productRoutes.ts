import { Router } from 'express';
import { getProducts, getProductBySlug, createProduct } from '../controllers/productController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProducts as any);
router.get('/:slug', getProductBySlug as any);
router.post('/', authenticateToken, createProduct as any); // Protected

export default router;
