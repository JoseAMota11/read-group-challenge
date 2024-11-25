'use client';

import { getAllBooks, Response } from '@/services/book.service';
import Card from './card';
import { useEffect, useState } from 'react';
import { Book } from '@/types/book.type';
import { useFilters } from '@/context/filters.context';
import { Pagination } from 'antd';

function Main() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Response['pagination']>();
  const { filters, handleSetFilters } = useFilters();

  useEffect(() => {
    (async () => {
      const { books, pagination } = await getAllBooks(filters);

      setBooks(books);
      setPagination(pagination);
    })();
  }, [filters]);

  const handlePageChange = (page: number, pageSize: number) => {
    handleSetFilters({ current: String(page), size: String(pageSize) });
  };

  const handlePageSizeChange = (_: number, pageSize: number) => {
    handleSetFilters({ current: '1', size: String(pageSize) });
  };

  return (
    <main className="flex flex-col items-center gap-4">
      <div className="w-[800px] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {books.map((book) => (
          <Card key={book.id} {...book} />
        ))}
      </div>
      <Pagination
        current={pagination?.current}
        total={pagination?.total}
        pageSize={pagination?.size}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        pageSizeOptions={[2, 5, 10, 20]}
        showSizeChanger
      />
    </main>
  );
}

export default Main;
