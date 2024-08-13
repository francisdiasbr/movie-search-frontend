// Curatory

export interface MovieItem {
    _id: string;
    averageRating: number;
    numVotes: number;
    primaryTitle: string;
    startYear: number;
    tconst: string;
}

export interface MovieCuratoryState {
    data: any; // Tipo do dado retornado (pode ajustar conforme necessário)
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Suggestion

export interface MovieSuggestionState {
    data: string; // Tipo do dado retornado (pode ajustar conforme necessário)
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export type FetchMovieSuggestionPayload = string;