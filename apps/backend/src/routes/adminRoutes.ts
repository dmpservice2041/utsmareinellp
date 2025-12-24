import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { logActivity } from '../middleware/activityLogMiddleware';
import { invalidateCache } from '../middleware/cacheMiddleware';
import { handleValidationErrors } from '../middleware/validationMiddleware';

// Controllers
import * as dashboardController from '../controllers/dashboardController';
import * as newArrivalController from '../controllers/newArrivalController';
import * as blogController from '../controllers/blogController';
import * as mediaController from '../controllers/mediaController';
import * as seoController from '../controllers/seoController';
import { validateNewArrival, validateBlog } from '../middleware/validationMiddleware';

const router = Router();

// All admin routes require authentication
router.use(authenticateToken);
router.use(logActivity);

// Dashboard
router.get('/dashboard/stats', dashboardController.getStats);

// New Arrivals (Admin)
router.get('/new-arrivals', newArrivalController.getAll);
router.get('/new-arrivals/:id', newArrivalController.getById);
router.post(
    '/new-arrivals',
    validateNewArrival,
    handleValidationErrors,
    invalidateCache,
    newArrivalController.create
);
router.put(
    '/new-arrivals/:id',
    validateNewArrival,
    handleValidationErrors,
    invalidateCache,
    newArrivalController.update
);
router.delete('/new-arrivals/:id', invalidateCache, newArrivalController.deleteProduct);
router.patch('/new-arrivals/:id/status', invalidateCache, newArrivalController.updateStatus);
router.patch('/new-arrivals/:id/priority', invalidateCache, newArrivalController.updatePriority);

// Blogs (Admin)
router.get('/blogs', blogController.getAll);
router.get('/blogs/:id', blogController.getById);
router.post(
    '/blogs',
    validateBlog,
    handleValidationErrors,
    invalidateCache,
    blogController.create
);
router.put(
    '/blogs/:id',
    validateBlog,
    handleValidationErrors,
    invalidateCache,
    blogController.update
);
router.delete('/blogs/:id', invalidateCache, blogController.deleteBlog);
router.patch('/blogs/:id/status', invalidateCache, blogController.updateStatus);

// Media (Admin)
router.get('/media', mediaController.list);
router.post('/media/upload', invalidateCache, mediaController.uploadFile);
router.get('/media/:id', mediaController.getById);
router.put('/media/:id', mediaController.update);
router.delete('/media/:id', invalidateCache, mediaController.deleteMedia);
router.get('/media/:id/urls', mediaController.getUrls);

// SEO (Admin)
router.get('/seo/validate/:entityType/:id', seoController.validate);
router.post('/seo/generate/:entityType/:id', seoController.generate);
router.get('/seo/validate-schema/:entityType/:id', seoController.validateSchema);

export default router;
