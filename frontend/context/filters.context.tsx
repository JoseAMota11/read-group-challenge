'use client';

import debounce from 'lodash.debounce';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

type FiltersContextType = {
  filters: Filters;
  handleSetFilters: (filters: Filters) => void;
};

const filtersContext = createContext<FiltersContextType | null>(null);

export type Filters = {
  title?: string;
  author?: string;
  year?: string;
  genre?: string;
  current?: string;
  size?: string;
};

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>({});

  const handleSetFilters = useCallback(
    debounce((filters: Filters) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...filters }));
    }, 400),
    []
  );

  return (
    <filtersContext.Provider value={{ filters, handleSetFilters }}>
      {children}
    </filtersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(filtersContext);

  if (!context) {
    throw new Error(
      'useFilters solo puede ser usado dentro de FiltersProvider'
    );
  }

  const { filters, handleSetFilters } = context;

  return { filters, handleSetFilters };
}
