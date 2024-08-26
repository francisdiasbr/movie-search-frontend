import { configureStore } from '@reduxjs/toolkit';

import movieDetailsSlice from './features/movie/movieDetailsSlice';
import movieFavoritesSlice from './features/movies/movieFavoritesSlice';
import movieSearchSlice from './features/search/searchSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      moviesFavorites: movieFavoritesSlice,
      moviesDetails: movieDetailsSlice,
      moviesSearch: movieSearchSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
