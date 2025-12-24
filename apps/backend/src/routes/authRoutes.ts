import { Router } from 'express';
import {
    login,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    changeEmail,
    enable2FA,
    verify2FASetup,
    disable2FA,
    get2FAStatus,
    getCurrentUser,
    logout
} from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

import { authLimiter } from '../middleware/rateLimitMiddleware';
const router = Router();

router.post('/login', authLimiter, login as any);
router.post('/register', authLimiter, register as any);
router.post('/forgot-password', authLimiter, forgotPassword as any);
router.post('/reset-password', authLimiter, resetPassword as any);
router.post('/change-password', authenticateToken, changePassword as any);
router.post('/change-email', authenticateToken, changeEmail as any);
router.get('/me', authenticateToken, getCurrentUser as any);
router.post('/2fa/enable', authenticateToken, authLimiter, enable2FA as any);
router.post('/2fa/verify-setup', authenticateToken, authLimiter, verify2FASetup as any);
router.post('/2fa/disable', authenticateToken, disable2FA as any);
router.get('/2fa/status', authenticateToken, get2FAStatus as any);
router.post('/logout', logout as any);

export default router;
