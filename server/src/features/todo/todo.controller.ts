import { catchAsync } from '../../lib/catch-async.js';
import * as todoModel from './todo.model.js';
import { Request, Response } from 'express';
// Todo List Controllers
export const updateTodoList = catchAsync(async (req: Request, res: Response) => {
  const { todoListId } = req.params;
  const userId = res.locals.user.id;
  const { title } = req.body;


  try {
    const updatedTodoList = await todoModel.updateTodoList(todoListId, userId, { title });
    res.json(updatedTodoList);
  } catch (error) {
    console.error('Error updating todo list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export const deleteTodoList = catchAsync(async (req: Request, res: Response) => {
  const { todoListId } = req.params;
  const userId = res.locals.user.id;


  try {
    await todoModel.deleteTodoList(todoListId, userId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export const updateTodo = catchAsync(async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const userId = res.locals.user.id;
  const { content, completed } = req.body;


  try {
    const updatedTodo = await todoModel.updateTodo(todoId, userId, { content, completed });
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export const deleteTodo = catchAsync(async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const userId = res.locals.user.id;


  try {
    await todoModel.deleteTodo(todoId, userId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


