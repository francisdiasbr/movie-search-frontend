import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import moviesSlice from './slices/movies-slice';

const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store;
