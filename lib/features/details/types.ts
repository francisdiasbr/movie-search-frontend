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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
