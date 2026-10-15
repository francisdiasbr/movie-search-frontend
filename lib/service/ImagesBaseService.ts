import BaseService from './BaseService';

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

// `images` (gallery) and `main-images` (cover) share the same contract, so
// both feature services inherit these methods and only differ by prefix.
abstract class ImagesBaseService extends BaseService {
  list(tconst: string): Promise<ImagesListResponse> {
    return this.get(tconst);
  }

  removeImage(tconst: string, filename: string): Promise<unknown> {
    return this.api.remove(this.path(tconst, filename));
  }

  updateSubtitle(tconst: string, filename: string, body: UpdateSubtitlePayload): Promise<unknown> {
    return this.api.put(this.path(tconst, filename), { ...body });
  }

  upload(tconst: string, file: File): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.post(formData, this.path(tconst));
  }
}

export default ImagesBaseService;
