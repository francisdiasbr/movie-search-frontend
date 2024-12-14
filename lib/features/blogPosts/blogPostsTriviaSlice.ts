import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { formatDate } from '../../../utils/dateUtils';
import BaseService from '../../api/service';

export interface BlogPostTriviaEntry {
  tconst: string;
  primaryTitle: string;
  director_history: string;
  director_quotes: string;
  curiosities: string;
  reception: string;
  highlights: string;
  plot: string;
}

interface BlogPostTriviaState {
  data: BlogPostTriviaEntry | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogPostTriviaState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBlogPostTrivia = createAsyncThunk<BlogPostTriviaEntry, string>(
  'blogPostTrivia/fetchById',
  async movieId => {
    try {
      const response = await BaseService.get(`generate-blogpost-trivia/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o post do blog:', error);
      throw error;
    }
  }
);

export const createBlogPostTrivia = createAsyncThunk<BlogPostTriviaEntry, string>(
  'blogPostTrivia/create',
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await BaseService.post(
        `generate-blogpost-trivia/${movieId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const updateBlogPostTrivia = createAsyncThunk<BlogPostTriviaEntry, BlogPostTriviaEntry>(
  'blogPostTrivia/update',
  async (data: BlogPostTriviaEntry, { rejectWithValue }) => {
    console.log('data entrada updateblogpost trivia', data);
    const url = `generate-blogpost-trivia/${data.tconst}`;

    const body: BlogPostTriviaEntry = {
      tconst: data.tconst,
      primaryTitle: data.primaryTitle,
      director_history: data.director_history,
      director_quotes: data.director_quotes,
      curiosities: data.curiosities,
      reception: data.reception,
      highlights: data.highlights,
      plot: data.plot,
    };

    try {
      const response = await BaseService.put(url, body as any);
      console.log('response', response);
      return response.data;
    } catch (error) {
      console.error('Error editing details:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);


const blogPostTriviaSlice = createSlice({
  name: 'blogPostsTrivia',
  initialState,
  reducers: {
    clearBlogPostTrivia: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBlogPostTrivia.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostTrivia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          ...action.payload,
        };
        console.log('action.payload', action.payload);
      })
      .addCase(fetchBlogPostTrivia.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.';
      })
      .addCase(createBlogPostTrivia.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogPostTrivia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createBlogPostTrivia.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao criar o post do blog. Por favor, tente novamente mais tarde.';
      })
      .addCase(updateBlogPostTrivia.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogPostTrivia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateBlogPostTrivia.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao atualizar o post do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export const { clearBlogPostTrivia } = blogPostTriviaSlice.actions;
export default blogPostTriviaSlice.reducer;
