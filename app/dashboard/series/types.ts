// One series as the list endpoint sends it (plot, creators and stars stay in
// the full document and are not needed on screen yet).
export interface SeriesEntry {
  _id: string;
  // null while the series is still on air.
  endYear: number | null;
  episodes: number;
  genres: string[];
  imdb_rating: number | null;
  poster_url: string;
  primaryTitle: string;
  seasons: number;
  startYear: number | null;
  tconst: string;
  // Title as released in Brazil; '' when it is the same as the original.
  title_pt: string;
  watched: boolean;
}

export interface SeriesSearchParams {
  searchTerm?: string;
}

export interface SeriesSearchResponse {
  entries: SeriesEntry[];
  total_documents: number;
}
