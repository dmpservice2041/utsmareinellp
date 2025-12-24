import { Router } from 'express';
import * as newArrivalController from '../controllers/newArrivalController';
import * as blogController from '../controllers/blogController';
import { cacheMiddleware } from '../middleware/cacheMiddleware';

const router = Router();

// New Arrivals (Public) - with cache headers
router.get('/new-arrivals', cacheMiddleware(3600), newArrivalController.getPublicList);
router.get('/new-arrivals/featured', cacheMiddleware(3600), newArrivalController.getFeatured);
router.get('/new-arrivals/:slug', cacheMiddleware(86400), newArrivalController.getBySlug);

// Blogs (Public) - with cache headers
router.get('/blogs', cacheMiddleware(3600), blogController.getPublicList);
router.get('/blogs/:slug', cacheMiddleware(86400), blogController.getBySlug);

export default router;
