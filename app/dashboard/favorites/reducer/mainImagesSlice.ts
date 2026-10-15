import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../../../lib/api/errors';
import { ImageItem, UploadImageResponse } from '../../../../lib/service/ImagesBaseService';
import mainImagesService from '../service/MainImagesService';
import { UploadMainImageState } from '../types';

const initialState: UploadMainImageState = {
  error: null,
  images: [],
  objectName: null,
  status: 'idle',
};

export const uploadMainImage = createAsyncThunk<
  UploadImageResponse,
  { file: File; tconst: string },
  { rejectValue: ApiErrorPayload }
>('uploadMainImages/uploadMainImage', async ({ file, tconst }, { rejectWithValue }) => {
  try {
    const response = await mainImagesService.upload(tconst, file);
    if (!response?.object_name) {
      throw new Error('Formato de resposta inválido');
    }
    return response;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível enviar a imagem principal.'));
  }
});

export const fetchMainImage = createAsyncThunk<
  ImageItem[],
  { tconst: string },
  { rejectValue: ApiErrorPayload }
>('uploadMainImages/fetchMainImage', async ({ tconst }, { rejectWithValue }) => {
  try {
    const response = await mainImagesService.list(tconst);
    return Array.isArray(response?.images) ? response.images : [];
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível carregar a imagem principal.'));
  }
});

export const deleteMainImage = createAsyncThunk<
  void,
  { filename: string; tconst: string },
  { rejectValue: ApiErrorPayload }
>('uploadMainImages/deleteMainImage', async ({ filename, tconst }, { rejectWithValue }) => {
  try {
    await mainImagesService.removeImage(tconst, filename);
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível deletar a imagem principal.'));
  }
});

const uploadMainImagesSlice = createSlice({
  name: 'uploadMainImages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadMainImage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadMainImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.objectName = action.payload.object_name;
        // The current list is kept until the next fetch refreshes it.
      })
      .addCase(uploadMainImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível enviar a imagem principal.';
      })
      .addCase(fetchMainImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMainImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload ?? [];
      })
      .addCase(fetchMainImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível carregar a imagem principal.';
      })
      .addCase(deleteMainImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMainImage.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteMainImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível deletar a imagem principal.';
      });
  },
});

export default uploadMainImagesSlice.reducer;
