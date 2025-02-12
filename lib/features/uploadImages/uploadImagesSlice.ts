import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface UploadImageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  uploadStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  objectName: string | null;
  imageUrl: string | null;
  imageUrls: string[];
  imageNames: string[];
  imageSubtitles: string[];
  imageCache: {
    [tconst: string]: {
      urls: string[];
      names: string[];
    }
  }
  subtitleStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UploadImageState = {
  status: 'idle',
  uploadStatus: 'idle',
  error: null,
  objectName: null,
  imageUrl: null,
  imageUrls: [],
  imageNames: [],
  imageSubtitles: [],
  imageCache: {},
  subtitleStatus: 'idle',
};


export const fetchAllImageUrls = createAsyncThunk<
  { urls: string[]; names: string[]; subtitles: string[] },
  { tconst: string }
>(
  'uploadImages/fetchAllImageUrls',
  async ({ tconst }, { getState, rejectWithValue }) => {
    try {
      const response = await baseService.get(`images/${tconst}`);
      
      if (response.images) {
        return {
          urls: response.images.map((image: { url: string }) => image.url),
          names: response.images.map((image: { filename: string }) => image.filename),
          subtitles: response.images.map((image: { subtitle: string }) => image.subtitle)
        };
      }

      throw new Error('Formato de resposta inválido');
    } catch (error) {
      return rejectWithValue('Erro ao buscar imagens');
    }
  }
);

export const uploadMovieImage = createAsyncThunk<
  { object_name: string },
  { tconst: string; file: File }
>(
  'uploadImages/uploadMovieImage',
  async ({ tconst, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await baseService.post(
        `images/${tconst}`,
        formData
      );
      if (response.object_name) {
        console.log('response uploadMovieImage full', response);
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

export const deleteImage = createAsyncThunk<
  void,
  { tconst: string; filename: string }
>(
  'uploadImages/deleteImage',
  async ({ tconst, filename }, { rejectWithValue }) => {
    try {
      await baseService.delete(
        `images/${tconst}/${filename}`
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

export const updateImageSubtitle = createAsyncThunk(
  'uploadImages/updateSubtitle',
  async ({ tconst, filename, subtitle }: { tconst: string, filename: string, subtitle: string }) => {
    const body = {
      subtitle: subtitle
    }
    const response = await baseService.put(`images/${tconst}/${filename}`, body as any);
    
    if (!response.ok) {
      throw new Error('Falha ao atualizar legenda');
    }
    
    return await response.json();
  }
);

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
        console.log(
          'Nome do objeto (imagem) no slice:',
          action.payload.object_name
        );
      })
      .addCase(uploadMovieImage.rejected, (state) => {
        state.uploadStatus = 'failed';
        state.error = 'An unexpected error occurred';
      })
      .addCase(fetchAllImageUrls.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllImageUrls.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls = action.payload.urls;
        state.imageNames = action.payload.names;
        state.imageSubtitles = action.payload.subtitles;
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
      })
      .addCase(updateImageSubtitle.pending, (state) => {
        state.subtitleStatus = 'loading';
      })
      .addCase(updateImageSubtitle.fulfilled, (state) => {
        state.subtitleStatus = 'succeeded';
      })
      .addCase(updateImageSubtitle.rejected, (state) => {
        state.subtitleStatus = 'failed';
      });
  },
});

// export const selectImageUrl = (state: { uploadImages: UploadImageState }) =>
//   state.uploadImages.imageUrl;

// export const selectImageUrls = (state: { uploadImages: UploadImageState }) =>
//   state.uploadImages.imageUrls;

// export const selectImageNames = (state: { uploadImages: UploadImageState }) =>
//   state.uploadImages.imageNames;

export default uploadImagesSlice.reducer;
