'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form';
import { Input } from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLoginMutation } from '../state/auth-api-slice';
import { toast } from 'sonner';
import { redirect } from 'react-router';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { setAccessToken, setUserId } from '../state/auth-slice';
import { jwtDecode } from 'jwt-decode';

const formSchema = z.object({
  email: z
    .email({
      error: 'Please enter a valid email.',
    })
    .max(255),
  password: z.string().max(255),
});

export function LoginForm({ className }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleLogin(data: z.infer<typeof formSchema>) {
    // TODO Bad fix
    let hasError = false;
    try {
      const responseData = await login(data).unwrap();
      const accessToken = responseData.data.accessToken;

      dispatch(setAccessToken(accessToken));

      const payload: { id: string; roleId: number } =
        await jwtDecode(accessToken);
      dispatch(setUserId(payload.id));
    } catch (error) {
      console.log(error);
      toast.error('Invalid login credentials');
      hasError = true;
    }

    if (!hasError) {
      redirect('/');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className={cn('flex flex-col gap-6', className)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' type='email' {...field} />
              </FormControl>
              {/* <FormDescription>
                  Your email will never be shown to the public.
                </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO: Add password requirements and show them here */}
        <div className='flex flex-col gap-2'>
          <div className='flex w-full flex-row items-end gap-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='flex flex-row justify-between'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your password'
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              variant={'default'}
              size={'icon'}
              className='text-accent-foreground cursor-pointer bg-transparent px-2 py-1 hover:bg-transparent'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </Button>
          </div>
          <Link
            to={'/'}
            className='text-muted-foreground text-sm font-normal'
          >
            Forgot Password?
          </Link>
        </div>
        <Button type='submit' disabled={isLoading}>
          Login
        </Button>
      </form>
    </Form>
  );
}
