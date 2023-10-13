import AllBooks from '@/components/AllBooks';

export default function Home({ params, searchParams }) {
  return (
    <main className="bg-secondary text-foreground flex min-h-screen flex-col items-center p-6 md:p-12">
      <h2 className={`mb-6 text-2xl font-semibold`}>All available Books</h2>
      <AllBooks searchParams={searchParams} />
    </main>
  );
}
