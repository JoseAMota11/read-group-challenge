'use client';

import { getOneBook } from '@/services/book.service';
import { Book } from '@/types/book.type';
import { useEffect, useState } from 'react';

type PageProps = {
  params: { id: string };
};

function DetailsBookPage({ params }: PageProps) {
  const { id } = params;
  const [book, setBook] = useState<Book>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      const [error, book] = await getOneBook(id);

      setError(error);
      setBook(book);
    })();
  }, [id]);

  if (error) {
    return <div>Error: 404</div>;
  }

  if (book) {
    const { title, coverImage, author } = book;

    return (
      <div className="flex flex-col items-center gap-2 py-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <img
          src={coverImage}
          alt={title}
          className="w-[400px] rounded-lg shadow-lg"
        />
        <p>Autor: {author}</p>
      </div>
    );
  }
}

export default DetailsBookPage;
