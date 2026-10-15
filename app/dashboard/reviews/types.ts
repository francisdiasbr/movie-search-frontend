import { AsyncStatus } from '../../../lib/api/types';

export interface ReviewContentLanguage {
  text: string;
}

export interface ReviewContent {
  en: ReviewContentLanguage;
  pt: ReviewContentLanguage;
}

export interface CreateAuthoralReviewPayload {
  content: ReviewContent;
  primaryTitle: string;
  references?: string[];
  tconst: string;
}

export interface UpdateAuthoralReviewPayload {
  content: {
    en?: ReviewContentLanguage;
    pt?: ReviewContentLanguage;
  };
}

export interface AuthoralReviewResponse {
  _id: string;
  content: ReviewContent;
  created_at: string;
  images: string[];
  primaryTitle: string;
  references?: string[];
  tconst: string;
}

export interface MovieReviewResponse {
  content: any;
  primaryTitle: string;
  tconst: string;
}

export interface AuthoralReviewState {
  data: MovieReviewResponse | null;
  error: string | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}

export interface ReviewSummary {
  review: string;
  title: string;
  tconst: string;
  primaryTitle: string;
  created_at: string;
}

export interface AllAuthoralReviewsState {
  entries: ReviewSummary[];
  data: ReviewSummary | null;
  error: string | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
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
