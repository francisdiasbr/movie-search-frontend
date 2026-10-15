import { AsyncStatus } from '../../../lib/api/types';

export interface ReviewContentLanguage {
  text: string;
}

export interface ReviewContent {
  en: ReviewContentLanguage;
  pt: ReviewContentLanguage;
}

export interface UpdateAuthoralReviewPayload {
  content: {
    en?: ReviewContentLanguage;
    pt?: ReviewContentLanguage;
  };
}

export interface MovieReviewResponse {
  content: any;
  primaryTitle: string;
  tconst: string;
}

export interface AuthoralReviewState {
  data: MovieReviewResponse | null;
  error: string | null;
  status: AsyncStatus;
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
