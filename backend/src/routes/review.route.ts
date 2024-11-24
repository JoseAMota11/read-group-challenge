import { Router } from 'express';
import { authMiddleware } from '../middlewares/book.middleware';
import { ReviewController } from '../controllers/review.controller';
import { validateReviewsData } from '../middlewares/review.middleware';

const reviewRouter = Router();

// Routes
reviewRouter.get(
  '/reviews/:bookId',
  authMiddleware,
  ReviewController.getAllReviews
);
reviewRouter.post(
  '/reviews',
  authMiddleware,
  validateReviewsData,
  ReviewController.setReview
);
reviewRouter.put(
  '/reviews/:id',
  authMiddleware,
  validateReviewsData,
  ReviewController.updateReview
);
reviewRouter.delete(
  '/reviews/:id',
  authMiddleware,
  ReviewController.deleteReview
);

export default reviewRouter;
