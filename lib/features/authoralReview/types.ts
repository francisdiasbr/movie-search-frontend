export interface MovieReviewResponse {
  primaryTitle: string;
  content: any;
  tconst: string;
  isAiGenerated: boolean;
}

export interface AuthoralReviewState {
  data: MovieReviewResponse | null;
  error: unknown;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}
