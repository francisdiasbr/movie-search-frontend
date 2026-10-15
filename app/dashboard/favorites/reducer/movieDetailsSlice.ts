import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../../../lib/api/errors';
import favoritesService from '../service/FavoritesService';
import {
  EditDetailsPayload,
  MovieDetailsItem,
  MovieDetailsState,
} from '../types';

const initialState: MovieDetailsState = {
  data: null,
  error: null,
  addStatus: 'idle',
  editStatus: 'idle',
  deleteStatus: 'idle',
  fetchStatus: 'idle',
};

export const addFavorite = createAsyncThunk<
  MovieDetailsItem,
  string,
  { rejectValue: ApiErrorPayload }
>('movie/addFavorite', async (tconst, { rejectWithValue }) => {
  try {
    const response = await favoritesService.add(tconst);
    return response.data;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível adicionar o filme na coleção.'));
  }
});

export const deleteFavorite = createAsyncThunk<
  unknown,
  string,
  { rejectValue: ApiErrorPayload }
>('movie/deleteFavorite', async (tconst, { rejectWithValue }) => {
  try {
    const response = await favoritesService.removeFavorite(tconst);
    return response.data;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível remover o filme da coleção.'));
  }
});

export const fetchDetails = createAsyncThunk<
  MovieDetailsItem,
  string,
  { rejectValue: ApiErrorPayload }
>('movie/details', async (tconst, { rejectWithValue }) => {
  try {
    const response = await favoritesService.getDetails(tconst);
    return response.data;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível carregar os detalhes do filme.'));
  }
});

export const editDetails = createAsyncThunk<
  MovieDetailsItem,
  EditDetailsPayload,
  { rejectValue: ApiErrorPayload }
>('movies/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await favoritesService.edit(data.tconst, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível salvar as alterações.'));
  }
});

const movieDetailsSlice = createSlice({
  initialState,
  name: 'movieDetails',
  reducers: {
    resetEditStatus(state) {
      state.editStatus = 'idle';
    },
    resetDeleteStatus(state) {
      state.deleteStatus = 'idle';
    },
    resetAddStatus(state) {
      state.addStatus = 'idle';
      state.error = null;
    },
    resetState: () => initialState,
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
      })
      .addCase(deleteFavorite.pending, state => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteFavorite.fulfilled, state => {
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível remover o filme da coleção.';
      })
      .addCase(fetchDetails.pending, state => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível carregar os detalhes do filme.';
      })
      .addCase(editDetails.pending, state => {
        state.editStatus = 'loading';
      })
      .addCase(editDetails.fulfilled, (state, action) => {
        state.editStatus = 'succeeded';
        state.data = action.payload;
      })
      .addCase(editDetails.rejected, (state, action) => {
        state.editStatus = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível salvar as alterações.';
      });
  },
});

export const {
  resetAddStatus,
  resetEditStatus,
  resetDeleteStatus,
  resetState
} = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
