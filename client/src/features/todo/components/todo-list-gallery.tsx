import { useGetAllTodoListsQuery } from '../state/todo-api-slice';
import { NewTodoList } from './new-todo-list';
import { TodoListComponent } from './todo-list';

export function TodoListGallery() {
  const { data, isLoading } = useGetAllTodoListsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='h-fit w-full grid grid-cols-4 gap-4'>
      {!isLoading && (!data?.data || data?.data.length === 0) && (
        <div>No todo lists found.</div>
      )}
      {!isLoading &&
        data &&
        data?.data?.map((todoList) => (
          <TodoListComponent key={crypto.randomUUID()} todoList={todoList} />
        ))}
      <NewTodoList />
    </div>
  );
}
