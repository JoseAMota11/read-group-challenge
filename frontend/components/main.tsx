import { getAllBooks } from '@/services/book.service';
import Card from './card';

async function Main() {
  const { books } = await getAllBooks();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
      {books.map((book) => (
        <Card key={book.id} {...book} />
      ))}
    </div>
  );
}

export default Main;
