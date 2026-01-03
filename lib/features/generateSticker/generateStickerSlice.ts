import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';
import { GenerateStickerState, StickerItem } from './types';

const initialState: GenerateStickerState = {
  status: 'idle',
  error: null,
  stickers: [],
  currentTconst: null,
};

export const generateSticker = createAsyncThunk<
  string,
  { tconst: string; sequentialId?: number }
>(
  'generateSticker/generateSticker',
  async ({ tconst, sequentialId }, { rejectWithValue }) => {
    try {
      // Fazer requisição direta com fetch para lidar com blob
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      const url = sequentialId 
        ? `${baseURL}sticker/generate/${tconst}/${sequentialId}`
        : `${baseURL}sticker/generate/${tconst}`;
      
      console.log('[GenerateSticker] Making request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Não enviar body conforme especificado
      });
      
      console.log('[GenerateSticker] Response status:', response.status);
      console.log('[GenerateSticker] Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[GenerateSticker] Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      // Verificar se a resposta é uma imagem
      const contentType = response.headers.get('content-type');
      console.log('[GenerateSticker] Content-Type:', contentType);
      
      if (!contentType || !contentType.startsWith('image/')) {
        const errorText = await response.text();
        console.error('[GenerateSticker] Invalid content type:', contentType, 'Response:', errorText);
        throw new Error(`Invalid content type: ${contentType}. Expected image.`);
      }
      
      // Converter para blob
      const blob = await response.blob();
      console.log('[GenerateSticker] Blob size:', blob.size, 'type:', blob.type);
      
      // Criar URL do blob para a imagem
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } catch (error) {
      console.error('[GenerateSticker] Error:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Erro ao gerar sticker');
    }
  }
);

export const fetchAllStickers = createAsyncThunk<
  StickerItem[], // Lista de stickers
  string // tconst do filme
>(
  'generateSticker/fetchAllStickers',
  async (tconst, { rejectWithValue }) => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      const url = `${baseURL}sticker/all/${tconst}`;
      
      console.log('[FetchAllStickers] Making request to:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          // Não há stickers ainda, retornar array vazio
          return [];
        }
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      return data.stickers || [];
    } catch (error) {
      console.error('[FetchAllStickers] Error:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Erro ao buscar stickers');
    }
  }
);

export const deleteSticker = createAsyncThunk<
  string,
  { tconst: string; filename: string }
>(
  'generateSticker/deleteSticker',
  async ({ tconst, filename }, { rejectWithValue }) => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      const url = `${baseURL}sticker/${tconst}/${filename}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      return filename;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Erro ao remover sticker');
    }
  }
);

const generateStickerSlice = createSlice({
  name: 'generateSticker',
  initialState,
  reducers: {
    clearStickers: (state) => {
      // Limpar todas as URLs de blob
      state.stickers.forEach(sticker => {
        if (sticker.url.startsWith('blob:')) {
          URL.revokeObjectURL(sticker.url);
        }
      });
      state.stickers = [];
      state.currentTconst = null;
      state.error = null;
    },
    removeSticker: (state, action) => {
      const filename = action.payload;
      const stickerIndex = state.stickers.findIndex(s => s.filename === filename);
      if (stickerIndex !== -1) {
        const sticker = state.stickers[stickerIndex];
        if (sticker.url.startsWith('blob:')) {
          URL.revokeObjectURL(sticker.url);
        }
        state.stickers.splice(stickerIndex, 1);
      }
    },
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(generateSticker.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.currentTconst = action.meta.arg.tconst;
      })
      .addCase(generateSticker.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Adicionar o novo sticker à lista
        const newSticker: StickerItem = {
          url: action.payload,
          filename: `sticker_${Date.now()}.png`, // Nome temporário
          tconst: action.meta.arg.tconst,
          created_at: new Date().toISOString()
        };
        state.stickers.unshift(newSticker); // Adicionar no início da lista
        state.error = null;
      })
      .addCase(generateSticker.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Erro ao gerar sticker';
      })
      .addCase(fetchAllStickers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllStickers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const stickersWithTconst = action.payload.map(sticker => ({
          ...sticker,
          tconst: action.meta.arg
        }));
        state.stickers = stickersWithTconst;
        state.error = null;
      })
      .addCase(fetchAllStickers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Erro ao buscar stickers';
      })
      .addCase(deleteSticker.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteSticker.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const filename = action.payload;
        const stickerIndex = state.stickers.findIndex(s => s.filename === filename);
        if (stickerIndex !== -1) {
          const sticker = state.stickers[stickerIndex];
          if (sticker.url.startsWith('blob:')) {
            URL.revokeObjectURL(sticker.url);
          }
          state.stickers.splice(stickerIndex, 1);
        }
        state.error = null;
      })
      .addCase(deleteSticker.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Erro ao remover sticker';
      });
  },
});

export const { clearStickers, removeSticker, resetStatus } = generateStickerSlice.actions;
export default generateStickerSlice.reducer;
