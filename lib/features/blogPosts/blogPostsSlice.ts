import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { formatDate } from '../../../utils/dateUtils';
import BaseService from '../../api/service';

export interface BlogPostEntry {
  tconst: string;
  primaryTitle: string;
  title: string;
  introduction: string;
  stars_and_characters: string;
  historical_context: string;
  cultural_importance: string;
  technical_analysis: string;
  original_movie_soundtrack: string;
  conclusion: string;
  poster_url: string;
  created_at: string;
}

interface BlogPostState {
  data: BlogPostEntry | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogPostState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBlogPost = createAsyncThunk<BlogPostEntry, string>(
  'blogPost/fetchById',
  async movieId => {
    try {
      const response = await BaseService.get(`generate-blogpost/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o post do blog:', error);
      throw error;
    }
  }
);

export const createBlogPost = createAsyncThunk<BlogPostEntry, string>(
  'blogPost/create',
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await BaseService.post(
        `generate-blogpost/${movieId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const blogPostSlice = createSlice({
  name: 'blogPost',
  initialState,
  reducers: {
    clearBlogPost: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBlogPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          ...action.payload,
          created_at: formatDate(action.payload.created_at),
        };
        console.log('action.payload', action.payload);
      })
      .addCase(fetchBlogPost.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.';
      })
      .addCase(createBlogPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createBlogPost.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao criar o post do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export const { clearBlogPost } = blogPostSlice.actions;
export default blogPostSlice.reducer;
