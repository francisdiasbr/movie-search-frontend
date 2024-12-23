import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { AuthoralReviewState } from './types';

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

interface AuthoralReviewProps {
  author: string;
  title: string;
  review: string;
  tconst: string;
  message?: string;
}

export const postAuthoralReview = createAsyncThunk(
  'authoralReview/create',
  async (review: AuthoralReviewProps, { rejectWithValue }) => {
    const { tconst } = review;
    const url = `favorited-movies/${tconst}/write-review`;
    const reviewBody = {
      author: review.author,
      title: review.title,
      review: review.review,
    };

    try {
      const response = await BaseService.post(url, reviewBody);
      return response;
    } catch (error) {
      console.error('Error generating authoral review:', error);

      // Extrai a mensagem específica da API se existir
      if (
        (error as any).response &&
        (error as any).response &&
        (error as any).response.message
      ) {
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
    clearState: state => {
      state.data = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder.addCase(postAuthoralReview.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(postAuthoralReview.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(postAuthoralReview.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Armazena a mensagem de erro específica
    });
  },
});

export const { clearState } = authoralReviewsSlice.actions;
export default authoralReviewsSlice.reducer;
