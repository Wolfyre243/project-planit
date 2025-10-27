import { apiSlice } from '@/state/api-slice';
import type {
  GetAllTodoListResponseDTO,
  GetSingleTodoListRequestDTO,
  GetSingleTodoListResponseDTO,
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
  }),
});

export const {
  useGetSingleTodoListQuery,
  useGetAllTodoListsQuery,
} = todoApiSlice;
