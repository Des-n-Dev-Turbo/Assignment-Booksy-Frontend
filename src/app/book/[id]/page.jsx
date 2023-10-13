import BookDetails from '@/components/BookDetails';

export const dynamic = 'force-dynamic';

const BookDetailsPage = ({ params }) => {
  const id = params.id;

  return (
    <main className="bg-secondary text-foreground flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <BookDetails id={id} />
    </main>
  );
};

export default BookDetailsPage;
