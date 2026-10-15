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

export interface FavoritesSearchParams {
  filters?: Record<string, unknown>;
  searchTerm?: string;
}

export interface FavoritesSearchResponse {
  countries?: string[];
  entries: MovieItem[];
  total_documents: number;
  years?: number[];
}
