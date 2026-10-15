import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import keywordsService from '../service/KeywordsService';
import { Keyword, KeywordsState } from '../types';

const initialState: KeywordsState = {
  data: [],
  error: null,
  status: 'idle',
};

export const getKeywords = createApiThunk<Keyword[]>(
  'keywords/getKeywords',
  () => keywordsService.list().then(response => response.data ?? []),
  'Não foi possível carregar as palavras-chave.'
);

const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {},
  extraReducers: builder => {
    addStatusCases(builder, getKeywords, 'status', (state, action) => {
      state.data = action.payload;
    });
  },
});

export default keywordsSlice.reducer;
