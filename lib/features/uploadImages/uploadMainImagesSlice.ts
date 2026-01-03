import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface MainImageItem {
  url: string;
  filename: string;
  subtitle_en: string;
  subtitle_pt: string;
  sequential_id: number;
}

interface UploadMainImageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  objectName: string | null;
  images: MainImageItem[];
}

const initialState: UploadMainImageState = {
  status: 'idle',
  error: null,
  objectName: null,
  images: [],
};

export const uploadMainImage = createAsyncThunk<
  { object_name: string; url?: string },
  { tconst: string; file: File }
>(
  'uploadMainImages/uploadMainImage',
  async ({ tconst, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await baseService.post(
        `main-images/${tconst}`,
        formData
      );
      if (response.object_name) {
        return response;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchMainImage = createAsyncThunk<
  MainImageItem[],
  { tconst: string }
>(
  'uploadMainImages/fetchMainImage',
  async ({ tconst }, { rejectWithValue }) => {
    try {
      const response = await baseService.get(`main-images/${tconst}`);
      if (response && Array.isArray(response.images)) {
        return response.images as MainImageItem[];
      }
      return [];
    } catch (error) {
      return rejectWithValue('Erro ao buscar imagem principal');
    }
  }
);

export const deleteMainImage = createAsyncThunk<
  void,
  { tconst: string; filename: string }
>(
  'uploadMainImages/deleteMainImage',
  async ({ tconst, filename }, { rejectWithValue }) => {
    try {
      await baseService.delete(`main-images/${tconst}/${filename}`);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message as unknown as any);
      }
      return rejectWithValue('Erro ao deletar imagem principal' as unknown as any);
    }
  }
);

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
        // Mantemos as imagens atuais até o fetch subsequente atualizar a lista
      })
      .addCase(uploadMainImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'An unexpected error occurred';
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
        state.error = (action.payload as string) || 'Erro ao buscar imagem principal';
      })
      .addCase(deleteMainImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMainImage.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteMainImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Erro ao deletar imagem principal';
      });
  },
});

export default uploadMainImagesSlice.reducer;


