'use client';
import { useState } from 'react';

import { Loader2, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import BookCard from './BookCard';

const SearchBooks = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const onSearch = async (searchTerm) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/search?searchTerm=${searchTerm}`;
    try {
      setLoading(true);
      const res = await fetch(url, {
        cache: 'no-store',
      });

      setLoading(false);
      const resData = await res.json();

      if (!res.ok) {
        throw resData.message;
      }

      setResults(resData.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className="w-full">
      <div className="flex w-full items-center space-x-2 p-6 mx-auto">
        <Input
          type="text"
          placeholder="Enter the keyword to search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline" size="icon" onClick={(e) => onSearch(search)}>
          <Search />
        </Button>
      </div>
      <div className="w-full p-6 px-8 pt-0 mx-auto text-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {loading ? (
            <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
          ) : results.length === 0 && error ? (
            `No data available with keyword - ${search}`
          ) : (
            'Search for available books'
          )}
        </h3>
        <div className="flex flex-wrap md:gap-4 items-center w-full justify-evenly">
          {!loading && results && !error && results.map((book) => <BookCard book={book} key={book.id} searchCard />)}
        </div>
      </div>
    </Card>
  );
};

export default SearchBooks;
