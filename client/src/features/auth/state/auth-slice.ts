import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/state/store';

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  loading?: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  userId: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.loading = false;
    },
  },
});

export const { setAccessToken, setUserId, setAuthLoading, logout } =
  authSlice.actions;
export const selectAuthState = (state: RootState) => state.authSlice;

export default authSlice.reducer;
