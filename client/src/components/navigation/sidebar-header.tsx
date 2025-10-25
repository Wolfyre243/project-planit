import { cn } from "@/lib/utils";
import { SidebarTrigger, useSidebar } from "@/ui/sidebar";

export function AppSidebarHeader() {
  const { state } = useSidebar();

  return (
    <div className='flex h-full w-fit flex-row items-center gap-2 py-1'>
      <div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
        <SidebarTrigger />
      </div>
      <div
        className={cn(
          'flex flex-col text-left text-lg leading-tight',
          state === 'collapsed' && 'hidden',
        )}
      >
        <h1 className='font-medium'>PlanIt</h1>
      </div>
    </div>
  );
}