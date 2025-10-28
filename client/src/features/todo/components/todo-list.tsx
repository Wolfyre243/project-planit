import { cn } from '@/lib/utils';
import { Separator } from '@/ui/separator';
import { formatDistanceToNowStrict } from 'date-fns';
import {useUpdateTodoListMutation,useDeleteTodoListMutation,useUpdateTodoMutation, useDeleteTodoMutation} from '../state/todo-api-slice'
import { useState } from 'react';

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
   const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo.content);

  const handleToggleComplete = async () => {
    await updateTodo({
      todoId: todo.todoId,
      completed: !todo.completed,
      content: todo.content,
    });
  };

  const handleDelete = async () => {
    await deleteTodo({ todoId: todo.todoId });
  };

  const handleSaveEdit = async () => {
    // only update if user changed content
    if (content.trim() !== todo.content) {
      await updateTodo({
        todoId: todo.todoId,
        content: content.trim(),
        completed: todo.completed,
      });
    }
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        'hover:bg-muted rounded-md flex justify-between items-center p-2',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        />

        {isEditing ? (
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleSaveEdit} // Auto-save when focus leaves
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') {
                setContent(todo.content);
                setIsEditing(false);
              }
            }}
            autoFocus
            className="bg-transparent border-b border-muted focus:outline-none focus:border-primary text-sm"
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className={cn(
              'cursor-pointer text-sm',
              todo.completed ? 'line-through text-muted-foreground' : ''
            )}
          >
            {todo.content}
          </span>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="text-red-600 hover:underline text-sm"
      >
        Delete
      </button>
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

  const [updateTodoList] = useUpdateTodoListMutation();
  const [deleteTodoList] = useDeleteTodoListMutation();

  // Local state for title editing
  const [title, setTitle] = useState(todoList.title);
  const [isEditing, setIsEditing] = useState(false);

  // Handle save when user presses Enter or leaves input
  const handleSaveTitle = async () => {
    if (title.trim() !== todoList.title) {
      await updateTodoList({
        todoListId: todoList.todoListId,
        title,
      });
    }
    setIsEditing(false);
  };

  const handleDeleteList = async () => {
    await deleteTodoList({ todoListId: todoList.todoListId });
  };

  return (
    <div
      className={cn(
        'bg-secondary flex h-fit w-full flex-col gap-2 rounded-md p-4',
        className,
      )}
    >
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSaveTitle}         // Save when focus leaves input
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveTitle(); // Save when Enter pressed
              if (e.key === 'Escape') {                 // Cancel edit
                setTitle(todoList.title);
                setIsEditing(false);
              }
            }}
            autoFocus
            className="text-xl font-semibold bg-transparent border-b border-muted focus:outline-none focus:border-primary"
          />
        ) : (
          <h1
            className="text-xl font-semibold cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {todoList.title}
          </h1>
        )}

        <button
          onClick={handleDeleteList}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>
      </div>

      <Separator />

      {todoList.todo &&
        todoList.todo.map((todo: TodoItem) => (
          <TodoItemComponent key={todo.todoId} todo={todo} />
        ))}

      <span className="text-muted-foreground text-sm">
        {formatDistanceToNowStrict(todoList.updatedAt)} ago
      </span>
    </div>
  );
}
