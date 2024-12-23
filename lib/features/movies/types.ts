export interface MovieItem {
  _id: string;
  averageRating: number;
  numVotes: number;
  originalTitle: string;
  startYear: number;
  tconst: string;
}

export interface MovieFavoritesState {
  countries: string[];
  entries: any;
  error: null | string;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
  startYears: number[];
  total_documents: number;
}
