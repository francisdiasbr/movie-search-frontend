import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';

interface Keyword {
  _id: string;
  keyword: string;
}

interface KeywordsState {
  data: Keyword[];
  loading: boolean;
  error: string | null;
}

const initialState: KeywordsState = {
  data: [],
  loading: false,
  error: null,
};

export const getKeywords = createAsyncThunk(
  'keywords/getKeywords',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BaseService.get('keywords');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const postKeyword = createAsyncThunk(
  'keywords/postKeyword',
  async (keyword: string, { rejectWithValue }) => {
    try {
      const response = await BaseService.post('keywords', { keyword });
      // console.log('response', response)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const deleteKeyword = createAsyncThunk(
  'keywords/deleteKeyword',
  async (keyword: string, { rejectWithValue }) => {
    try {
      const response = await BaseService.delete(`keywords/${keyword}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getKeywords.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKeywords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getKeywords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get keywords';
      })
      .addCase(postKeyword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to post keyword';
      })
      .addCase(deleteKeyword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete keyword';
      });
  },
});

export default keywordsSlice.reducer;
