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
