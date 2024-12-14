import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieSearchState } from './types';

const initialState: MovieSearchState = {
  entries: [],
  error: null,
  status: 'idle',
  total_documents: 0,
};

interface SearchMovieParams {
  filters?: any;
  page: number;
  pageSize?: number;
  searchTerm?: string;
}

export const searchMovie = createAsyncThunk(
  'movies/search',
  async (params: SearchMovieParams) => {
    try {
      const searchBody = {
        filters: params.filters || {},
        page: params.page,
        page_size: params.pageSize,
        search_term: params.searchTerm || '',
      };
      const response = await BaseService.post('movies/search', searchBody);
      console.log('response', response);

      if (response && response.entries && Array.isArray(response.entries)) {
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error search favorites:', error);
      throw error;
    }
  }
);

const movieSearchSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(searchMovie.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = Array.isArray(action.payload.entries)
          ? action.payload.entries
          : [];
        state.total_documents = action.payload.total_documents;
        // console.log('searchMovie action.payload:', action.payload);
      })
      .addCase(searchMovie.rejected, state => {
        state.status = 'failed';
        state.error = 'error';
      });
  },
  initialState,
  name: 'moviesSearch',
  reducers: {},
});

export default movieSearchSlice.reducer;
