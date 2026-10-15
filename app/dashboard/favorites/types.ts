import { AsyncStatus } from '../../../lib/api/types';
import { ImageItem } from '../../../lib/service/ImagesBaseService';

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
  status: AsyncStatus;
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
  error: string | null;
  editStatus: AsyncStatus;
  deleteStatus: AsyncStatus;
  fetchStatus: AsyncStatus;
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

export interface UploadMainImageState {
  error: string | null;
  images: ImageItem[];
  objectName: string | null;
  status: AsyncStatus;
}
