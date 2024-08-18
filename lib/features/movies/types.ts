export interface MovieItem {
    _id: string;
    averageRating: number;
    numVotes: number;
    primaryTitle: string;
    startYear: number;
    tconst: string;
}

export interface MovieCuratoryState {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}