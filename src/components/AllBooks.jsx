import Link from 'next/link';

import { Card } from './ui/card';
import { Button } from './ui/button';
import { StepBack, StepForward } from 'lucide-react';

import BookCard from './BookCard';

const fetchAllBooks = async (page) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books?page=${page}`, {
    cache: 'no-store',
  });

  if (res.ok) {
    const booksData = await res.json();

    const totalPages = Math.ceil(booksData.totalItems / 6);

    return {
      books: booksData.books,
      prevPage: page === 1 ? null : page - 1,
      nextPage: page === totalPages ? null : page + 1,
    };
  } else {
    console.log('Error');
    return await res.json().message;
  }
};

const AllBooks = async ({ searchParams }) => {
  const page = +searchParams.page || 1;

  const response = await fetchAllBooks(page);

  if (typeof response === 'string') {
    return (
      <section className="flex flex-col items-center w-full h-auto bg-card rounded-md">
        <h1 className={`mb-6 text-2xl font-semibold`}>{response}</h1>
      </section>
    );
  }

  const { books, prevPage, nextPage } = response;

  return (
    <section className="flex flex-col items-center w-full h-auto bg-card rounded-md">
      <div className="flex flex-wrap items-center w-full h-full justify-evenly md:gap-4 p-6 rounded-lg">
        {books.map((book) => (
          <BookCard key={book.id} imageUrl={book.imageUrl} book={book} />
        ))}
      </div>
      <Card className="my-6 flex flex-row items-center justify-evenly gap-4 py-4 px-6 bg-background rounded-[999px] ">
        {prevPage && (
          <Link href={`/?page=${prevPage}`}>
            <Button variant="outline" size="icon" className="rounded-full bg-primary">
              <StepBack />
            </Button>
          </Link>
        )}
        <div className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors  border border-input bg-primary hover:text-accent-foreground h-10 w-10">
          {page}
        </div>
        {nextPage && (
          <Link href={`/?page=${nextPage}`}>
            <Button variant="outline" size="icon" className="rounded-full bg-primary">
              <StepForward />
            </Button>
          </Link>
        )}
      </Card>
    </section>
  );
};

export default AllBooks;
