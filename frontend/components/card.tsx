'use client';

import { Book } from '@/types/book.type';
import { useRouter } from 'next/navigation';
import React from 'react';

function Card({ id, title, coverImage }: Book) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`book/${id}`)}
      className="bg-white flex flex-col items-center gap-2 p-2 rounded-xl shadow-xl cursor-pointer"
    >
      <img
        src={coverImage}
        alt={title}
        className="w-full h-[400px] object-cover rounded-lg"
      />
      <h2 className="text-wrap font-medium">{title}</h2>
    </div>
  );
}

export default Card;
