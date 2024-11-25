'use client';

import { Book } from '@/types/book.type';
import React from 'react';

function Card({ title, coverImage }: Book) {
  return (
    <div className="bg-white flex flex-col items-center gap-2 p-2 rounded-xl shadow-xl cursor-pointer">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-full object-cover"
      />
      <h2 className="text-lg text-wrap font-medium">{title}</h2>
    </div>
  );
}

export default Card;
