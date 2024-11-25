'use client';

import { Filters } from '@/context/filters.context';
import { Book } from '@/types/book.type';
import { API_URL } from '@/utils/constants';
import { getToken } from '@/utils/cookies-handlers';

export type Response = {
  books: Book[];
  pagination: {
    total: number;
    current: number;
    totalPages: number;
    size: number;
  };
};

export const getAllBooks = async (filters?: Filters) => {
  const url = new URL(`${API_URL}/books`);

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + getToken(),
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
      Authorization: 'Bearer ' + getToken(),
    },
  });

  if (!res.ok) {
    const { error }: { error: string } = await res.json();
    return [error, undefined] as const;
  }

  const data = await res.json();
  return [undefined, data as Book] as const;
};
