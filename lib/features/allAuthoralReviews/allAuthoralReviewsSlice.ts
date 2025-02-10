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
      const response = await BaseService.post(url, fetchBody);
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
      state.entries = [];
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAuthoralReviews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllAuthoralReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
        state.error = null;
      })
      .addCase(fetchAllAuthoralReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.entries = [];
      });
  },
});

export const { clearAuthoralReviewStatus } = allAuthoralReviewsSlice.actions;

export default allAuthoralReviewsSlice.reducer;
