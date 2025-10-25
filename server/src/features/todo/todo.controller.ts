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

//-----Create Todolist
export const createTodoList = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = res.locals.user.id;

  if (!title || !userId) {
    return res.status(400).json({ error: "Title and userId are required." });
  }

  try {
    const newTodoList = await todoModel.createTodoList({ title, userId });
    return res.status(201).json({
      message: "Todo list created successfully",
      todoList: newTodoList,
    });
  } catch (error) {
    console.error("Error creating todoList:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//-----Create Todo
export const createTodoItem = async (req: Request, res: Response) => {
  const { content, todoListId } = req.body;

  if (!content || !todoListId) {
return res.status(400).json({ error: "Content and todoListId are required." });
  }

  try {
  const newTodo = await todoModel.createTodo(content, todoListId);
    return res.status(201).json({
      message: "Todo list created successfully",
      todoList: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};