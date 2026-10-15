import { createSlice } from '@reduxjs/toolkit';

import { isApiError } from '../../../../lib/api/errors';
import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import { MovieDetailsItem } from '../../favorites/types';
import searchService from '../service/SearchService';
import { SearchState } from '../types';

const initialState: SearchState = {
  addStatus: 'idle',
  error: null,
};

export const addFavorite = createApiThunk<MovieDetailsItem, string>(
  'search/addFavorite',
  async tconst => {
    try {
      const response = await searchService.add(tconst);
      return response.data;
    } catch (error) {
      if (isApiError(error) && error.status === 409) {
        throw new Error('Este filme já está na lista de favoritos.');
      }
      throw error;
    }
  },
  'Não foi possível adicionar o filme na coleção.'
);

const searchSlice = createSlice({
  initialState,
  name: 'search',
  reducers: {
    resetAddStatus: () => initialState,
  },
  extraReducers: builder => {
    addStatusCases(builder, addFavorite, 'addStatus');
  },
});

export const { resetAddStatus } = searchSlice.actions;
export default searchSlice.reducer;
