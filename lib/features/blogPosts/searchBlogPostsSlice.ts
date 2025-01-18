import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { formatDate } from '../../../utils/dateUtils';
import BaseService from '../../api/service';
import { BlogPostEntry } from './blogPostsSlice';

interface SearchBlogPostState {
  data: {
    entries: BlogPostEntry[];
    total_documents: number;
  } | null;
  loading: boolean;
  error: string | null;
}

interface SearchParams {
  filters?: unknown;
  page?: number;
  page_size?: number;
}

interface SearchResponse {
  entries: BlogPostEntry[];
  total_documents: number;
}

const initialState: SearchBlogPostState = {
  data: null,
  loading: false,
  error: null,
};

export const searchBlogPosts = createAsyncThunk<SearchResponse, SearchParams>(
  'blogPost/search',
  async (
    params = {
      filters: {},
      page: 1,
      page_size: 50,
    }
  ) => {
    try {
      const response = await BaseService.post('generate-blogpost/search', params);
      return response as SearchResponse;
    } catch (error) {
      console.error('Error searching blog posts:', error);
      throw error;
    }
  }
);

const searchBlogPostSlice = createSlice({
  name: 'searchBlogPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          entries: action.payload.entries.map((entry) => ({
            ...entry,
            created_at: formatDate(entry.created_at),
          })),
          total_documents: action.payload.total_documents,
        };
      })
      .addCase(searchBlogPosts.rejected, (state) => {
        state.loading = false;
        state.error = 'Falha ao buscar posts do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export default searchBlogPostSlice.reducer;
