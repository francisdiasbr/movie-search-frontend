import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../../../lib/api/errors';
import { MovieDetailsItem } from '../../favorites/types';
import searchService from '../service/SearchService';
import { SearchState } from '../types';

const initialState: SearchState = {
  addStatus: 'idle',
  error: null,
};

export const addFavorite = createAsyncThunk<
  MovieDetailsItem,
  string,
  { rejectValue: ApiErrorPayload }
>('search/addFavorite', async (tconst, { rejectWithValue }) => {
  try {
    const response = await searchService.add(tconst);
    return response.data;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível adicionar o filme na coleção.'));
  }
});

const searchSlice = createSlice({
  initialState,
  name: 'search',
  reducers: {
    resetAddStatus(state) {
      state.addStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addFavorite.pending, state => {
        state.addStatus = 'loading';
      })
      .addCase(addFavorite.fulfilled, state => {
        state.addStatus = 'succeeded';
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.error =
          action.payload?.status === 409
            ? 'Este filme já está na lista de favoritos.'
            : action.payload?.message ?? 'Não foi possível adicionar o filme na coleção.';
      });
  },
});

export const { resetAddStatus } = searchSlice.actions;
export default searchSlice.reducer;
