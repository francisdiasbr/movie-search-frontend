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
  addStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  editStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  deleteStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
  fetchStatus: 'failed' | 'idle' | 'loading' | 'succeeded';
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
