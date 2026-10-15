import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../../../lib/api/errors';
import reviewsService from '../service/ReviewsService';
import { AllAuthoralReviewsState, ReviewSummary } from '../types';

const initialState: AllAuthoralReviewsState = {
  data: null,
  entries: [],
  error: null,
  status: 'idle',
};

interface FetchAllAuthoralReviewsParams {
  filters?: Record<string, unknown>;
}

export const fetchAllAuthoralReviews = createAsyncThunk<
  ReviewSummary[],
  FetchAllAuthoralReviewsParams,
  { rejectValue: ApiErrorPayload }
>('review/fetchAllAuthoral', async (params, { rejectWithValue }) => {
  try {
    const response = await reviewsService.searchReviews(params.filters);
    return response.entries;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível carregar os artigos.'));
  }
});

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
        state.error = action.payload?.message ?? 'Não foi possível carregar os artigos.';
        state.entries = [];
      });
  },
});

export const { clearAuthoralReviewStatus } = allAuthoralReviewsSlice.actions;

export default allAuthoralReviewsSlice.reducer;
