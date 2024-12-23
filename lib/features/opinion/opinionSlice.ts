import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';
import { RootState } from '../../store';

interface OpinionState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OpinionState = {
  status: 'idle',
  error: null,
};

export const submitOpinion = createAsyncThunk(
  'opinion/submitOpinion',
  async (
    {
      tconst,
      opinion,
      rate,
    }: { tconst: string; opinion: string; rate: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await baseService.post(`personal-opinion/${tconst}`, {
        opinion,
        rate,
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting opinion:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const opinionSlice = createSlice({
  name: 'opinion',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitOpinion.pending, state => {
        state.status = 'loading';
      })
      .addCase(submitOpinion.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(submitOpinion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to submit opinion';
      });
  },
});

export const selectOpinionStatus = (state: RootState) => state.opinion.status;
export const selectOpinionError = (state: RootState) => state.opinion.error;

export default opinionSlice.reducer;
