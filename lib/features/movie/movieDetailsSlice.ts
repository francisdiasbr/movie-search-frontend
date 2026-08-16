import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import {
  EditDetailsPayload,
  MovieDetailsItem,
  MovieDetailsState,
} from './types';

const initialState: MovieDetailsState = {
  data: null,
  error: null,
  addStatus: 'idle',
  editStatus: 'idle',
  deleteStatus: 'idle',
  fetchStatus: 'idle',
};

// O BaseService lança um Error com o status e o corpo cru da resposta. O
// backend responde { data: '<mensagem>' } na maioria dos erros e { message }
// quando o Mongo está indisponível, então é de lá que sai o texto exibido.
const parseApiError = (error: unknown): { message?: string; status?: number } => {
  const { response, responseText } = (error ?? {}) as {
    response?: { status?: number };
    responseText?: string;
  };
  try {
    const body = responseText ? JSON.parse(responseText) : {};
    return { message: body.data || body.message, status: response?.status };
  } catch {
    return { status: response?.status };
  }
};

export const addFavorite = createAsyncThunk(
  'movie/addFavorite',
  async (tconst: string, { rejectWithValue }) => {
    const url = `favorites/${tconst}`;
    try {
      const response = await BaseService.post(url);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      return rejectWithValue(parseApiError(error));
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  'movie/deleteFavorite',
  async (tconst: string, { rejectWithValue }) => {
    const url = `favorites/${tconst}`;
    try {
      const response = await BaseService.delete(url);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const fetchDetails = createAsyncThunk(
  'movie/details',
  async (tconst: string) => {
    try {
      const response = await BaseService.get(`favorites/${tconst}`);
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
    const url = `favorites/${data.tconst}`;

    const body: EditDetailsPayload = {
      magnet_link: data.magnet_link,
      references: data.references,
      soundtrack: data.soundtrack,
      tconst: data.tconst,
      watched: data.watched,
      wiki: data.wiki,
    };

    try {
      const response = await BaseService.put(url, body as any);
      return response.data;
    } catch (error) {
      console.error('Error editing details:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
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
        const { message, status } = (action.payload ?? {}) as { message?: string; status?: number };
        state.addStatus = 'failed';
        state.error =
          status === 409
            ? 'Este filme já está na lista de favoritos.'
            : message || 'Não foi possível adicionar o filme na coleção.';
      })
      .addCase(deleteFavorite.pending, state => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteFavorite.fulfilled, state => {
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message || 'Failed to delete favorite';
      })
      .addCase(fetchDetails.pending, state => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.data = action.payload as MovieDetailsItem;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch details';
      })
      .addCase(editDetails.pending, state => {
        state.editStatus = 'loading';
      })
      .addCase(editDetails.fulfilled, (state, action) => {
        state.editStatus = 'succeeded';
        state.data = action.payload as MovieDetailsItem;
      })
      .addCase(editDetails.rejected, (state, action) => {
        state.editStatus = 'failed';
        state.error =
          action.payload || action.error.message || 'Failed to edit details';
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
