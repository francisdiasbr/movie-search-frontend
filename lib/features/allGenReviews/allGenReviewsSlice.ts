import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import BaseService from "../../api/service";
import { MovieReviewState } from "./types";

const initialState: MovieReviewState = {
  data: null,
  entries: [],
  error: null,
  status: "idle",
};

interface FetchAllGeneratedReviewsParams {
  filters?: any;
  page: number;
  pageSize?: number;
}

export const fetchAllGeneratedReviews = createAsyncThunk(
  "review/fetchAllGenerated",
  async (params: FetchAllGeneratedReviewsParams, { rejectWithValue }) => {
    const url = `favorited-movies/generate-review/search`;
    try {
      const fetchBody = {
        filters: params.filters || {},
        page: params.page,
        page_size: params.pageSize,
      };
      console.log('fetchBody', fetchBody);
      const response = await BaseService.post(url, fetchBody)
      console.log('response fetchAllGeneratedReviews', response);
      if (response) {
        return response.entries;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching all generated reviews:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

const allGenReviewsSlice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    clearGenerateReviewStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGeneratedReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllGeneratedReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entries = action.payload;
        console.log('state.entries', state.entries);
      })
      .addCase(fetchAllGeneratedReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { clearGenerateReviewStatus } = allGenReviewsSlice.actions;

export default allGenReviewsSlice.reducer;