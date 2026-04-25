export interface MovieReviewResponse {
  content: any;
  primaryTitle: string;
  tconst: string;
}

export interface AuthoralReviewState {
  data: MovieReviewResponse | null;
  error: unknown;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}
