import { AppSidebar } from '@/components/navigation/app-sidebar';
import { SiteHeader } from '@/components/navigation/site-header';
import { RequireAuth } from '@/features/auth/components/require-auth';
import { SidebarInset, SidebarProvider } from '@/ui/sidebar';
import { Outlet } from 'react-router';

export default function DashboardLayout() {
  return (
    <RequireAuth>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 60)',
            '--header-height': 'calc(var(--spacing) * 13)',
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <main className='flex h-full flex-col'>
            <SiteHeader />
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  );
}
