import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieCuratoryState, MovieItem } from './types';

const initialState: MovieCuratoryState = {
    entries: [],
    total_documents: 0,
    error: null,
    status: 'idle',
  };

interface FetchCuratoryParams {
  filters?: any
  sorters?: any
  page: number
  pageSize?: number
}
  
export const fetchCuratory = createAsyncThunk(
  'movies/curatory',
  async (params: FetchCuratoryParams) => {
    try {

      const fetchBody = {
        filters: params.filters || {},
        sorters: params.sorters || ["primaryTitle", 1],
        page: params.page,
        page_size: params.pageSize
      }

      const response = await BaseService.post('listed-movies/search', fetchBody);

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
  name: 'moviesCuratory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCuratory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCuratory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = Array.isArray(action.payload.entries) ? action.payload.entries : [];
        state.total_documents = action.payload.total_documents;
      })
      .addCase(fetchCuratory.rejected, (state) => {
        state.status = 'failed';
        state.error = 'error';
      });
  },
});

export default movieCuratorySlice.reducer;