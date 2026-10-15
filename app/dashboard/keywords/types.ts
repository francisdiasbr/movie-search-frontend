import { AsyncStatus } from '../../../lib/api/types';

export interface Keyword {
  _id: string;
  keyword: string;
}

export interface SuggestedMovie {
  description?: string;
  relevance?: string;
  title: string;
  year?: number | string;
}

export interface SuggestMoviesResponse {
  movies: SuggestedMovie[];
}

export interface KeywordsState {
  data: Keyword[];
  error: string | null;
  status: AsyncStatus;
}
