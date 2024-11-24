import db from '../config/db';
import { Review } from '../types/review.type';

export class ReviewModel {
  static findAll(bookId: string) {
    const stmt = db.prepare(`
      SELECT 
        r.id,
        r.rating,
        r.comment,
        r.createdAt,
        u.username AS reviewer
      FROM Reviews r
      JOIN Users u ON r.userId = u.id
      WHERE r.bookId = ?
      ORDER BY r.createdAt DESC
    `);

    return stmt.all(bookId) as Review[];
  }

  static create(review: Review) {
    const { bookId, userId, rating, comment } = review;

    const bookExists = db
      .prepare('SELECT 1 FROM Books WHERE id = ?')
      .get(bookId);

    if (!bookExists) {
      throw new Error('El libro no existe.');
    }

    const userExists = db
      .prepare('SELECT 1 FROM Users WHERE id = ?')
      .get(userId);

    if (!userExists) {
      throw new Error('El usuario no existe.');
    }

    const id = crypto.randomUUID();
    const stmt = db.prepare(
      `INSERT INTO Reviews (
        id,
        bookId,
        userId,
        rating,
        comment
      ) VALUES (?, ?, ?, ?, ?)`
    );

    try {
      const info = stmt.run(id, bookId, userId, rating, comment);

      return { changes: Boolean(info.changes) };
    } catch (error) {
      throw new Error(
        'No se pudo guardar la reseña. Inténtalo de nuevo más tarde.'
      );
    }
  }

  static update(id: string, review: Review) {
    const { bookId, userId, rating, comment } = review;

    const stmt = db.prepare(
      `UPDATE Reviews 
       SET rating = ?, comment = ? 
       WHERE bookId = ? AND id = ? AND userId = ?`
    );

    try {
      const info = stmt.run(rating, comment, bookId, id, userId);

      return { changes: Boolean(info.changes) };
    } catch (error) {
      throw new Error(
        'No se pudo actualizar la reseña. Inténtalo de nuevo más tarde.'
      );
    }
  }

  static delete(id: string, userId: string) {
    const stmt = db.prepare('DELETE FROM Reviews WHERE id = ? AND userId = ?');
    const info = stmt.run(id, userId);

    return { changes: Boolean(info.changes) };
  }
}
