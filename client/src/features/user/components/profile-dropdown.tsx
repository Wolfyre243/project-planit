import { AuthLogoutButton } from '@/features/auth/components/logout-btn';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Separator } from '@/ui/separator';
import { Settings } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/ui/button';

export function UserProfileDropdown() {
  // const { data, isLoading } = useGetPrivateProfileQuery();
  const username = 'placeholder';
  const email = 'test@gmail.com';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer rounded-full'>
        <Avatar className='size-8 outline-2'>
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='flex w-(--radix-dropdown-menu-trigger-width) min-w-56 flex-col gap-2 rounded-md p-2'
        align='end'
        sideOffset={4}
      >
        {/* Header */}
        <div className='flex flex-col gap-1 px-1'>
          <h1>{username}</h1>
          <span className='text-muted-foreground text-sm'>
            {email}
          </span>
        </div>
        <Separator />
        <div className='flex flex-col'>
          <Button asChild type='button' size={'sm'} variant={'ghost'} className='justify-baseline px-1!'>
            <Link
              to={'/profile'}
              className='flex flex-row items-center gap-2 text-sm'
            >
              <Settings className='size-4' />
              Settings
            </Link>
          </Button>
        </div>
        <Separator />
        <AuthLogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
