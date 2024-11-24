import Filters from '@/components/filters';
import Footer from '@/components/footer';
import Main from '@/components/main';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <Navbar />
      <Filters />
      <Main />
      <Footer />
    </div>
  );
}
