'use client';

import { bookSchema } from '@/schemas/book.shema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, InputNumber, Modal, Select } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import booksGenresOptions from '@/books-genres.json';
import { getTokenDecoded } from '@/utils/cookies-handlers';
import { createBook } from '@/services/book.service';
import { Book } from '@/types/book.type';
import { useMessage } from '@/context/message.context';
import { useFilters } from '@/context/filters.context';

function CreateBookModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(bookSchema) });
  const messageApi = useMessage();
  const { refreshData } = useFilters();

  const onValid: SubmitHandler<FieldValues> = async (values) => {
    const data = { ...values };
    const token = getTokenDecoded();

    if (token) {
      const { id } = token;
      data['userId'] = id;
    }

    const [error, message] = await createBook(data as Book);

    if (error) {
      messageApi.error(error);
    } else {
      messageApi.success(message);
      handleCancel();
      refreshData();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    reset();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={false}
      closeIcon={false}
      className="w-fit dark:[&_.ant-modal-content]:bg-neutral-800"
    >
      <form
        onSubmit={handleSubmit(onValid, (errors) => console.log(errors))}
        className="dark:text-neutral-100 grid grid-cols-[auto,300px] gap-4 items-center max-[500px]:grid-cols-[auto,180px]"
      >
        <h2 className="col-span-full dark:text-neutral-100 text-lg font-semibold">
          Guardar libro
        </h2>
        <label htmlFor="title">Título:</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={field.name}
              placeholder="Don Quijote de la Mancha"
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
              placeholder="Miguel de Cervantes"
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
              placeholder="1605"
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
              placeholder="Aventura, Acción, etc."
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
              placeholder="https://example.image.com/"
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
              placeholder="5"
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
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateBookModal;
