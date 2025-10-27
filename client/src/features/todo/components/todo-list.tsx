import { cn } from '@/lib/utils';
import { Separator } from '@/ui/separator';
import { formatDistanceToNowStrict } from 'date-fns';

interface TodoItem {
  todoId: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoList {
  todoListId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  todo: TodoItem[];
}

export function TodoItemComponent({
  todo,
  className,
}: {
  todo: TodoItem;
  className?: string;
}) {
  return (
    <div className={cn('hover:bg-muted rounded-md', className)}>
      <span>{todo.content}</span>
    </div>
  );
}

export function TodoListComponent({
  todoList,
  className,
}: {
  todoList: TodoList;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-secondary flex h-fit w-1/4 flex-col gap-2 rounded-md p-4',
        className,
      )}
    >
      <h1 className='text-xl font-semibold'>{todoList.title}</h1>
      <Separator />
      {todoList.todo &&
        todoList.todo.map((todo: TodoItem) => (
          <TodoItemComponent todo={todo} />
        ))}
      <span className='text-muted-foreground text-sm'>
        {formatDistanceToNowStrict(todoList.updatedAt)} ago
      </span>
    </div>
  );
}
