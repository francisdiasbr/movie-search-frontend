import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../../../lib/api/errors';
import reviewsService from '../service/ReviewsService';
import { AuthoralReviewState, MovieReviewResponse, UpdateAuthoralReviewPayload } from '../types';

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchAuthoralReview = createAsyncThunk<
  MovieReviewResponse,
  string,
  { rejectValue: ApiErrorPayload }
>('authoralReview/fetchById', async (tconst, { rejectWithValue }) => {
  try {
    const response = await reviewsService.getByTconst(tconst);
    return response.entries[0];
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível carregar o artigo.'));
  }
});

export const updateAuthoralReview = createAsyncThunk<
  MovieReviewResponse,
  { data: UpdateAuthoralReviewPayload; tconst: string },
  { rejectValue: ApiErrorPayload }
>('authoralReview/update', async ({ data, tconst }, { rejectWithValue }) => {
  try {
    const response = await reviewsService.update(tconst, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível atualizar o artigo.'));
  }
});

const authoralReviewsSlice = createSlice({
  initialState,
  name: 'authoralReviews',
  reducers: {
    clearState: (state) => {
      state.data = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthoralReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthoralReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAuthoralReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível carregar o artigo.';
      })
      .addCase(updateAuthoralReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAuthoralReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateAuthoralReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível atualizar o artigo.';
      });
  },
});

export const { clearState } = authoralReviewsSlice.actions;
export default authoralReviewsSlice.reducer;
