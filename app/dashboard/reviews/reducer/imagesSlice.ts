import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import { ImageItem } from '../../../../lib/service/ImagesBaseService';
import imagesService from '../service/ImagesService';
import { ReviewImagesState } from '../types';

const initialState: ReviewImagesState = {
  error: null,
  images: [],
  status: 'idle',
  subtitleStatus: 'idle',
  uploadStatus: 'idle',
};

const listImages = (tconst: string) => imagesService.list(tconst).then(response => response.images ?? []);

export const fetchImages = createApiThunk<ImageItem[], { tconst: string }>(
  'reviewImages/fetch',
  ({ tconst }) => listImages(tconst),
  'Não foi possível carregar as imagens.'
);

// Every write re-reads the gallery, so the slice always holds the server state.
export const uploadMovieImage = createApiThunk<ImageItem[], { file: File; tconst: string }>(
  'reviewImages/upload',
  async ({ file, tconst }) => {
    await imagesService.upload(tconst, file);
    return listImages(tconst);
  },
  'Não foi possível enviar a imagem.'
);

export const deleteImage = createApiThunk<ImageItem[], { filename: string; tconst: string }>(
  'reviewImages/delete',
  async ({ filename, tconst }) => {
    await imagesService.removeImage(tconst, filename);
    return listImages(tconst);
  },
  'Não foi possível deletar a imagem.'
);

export const updateImageSubtitle = createApiThunk<ImageItem[], { filename: string; subtitle: string; tconst: string }>(
  'reviewImages/updateSubtitle',
  async ({ filename, subtitle, tconst }) => {
    // The form has one caption field; the backend stores it for both languages.
    await imagesService.updateSubtitle(tconst, filename, { subtitle_en: subtitle, subtitle_pt: subtitle });
    return listImages(tconst);
  },
  'Não foi possível atualizar a legenda.'
);

const setImages = (state: ReviewImagesState, action: { payload: ImageItem[] }) => {
  state.images = action.payload;
};

const reviewImagesSlice = createSlice({
  name: 'reviewImages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    addStatusCases(builder, fetchImages, 'status', setImages);
    addStatusCases(builder, deleteImage, 'status', setImages);
    addStatusCases(builder, uploadMovieImage, 'uploadStatus', setImages);
    addStatusCases(builder, updateImageSubtitle, 'subtitleStatus', setImages);
  },
});

export default reviewImagesSlice.reducer;
