import { useGetAllTodoListsQuery } from '../state/todo-api-slice';
import { TodoListComponent } from './todo-list';

export function TodoListGallery() {
  const { data, isLoading } = useGetAllTodoListsQuery();

  return (
    <div className='h-full flex w-full flex-row flex-wrap gap-4'>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (!data?.data || data?.data.length === 0) && (
        <div>No todo lists found.</div>
      )}
      {!isLoading &&
        data &&
        data?.data?.map((todoList) => (
          <TodoListComponent key={crypto.randomUUID()} todoList={todoList} />
        ))}
    </div>
  );
}
