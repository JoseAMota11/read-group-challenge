'use client';

import { useFilters } from '@/context/filters.context';
import { Button, Input, InputNumber, Select } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import booksGenresOptions from '@/books-genres.json';

function Filters({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const { handleSetFilters } = useFilters();

  return (
    <section className="flex justify-center">
      <div className="w-[800px] flex flex-col gap-2">
        <div>
          <Input
            size="large"
            placeholder="Ej: Don Quijote de la Mancha"
            onChange={(e) =>
              handleSetFilters({ title: e.target.value, current: '1' })
            }
          />
        </div>
        <div className="flex flex-1 gap-4 *:w-full [&>div>h4]:font-semibold">
          <div>
            <h4>Autor</h4>
            <Input
              size="large"
              placeholder="Ej: Miguel de Cervantes"
              onChange={(e) =>
                handleSetFilters({ author: e.target.value, current: '1' })
              }
            />
          </div>
          <div>
            <h4>Año</h4>
            <InputNumber
              size="large"
              placeholder="Ej: 1605"
              style={{ width: '100%' }}
              onChange={(value) =>
                handleSetFilters({ year: value as string, current: '1' })
              }
            />
          </div>
          <div>
            <h4>Género</h4>
            <Select
              size="large"
              placeholder="Ej: Aventura"
              style={{ width: '100%' }}
              options={booksGenresOptions}
              showSearch
              allowClear
              onSelect={(value) =>
                handleSetFilters({ genre: value, current: '1' })
              }
              onClear={() =>
                handleSetFilters({ genre: undefined, current: '1' })
              }
            />
          </div>
        </div>
        <div className="self-end">
          <Button type="primary" size="large" onClick={() => setOpen(true)}>
            Añadir libro
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Filters;
