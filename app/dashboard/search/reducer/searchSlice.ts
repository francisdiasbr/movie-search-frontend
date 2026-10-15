import { createSlice } from '@reduxjs/toolkit';

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
  tconst => searchService.add(tconst).then(response => response.data),
  'Não foi possível adicionar o filme na coleção.'
);

const searchSlice = createSlice({
  initialState,
  name: 'search',
  reducers: {
    resetAddStatus: () => initialState,
  },
  extraReducers: builder => {
    addStatusCases(builder, addFavorite, 'addStatus').addCase(addFavorite.rejected, (state, action) => {
      if (action.payload?.status === 409) state.error = 'Este filme já está na lista de favoritos.';
    });
  },
});

export const { resetAddStatus } = searchSlice.actions;
export default searchSlice.reducer;
