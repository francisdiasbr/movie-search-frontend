import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface UploadImageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  objectName: string | null;
}

const initialState: UploadImageState = {
  status: 'idle',
  error: null,
  objectName: null,
};

export const uploadOpinionImage = createAsyncThunk<
  { object_name: string },
  { tconst: string; file: File }
>(
  'uploadImages/uploadOpinionImage',
  async ({ tconst, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await baseService.post(
        `/personal-opinion/upload-image/${tconst}`,
        formData
      );
      if (response.object_name) {
        console.log('response uploadOpinionImage full', response);
        return response;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const uploadImagesSlice = createSlice({
  name: 'uploadImages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadOpinionImage.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadOpinionImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.objectName = action.payload.object_name;
      })
      .addCase(uploadOpinionImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default uploadImagesSlice.reducer;
