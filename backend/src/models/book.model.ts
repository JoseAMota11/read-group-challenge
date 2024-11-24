import db from '../config/db';
import { Book, BooksFilters } from '../types/book.type';

export class BookModel {
  static findAll(userId: string, filters?: BooksFilters) {
    let query = 'SELECT * FROM Books';
    const conditions: string[] = ['userId = @userId'];
    const params: any = { userId };

    if (filters?.author) {
      conditions.push('author LIKE @author');
      params.author = `%${filters.author}%`;
    }
    if (filters?.year) {
      conditions.push('year = @year');
      params.year = filters.year;
    }
    if (filters?.genre) {
      conditions.push('genre LIKE @genre');
      params.genre = `%"${filters.genre}"%`;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY createdAt DESC';

    const stmt = db.prepare(query);
    const books = stmt.all(params) as Book[];

    return books.map(({ genre, isFavorite, ...rest }) => ({
      ...rest,
      isFavorite: Boolean(isFavorite),
      genre: JSON.parse(genre as any as string),
    }));
  }

  static findOneById(id: string, userId: string) {
    const stmt = db.prepare(`SELECT * FROM Books WHERE id = ? AND userId = ?`);
    const book = stmt.get(id, userId) as Book | undefined;

    if (!book) {
      return undefined;
    }

    const { genre, isFavorite, ...rest } = book;

    return {
      ...rest,
      isFavorite: Boolean(isFavorite),
      genre: JSON.parse(genre as any as string),
    };
  }

  static create(book: Book) {
    const {
      title,
      author,
      year,
      genre,
      coverImage,
      rating,
      isFavorite,
      userId,
    } = book;

    const userExists = db
      .prepare('SELECT 1 FROM Users WHERE id = ?')
      .get(userId);

    if (!userExists) {
      throw new Error('El usuario no existe.');
    }

    const id = crypto.randomUUID();
    const stmt = db.prepare(
      `INSERT INTO Books (
        id,
        title,
        author,
        year,
        genre,
        coverImage,
        rating,
        isFavorite,
        userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    try {
      const info = stmt.run(
        id,
        title,
        author,
        year,
        JSON.stringify(genre),
        coverImage,
        rating,
        Number(isFavorite),
        userId
      );

      return { changes: Boolean(info.changes) };
    } catch (error) {
      throw new Error(
        'No se pudo crear el libro. Inténtalo de nuevo más tarde.'
      );
    }
  }

  static update(id: string, book: Book) {
    const {
      title,
      author,
      year,
      genre,
      coverImage,
      rating,
      isFavorite,
      userId,
    } = book;

    const stmt = db.prepare(
      `UPDATE Books 
       SET title = ?, author = ?, year = ?, genre = ?, coverImage = ?, rating = ?, isFavorite = ? 
       WHERE userId = ? AND id = ?`
    );

    try {
      const info = stmt.run(
        title,
        author,
        year,
        JSON.stringify(genre),
        coverImage,
        rating,
        Number(isFavorite),
        userId,
        id
      );

      return { changes: Boolean(info.changes) };
    } catch (error) {
      throw new Error(
        'No se pudo actualizar el libro. Inténtalo de nuevo más tarde.'
      );
    }
  }

  static delete(id: string, userId: string) {
    const stmt = db.prepare('DELETE FROM Books WHERE id = ? AND userId = ?');
    const info = stmt.run(id, userId);

    return { changes: Boolean(info.changes) };
  }
}
