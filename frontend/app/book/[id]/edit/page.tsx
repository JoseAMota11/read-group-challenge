'use client';

import { useMessage } from '@/context/message.context';
import { bookSchema } from '@/schemas/book.shema';
import { getOneBook, updateBook } from '@/services/book.service';
import { Book } from '@/types/book.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, InputNumber, Select } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import booksGenresOptions from '@/books-genres.json';

function EditBookPage() {
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookSchema),
  });
  const messageApi = useMessage();
  const router = useRouter();

  const onValid: SubmitHandler<FieldValues> = async (values) => {
    const data = { ...values, userId: id };

    const [error, message] = await updateBook(id as string, data as Book);

    if (error) {
      messageApi.error(error);
    } else {
      messageApi.success(message);
      router.replace('/');
    }
  };

  useEffect(() => {
    (async () => {
      const [_error, book] = await getOneBook(id as string);

      for (const key in book) {
        setValue(key, book[key as keyof Book]);
      }
    })();
  }, [id, setValue]);

  return (
    <div className="h-screen grid place-content-center">
      <form
        onSubmit={handleSubmit(onValid, (errors) => console.log(errors))}
        className="bg-white p-4 rounded-lg shadow-lg grid grid-cols-[auto,300px] gap-4 items-center"
      >
        <h2 className="col-span-full text-lg font-semibold">
          Actualizar libro
        </h2>
        <label htmlFor="title">Título:</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={field.name}
              placeholder="Ej: Don Quijote de la Mancha"
              status={errors.title && 'error'}
            />
          )}
        />
        <label htmlFor="author">Autor:</label>
        <Controller
          name="author"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={field.name}
              placeholder="Ej: Miguel de Cervantes"
              status={errors.author && 'error'}
            />
          )}
        />
        <label htmlFor="year">Año:</label>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              id={field.name}
              min={1000}
              max={9999}
              placeholder="Ej: 1605"
              style={{ width: '100%' }}
              status={errors.year && 'error'}
            />
          )}
        />
        <label htmlFor="genre">Género:</label>
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              id={field.name}
              mode="multiple"
              placeholder="Ej: Aventura, Acción, etc."
              status={errors.genre && 'error'}
              options={booksGenresOptions}
            />
          )}
        />
        <label htmlFor="coverImage">Imagen URL:</label>
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={field.name}
              placeholder="Ej: https://example.image.com/"
            />
          )}
        />
        <label htmlFor="rating">Calificación:</label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              id={field.name}
              min={1}
              max={5}
              placeholder="Ej: 5/5"
              style={{ width: '100%' }}
            />
          )}
        />
        <label htmlFor="isFavorite">Favorito:</label>
        <Controller
          name="isFavorite"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value} id={field.name} />
          )}
        />
        <div className="col-span-full w-full flex justify-end">
          <Button type="primary" htmlType="submit">
            Actualizar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditBookPage;
