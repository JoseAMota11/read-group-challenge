import Filters from '@/components/filters';
import Footer from '@/components/footer';
import Main from '@/components/main';
import Navbar from '@/components/navbar';
import { FiltersProvider } from '@/context/filters.context';

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <Navbar />
      <FiltersProvider>
        <Filters />
        <Main />
      </FiltersProvider>
      <Footer />
    </div>
  );
}
