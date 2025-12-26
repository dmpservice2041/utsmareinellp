import { Router } from 'express';
import { submitContact, getMessages } from '../controllers/contactController';
import { authenticateToken } from '../middleware/authMiddleware';
import { contactLimiter } from '../middleware/rateLimitMiddleware';
import { validateContact, handleValidationErrors } from '../middleware/validationMiddleware';

const router = Router();

router.post(
    '/',
    contactLimiter,
    validateContact,
    handleValidationErrors,
    submitContact as any
);
router.get('/', authenticateToken, getMessages as any); // Protected admin route

export default router;
