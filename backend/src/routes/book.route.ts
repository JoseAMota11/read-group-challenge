import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import {
  authMiddleware,
  validateBooksData,
} from '../middlewares/book.middleware';

const bookRouter = Router();

// Routes
bookRouter.get('/books', authMiddleware, BookController.getAllBooks);
bookRouter.get('/books/:id', authMiddleware, BookController.getOneBook);
bookRouter.post(
  '/books',
  authMiddleware,
  validateBooksData,
  BookController.setBook
);
bookRouter.put(
  '/books/:id',
  authMiddleware,
  validateBooksData,
  BookController.updateBook
);
bookRouter.delete('/books/:id', authMiddleware, BookController.deleteBook);

export default bookRouter;
