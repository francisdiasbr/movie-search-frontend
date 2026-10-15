import BaseService from '../../service/BaseService';
import { ImagesListResponse, UpdateSubtitlePayload, UploadImageResponse } from './types';

// `images` (gallery) and `main-images` (cover) share the same contract, so
// both services inherit the same methods and only differ by prefix.
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

class ImagesService extends ImagesBaseService {
  protected prefix = 'images';
}

class MainImagesService extends ImagesBaseService {
  protected prefix = 'main-images';
}

export const imagesService = new ImagesService();
export const mainImagesService = new MainImagesService();
