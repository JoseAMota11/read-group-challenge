import { getOneBook } from '@/services/book.service';

type PageProps = {
  params: { id: string };
};

async function DetailsBookPage({ params }: PageProps) {
  const { id } = params;

  const [error, book] = await getOneBook(id);

  if (error) {
    return <div>Error: 404</div>;
  }

  if (book) {
    const { title, coverImage } = book;

    return (
      <div className="flex flex-col items-center gap-2 py-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <img
          src={coverImage}
          alt={title}
          className="w-[400px] rounded-lg shadow-lg"
        />
      </div>
    );
  }
}

export default DetailsBookPage;
