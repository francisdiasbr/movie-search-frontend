import { AsyncStatus } from '../../../lib/api/types';
import { ImageItem } from '../../../lib/service/ImagesBaseService';
import { Language } from '../../userPreferences/types';

// One row of the favorites list. The backend sends the whole document, these
// are the fields the table reads.
export interface FavoriteEntry {
  _id: string;
  country?: string;
  hasReview?: boolean;
  plot_keywords?: string[];
  poster_url?: string;
  primaryTitle: string;
  startYear: number;
  tconst: string;
  watched: boolean;
}

export interface MovieFavoritesState {
  addStatus: AsyncStatus;
  countries: string[];
  entries: FavoriteEntry[];
  error: null | string;
  status: AsyncStatus;
  startYears: number[];
  total_documents: number;
}

export interface FavoritesFilters {
  country?: string;
  // Inclusive bounds; the service turns them into a Mongo range on startYear.
  startYearFrom?: number;
  startYearTo?: number;
  watched?: boolean;
}

export interface FavoritesSearchParams {
  filters?: FavoritesFilters;
  // 1-based; the backend skips (page - 1) * pageSize documents.
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}

export interface FavoritesSearchResponse {
  countries?: string[];
  entries: FavoriteEntry[];
  total_documents: number;
  years?: number[];
}

export type MovieLanguage = Language;

export interface MovieDetailsItem {
  // Landscape still from IMDb for the banner; '' when IMDb has none.
  backdrop_url?: string;
  director: string;
  _id: string;
  country: string;
  genres: string[];
  imdb_url?: string;
  // Language the texts actually came in: 'en' when the Portuguese version
  // does not exist yet, even if it was requested.
  lang?: MovieLanguage;
  magnet_link: string | null;
  plot: string;
  plot_keywords: string[];
  primaryTitle: string;
  quote: string;
  references?: string[];
  soundtrack: string;
  stars: string[];
  startYear: number;
  subtitle_url?: string;
  tconst: string;
  trivia: string;
  watched: boolean;
  wiki: string;
  writers: string[];
}

export interface MovieDetailsState {
  data: MovieDetailsItem | null;
  error: string | null;
  editStatus: AsyncStatus;
  deleteStatus: AsyncStatus;
  fetchStatus: AsyncStatus;
  translateStatus: AsyncStatus;
}

export interface FetchDetailsParams {
  lang?: MovieLanguage;
  tconst: string;
}

// Só o tconst é obrigatório: o backend grava apenas os campos enviados, então
// quem edita um campo não precisa reenviar os outros.
export interface EditDetailsPayload {
  magnet_link?: string | null;
  references?: string[];
  soundtrack?: string;
  tconst: string;
  watched?: boolean;
  wiki?: string;
}

export interface MainImagesState {
  error: string | null;
  images: ImageItem[];
  status: AsyncStatus;
}
