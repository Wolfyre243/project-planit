import { Prisma, PrismaClient } from '../../generated/prisma/client.js';
const prisma = new PrismaClient();


// Todo List Operations
export const updateTodoList = async (todoListId: string, userId: string, data: { title: string }) => {
  return await prisma.todoList.update({
    where: {
      todoListId,
      userId, // Ensure user owns the todo list
    },
    data: {
      title: data.title,
      updatedAt: new Date(),
    },
  });
};


export const deleteTodoList = async (todoListId: string, userId: string) => {
  return await prisma.todoList.delete({
    where: {
      todoListId,
      userId, // Ensure user owns the todo list
    },
  });
};

//-------Create Todo list
 export interface TodoListData {
  title: string;
  userId: string;
 }

 export const createTodoList = async ({ title, userId }: TodoListData) => {
  return prisma.todoList.create({
    data: { title, userId },
  });
 };

 //-----------------------
// Todo Operations
//------------------------

export const updateTodo = async (todoId: string, userId: string, data: { content?: string; completed?: boolean }) => {
  return await prisma.todo.update({
    where: {
      todoId,
      todoList: {
        userId, // Ensure user owns the todo list that contains this todo
      },
    },
    data: {
      ...(data.content !== undefined && { content: data.content }),
      ...(data.completed !== undefined && { completed: data.completed }),
      updatedAt: new Date(),
    },
    include: {
      todoList: true,
    },
  });
};


export const deleteTodo = async (todoId: string, userId: string) => {
  return await prisma.todo.delete({
    where: {
      todoId,
      todoList: {
        userId, // Ensures user owns the todo list that contains this todo
      },
    },
  });
};

export const createTodo = async (content: string, todoListId: string) => {
  return prisma.todo.create({
    data: {
      content,
      todoListId,
    },
  });
};

// Read operations
export const getTodoListsForUser = async (userId: string) => {
  return prisma.todoList.findMany({
    where: { userId },
    include: {
      todo: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getTodoListById = async (todoListId: string, userId: string) => {
  return prisma.todoList.findFirst({
    where: {
      todoListId,
      userId,
    },
    include: {
      todo: true,
    },
  });
};

export const getTodosByUser = async (userId: string) => {
  return prisma.todo.findMany({
    where: {
      todoList: {
        userId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getTodoById = async (userId: string, todoId: string | number) => {
  return prisma.todo.findFirst({
    where: {
      todoId: String(todoId),
      todoList: {
        userId,
      },
    },
    include: {
      todoList: true,
    },
  });
};
