export interface Keyword {
  _id: string;
  keyword: string;
}

export interface SuggestedMovie {
  description?: string;
  // Title as listed on IMDb; `title` may be the Portuguese one.
  original_title?: string;
  relevance?: string;
  // Confirmed by the backend against IMDb.
  tconst: string;
  title: string;
  year?: number | string;
}

export interface SuggestMoviesResponse {
  movies: SuggestedMovie[];
}
