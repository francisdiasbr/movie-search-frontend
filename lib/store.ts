import { configureStore } from '@reduxjs/toolkit';

import favoritesSlice from '../app/dashboard/favorites/reducer/favoritesSlice';
import mainImagesSlice from '../app/dashboard/favorites/reducer/mainImagesSlice';
import movieDetailsSlice from '../app/dashboard/favorites/reducer/movieDetailsSlice';
import authoralReviewSlice from '../app/dashboard/reviews/reducer/authoralReviewSlice';
import reviewImagesSlice from '../app/dashboard/reviews/reducer/imagesSlice';
import writeReviewSlice from '../app/dashboard/write-review/reducer/writeReviewSlice';

// Keys follow the feature folder that owns each slice.
export const makeStore = () => {
  return configureStore({
    reducer: {
      favoriteDetails: movieDetailsSlice,
      favorites: favoritesSlice,
      mainImages: mainImagesSlice,
      review: authoralReviewSlice,
      reviewImages: reviewImagesSlice,
      writeReview: writeReviewSlice,
    },
  });
};

export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
