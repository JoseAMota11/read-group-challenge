import { Book } from '@/types/book.type';
import { URL } from '@/utils/constants';
import { cookies } from 'next/headers';

type Response = {
  books: Book[];
  pagination: {
    total: number;
    current: number;
    totalPages: number;
    size: number;
  };
};

const TOKEN = cookies().get('token');

export const getAllBooks = async () => {
  const res = await fetch(`${URL}/books`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN?.value,
    },
  });
  const result = await res.json();

  return result as Response;
};

export const getOneBook = async (id: string) => {
  const res = await fetch(`${URL}/books/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN?.value,
    },
  });

  if (!res.ok) {
    const { error }: { error: string } = await res.json();
    return [error, undefined] as const;
  }

  const data = await res.json();
  return [undefined, data as Book] as const;
};
