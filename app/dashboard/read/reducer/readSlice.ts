import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../../../lib/api/errors';
import readService from '../service/ReadService';
import { ReadState, ReviewSummary } from '../types';

const initialState: ReadState = {
  entries: [],
  error: null,
  status: 'idle',
};

export const fetchReviews = createAsyncThunk<
  ReviewSummary[],
  Record<string, unknown> | undefined,
  { rejectValue: ApiErrorPayload }
>('read/fetchReviews', async (filters, { rejectWithValue }) => {
  try {
    const response = await readService.searchReviews(filters);
    return response.entries;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível carregar os artigos.'));
  }
});

const readSlice = createSlice({
  initialState,
  name: 'read',
  reducers: {
    clearReviews: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchReviews.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível carregar os artigos.';
        state.entries = [];
      });
  },
});

export const { clearReviews } = readSlice.actions;
export default readSlice.reducer;
