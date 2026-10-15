import { configureStore } from '@reduxjs/toolkit';

import movieDetailsSlice from '../app/dashboard/favorites/reducer/movieDetailsSlice';
import movieFavoritesSlice from '../app/dashboard/favorites/reducer/favoritesSlice';
import mainImagesSlice from '../app/dashboard/favorites/reducer/mainImagesSlice';
import readSlice from '../app/dashboard/read/reducer/readSlice';
import authoralReviewsSlice from '../app/dashboard/reviews/reducer/authoralReviewSlice';
import reviewImagesSlice from '../app/dashboard/reviews/reducer/imagesSlice';
import searchSlice from '../app/dashboard/search/reducer/searchSlice';
import writeReviewSlice from '../app/dashboard/write-review/reducer/writeReviewSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      authoralReviews: authoralReviewsSlice,
      moviesDetails: movieDetailsSlice,
      moviesFavorites: movieFavoritesSlice,
      read: readSlice,
      search: searchSlice,
      reviewImages: reviewImagesSlice,
      mainImages: mainImagesSlice,
      writeReview: writeReviewSlice,
    },
  });
};

export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
