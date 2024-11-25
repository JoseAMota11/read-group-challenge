import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  author: z.string().min(1, 'El autor es obligatorio'),
  year: z.number().int().min(1000).max(9999),
  genre: z.array(z.string()).min(1, 'Debe incluir al menos un género'),
  coverImage: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
  isFavorite: z.boolean(),
  userId: z.string().uuid(),
});

export const bookSchemaPartial = bookSchema.partial();
