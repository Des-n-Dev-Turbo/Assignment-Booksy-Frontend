'use client';
import { useRouter } from 'next/navigation';

import { Button } from './button';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const router = useRouter();

  const onBackClick = () => {
    router.back();
  };

  return (
    <Button variant="outline" size="icon" onClick={onBackClick} className="mb-6">
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
