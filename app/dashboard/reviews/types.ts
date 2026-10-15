import { AsyncStatus } from '../../../lib/api/types';
import { ImageItem } from '../../../lib/service/ImagesBaseService';

export interface ReviewContentLanguage {
  text: string;
}

export interface ReviewContent {
  en: ReviewContentLanguage;
  pt: ReviewContentLanguage;
}

export interface UpdateAuthoralReviewPayload {
  content: Partial<ReviewContent>;
}

export interface MovieReviewResponse {
  content?: Partial<ReviewContent>;
  primaryTitle: string;
  tconst: string;
}

export interface AuthoralReviewState {
  data: MovieReviewResponse | null;
  error: string | null;
  status: AsyncStatus;
}

export interface ReviewImagesState {
  error: string | null;
  images: ImageItem[];
  status: AsyncStatus;
  subtitleStatus: AsyncStatus;
  uploadStatus: AsyncStatus;
}
