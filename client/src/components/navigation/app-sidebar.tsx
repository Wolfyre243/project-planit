import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/ui/sidebar';
import { NavGroup, NavGroupSecondary } from './nav-group';
import { SideBarNavFooterItems, SideBarNavItems } from '@/config/nav.config';
import { AppSidebarHeader } from './sidebar-header';

export function AppSidebar() {
  return (
    <Sidebar variant='sidebar' collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppSidebarHeader />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup items={SideBarNavItems} />
        <NavGroupSecondary items={SideBarNavFooterItems} className='mt-auto'/>
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
    </Sidebar>
  );
}
