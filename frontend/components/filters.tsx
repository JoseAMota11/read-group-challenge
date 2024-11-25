'use client';

import { useFilters } from '@/context/filters.context';
import { Input, InputNumber, Select } from 'antd';

function Filters() {
  const { handleSetFilters } = useFilters();

  return (
    <section className="flex justify-center">
      <div className="w-[800px]">
        <div>
          <Input
            size="large"
            placeholder="Ej: Don Quijote de la Mancha"
            onChange={(e) => handleSetFilters('title', e.target.value)}
          />
        </div>
        <div className="flex flex-1 gap-4 *:w-full [&>div>h4]:font-semibold">
          <div>
            <h4>Autor</h4>
            <Input
              size="large"
              placeholder="Ej: Miguel de Cervantes"
              onChange={(e) => handleSetFilters('author', e.target.value)}
            />
          </div>
          <div>
            <h4>Año</h4>
            <InputNumber
              size="large"
              placeholder="Ej: 1605"
              style={{ width: '100%' }}
              onChange={(value) => handleSetFilters('year', value as string)}
            />
          </div>
          <div>
            <h4>Género</h4>
            <Select
              size="large"
              placeholder="Ej: Aventura"
              style={{ width: '100%' }}
              onSelect={(value) => handleSetFilters('genre', value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filters;
