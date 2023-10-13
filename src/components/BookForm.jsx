'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card } from './ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

import waitAsync from '@/lib/wait';

const formSchema = z.object({
  title: z.string().min(5, 'The TITLE field is required to have a minimum length of 5 characters.'),
  author: z.string().min(5, 'The AUTHOR field is required to have a minimum length of 5 characters.'),
  description: z.string().min(5, 'The DESCRIPTION field is required to have a minimum length of 5 characters.'),
  publicationYear: z.string().min(4, 'Enter a valid year'),
  isbn: z.string().min(13, 'The ISBN field is required to have a minimum length of 13 characters.'),
  imageUrl: z.string().url(),
});

const BookForm = ({ editForm, editData, id }) => {
  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editForm ? editData.title : '',
      author: editForm ? editData.author : '',
      description: editForm ? editData.description : '',
      publicationYear: editForm ? `${editData.publicationYear}` : '',
      isbn: editForm ? editData.isbn : '',
      imageUrl: editForm ? editData.imageUrl : '',
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values) => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/`;
    let method = 'POST';
    let successMessage = '';

    if (editForm) {
      url += id;
      method = 'PATCH';
      successMessage = 'You have successfully updated your book!';
    } else {
      url += 'new';
      successMessage = 'You have successfully added a new book!';
    }

    const response = await fetch(url, {
      method,
      body: JSON.stringify({ ...values, publicationYear: +values.publicationYear }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (response.status === 201 || response.status === 202) {
      const data = await response.json();
      const bookData = data.book;

      const { dismiss } = toast({
        title: 'Success!',
        description: successMessage,
      });
      await waitAsync(3000);
      dismiss();
      router.refresh();
      router.replace(`/book/${bookData.id}`);
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

  const onCancel = (e) => {
    e.stopPropagation();
    router.back();
  };

  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the title of the book" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the author of the book" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the ISBN of the book" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publicationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Publication</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the year of the book publication" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Book Cover Image Link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter the description of the book" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" className="mr-4" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{editForm ? 'Edit Book' : 'Add New Book'}</Button>
        </form>
      </Form>
    </Card>
  );
};

export default BookForm;
