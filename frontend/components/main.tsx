'use client';

import { getAllBooks } from '@/services/book.service';
import Card from './card';
import { useEffect, useState } from 'react';
import { Book } from '@/types/book.type';
import { useFilters } from '@/context/filters.context';

function Main() {
  const [books, setBooks] = useState<Book[]>([]);
  const { filters } = useFilters();

  useEffect(() => {
    (async () => {
      const { books } = await getAllBooks(filters);

      setBooks(books);
    })();
  }, [filters]);

  return (
    <main className="flex justify-center">
      <div className="w-[800px] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {books.map((book) => (
          <Card key={book.id} {...book} />
        ))}
      </div>
    </main>
  );
}

export default Main;
