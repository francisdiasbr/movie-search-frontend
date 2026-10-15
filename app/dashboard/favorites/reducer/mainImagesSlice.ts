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

const listImages = (tconst: string) =>
  mainImagesService.list(tconst).then(response => (Array.isArray(response?.images) ? response.images : []));

export const fetchMainImage = createApiThunk<ImageItem[], { tconst: string }>(
  'mainImages/fetch',
  ({ tconst }) => listImages(tconst),
  'Não foi possível carregar a imagem principal.'
);

// Every write re-reads the list, so the slice always holds the server state.
export const uploadMainImage = createApiThunk<ImageItem[], { file: File; tconst: string }>(
  'mainImages/upload',
  async ({ file, tconst }) => {
    await mainImagesService.upload(tconst, file);
    return listImages(tconst);
  },
  'Não foi possível enviar a imagem principal.'
);

export const deleteMainImage = createApiThunk<ImageItem[], { filename: string; tconst: string }>(
  'mainImages/delete',
  async ({ filename, tconst }) => {
    await mainImagesService.removeImage(tconst, filename);
    return listImages(tconst);
  },
  'Não foi possível deletar a imagem principal.'
);

const setImages = (state: MainImagesState, action: { payload: ImageItem[] }) => {
  state.images = action.payload;
};

const mainImagesSlice = createSlice({
  name: 'mainImages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    addStatusCases(builder, fetchMainImage, 'status', setImages);
    addStatusCases(builder, uploadMainImage, 'status', setImages);
    addStatusCases(builder, deleteMainImage, 'status', setImages);
  },
});

export default mainImagesSlice.reducer;
