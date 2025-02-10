import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { formatDate } from '../../../utils/dateUtils';
import BaseService from '../../api/service';

export interface BlogPostEntry {
  tconst: string;
  primaryTitle: string;
  content: {
    en: {
      title: string;
      introduction: string;
      conclusion: string;
      cultural_importance: string;
      historical_context: string;
      stars_and_characters: string;
      technical_analysis: string;
    };
    pt: {
      title: string;
      introduction: string;
      conclusion: string;
      cultural_importance: string;
      historical_context: string;
      stars_and_characters: string;
      technical_analysis: string;
    };
  };
  created_at: string;
  original_movie_soundtrack: string;
  poster_url: string;
  references: string[];
  isAiGenerated?: boolean;
}

interface BlogPostState {
  data: BlogPostEntry | null;
  loading: boolean;
  error: string | null;
  entries: BlogPostEntry[];
  status: string;
}

const initialState: BlogPostState = {
  data: null,
  loading: false,
  error: null,
  entries: [],
  status: 'idle',
};

export const fetchBlogPost = createAsyncThunk<BlogPostEntry, string>('blogPost/fetchById', async (movieId) => {
  try {
    const response = await BaseService.get(`generate-blogpost/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o post do blog:', error);
    throw error;
  }
});

export const createBlogPost = createAsyncThunk<BlogPostEntry, string>(
  'blogPost/create',
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await BaseService.post(`generate-blogpost/${movieId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const updateBlogPost = createAsyncThunk<BlogPostEntry, BlogPostEntry>(
  'blogPost/update',
  async (data: BlogPostEntry, { rejectWithValue }) => {
    console.log('data entrada updateblogpost', data);
    const url = `generate-blogpost/${data.tconst}`;

    const body: BlogPostEntry = {
      tconst: data.tconst,
      primaryTitle: data.primaryTitle,
      content: {
        en: {
          title: data.content.en.title,
          introduction: data.content.en.introduction,
          conclusion: data.content.en.conclusion,
          cultural_importance: data.content.en.cultural_importance,
          historical_context: data.content.en.historical_context,
          stars_and_characters: data.content.en.stars_and_characters,
          technical_analysis: data.content.en.technical_analysis,
        },
        pt: {
          title: data.content.pt.title,
          introduction: data.content.pt.introduction,
          conclusion: data.content.pt.conclusion,
          cultural_importance: data.content.pt.cultural_importance,
          historical_context: data.content.pt.historical_context,
          stars_and_characters: data.content.pt.stars_and_characters,
          technical_analysis: data.content.pt.technical_analysis,
        },
      },
      original_movie_soundtrack: data.original_movie_soundtrack,
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
    clearBlogPost: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.entries = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.data = {
          ...action.payload,
          created_at: formatDate(action.payload.created_at),
        };
        console.log('action.payload', action.payload);
      })
      .addCase(fetchBlogPost.rejected, (state) => {
        state.loading = false;
        state.error = 'Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.';
      })
      .addCase(createBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createBlogPost.rejected, (state) => {
        state.loading = false;
        state.error = 'Falha ao criar o post do blog. Por favor, tente novamente mais tarde.';
      })
      .addCase(updateBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateBlogPost.rejected, (state) => {
        state.loading = false;
        state.error = 'Falha ao atualizar o post do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export const { clearBlogPost } = blogPostSlice.actions;
export default blogPostSlice.reducer;
