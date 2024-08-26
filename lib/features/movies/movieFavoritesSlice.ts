import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieFavoritesState } from './types';

const initialState: MovieFavoritesState = {
  entries: [],
  error: null,
  status: 'idle',
  total_documents: 0,
};

interface FetchFavoritesParams {
  filters?: any;
  page: number;
  pageSize?: number;
  searchTerm?: string;
}

export const fetchFavorites = createAsyncThunk(
  'movies/favorites',
  async (params: FetchFavoritesParams) => {
    try {
      const fetchBody = {
        filters: params.filters || {},
        page: params.page,
        page_size: params.pageSize,
        search_term: params.searchTerm || '',
      };

      const response = await BaseService.post(
        'favorited-movies/search',
        fetchBody
      );

      if (response && response.entries && Array.isArray(response.entries)) {
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  }
);

const movieFavoritesSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = Array.isArray(action.payload.entries)
          ? action.payload.entries
          : [];
        state.total_documents = action.payload.total_documents;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.status = 'failed';
        state.error = 'error';
      });
  },
  initialState,
  name: 'moviesFavorites',
  reducers: {},
});

export default movieFavoritesSlice.reducer;
