import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import { ImageItem } from '../../../../lib/service/ImagesBaseService';
import mainImagesService from '../service/MainImagesService';
import { MainImagesState } from '../types';

const initialState: MainImagesState = {
  error: null,
  images: [],
  status: 'idle',
};

export const fetchMainImage = createApiThunk<ImageItem[], { tconst: string }>(
  'mainImages/fetch',
  async ({ tconst }) => {
    const response = await mainImagesService.list(tconst);
    return Array.isArray(response?.images) ? response.images : [];
  },
  'Não foi possível carregar a imagem principal.'
);

export const uploadMainImage = createApiThunk<void, { file: File; tconst: string }>(
  'mainImages/upload',
  async ({ file, tconst }) => {
    const response = await mainImagesService.upload(tconst, file);
    if (!response?.object_name) {
      throw new Error('Formato de resposta inválido');
    }
  },
  'Não foi possível enviar a imagem principal.'
);

export const deleteMainImage = createApiThunk<void, { filename: string; tconst: string }>(
  'mainImages/delete',
  ({ filename, tconst }) => mainImagesService.removeImage(tconst, filename).then(() => undefined),
  'Não foi possível deletar a imagem principal.'
);

const mainImagesSlice = createSlice({
  name: 'mainImages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    addStatusCases(builder, fetchMainImage, 'status', (state, action) => {
      state.images = action.payload;
    });
    addStatusCases(builder, uploadMainImage, 'status');
    addStatusCases(builder, deleteMainImage, 'status');
  },
});

export default mainImagesSlice.reducer;
