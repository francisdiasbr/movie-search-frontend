import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';

export interface TorrentResult {
  leechers: number;
  magnet: string | null;
  seeds: number;
  title: string;
}

interface TorrentSearchState {
  error: unknown;
  results: TorrentResult[];
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}

const initialState: TorrentSearchState = {
  error: null,
  results: [],
  status: 'idle',
};

export const fetchTorrents = createAsyncThunk(
  'torrentSearch/fetch',
  async (primaryTitle: string) => {
    const response = await BaseService.get(`search/?query=${encodeURIComponent(primaryTitle)}`);
    if (Array.isArray(response)) {
      return response as TorrentResult[];
    }
    throw new Error('Invalid response format');
  }
);

const torrentSearchSlice = createSlice({
  initialState,
  name: 'torrentSearch',
  reducers: {
    resetTorrentSearch: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTorrents.pending, state => {
        state.status = 'loading';
        state.results = [];
        state.error = null;
      })
      .addCase(fetchTorrents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchTorrents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch torrents';
      });
  },
});

export const { resetTorrentSearch } = torrentSearchSlice.actions;
export default torrentSearchSlice.reducer;
