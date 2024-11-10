import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import BaseService from "../../api/service";
import { MovieReviewState } from "./types";

const initialState: MovieReviewState = {
  data: null,
  entries: [],
  error: null,
  status: "idle",
};


export const generateReview = createAsyncThunk(
  "review/generate",
  async (tconst: string, { rejectWithValue }) => {
    const url = `favorited-movies/${tconst}/generate-review`;
    try {
      const response = await BaseService.post(url);
      console.log('response', response);
      if (response) {
        return response.data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error generating review:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const fetchReview = createAsyncThunk(
  "review/fetch",
  async (tconst: string, { rejectWithValue }) => {
    const url = `favorited-movies/${tconst}/generate-review`;
    try {
      const response = await BaseService.get(url);
      if (response) {
        return response.data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching review:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);


const reviewsSlice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    clearGenerateReviewState(state) {
      state.data = null;
      state.error = null;
      state.entries = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log('state.data', state.data);
      })
      .addCase(generateReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { clearGenerateReviewState } = reviewsSlice.actions;

export default reviewsSlice.reducer;