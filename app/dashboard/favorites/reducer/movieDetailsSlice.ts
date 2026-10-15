import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import favoritesService from '../service/FavoritesService';
import { EditDetailsPayload, MovieDetailsItem, MovieDetailsState } from '../types';

const initialState: MovieDetailsState = {
  data: null,
  error: null,
  editStatus: 'idle',
  deleteStatus: 'idle',
  fetchStatus: 'idle',
};

export const deleteFavorite = createApiThunk<void, string>(
  'movie/deleteFavorite',
  tconst => favoritesService.removeFavorite(tconst).then(() => undefined),
  'Não foi possível remover o filme da coleção.'
);

export const fetchDetails = createApiThunk<MovieDetailsItem, string>(
  'movie/details',
  tconst => favoritesService.getDetails(tconst).then(response => response.data),
  'Não foi possível carregar os detalhes do filme.'
);

export const editDetails = createApiThunk<MovieDetailsItem, EditDetailsPayload>(
  'movies/edit',
  data => favoritesService.edit(data.tconst, data).then(response => response.data),
  'Não foi possível salvar as alterações.'
);

const movieDetailsSlice = createSlice({
  initialState,
  name: 'favoriteDetails',
  reducers: {
    resetDeleteStatus(state) {
      state.deleteStatus = 'idle';
    },
    resetState: () => initialState,
  },
  extraReducers: builder => {
    addStatusCases(builder, deleteFavorite, 'deleteStatus');
    addStatusCases(builder, fetchDetails, 'fetchStatus', (state, action) => {
      state.data = action.payload;
    });
    addStatusCases(builder, editDetails, 'editStatus', (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { resetDeleteStatus, resetState } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
