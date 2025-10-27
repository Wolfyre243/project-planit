import { apiSlice } from '@/state/api-slice';
import type {
  CreateTodoListRequestDTO,
  CreateTodoListResponseDTO,
  CreateTodoRequestDTO,
  CreateTodoResponseDTO,
  GetAllTodoListResponseDTO,
  GetSingleTodoListRequestDTO,
  GetSingleTodoListResponseDTO,
  UpdateTodoListRequestDTO,
  UpdateTodoListResponseDTO,
  UpdateTodoRequestDTO,
  UpdateTodoResponseDTO,
} from '../todo.dto';

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleTodoList: builder.query<
      GetSingleTodoListResponseDTO,
      GetSingleTodoListRequestDTO
    >({
      query: ({ todoListId }) => ({
        url: `/todos/lists/${todoListId}`,
        method: 'GET',
      }),
      providesTags: ['Todo'],
    }),
    getAllTodoLists: builder.query<
      GetAllTodoListResponseDTO,
      void
    >({
      query: () => ({
        url: '/todos/lists',
        method: 'GET',
      }),
      providesTags: ['Todo'],
    }),
    updateTodoList: builder.mutation<
      UpdateTodoListResponseDTO,
      UpdateTodoListRequestDTO
    >({
      query: (data) => ({
        url: `/todos/lists/${data.todoListId}`,
        method: 'PUT',
        body: { ...data, todoListId: undefined },
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTodo: builder.mutation<UpdateTodoResponseDTO, UpdateTodoRequestDTO>({
      query: (data) => ({
        url: `/todos/${data.todoId}`,
        method: 'PUT',
        body: { ...data, todoId: undefined },
      }),
      invalidatesTags: ['Todo'],
    }),
    createTodoList: builder.mutation<
      CreateTodoListResponseDTO,
      CreateTodoListRequestDTO
    >({
      query: (data) => ({
        url: '/todos/lists',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Todo'],
    }),
    createTodo: builder.mutation<
      CreateTodoResponseDTO,
      CreateTodoRequestDTO
    >({
      query: (data) => ({
        url: '/todos',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodoList: builder.mutation<void, { todoListId: string }>({
      query: ({ todoListId }) => ({
        url: `/todos/lists/${todoListId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation<void, { todoId: string }>({
      query: ({ todoId }) => ({
        url: `/todos/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetSingleTodoListQuery,
  useGetAllTodoListsQuery,
  useUpdateTodoListMutation,
} = todoApiSlice;
