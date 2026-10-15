export interface MovieReviewResponse {
  review: string;
  title: string;
  tconst: string;
  primaryTitle: string;
  created_at: string;
}

export interface MovieReviewState {
  entries: MovieReviewResponse[];
  data: MovieReviewResponse | null;
  error: string | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}
