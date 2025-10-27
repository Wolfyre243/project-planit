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
    res.status(200).json({
      status: 'success',
      message: 'Todo list updated successfully',
      data: updatedTodoList,
    });
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
    res.status(200).json({
      status: 'success',
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
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
export const createTodoList = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = res.locals.user.id;

  if (!title || !userId) {
    return res.status(400).json({ error: "Title and userId are required." });
  }

  try {
    const newTodoList = await todoModel.createTodoList({ title, userId });
    return res.status(201).json({
      status: 'success',
      message: "Todo list created successfully",
      data: newTodoList,
    });
  } catch (error) {
    console.error("Error creating todoList:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//-----Read Todo Lists for user
export const getTodoLists = catchAsync(async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  console.log("Fetching todo lists for user:", userId);

  try {
    const lists = await todoModel.getTodoListsForUser(userId);
    return res.status(200).json({
      status: "success",
      message: "Todo lists fetched successfully",
      data: lists,
    });
  } catch (error) {
    console.error("Error fetching todo lists:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//-----Read single Todo List (with todos)
export const getTodoList = catchAsync(async (req: Request, res: Response) => {
  const { todoListId } = req.params;
  const userId = res.locals.user.id;

  try {
    const list = await todoModel.getTodoListById(todoListId, userId);
    if (!list) {
      return res.status(404).json({ error: "Todo list not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Todo list fetched successfully",
      data: list,
    });
  } catch (error) {
    console.error("Error fetching todo list:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//-----Read Todos (flat) for user
export const getUserTodos = catchAsync(async (req: Request, res: Response) => {
  const userId = res.locals.user.id;

  try {
    const todos = await todoModel.getTodosByUser(userId);
    return res.status(200).json({
      status: "success",
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//-----Read single Todo by id
export const getUserTodoById = catchAsync(async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const userId = res.locals.user.id;

  try {
    const todo = await todoModel.getTodoById(userId, todoId);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//-----Create Todo
export const createTodoItem = catchAsync(async (req: Request, res: Response) => {
  const { content, todoListId } = req.body;

  if (!content || !todoListId) {
return res.status(400).json({ error: "Content and todoListId are required." });
  }

  try {
  const newTodo = await todoModel.createTodo(content, todoListId);
    return res.status(201).json({
      status: 'success',
      message: "Todo list created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});