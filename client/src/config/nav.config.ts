export type NavItem = {
  title: string;
  url: string;
  icon?: string; // icon key
};

export const LandingPageNavItems: NavItem[] = [
  {
    title: 'Features',
    url: '/',
  },
  {
    title: 'About',
    url: '/',
  },
  {
    title: 'Contact',
    url: '/',
  },
  {
    title: 'Pricing',
    url: '/',
  },
];

export const SideBarNavItems: NavItem[] = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: 'home'
  },
];

export const SideBarNavFooterItems: NavItem[] = [
  {
    title: 'Help & Support',
    url: '/',
    icon: 'help'
  },
  {
    title: 'Feedback',
    url: '/',
    icon: 'feedback'
  },
];
