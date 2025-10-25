import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form';
import { Input } from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRegisterMutation } from '../state/auth-api-slice';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { setAccessToken, setUserId } from '../state/auth-slice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      error: 'Name has to be more than 2 characters.',
    })
    .max(255),
  email: z
    .email({
      error: 'Please enter a valid email.',
    })
    .max(255),
  password: z
    .string({
      error: 'Please enter a password.',
    })
    .min(8, {
      error: 'Password has to be more than 8 characters.',
    })
    .max(255),
});

export function RegisterForm({ className }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [signup, { isLoading, isError }] = useRegisterMutation();

  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  async function handleRegister(data: z.infer<typeof formSchema>) {
    try {
      const responseData = await signup(data).unwrap();
      const acccessToken = responseData.data.accessToken;

      dispatch(setAccessToken(acccessToken));

      const payload: { id: string; roleId: number } =
        await jwtDecode(acccessToken);
      dispatch(setUserId(payload.id));
    } catch (error) {
      console.log(error);
      // @ts-expect-error why
      toast.error(error.data.message);
      return;
    }

    if (!isError) {
      navigate('/');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className={cn('flex flex-col gap-6', className)}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    placeholder='Enter a secure password'
                    type={showPassword ? 'text' : 'password'}
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

        <Button type='submit' disabled={isLoading}>
          Create Account
        </Button>
      </form>
    </Form>
  );
}
