export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string[];
  coverImage?: string;
  rating?: number;
  isFavorite: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type BooksFilters = Pick<Book, 'author' | 'year' | 'genre'> & {
  current: number;
  size: number;
};
