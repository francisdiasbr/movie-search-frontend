export interface MovieDetailsItem {
  _id: string;
  averageRating: number;
  numVotes: number;
  plot: string;
  originalTitle: string;
  quote: string;
  soundtrack: string;
  startYear: number;
  tconst: string;
  wiki: string;
  plot_keywords: string[];
}

export interface MovieDetailsState {
  data: any;
  error: unknown;
  addStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  delStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  editStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  fetchStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
}

export interface EditDetailsPayload {
  watched: boolean;
  tconst: string;
  originalTitle: string;
  soundtrack: string;
  wiki: string;
}