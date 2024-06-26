import { createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../../api/service'; 

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query: string, { rejectWithValue }) => {
    try {
      const url = `/search?query=${encodeURIComponent(query)}`;
      const response = await BaseService.get(url);
      return response.response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
