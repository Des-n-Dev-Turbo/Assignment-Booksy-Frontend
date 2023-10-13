import { fetchBookDetails } from '@/components/BookDetails';
import BookForm from '@/components/BookForm';

const BookEditPage = async ({ params }) => {
  const id = params.id;

  const bookData = await fetchBookDetails(id);

  return (
    <main className="bg-secondary text-foreground flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <BookForm editForm editData={bookData} id={id} />
    </main>
  );
};

export default BookEditPage;
