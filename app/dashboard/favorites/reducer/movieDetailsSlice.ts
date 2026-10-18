import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import favoritesService from '../service/FavoritesService';
import { EditDetailsPayload, FetchDetailsParams, MovieDetailsItem, MovieDetailsState } from '../types';

const initialState: MovieDetailsState = {
  data: null,
  error: null,
  editStatus: 'idle',
  deleteStatus: 'idle',
  fetchStatus: 'idle',
  translateStatus: 'idle',
};

export const deleteFavorite = createApiThunk<void, string>(
  'movie/deleteFavorite',
  tconst => favoritesService.removeFavorite(tconst).then(() => undefined),
  'Não foi possível remover o filme da coleção.'
);

export const fetchDetails = createApiThunk<MovieDetailsItem, FetchDetailsParams>(
  'movie/details',
  ({ tconst, lang }) => favoritesService.getDetails(tconst, lang).then(response => response.data),
  'Não foi possível carregar os detalhes do filme.'
);

export const translateDetails = createApiThunk<MovieDetailsItem, string>(
  'movie/translate',
  tconst => favoritesService.translate(tconst).then(response => response.data),
  'Não foi possível traduzir o filme.'
);

export const editDetails = createApiThunk<MovieDetailsItem, EditDetailsPayload>(
  'movies/edit',
  data => favoritesService.edit(data.tconst, data).then(response => response.data),
  'Não foi possível salvar as alterações.'
);

// Fields the backend translates, kept over an edit so the screen does not
// flip back to English after saving a magnet link.
const pickTexts = (data: MovieDetailsItem | null) =>
  data?.lang === 'pt'
    ? { genres: data.genres, plot: data.plot, plot_keywords: data.plot_keywords, quote: data.quote, trivia: data.trivia }
    : {};

const movieDetailsSlice = createSlice({
  initialState,
  name: 'favoriteDetails',
  reducers: {
    resetDeleteStatus(state) {
      state.deleteStatus = 'idle';
    },
    resetState: () => initialState,
    resetTranslateStatus(state) {
      state.translateStatus = 'idle';
    },
  },
  extraReducers: builder => {
    addStatusCases(builder, deleteFavorite, 'deleteStatus');
    addStatusCases(builder, fetchDetails, 'fetchStatus', (state, action) => {
      state.data = action.payload;
    });
    addStatusCases(builder, editDetails, 'editStatus', (state, action) => {
      // The edit answer comes in English; keep the texts the user is reading.
      state.data = { ...action.payload, ...pickTexts(state.data), lang: state.data?.lang };
    });
    addStatusCases(builder, translateDetails, 'translateStatus', (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { resetDeleteStatus, resetState, resetTranslateStatus } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
