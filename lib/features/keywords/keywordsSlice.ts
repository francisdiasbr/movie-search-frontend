import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BaseService from '../../api/service';
import { Keyword } from './types';

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

export const postKeyword = createAsyncThunk(
  'keywords/postKeyword',
  async (keyword: string, { rejectWithValue }) => {
    try {
      const response = await BaseService.post('keywords', { keyword });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Cria o slice
const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postKeyword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data);
        console.log('state', state)
        console.log('action', action.payload.data)
      })
      .addCase(postKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to post keyword';
      });
  },
});

// Exporta o reducer
export default keywordsSlice.reducer; 