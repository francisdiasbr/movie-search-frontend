import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import favoritesService from '../service/FavoritesService';
import { FavoritesSearchParams, FavoritesSearchResponse, MovieFavoritesState } from '../types';

const initialState: MovieFavoritesState = {
  countries: [],
  entries: [],
  error: null,
  startYears: [],
  status: 'idle',
  total_documents: 0,
};

// Searches the collection and marks which entries already have a review, so
// the table can link to it without a second round trip from the page.
export const fetchFavorites = createApiThunk<FavoritesSearchResponse, FavoritesSearchParams>(
  'movies/favorites',
  async params => {
    const response = await favoritesService.searchFavorites(params);
    if (!Array.isArray(response?.entries)) {
      throw new Error('Formato de resposta inválido');
    }
    const reviewed = await favoritesService
      .findReviewedTconsts(response.entries.map(entry => entry.tconst))
      .catch(() => new Set<string>());
    return {
      ...response,
      entries: response.entries.map(entry => ({ ...entry, hasReview: reviewed.has(entry.tconst) })),
    };
  },
  'Não foi possível carregar os favoritos.'
);

const movieFavoritesSlice = createSlice({
  initialState,
  name: 'moviesFavorites',
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: builder => {
    addStatusCases(builder, fetchFavorites, 'status', (state, action) => {
      state.countries = action.payload.countries ?? [];
      state.entries = action.payload.entries;
      state.startYears = action.payload.years ?? [];
      state.total_documents = action.payload.total_documents;
    });
  },
});

export const { resetState } = movieFavoritesSlice.actions;
export default movieFavoritesSlice.reducer;
