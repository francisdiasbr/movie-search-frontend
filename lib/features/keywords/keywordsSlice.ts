import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../api/errors';
import keywordsService from './service';
import { Keyword, KeywordsState } from './types';

const initialState: KeywordsState = {
  data: [],
  error: null,
  loading: false,
};

export const getKeywords = createAsyncThunk<
  Keyword[],
  void,
  { rejectValue: ApiErrorPayload }
>('keywords/getKeywords', async (_, { rejectWithValue }) => {
  try {
    const response = await keywordsService.list();
    return response.data ?? [];
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível carregar as palavras-chave.'));
  }
});

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
        state.error = action.payload?.message ?? 'Não foi possível carregar as palavras-chave.';
      });
  },
});

export default keywordsSlice.reducer;
