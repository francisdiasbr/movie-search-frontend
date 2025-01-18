export interface MovieReviewResponse {
  review: string;
  title: string;
  tconst: string;
  primaryTitle: string;
  isAiGenerated: boolean;
  created_at: string;
}

export interface MovieReviewState {
  entries: MovieReviewResponse[];
  data: MovieReviewResponse | null;
  error: unknown;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}
