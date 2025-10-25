import { apiSlice } from '@/state/api-slice';
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
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
    signup: builder.mutation<SignupResponseDTO, SignupRequestDTO>({
      query: (credentials) => ({
        url: '/auth/signup',
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
  useSignupMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApiSlice;
