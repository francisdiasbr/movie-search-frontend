import { configureStore } from '@reduxjs/toolkit';

import allAuthoralReviewsSlice from './features/allAuthoralReviews/allAuthoralReviewsSlice';
import authoralReviewsSlice from './features/authoralReview/authoralReviewSlice';
import directorsSlice from './features/directors/directorsSlice';
import keywordsSlice from './features/keywords/keywordsSlice';
import movieDetailsSlice from './features/movie/movieDetailsSlice';
import movieFavoritesSlice from './features/movies/movieFavoritesSlice';
import uploadImagesSlice from './features/uploadImages/uploadImagesSlice';
import uploadMainImagesSlice from './features/uploadImages/uploadMainImagesSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      allAuthoralReviews: allAuthoralReviewsSlice,
      authoralReviews: authoralReviewsSlice,
      directors: directorsSlice,
      keywords: keywordsSlice,
      moviesDetails: movieDetailsSlice,
      moviesFavorites: movieFavoritesSlice,
      uploadImages: uploadImagesSlice,
      uploadMainImages: uploadMainImagesSlice,
    },
  });
};

export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
