import type { BaseResponseDTO } from '@/types/dto.types';

export interface GetSingleTodoListRequestDTO {
  todoListId: string;
}

export type GetSingleTodoListResponseDTO = BaseResponseDTO<{
  todoListId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  todo: {
    todoId: string;
    content: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}>;

export type GetAllTodoListResponseDTO = BaseResponseDTO<{
  todoListId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  todo: {
    todoId: string;
    content: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}[]>;

export interface UpdateTodoListRequestDTO {
  todoListId: string;
  title: string;
}

export type UpdateTodoListResponseDTO = BaseResponseDTO<{
  todoListId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}>

export interface UpdateTodoRequestDTO {
  todoId: string;
  content?: string;
  completed?: boolean;
}

export type UpdateTodoResponseDTO = BaseResponseDTO<{
  todoId: string;
  content: string;
  completed: boolean;
}>;

export interface CreateTodoListRequestDTO {
  title: string;
}

export type CreateTodoListResponseDTO = BaseResponseDTO<{
  todoListId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}>;

export interface CreateTodoRequestDTO {
  content: string;
  todoListId: string;
}

export type CreateTodoResponseDTO = BaseResponseDTO<{
  todoId: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}>;