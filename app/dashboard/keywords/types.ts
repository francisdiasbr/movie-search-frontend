export interface Keyword {
  _id: string;
  keyword: string;
}

export interface SuggestedMovie {
  description?: string;
  genres?: string[];
  // Both come from IMDb's keyword search: `title` is the localized title,
  // `original_title` the one shown first.
  original_title?: string;
  // Which of the selected keywords IMDb associates with the movie.
  relevance?: string;
  tconst: string;
  title: string;
  year?: number | string;
}

export interface SuggestMoviesResponse {
  movies: SuggestedMovie[];
}
