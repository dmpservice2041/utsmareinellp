import { Router } from 'express';
import { submitContact, getMessages } from '../controllers/contactController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', submitContact as any);
router.get('/', authenticateToken, getMessages as any); // Protected admin route

export default router;
