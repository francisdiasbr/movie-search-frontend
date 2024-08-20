export interface MovieSearchState {
  entries: any;
  error: null | string;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
  total_documents: number;
}
