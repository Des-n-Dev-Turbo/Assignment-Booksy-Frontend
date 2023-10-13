import Link from 'next/link';
import Image from 'next/image';

import cls from 'classnames';

import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const BookCard = ({ book, imageUrl, searchCard }) => {
  return (
    <Link href={`/book/${book.id}`}>
      <Card
        className={cls('inline-block flex-wrap  w-72 md:w-96 h-[350px] md:h-[300px] bg-accent border-primary my-5', {
          'w-52 h-52 md:w-52 md:h-52': searchCard,
        })}
      >
        {!searchCard && (
          <CardHeader className="items-center">
            <Image
              src={imageUrl || 'https://galapagos-pro.com/wp-content/uploads/2021/03/book-placeholder.jpg'}
              width={100}
              height={150}
              alt={book.title}
            />
          </CardHeader>
        )}

        <CardFooter className={cls('gap-4 flex flex-col md:flex-row', { 'flex-col pt-6 items-start': searchCard })}>
          <div className="flex flex-col flex-wrap">
            <CardTitle className="mb-1">{book.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
          <Badge className={cls({ hidden: searchCard })}>{book.publicationYear}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;
