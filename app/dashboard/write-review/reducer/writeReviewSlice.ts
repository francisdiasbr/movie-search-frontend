import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../../../lib/api/errors';
import writeReviewService from '../service/WriteReviewService';
import { CreateReviewPayload, CreateReviewResponse, WriteReviewState } from '../types';

const initialState: WriteReviewState = {
  error: null,
  status: 'idle',
};

export const createReview = createAsyncThunk<
  CreateReviewResponse,
  CreateReviewPayload,
  { rejectValue: ApiErrorPayload }
>('writeReview/create', async (review, { rejectWithValue }) => {
  try {
    const response = await writeReviewService.create(review);
    return response.data;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível criar o artigo.'));
  }
});

const writeReviewSlice = createSlice({
  initialState,
  name: 'writeReview',
  reducers: {
    resetWriteReview: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createReview.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createReview.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível criar o artigo.';
      });
  },
});

export const { resetWriteReview } = writeReviewSlice.actions;
export default writeReviewSlice.reducer;
