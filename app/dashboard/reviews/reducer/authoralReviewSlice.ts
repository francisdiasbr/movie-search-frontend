import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import reviewsService from '../service/ReviewsService';
import { AuthoralReviewState, MovieReviewResponse, UpdateAuthoralReviewPayload } from '../types';

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchAuthoralReview = createApiThunk<MovieReviewResponse, string>(
  'authoralReview/fetchById',
  tconst => reviewsService.getByTconst(tconst).then(response => response.entries[0]),
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
  name: 'authoralReviews',
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
