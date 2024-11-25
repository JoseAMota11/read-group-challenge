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

export const getAllBooks = async () => {
  const token = cookies().get('token');

  const res = await fetch(`${URL}/books`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token?.value,
    },
  });
  const result = await res.json();

  return result as Response;
};

export const getOneBook = async (id: string) => {
  const token = cookies().get('token');

  const res = await fetch(`${URL}/books/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token?.value,
    },
  });

  if (!res.ok) {
    const { error }: { error: string } = await res.json();
    return [error, undefined] as const;
  }

  const data = await res.json();
  return [undefined, data as Book] as const;
};
