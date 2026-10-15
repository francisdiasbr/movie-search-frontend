import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import writeReviewService from '../service/WriteReviewService';
import { CreateReviewPayload, CreateReviewResponse, WriteReviewState } from '../types';

const initialState: WriteReviewState = {
  error: null,
  status: 'idle',
};

export const createReview = createApiThunk<CreateReviewResponse, CreateReviewPayload>(
  'writeReview/create',
  review => writeReviewService.create(review).then(response => response.data),
  'Não foi possível criar o artigo.'
);

const writeReviewSlice = createSlice({
  initialState,
  name: 'writeReview',
  reducers: {
    resetWriteReview: () => initialState,
  },
  extraReducers: builder => {
    addStatusCases(builder, createReview, 'status');
  },
});

export const { resetWriteReview } = writeReviewSlice.actions;
export default writeReviewSlice.reducer;
