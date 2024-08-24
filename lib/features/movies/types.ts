export interface MovieItem {
  _id: string;
  averageRating: number;
  numVotes: number;
  primaryTitle: string;
  startYear: number;
  tconst: string;
}

export interface MovieFavoritesState {
  entries: any;
  error: null | string;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
  total_documents: number;
}
