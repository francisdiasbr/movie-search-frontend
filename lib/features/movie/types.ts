export interface MovieDetailsItem {
  director: string;
  _id: string;
  country: string;
  genres: string[];
  magnet_link: string | null;
  plot: string;
  plot_keywords: string[];
  primaryTitle: string;
  quote: string;
  references?: string[];
  soundtrack: string;
  stars: string[];
  startYear: number;
  tconst: string;
  trivia: string;
  watched: boolean;
  wiki: string;
  writers: string[];
}

export interface MovieDetailsState {
  data: any;
  error: unknown;
  addStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  editStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  deleteStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  fetchStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
}

export interface EditDetailsPayload {
  references?: string[];
  soundtrack: string;
  tconst: string;
  watched: boolean;
  wiki: string;
}
