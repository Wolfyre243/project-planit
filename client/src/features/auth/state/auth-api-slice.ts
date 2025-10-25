import { apiSlice } from '@/state/api-slice';
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
} from '../auth.dto';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDTO, LoginRequestDTO>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        data: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<RegisterResponseDTO, RegisterRequestDTO>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        data: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    refresh: builder.mutation<RefreshResponseDTO, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApiSlice;
