import { Button } from '@/ui/button';
import { Link } from 'react-router';

export function AuthLoginButton() {
  return (
    <Button type={'button'} variant={'default'} asChild>
      <Link to={'/auth/login'}>Login</Link>
    </Button>
  );
}

export function AuthSignUpButton() {
  return (
    <Button type={'button'} variant={'outline'} asChild>
      <Link to={'/auth/register'}>Sign Up!</Link>
    </Button>
  );
}