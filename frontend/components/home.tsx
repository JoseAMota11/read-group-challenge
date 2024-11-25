'use client';

import { FiltersProvider } from '@/context/filters.context';
import React, { useState } from 'react';
import Filters from './filters';
import Footer from './footer';
import Navbar from './navbar';
import Main from './main';
import CreateBookModal from './create-book-modal';

function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <FiltersProvider>
        <Navbar />
        <Filters setOpen={setOpen} />
        <Main />
        <Footer />
        <CreateBookModal open={open} setOpen={setOpen} />
      </FiltersProvider>
    </div>
  );
}

export default HomePage;
