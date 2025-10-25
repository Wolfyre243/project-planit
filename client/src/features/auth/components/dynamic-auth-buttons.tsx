import { useAppSelector } from '@/hooks/redux-hooks';
import { AuthLoginButton, AuthSignUpButton } from './auth-buttons';
import { selectAuthState } from '../state/auth-slice';
import { UserProfileDropdown } from '@/features/user/components/profile-dropdown';
import { Link } from 'react-router';
import { Button } from '@/ui/button';

// This component switches between auth buttons and profile dropdown depending on auth state
export function DynamicAuthButtons() {
  const accessToken = useAppSelector(selectAuthState).accessToken;

  if (accessToken)
    return (
      <div className='flex flex-row gap-2'>
        <Button
          asChild
          className='text-muted-foreground text-base font-medium'
          variant={'link'}
          size={'sm'}
        >
          <Link to={'/dashboard'}>Dashboard</Link>
        </Button>
        <UserProfileDropdown />
      </div>
    );

  return (
    <div className='flex flex-row gap-2'>
      <AuthLoginButton />
      <AuthSignUpButton />
    </div>
  );
}
