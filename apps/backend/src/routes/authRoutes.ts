import { Router } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();

router.post('/login', login as any); // Type casting to avoid Express type mismatch with async handlers
router.post('/register', register as any);

export default router;
