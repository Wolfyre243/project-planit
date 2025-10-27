import { Plus } from 'lucide-react';
import { useCreateTodoListMutation } from '../state/todo-api-slice';
import { useState } from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

export function NewTodoList() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [createTodoList] = useCreateTodoListMutation();

  async function handleCreate() {
    if (!title || title === '') return;

    try {
      await createTodoList({ title }).unwrap();

      setShowForm(false);
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  }

  // Form
  if (showForm)
    return (
      <div className='bg-secondary/40 flex h-fit flex-col items-end justify-center gap-2 rounded-md p-4'>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='Title...'
        />
        <div className='flex flex-row items-center gap-2'>
          <Button
            onClick={() => handleCreate()}
            size={'sm'}
            disabled={!title || title === ''}
          >
            Create
          </Button>
          <Button
            onClick={() => setShowForm(false)}
            className='cursor-pointer'
            size={'sm'}
            variant={'secondary'}
          >
            Cancel
          </Button>
        </div>
      </div>
    );

  return (
    <div
      onClick={() => setShowForm(true)}
      className='bg-secondary/40 flex h-fit w-full flex-col items-center justify-center gap-2 rounded-md p-4 cursor-pointer'
    >
      <div className='text-muted-foreground flex flex-row items-center gap-2'>
        <Plus />
        <h1>Add new list</h1>
      </div>
    </div>
  );
}
