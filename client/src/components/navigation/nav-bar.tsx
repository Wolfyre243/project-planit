import { LandingPageNavItems, type NavItem } from '@/config/nav.config';
import { DynamicAuthButtons } from '@/features/auth/components/dynamic-auth-buttons';
import { Link } from 'react-router';

function NavBarItem({ navItem }: { navItem: NavItem }) {
  return (
    <div className='rounded-md px-2 py-1'>
      <Link
        to={navItem.url}
        className='text-muted-foreground hover:text-foreground text-base font-medium transition-all duration-200 ease-in-out'
      >
        {navItem.title}
      </Link>
    </div>
  );
}

export function MainNavBar() {
  return (
    <div className='bg-background sticky top-0 flex w-full flex-row items-center justify-between py-2 px-4'>
      {/* TODO: To be replaced by logo */}
      <Link to={'/'} className='p-1'>
        <h1 className='text-2xl font-semibold'>PlanIt</h1>
      </Link>
      {/* Nav Items */}
      <nav className='flex flex-row w-full justify-center items-center gap-8'>
        {LandingPageNavItems.map((navItem: NavItem) => (
          <NavBarItem navItem={navItem} key={crypto.randomUUID()} />
        ))}
      </nav>
      {/* Auth Buttons / Profile, depends on logged in or not */}
      <div className='flex flex-row gap-1 items-center'>
        {/* <ThemeToggler /> */}
        <DynamicAuthButtons />
      </div>
    </div>
  );
}
