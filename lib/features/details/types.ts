export interface MovieDetailsItem {
  _id: string;
  averageRating: number;
  numVotes: number;
  plot: string;
  primaryTitle: string;
  quote: string;
  soundtrack: string;
  startYear: number;
  tconst: string;
  wiki: string;
}

export interface MovieDetailsState {
  data: any;
  error: null | string;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}
