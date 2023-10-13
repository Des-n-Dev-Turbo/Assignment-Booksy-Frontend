import SearchBooks from '@/components/SearchBooks';

const SearchPage = () => {
  return (
    <main className="bg-secondary text-foreground flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <SearchBooks />
    </main>
  );
};

export default SearchPage;
