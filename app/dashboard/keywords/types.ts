export interface Keyword {
  _id: string;
  keyword: string;
}

export interface SuggestedMovie {
  description?: string;
  relevance?: string;
  tconst: string;
  title: string;
  year?: number | string;
}

export interface SuggestMoviesResponse {
  movies: SuggestedMovie[];
}
