import { createSlice } from '@reduxjs/toolkit';

import { isApiError } from '../../../../lib/api/errors';
import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import favoritesService from '../service/FavoritesService';
import {
  FavoritesSearchParams,
  FavoritesSearchResponse,
  MovieDetailsItem,
  MovieFavoritesState,
} from '../types';

const initialState: MovieFavoritesState = {
  addStatus: 'idle',
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

export const addFavorite = createApiThunk<MovieDetailsItem, string>(
  'movies/addFavorite',
  async tconst => {
    try {
      const response = await favoritesService.addFavorite(tconst);
      return response.data;
    } catch (error) {
      if (isApiError(error) && error.status === 409) {
        throw new Error('Este filme já está na coleção.');
      }
      throw error;
    }
  },
  'Não foi possível adicionar o filme na coleção.'
);

const movieFavoritesSlice = createSlice({
  initialState,
  name: 'favorites',
  reducers: {
    resetAddStatus(state) {
      state.addStatus = 'idle';
    },
    resetState: () => initialState,
  },
  extraReducers: builder => {
    addStatusCases(builder, addFavorite, 'addStatus');
    addStatusCases(builder, fetchFavorites, 'status', (state, action) => {
      state.countries = action.payload.countries ?? [];
      state.entries = action.payload.entries;
      state.startYears = action.payload.years ?? [];
      state.total_documents = action.payload.total_documents;
    });
  },
});

export const { resetAddStatus, resetState } = movieFavoritesSlice.actions;
export default movieFavoritesSlice.reducer;
