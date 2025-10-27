import { TodoListGallery } from "@/features/todo/components/todo-list-gallery";

export default function DashboardHomePage() {
  return (
    <div className='flex flex-col h-full w-full p-6'>
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <TodoListGallery />
    </div>
  );
}
