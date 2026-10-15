import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import readService from '../service/ReadService';
import { ReadState, ReviewSummary } from '../types';

const initialState: ReadState = {
  entries: [],
  error: null,
  status: 'idle',
};

export const fetchReviews = createApiThunk<ReviewSummary[], Record<string, unknown> | undefined>(
  'read/fetchReviews',
  filters => readService.searchReviews(filters).then(response => response.entries),
  'Não foi possível carregar os artigos.'
);

const readSlice = createSlice({
  initialState,
  name: 'read',
  reducers: {
    clearReviews: () => initialState,
  },
  extraReducers: builder => {
    addStatusCases(builder, fetchReviews, 'status', (state, action) => {
      state.entries = action.payload;
    });
  },
});

export const { clearReviews } = readSlice.actions;
export default readSlice.reducer;
