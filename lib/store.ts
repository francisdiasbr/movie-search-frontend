import { configureStore } from '@reduxjs/toolkit';

import allAuthoralReviewsSlice from './features/allAuthoralReviews/allAuthoralReviewsSlice';
import authoralReviewsSlice from './features/authoralReview/authoralReviewSlice';
import blogPostsSlice from './features/blogPosts/blogPostsSlice';
import searchBlogPostSlice from './features/blogPosts/searchBlogPostsSlice';
import directorsSlice from './features/directors/directorsSlice';
import generateStickerSlice from './features/generateSticker/generateStickerSlice';
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
      blogPosts: blogPostsSlice,
      directors: directorsSlice,
      keywords: keywordsSlice,
      moviesDetails: movieDetailsSlice,
      moviesFavorites: movieFavoritesSlice,
      searchBlogPost: searchBlogPostSlice,
      uploadImages: uploadImagesSlice,
      uploadMainImages: uploadMainImagesSlice,
      generateSticker: generateStickerSlice,
    },
  });
};

export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
