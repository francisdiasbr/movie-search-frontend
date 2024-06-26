import { createSlice } from '@reduxjs/toolkit';

import { fetchMovies } from '../actions/moviesActions';

const initialState = {
  moviesList: '',
  status: 'idle',
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moviesList = action.payload;
        // console.log('action.payload', action.payload)
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clearState } = moviesSlice.actions;

export default moviesSlice.reducer;
