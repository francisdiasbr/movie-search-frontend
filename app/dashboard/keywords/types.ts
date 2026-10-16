export interface Keyword {
  _id: string;
  keyword: string;
}

export interface SuggestedMovie {
  description?: string;
  // From the IMDb title page; empty when the page could not be loaded.
  genres?: string[];
  // Title as listed on IMDb (verified). `title` is the model's Portuguese
  // title and can be wrong, so it is shown second.
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
