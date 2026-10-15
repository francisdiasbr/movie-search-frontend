import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../../../lib/api/thunk';
import { ImageItem, UpdateSubtitlePayload } from '../../../../lib/service/ImagesBaseService';
import imagesService from '../service/ImagesService';
import { ReviewImagesState } from '../types';

const initialState: ReviewImagesState = {
  error: null,
  images: [],
  status: 'idle',
  subtitleStatus: 'idle',
  uploadStatus: 'idle',
};

export const fetchImages = createApiThunk<ImageItem[], { tconst: string }>(
  'reviewImages/fetch',
  ({ tconst }) => imagesService.list(tconst).then(response => response.images ?? []),
  'Não foi possível carregar as imagens.'
);

export const uploadMovieImage = createApiThunk<void, { file: File; tconst: string }>(
  'reviewImages/upload',
  async ({ file, tconst }) => {
    const response = await imagesService.upload(tconst, file);
    if (!response?.object_name) {
      throw new Error('Formato de resposta inválido');
    }
  },
  'Não foi possível enviar a imagem.'
);

export const deleteImage = createApiThunk<void, { filename: string; tconst: string }>(
  'reviewImages/delete',
  ({ filename, tconst }) => imagesService.removeImage(tconst, filename).then(() => undefined),
  'Não foi possível deletar a imagem.'
);

export const updateImageSubtitle = createApiThunk<void, UpdateSubtitlePayload & { filename: string; tconst: string }>(
  'reviewImages/updateSubtitle',
  ({ filename, subtitle_en, subtitle_pt, tconst }) =>
    imagesService.updateSubtitle(tconst, filename, { subtitle_en, subtitle_pt }).then(() => undefined),
  'Não foi possível atualizar a legenda.'
);

const reviewImagesSlice = createSlice({
  name: 'reviewImages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    addStatusCases(builder, fetchImages, 'status', (state, action) => {
      state.images = action.payload;
    });
    addStatusCases(builder, deleteImage, 'status');
    addStatusCases(builder, uploadMovieImage, 'uploadStatus');
    addStatusCases(builder, updateImageSubtitle, 'subtitleStatus');
  },
});

export default reviewImagesSlice.reducer;
