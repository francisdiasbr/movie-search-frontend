import { configureStore } from '@reduxjs/toolkit';

import allAuthoralReviewsSlice from './features/allAuthoralReviews/allAuthoralReviewsSlice';
import allGenReviewsSlice from './features/allGenReviews/allGenReviewsSlice';
import authoralReviewsSlice from './features/authoralReview/authoralReviewSlice';
import blogPostsSlice from './features/blogPosts/blogPostsSlice';
import blogPostsTriviaSlice from './features/blogPosts/blogPostsTriviaSlice';
import searchBlogPostSlice from './features/blogPosts/searchBlogPostsSlice';
import directorsSlice from './features/directors/directorsSlice';
import keywordsSlice from './features/keywords/keywordsSlice';
import movieDetailsSlice from './features/movie/movieDetailsSlice';
import movieFavoritesSlice from './features/movies/movieFavoritesSlice';
import opinionSlice from './features/opinion/opinionSlice';
import reviewsSlice from './features/review/reviewsSlice';
import movieSearchSlice from './features/search/searchSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      allAuthoralReviews: allAuthoralReviewsSlice,
      allGenReviews: allGenReviewsSlice,
      authoralReviews: authoralReviewsSlice,
      blogPosts: blogPostsSlice,
      blogPostsTrivia: blogPostsTriviaSlice,
      directors: directorsSlice,
      keywords: keywordsSlice,
      moviesDetails: movieDetailsSlice,
      moviesFavorites: movieFavoritesSlice,
      moviesReviews: reviewsSlice,
      moviesSearch: movieSearchSlice,
      opinion: opinionSlice,
      searchBlogPost: searchBlogPostSlice,
    },
  });
};


export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

