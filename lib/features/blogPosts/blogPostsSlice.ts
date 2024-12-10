import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import BaseService from "../../api/service";

interface BlogPost {
  title: string;
  primaryTitle: string;
  introduction: string;
  stars_and_characters?: string;
  historical_context: string;
  cultural_importance: string;
  technical_analysis: string;
  conclusion: string;
  original_movie_soundtrack: string;
  poster_url?: string;
}

interface BlogPostsState {
  data: BlogPost | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogPostsState = {
  data: null,
  status: 'idle',
  error: null
};

export const generateBlogPost = createAsyncThunk(
  'blogPosts/generate',
  async (tconst: string) => {
    const response = await BaseService.post(`/generate-blogpost/${tconst}`);
    console.log('response generateBlogPost', response.data);
    return response.data;
  }
);

export const getBlogPosts = createAsyncThunk(
  'blogPosts/get',
  async (tconst: string) => {
    const response = await BaseService.get(`/generate-blogpost/${tconst}`);
    console.log('response getBlogPosts', response.data);
    return response.data;
  }
);

const blogPostsSlice = createSlice({
  name: 'blogPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateBlogPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateBlogPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(generateBlogPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Algo deu errado';
      })
      .addCase(getBlogPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBlogPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log('state.data getBlogPosts', state.data);
      })
      .addCase(getBlogPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Algo deu errado';
      });
  },
});

export default blogPostsSlice.reducer; 