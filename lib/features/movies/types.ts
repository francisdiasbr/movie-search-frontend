export interface MovieItem {
  _id: string;
  averageRating: number;
  numVotes: number;
  primaryTitle: string;
  startYear: number;
  tconst: string;
}

export interface MovieCuratoryState {
  entries: any;
  error: null | string;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
  total_documents: number;
}
