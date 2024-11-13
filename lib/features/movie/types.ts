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
  tconst: string;
  originalTitle?: string;
  startYear?: number;
  soundtrack?: string;
  wiki?: string;
}