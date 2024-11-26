'use client';

import { Book } from '@/types/book.type';
import { useRouter } from 'next/navigation';
import React from 'react';
import ImagePlaceholder from './image-placeholder';

function Card({ id, title, coverImage }: Book) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`book/${id}`)}
      className="bg-white dark:bg-neutral-800 flex flex-col items-center gap-2 p-2 rounded-xl shadow-xl cursor-pointer card select-none"
    >
      {coverImage ? (
        <img
          src={coverImage}
          alt={title}
          className="w-full object-cover aspect-[9/16] rounded-lg"
        />
      ) : (
        <ImagePlaceholder />
      )}
      <h2 className="text-center font-medium max-[500px]:text-sm">{title}</h2>
    </div>
  );
}

export default Card;
