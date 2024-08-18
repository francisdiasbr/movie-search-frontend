import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieCuratoryState, MovieItem } from './types';

const initialState: MovieCuratoryState = {
    data: [],
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
        page: params.page || 1,
        page_size: params.pageSize || 5
      }

      const response = await BaseService.post('listed-movies/search', fetchBody);

      if (response && response.data && Array.isArray(response.data)) {
        console.log('response.data', response.data);
        return response.data;
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
        state.data = action.payload as MovieItem[];
      })
      .addCase(fetchCuratory.rejected, (state) => {
        state.status = 'failed';
        state.error = 'error';
      });
  },
});

export default movieCuratorySlice.reducer;