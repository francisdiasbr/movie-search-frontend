export interface StickerItem {
  url: string;
  filename: string;
  last_modified?: string;
  size?: number;
  tconst?: string;
  created_at?: string;
}

export interface StickerResponse {
  imageUrl: string;
  tconst: string;
}

export interface GenerateStickerState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  stickers: StickerItem[];
  currentTconst: string | null;
}
