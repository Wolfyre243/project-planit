import { toast } from 'sonner';
import { useLogoutMutation } from '../state/auth-api-slice';
import { LogOut } from 'lucide-react';
import { Button } from '@/ui/button';

export function AuthLogoutButton() {
  const [logout, { isError }] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log(error);
      toast.error('Error logging out');
    }

    if (!isError) {
      window.location.reload();
    }
  }

  return (
    <Button
      type='button'
      size={'sm'}
      variant={'ghost'}
      onClick={handleLogout}
      className='flex flex-row text-red-400 justify-baseline px-1!'
    >
      <LogOut className='size-4' />
      Log Out
    </Button>
  );
}
