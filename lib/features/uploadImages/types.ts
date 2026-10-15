export type AsyncStatus = 'failed' | 'idle' | 'loading' | 'succeeded';

export interface ImageItem {
  filename: string;
  sequential_id?: number;
  subtitle_en?: string;
  subtitle_pt?: string;
  url: string;
}

export interface ImagesListResponse {
  images: ImageItem[];
}

export interface UploadImageResponse {
  object_name: string;
  url?: string;
}

export interface UpdateSubtitlePayload {
  subtitle_en: string;
  subtitle_pt: string;
}

export interface UploadImageState {
  error: string | null;
  imageNames: string[];
  imageSubtitles_pt: string[];
  imageUrls: string[];
  objectName: string | null;
  status: AsyncStatus;
  subtitleStatus: AsyncStatus;
  uploadStatus: AsyncStatus;
}

export interface UploadMainImageState {
  error: string | null;
  images: ImageItem[];
  objectName: string | null;
  status: AsyncStatus;
}
