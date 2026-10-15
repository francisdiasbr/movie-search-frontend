import { configureStore } from '@reduxjs/toolkit';

import movieDetailsSlice from '../app/dashboard/favorites/reducer/movieDetailsSlice';
import movieFavoritesSlice from '../app/dashboard/favorites/reducer/favoritesSlice';
import uploadMainImagesSlice from '../app/dashboard/favorites/reducer/mainImagesSlice';
import keywordsSlice from '../app/dashboard/keywords/reducer/keywordsSlice';
import readSlice from '../app/dashboard/read/reducer/readSlice';
import authoralReviewsSlice from '../app/dashboard/reviews/reducer/authoralReviewSlice';
import uploadImagesSlice from '../app/dashboard/reviews/reducer/imagesSlice';
import searchSlice from '../app/dashboard/search/reducer/searchSlice';
import writeReviewSlice from '../app/dashboard/write-review/reducer/writeReviewSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      authoralReviews: authoralReviewsSlice,
      keywords: keywordsSlice,
      moviesDetails: movieDetailsSlice,
      moviesFavorites: movieFavoritesSlice,
      read: readSlice,
      search: searchSlice,
      uploadImages: uploadImagesSlice,
      uploadMainImages: uploadMainImagesSlice,
      writeReview: writeReviewSlice,
    },
  });
};

export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
