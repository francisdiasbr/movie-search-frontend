export interface MovieItem {
    _id: string;
    averageRating: number;
    numVotes: number;
    primaryTitle: string;
    startYear: number;
    tconst: string;
}

export interface MovieCuratoryState {
    entries: any;
    total_documents: number
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}