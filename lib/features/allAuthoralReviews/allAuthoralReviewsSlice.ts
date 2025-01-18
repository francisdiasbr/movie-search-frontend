import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieReviewState } from './types';

const initialState: MovieReviewState = {
  data: null,
  entries: [],
  error: null,
  status: 'idle',
};

interface FetchAllAuthoralReviewsParams {
  filters?: any;
  page: number;
  pageSize?: number;
}

export const fetchAllAuthoralReviews = createAsyncThunk(
  'review/fetchAllAuthoral',
  async (params: FetchAllAuthoralReviewsParams, { rejectWithValue }) => {
    const url = 'write-review/search';
    try {
      const fetchBody = {
        filters: params.filters || {},
        page: params.page,
        page_size: params.pageSize,
      };
      console.log('fetchBody allAuthoralReviews', fetchBody);
      const response = await BaseService.post(url, fetchBody);
      console.log('response fetchAllAuthoralReviews', response);
      if (response) {
        return response.entries;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching all Authoral reviews:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const allAuthoralReviewsSlice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    clearAuthoralReviewStatus(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAuthoralReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAuthoralReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchAllAuthoralReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearAuthoralReviewStatus } = allAuthoralReviewsSlice.actions;

export default allAuthoralReviewsSlice.reducer;
