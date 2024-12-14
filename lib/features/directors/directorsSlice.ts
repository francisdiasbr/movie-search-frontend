import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';

interface DirectorMovie {
  originalTitle: string;
  year: number;
}

interface Director {
  _id: string;
  director: string;
  filmography: DirectorMovie[];
}

interface DirectorsState {
  data: Director[];
  loading: boolean;
  error: string | null;
}

const initialState: DirectorsState = {
  data: [],
  loading: false,
  error: null,
};

export const getDirectors = createAsyncThunk(
  'directors/getDirectors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BaseService.get('directors');
      console.log('getDirectors', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const postDirector = createAsyncThunk(
  'directors/postDirector',
  async (director: string, { rejectWithValue }) => {
    try {
      const response = await BaseService.post('directors', { director });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const deleteDirector = createAsyncThunk(
  'directors/deleteDirector',
  async (director: string, { rejectWithValue }) => {
    try {
      const response = await BaseService.delete(`directors/${director}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const directorsSlice = createSlice({
  name: 'directors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDirectors.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDirectors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDirectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get directors';
      })
      .addCase(postDirector.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postDirector.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(postDirector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to post director';
      })
      .addCase(deleteDirector.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDirector.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          director => director._id !== action.meta.arg
        );
      })
      .addCase(deleteDirector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete director';
      });
  },
});

export default directorsSlice.reducer;
