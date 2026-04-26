import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { AuthoralReviewState } from './types';

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

interface ContentLanguage {
  text: string;
}

interface Content {
  pt: ContentLanguage;
  en: ContentLanguage;
}

interface AuthoralReviewProps {
  content: Content;
  primaryTitle: string;
  references?: string[];
  tconst: string;
}

interface AuthoralReviewResponse {
  _id: string;
  content: Content;
  created_at: string;
  images: string[];
  primaryTitle: string;
  references?: string[];
  tconst: string;
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
      content: {
        pt: { text: review.content.pt.text },
        en: { text: review.content.en.text },
      },
      primaryTitle: review.primaryTitle,
      references: review.references,
      tconst: review.tconst,
    };

    try {
      const response = await BaseService.post(url, reviewBody);
      return response.data as AuthoralReviewResponse;
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

export const updateAuthoralReview = createAsyncThunk(
  'authoralReview/update',
  async ({ tconst, data }: { tconst: string, data: { content: { pt?: { text: string }, en?: { text: string } } } }, { rejectWithValue }) => {
    const url = `write-review/${tconst}`;
    try {
      const response = await BaseService.put(url, data as any);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar a revisão autoral:', error);
      if ((error as any).response && (error as any).response.message) {
        return rejectWithValue((error as any).response.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const deleteAuthoralReview = createAsyncThunk(
  'authoralReview/delete',
  async (tconst: string, { rejectWithValue }) => {
    const url = `write-review/${tconst}`;
    try {
      const response = await BaseService.delete(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar a revisão autoral:', error);
      if ((error as any).response && (error as any).response.message) {
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
        state.error = action.payload;
      })
      .addCase(deleteAuthoralReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAuthoralReview.fulfilled, (state) => {
        state.status = 'succeeded';
        state.data = null;
      })
      .addCase(deleteAuthoralReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearState } = authoralReviewsSlice.actions;
export default authoralReviewsSlice.reducer;
