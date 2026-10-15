import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../api/errors';
import favoritesService from './service';
import { FavoritesSearchParams, FavoritesSearchResponse, MovieFavoritesState } from './types';

const initialState: MovieFavoritesState = {
  countries: [],
  entries: [],
  error: null,
  startYears: [],
  status: 'idle',
  total_documents: 0,
};

export const fetchFavorites = createAsyncThunk<
  FavoritesSearchResponse,
  FavoritesSearchParams,
  { rejectValue: ApiErrorPayload }
>('movies/favorites', async (params, { rejectWithValue }) => {
  try {
    const response = await favoritesService.searchFavorites(params);
    if (!Array.isArray(response?.entries)) {
      throw new Error('Formato de resposta inválido');
    }
    return response;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível carregar os favoritos.'));
  }
});

const movieFavoritesSlice = createSlice({
  initialState,
  name: 'moviesFavorites',
  reducers: {
    resetState: (state) => {
      state.entries = [];
      state.countries = [];
      state.startYears = [];
      state.total_documents = 0;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.countries = action.payload.countries ?? [];
        state.entries = action.payload.entries;
        state.status = 'succeeded';
        state.startYears = action.payload.years ?? [];
        state.total_documents = action.payload.total_documents;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        // A cancelled search was superseded by a newer one that is still
        // loading, so the state must not flip to failed.
        if (action.payload?.cancelled) return;
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível carregar os favoritos.';
      });
  },
});

export const { resetState } = movieFavoritesSlice.actions;
export default movieFavoritesSlice.reducer;
