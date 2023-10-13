import Image from 'next/image';

import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import BackButton from './ui/BackButton';
import DeleteButton from './ui/DeleteButton';
import Link from 'next/link';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react';

export const fetchBookDetails = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/book/${id}`, {
    cache: 'no-store',
  });

  if (res.ok) {
    const resData = await res.json();
    const book = resData.book;
    return book;
  } else {
    return await res.json().message;
  }
};

const BookDetails = async ({ id }) => {
  const book = await fetchBookDetails(id);

  return (
    <Card className="w-full">
      <CardHeader className="flex-col px-6">
        <div className="flex justify-between">
          <BackButton />
          <div>
            <Link href={`/edit/${id}`}>
              <Button variant="outline" size="icon" className="mr-4">
                <Pencil />
              </Button>
            </Link>
            <DeleteButton id={id} />
          </div>
        </div>
        <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center border-t-2 pt-4 border-secondary">
          {book.title}
        </h1>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row justify-between mt-4 items-center w-[70%] mx-auto">
        <Image
          src={book.imageUrl || 'https://galapagos-pro.com/wp-content/uploads/2021/03/book-placeholder.jpg'}
          alt={book.title}
          width={200}
          height={350}
          className="text-center md:w-60 md:h-[400px] md:mr-12"
        />
        <div className="flex flex-col items-start grow">
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Author</p>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
              {book.author}
            </h2>
          </div>
          <div className="mt-4 flex flex-row gap-4 items-center">
            <p className="text-sm text-muted-foreground">Year</p>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{book.publicationYear}</h3>
          </div>
          <div className="mt-4 flex flex-row gap-4 items-center">
            <p className="text-sm text-muted-foreground">ISBN</p>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{book.isbn}</h3>
          </div>
        </div>
      </CardContent>
      <CardDescription className="px-6 pb-12 leading-7 max-w-[70%] mx-auto">{book.description}</CardDescription>
    </Card>
  );
};

export default BookDetails;
