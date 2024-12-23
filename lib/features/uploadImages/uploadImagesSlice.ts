import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface UploadImageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  objectName: string | null;
  imageUrl: string | null;
  imageUrls: string[];
  imageNames: string[];
}

const initialState: UploadImageState = {
  status: 'idle',
  error: null,
  objectName: null,
  imageUrl: null,
  imageUrls: [],
  imageNames: [],
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

export const fetchPublicImageUrl = createAsyncThunk<
  { url: string },
  { tconst: string; objectName: string }
>(
  'uploadImages/fetchPublicImageUrl',
  async ({ tconst, objectName }, { rejectWithValue }) => {
    console.log('objectName fetchPublicImageUrl', objectName);
    console.log('tconst fetchPublicImageUrl', tconst);
    try {
      const response = await baseService.get(
        `personal-opinion/get-public-image-url/${tconst}/${objectName}`
      );
      return response;
    } catch (error) {
      console.error('Error fetching image URL:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const fetchAllImageUrls = createAsyncThunk<
  { urls: string[]; names: string[] },
  { tconst: string }
>('uploadImages/fetchAllImageUrls', async ({ tconst }, { rejectWithValue }) => {
  try {
    const response = await baseService.get(
      `personal-opinion/get-all-image-urls/${tconst}`
    );

    const urls = response.images.map((image: { url: string }) => image.url);
    const names = response.images.map(
      (image: { filename: string }) => image.filename
    );

    return { urls, names };
  } catch (error) {
    console.error('Error fetching all image URLs:', error);
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue('An unexpected error occurred');
    }
  }
});

export const deleteImage = createAsyncThunk<
  void,
  { tconst: string; filename: string }
>(
  'uploadImages/deleteImage',
  async ({ tconst, filename }, { rejectWithValue }) => {
    try {
      await baseService.delete(
        `personal-opinion/delete-image/${tconst}/${filename}`
      );
      console.log(`Imagem ${filename} deletada com sucesso.`);
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
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
        console.log(
          'Nome do objeto (imagem) no slice:',
          action.payload.object_name
        );
      })
      .addCase(uploadOpinionImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchPublicImageUrl.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPublicImageUrl.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrl = action.payload.url;
      })
      .addCase(fetchPublicImageUrl.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchAllImageUrls.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllImageUrls.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls = action.payload.urls;
        state.imageNames = action.payload.names;
        console.log('Nomes das imagens no slice:', action.payload.names);
      })
      .addCase(fetchAllImageUrls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export const selectImageUrl = (state: { uploadImages: UploadImageState }) =>
  state.uploadImages.imageUrl;

export const selectImageUrls = (state: { uploadImages: UploadImageState }) =>
  state.uploadImages.imageUrls;

export const selectImageNames = (state: { uploadImages: UploadImageState }) =>
  state.uploadImages.imageNames;

export default uploadImagesSlice.reducer;
