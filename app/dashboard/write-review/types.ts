import { AsyncStatus } from '../../../lib/api/types';
import { ReviewContent } from '../reviews/types';

export interface CreateReviewPayload {
  content: ReviewContent;
  primaryTitle: string;
  references?: string[];
  tconst: string;
}

export interface CreateReviewResponse {
  _id: string;
  content: ReviewContent;
  created_at: string;
  images: string[];
  primaryTitle: string;
  references?: string[];
  tconst: string;
}

export interface WriteReviewState {
  error: string | null;
  status: AsyncStatus;
}
