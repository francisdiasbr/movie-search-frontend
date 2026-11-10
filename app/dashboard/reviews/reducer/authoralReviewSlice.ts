import { createSlice } from '@reduxjs/toolkit';

import { nullIfNotFound } from '../../../../lib/api/errors';
import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import reviewsService from '../service/ReviewsService';
import { AuthoralReviewState, MovieReviewResponse, UpdateAuthoralReviewPayload } from '../types';

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchAuthoralReview = createApiThunk<MovieReviewResponse | null, string>(
  'authoralReview/fetchById',
  // The backend answers 404 when the movie has no review yet.
  async tconst => (await nullIfNotFound(reviewsService.getByTconst(tconst)))?.entries[0] ?? null,
  'Não foi possível carregar o artigo.'
);

export const updateAuthoralReview = createApiThunk<
  MovieReviewResponse,
  { data: UpdateAuthoralReviewPayload; tconst: string }
>(
  'authoralReview/update',
  ({ data, tconst }) => reviewsService.update(tconst, data).then(response => response.data),
  'Não foi possível atualizar o artigo.'
);

const authoralReviewsSlice = createSlice({
  initialState,
  name: 'review',
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: builder => {
    addStatusCases(builder, fetchAuthoralReview, 'status', (state, action) => {
      state.data = action.payload;
    });
    addStatusCases(builder, updateAuthoralReview, 'status', (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { clearState } = authoralReviewsSlice.actions;
export default authoralReviewsSlice.reducer;
