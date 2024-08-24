import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { EditDetailsPayload, MovieDetailsItem, MovieDetailsState } from './types';

const initialState: MovieDetailsState = {
  data: null,
  error: null,
  status: 'idle',
  editStatus: 'idle'
};

export const fetchDetails = createAsyncThunk(
  'movies/details',
  async (tconst: string) => {
    try {
      const response = await BaseService.get(
        `movie/${tconst}`
      );
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      throw error;
    }
  }
);

export const editDetails = createAsyncThunk(
  'movies/edit',
  async (data: EditDetailsPayload, { rejectWithValue }) => {
    console.log('data', data)
    const url = `movie/${data.tconst}/edit`;

    const body: EditDetailsPayload = {
      tconst: data.tconst,
      primaryTitle: data.primaryTitle,
      startYear: data.startYear,
      soundtrack: data.soundtrack,
      wiki: data.wiki
    };

    try {
      const response = await BaseService.put(url, body as any);
      console.log('response', response)
      return response.data;
    } catch (error) {
      console.error('Error editing details:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('An unexpected error occurred')
      }
    }
  }
);

const movieDetailsSlice = createSlice({
  initialState,
  name: 'movieDetails',
  reducers: {
    resetEditStatus(state) {
      state.editStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as MovieDetailsItem;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch details';
      })
      .addCase(editDetails.pending, (state) => {
        state.editStatus = 'loading';
      })
      .addCase(editDetails.fulfilled, (state, action) => {
        state.editStatus = 'succeeded';
        state.data = action.payload as MovieDetailsItem;
      })
      .addCase(editDetails.rejected, (state, action) => {
        state.editStatus = 'failed';
        state.error = action.payload || action.error.message || 'Failed to edit details';
      })
  },
});

export const { resetEditStatus } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
