import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieCuratoryState } from './types';

const initialState: MovieCuratoryState = {
  entries: [],
  error: null,
  status: 'idle',
  total_documents: 0,
};

interface FetchCuratoryParams {
  filters?: any;
  page: number;
  pageSize?: number;
  sorters?: any;
}

export const fetchCuratory = createAsyncThunk(
  'movies/curatory',
  async (params: FetchCuratoryParams) => {
    try {
      const fetchBody = {
        filters: params.filters || {},
        page: params.page,
        page_size: params.pageSize,
        sorters: params.sorters || ['primaryTitle', 1],
      };

      const response = await BaseService.post(
        'listed-movies/search',
        fetchBody
      );

      if (response && response.entries && Array.isArray(response.entries)) {
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching curatory:', error);
      throw error;
    }
  }
);

const movieCuratorySlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchCuratory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCuratory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = Array.isArray(action.payload.entries)
          ? action.payload.entries
          : [];
        state.total_documents = action.payload.total_documents;
      })
      .addCase(fetchCuratory.rejected, (state) => {
        state.status = 'failed';
        state.error = 'error';
      });
  },
  initialState,
  name: 'moviesCuratory',
  reducers: {},
});

export default movieCuratorySlice.reducer;
