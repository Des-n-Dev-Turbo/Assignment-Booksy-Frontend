import Image from 'next/image';
import Link from 'next/link';

import DarkMode from './ui/darkMode';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <nav className="px-8 py-6 flex  flex-col gap-4 md:flex-row items-center justify-between bg-primary">
      <Link href="/">
        <div className="flex flex-row justify-between items-center gap-6">
          <Image
            src="/B-Logo.png"
            alt="Booksy Logo"
            width={200}
            height={200}
            className="rounded-full border-2 border-black w-24 h-24"
          />
          <h1 className="scroll-m-20 text-black text-4xl font-extrabold tracking-tight lg:text-5xl">Booksy</h1>
        </div>
      </Link>
      <ul className="flex flex-row justify-evenly items-center gap-5 list-none">
        <Link href="/search">
          <Button variant="outline" size="icon">
            <Search />
          </Button>
        </Link>
        <Link href="/new">
          <Button variant="outline">Add New Book</Button>
        </Link>
        <DarkMode />
      </ul>
    </nav>
  );
};

export default Header;
