import { configureStore } from '@reduxjs/toolkit';

import allAuthoralReviewsSlice from '../app/dashboard/reviews/reducer/allAuthoralReviewsSlice';
import authoralReviewsSlice from '../app/dashboard/reviews/reducer/authoralReviewSlice';
import keywordsSlice from '../app/dashboard/keywords/reducer/keywordsSlice';
import movieDetailsSlice from '../app/dashboard/favorites/reducer/movieDetailsSlice';
import movieFavoritesSlice from '../app/dashboard/favorites/reducer/favoritesSlice';
import uploadImagesSlice from '../app/dashboard/reviews/reducer/imagesSlice';
import uploadMainImagesSlice from '../app/dashboard/favorites/reducer/mainImagesSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      allAuthoralReviews: allAuthoralReviewsSlice,
      authoralReviews: authoralReviewsSlice,
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
