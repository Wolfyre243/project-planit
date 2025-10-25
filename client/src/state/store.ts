import {
  type Action,
  type ThunkAction,
  configureStore,
} from '@reduxjs/toolkit';
import { listenerMiddleware } from './listener-middleware';
import authSlice from '@/features/auth/state/auth-slice';
import { apiSlice } from './api-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      authSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
