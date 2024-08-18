import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieCuratoryState, MovieItem } from './types';

const initialState: MovieCuratoryState = {
    data: [],
    error: null,
    status: 'idle',
  };
  
export const fetchCuratory = createAsyncThunk(
  'movies/curatory',
  async () => {
    try {
      const response = await BaseService.get('listed-movies');
      if (response && response.data && Array.isArray(response.data)) {
        // console.log('response.data', response.data);
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