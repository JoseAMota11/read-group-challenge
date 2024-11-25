'use client';

import { deleteBook, getOneBook, updateBook } from '@/services/book.service';
import { Book } from '@/types/book.type';
import { DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Tag, Tooltip } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import booksGenresOptions from '@/books-genres.json';
import { useMessage } from '@/context/message.context';
import { usePathname, useRouter } from 'next/navigation';

type PageProps = {
  params: { id: string };
};

function DetailsBookPage({ params }: PageProps) {
  const { id } = params;
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    (async () => {
      const [_error, book] = await getOneBook(id);

      setBook(book);
    })();
  }, [id]);

  if (book) {
    const { title, coverImage, author, genre } = book;

    return (
      <div className="grid place-content-center py-4">
        <div className="w-[400px] flex flex-col items-center gap-4">
          <ActionBar book={book} setBook={setBook} />
          <Genres genre={genre} />
          <h3 className="text-xl font-semibold">{title}</h3>
          <img
            src={coverImage}
            alt={title}
            className="w-full rounded-lg shadow-lg"
          />
          <p>Autor: {author}</p>
        </div>
      </div>
    );
  }
}

export default DetailsBookPage;

function Genres({ genre }: { genre: string[] }) {
  const transformedGenre: string[] = [];

  booksGenresOptions.forEach(({ value, label }) => {
    if (genre.includes(value)) {
      transformedGenre.push(label);
    }
  });

  return (
    <div className="w-full">
      {transformedGenre.map((value) => (
        <Tag key={value} className="text-lg">
          {value}
        </Tag>
      ))}
    </div>
  );
}

function ActionBar({
  book,
  setBook,
}: {
  book: Book;
  setBook: Dispatch<SetStateAction<Book | undefined>>;
}) {
  const messageApi = useMessage();
  const router = useRouter();
  const pathname = usePathname();

  const handleEdit = () => {
    router.push(pathname + '/edit');
  };

  const handleDelete = async () => {
    const [error, message] = await deleteBook(book.id);

    if (error) {
      messageApi.error(error);
    } else {
      messageApi.success(message);
      router.replace('/');
    }
  };

  const handleFavorite = async () => {
    const [error] = await updateBook(book.id, {
      isFavorite: !book.isFavorite,
    });

    if (error) {
      messageApi.error(error);
    } else {
      messageApi.info(
        `Libro ${book.isFavorite ? 'eliminado de' : 'añadido a'} favoritos.`
      );
      const [_error, updatedBook] = await getOneBook(book.id);
      setBook(updatedBook);
    }
  };

  return (
    <div className="w-full flex items-center justify-end gap-2">
      <Tooltip title="Editar" color="#3b82f6">
        <Button
          type="text"
          className="hover:text-blue-500"
          icon={<EditOutlined className="text-xl" />}
          onClick={handleEdit}
        />
      </Tooltip>
      <Tooltip title="Borrar" color="#ef4444">
        <Button
          type="text"
          className="hover:text-red-500"
          icon={<DeleteOutlined className="text-xl" />}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip
        title={book.isFavorite ? 'Borrar de favoritos' : 'Añadir a favoritos'}
        color="#eab308"
      >
        <Button
          type="text"
          className={
            book.isFavorite ? 'text-yellow-500' : 'hover:text-yellow-500'
          }
          icon={<StarOutlined className="text-xl" />}
          onClick={handleFavorite}
        />
      </Tooltip>
    </div>
  );
}
