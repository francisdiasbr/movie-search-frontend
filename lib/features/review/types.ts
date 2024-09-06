export interface MovieReviewResponse {
  review: string;
  plot: string;
  title: string;
  tconst: string;
}

export interface MovieReviewState {
  entries: MovieReviewResponse[];
  data: MovieReviewResponse | null;
  error: unknown;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}