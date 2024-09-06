import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import BaseService from "../../api/service";
import { AuthoralReviewState } from "./types";

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: "idle",
};

interface AuthoralReviewProps {
  author: string;
  title: string;
  review: string;
  tconst: string;
}

export const postAuthoralReview = createAsyncThunk(
  'authoralReview/create',
  async (review: AuthoralReviewProps, { rejectWithValue }) => {
    const { tconst } = review; // Declare and destructure the 'tconst' variable
    const url = `favorited-movies/${tconst}/write-review`;
    const reviewBody = {
      author: review.author,
      title: review.title,
      review: review.review,
    };
    try {
      const response = await BaseService.post(url, reviewBody);
      if (response) {
        return response;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error generating authoral review:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
)

const authoralReviewsSlice = createSlice({
  initialState,
  name: "authoralReviews",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postAuthoralReview.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postAuthoralReview.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      console.log("action.payload add authoral", action.payload);
    });
    builder.addCase(postAuthoralReview.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  }
})

export default authoralReviewsSlice.reducer;