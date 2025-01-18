import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { AuthoralReviewState } from './types';

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

interface AuthoralReviewProps {
  content: string;
  tconst: string;
  primaryTitle: string;
  references: string[];
  isAiGenerated?: boolean;
}

export const fetchAuthoralReview = createAsyncThunk(
  'authoralReview/fetchById',
  async (tconst: string, { rejectWithValue }) => {
    const url = `write-review/${tconst}`;
    const response = await BaseService.get(url);
    return response.entries[0];
  }
);

export const postAuthoralReview = createAsyncThunk(
  'authoralReview/create',
  async (review: AuthoralReviewProps, { rejectWithValue }) => {
    const { tconst } = review;
    const url = `write-review/${tconst}`;
    const reviewBody = {
      content: review.content,
      primaryTitle: review.primaryTitle,
      references: review.references,
    };

    try {
      const response = await BaseService.post(url, reviewBody);
      return response;
    } catch (error) {
      console.error('Error generating authoral review:', error);

      if ((error as any).response && (error as any).response && (error as any).response.message) {
        return rejectWithValue((error as any).response.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

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
        state.error = action.payload;
      })
      .addCase(postAuthoralReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postAuthoralReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(postAuthoralReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearState } = authoralReviewsSlice.actions;
export default authoralReviewsSlice.reducer;
