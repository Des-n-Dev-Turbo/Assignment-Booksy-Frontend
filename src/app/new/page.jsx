import BookForm from '@/components/BookForm';

const BookNewPage = () => {
  return (
    <main className="bg-secondary text-foreground flex min-h-screen flex-col items-center justify-between p-12">
      <BookForm />
    </main>
  );
};

export default BookNewPage;
