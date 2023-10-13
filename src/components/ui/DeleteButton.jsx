'use client';
import { useRouter } from 'next/navigation';

import { Trash2 } from 'lucide-react';
import { Button } from './button';
import { useToast } from './use-toast';
import waitAsync from '@/lib/wait';

const DeleteButton = ({ id }) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/${id}`;
  const { toast } = useToast();
  const router = useRouter();

  const onDelete = async () => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (response.status === 202) {
      const data = await response.json();
      const bookData = data.book;

      const { dismiss } = toast({
        title: 'Success!',
        description: `You have successfully deleted the book with ID - ${bookData.id}`,
      });
      await waitAsync(2000);
      dismiss();
      router.replace('/');
    } else {
      const data = await response.json();

      const { dismiss } = toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: data.message,
      });
      await waitAsync(2000);
      dismiss();
      router.replace('/');
    }
  };

  return (
    <Button variant="outline" size="icon" className="mb-6 text-red-400 hover:text-red-600" onClick={onDelete}>
      <Trash2 />
    </Button>
  );
};

export default DeleteButton;
