import { UserProfileDropdown } from '@/features/user/components/profile-dropdown';

export function SiteHeader() {
  // const location = useLocation();

  return (
    <header className='bg-background sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b shadow-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full flex-row-reverse items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <UserProfileDropdown />
      </div>
    </header>
  );
}
