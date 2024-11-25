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
  handleSetFilters: (key: keyof Filters, value: string) => void;
};

const filtersContext = createContext<FiltersContextType | null>(null);

export type Filters = {
  title?: string;
  author?: string;
  year?: string;
  genre?: string;
};

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    title: undefined,
    author: undefined,
    year: undefined,
    genre: undefined,
  });

  const handleSetFilters = useCallback(
    debounce((key: keyof Filters, value) => {
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
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
