import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from '../../../../lib/api/errors';
import { UpdateSubtitlePayload, UploadImageResponse } from '../../../../lib/service/ImagesBaseService';
import imagesService from '../service/ImagesService';
import { UploadImageState } from '../types';

const initialState: UploadImageState = {
  error: null,
  imageNames: [],
  imageSubtitles_pt: [],
  imageUrls: [],
  objectName: null,
  status: 'idle',
  subtitleStatus: 'idle',
  uploadStatus: 'idle',
};

export const fetchAllImageUrls = createAsyncThunk<
  { names: string[]; subtitles_pt: string[]; urls: string[] },
  { tconst: string },
  { rejectValue: ApiErrorPayload }
>('uploadImages/fetchAllImageUrls', async ({ tconst }, { rejectWithValue }) => {
  try {
    const response = await imagesService.list(tconst);
    const images = response.images ?? [];
    return {
      names: images.map(image => image.filename),
      subtitles_pt: images.map(image => image.subtitle_pt ?? ''),
      urls: images.map(image => image.url),
    };
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível carregar as imagens.'));
  }
});

export const uploadMovieImage = createAsyncThunk<
  UploadImageResponse,
  { file: File; tconst: string },
  { rejectValue: ApiErrorPayload }
>('uploadImages/uploadMovieImage', async ({ file, tconst }, { rejectWithValue }) => {
  try {
    const response = await imagesService.upload(tconst, file);
    if (!response?.object_name) {
      throw new Error('Formato de resposta inválido');
    }
    return response;
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível enviar a imagem.'));
  }
});

export const deleteImage = createAsyncThunk<
  void,
  { filename: string; tconst: string },
  { rejectValue: ApiErrorPayload }
>('uploadImages/deleteImage', async ({ filename, tconst }, { rejectWithValue }) => {
  try {
    await imagesService.removeImage(tconst, filename);
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível deletar a imagem.'));
  }
});

export const updateImageSubtitle = createAsyncThunk<
  void,
  UpdateSubtitlePayload & { filename: string; tconst: string },
  { rejectValue: ApiErrorPayload }
>('uploadImages/updateSubtitle', async ({ filename, subtitle_en, subtitle_pt, tconst }, { rejectWithValue }) => {
  try {
    await imagesService.updateSubtitle(tconst, filename, { subtitle_en, subtitle_pt });
  } catch (error) {
    return rejectWithValue(toApiErrorPayload(error, 'Não foi possível atualizar a legenda.'));
  }
});

const uploadImagesSlice = createSlice({
  name: 'uploadImages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadMovieImage.pending, (state) => {
        state.uploadStatus = 'loading';
        state.error = null;
      })
      .addCase(uploadMovieImage.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.objectName = action.payload.object_name;
      })
      .addCase(uploadMovieImage.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível enviar a imagem.';
      })
      .addCase(fetchAllImageUrls.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllImageUrls.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls = action.payload.urls;
        state.imageNames = action.payload.names;
        state.imageSubtitles_pt = action.payload.subtitles_pt;
      })
      .addCase(fetchAllImageUrls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível carregar as imagens.';
      })
      .addCase(deleteImage.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, state => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível deletar a imagem.';
      })
      .addCase(updateImageSubtitle.pending, (state) => {
        state.subtitleStatus = 'loading';
      })
      .addCase(updateImageSubtitle.fulfilled, (state) => {
        state.subtitleStatus = 'succeeded';
      })
      .addCase(updateImageSubtitle.rejected, (state, action) => {
        state.subtitleStatus = 'failed';
        state.error = action.payload?.message ?? 'Não foi possível atualizar a legenda.';
      });
  },
});

export default uploadImagesSlice.reducer;
