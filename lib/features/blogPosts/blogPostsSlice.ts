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
  references: string[];
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

export const fetchBlogPost = createAsyncThunk<BlogPostEntry, string>('blogPost/fetchById', async movieId => {
  try {
    const response = await BaseService.get(`generate-blogpost/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o post do blog:', error);
    throw error;
  }
});

export const createBlogPost = createAsyncThunk<BlogPostEntry, string>('blogPost/create', async (movieId: string, { rejectWithValue }) => {
  try {
    const response = await BaseService.post(`generate-blogpost/${movieId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'An error occurred');
  }
});

export const updateBlogPost = createAsyncThunk<BlogPostEntry, BlogPostEntry>(
  'blogPost/update',
  async (data: BlogPostEntry, { rejectWithValue }) => {
    console.log('data entrada updateblogpost', data);
    const url = `generate-blogpost/${data.tconst}`;

    const body: BlogPostEntry = {
      tconst: data.tconst,
      primaryTitle: data.primaryTitle,
      title: data.title,
      introduction: data.introduction,
      stars_and_characters: data.stars_and_characters,
      historical_context: data.historical_context,
      cultural_importance: data.cultural_importance,
      technical_analysis: data.technical_analysis,
      original_movie_soundtrack: data.original_movie_soundtrack,
      conclusion: data.conclusion,
      poster_url: data.poster_url,
      created_at: data.created_at,
      references: data.references,
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

const blogPostSlice = createSlice({
  name: 'blogPosts',
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
        state.error = 'Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.';
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
        state.error = 'Falha ao criar o post do blog. Por favor, tente novamente mais tarde.';
      })
      .addCase(updateBlogPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateBlogPost.rejected, state => {
        state.loading = false;
        state.error = 'Falha ao atualizar o post do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export const { clearBlogPost } = blogPostSlice.actions;
export default blogPostSlice.reducer;
