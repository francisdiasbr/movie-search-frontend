import { configureStore } from '@reduxjs/toolkit';

import allAuthoralReviewsSlice from './features/allAuthoralReviews/allAuthoralReviewsSlice';
import allGenReviewsSlice from './features/allGenReviews/allGenReviewsSlice';
import authoralReviewsSlice from './features/authoralReview/authoralReviewSlice';
import movieDetailsSlice from './features/movie/movieDetailsSlice';
import movieFavoritesSlice from './features/movies/movieFavoritesSlice';
import movieSearchSlice from './features/search/searchSlice';
import reviewsSlice from './features/review/reviewsSlice';

export const makeStore = () => {

  return configureStore({
    reducer: {
      allAuthoralReviews: allAuthoralReviewsSlice,
      allGenReviews: allGenReviewsSlice,
      authoralReviews: authoralReviewsSlice,
      moviesReviews: reviewsSlice,
      moviesFavorites: movieFavoritesSlice,
      moviesDetails: movieDetailsSlice,
      moviesSearch: movieSearchSlice,
    },
  });
};


export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
