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


// Todo Operations
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
