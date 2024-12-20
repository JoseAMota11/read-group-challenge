import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import {
  authMiddleware,
  validateBooksData,
  validateBooksDataPartial,
} from '../middlewares/book.middleware';

const bookRouter = Router();

// Routes
bookRouter.get('/books', authMiddleware, BookController.getAllBooks);
bookRouter.get('/books/:id', authMiddleware, BookController.getOneBook);
bookRouter.get(
  '/books/:id/export',
  authMiddleware,
  BookController.exportBookToCSV
);
bookRouter.post(
  '/books',
  authMiddleware,
  validateBooksData,
  BookController.setBook
);
bookRouter.patch(
  '/books/:id',
  authMiddleware,
  validateBooksDataPartial,
  BookController.updateBook
);
bookRouter.delete('/books/:id', authMiddleware, BookController.deleteBook);

export default bookRouter;
