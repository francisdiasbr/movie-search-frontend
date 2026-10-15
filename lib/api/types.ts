// Most backend endpoints wrap the payload in { data }.
export interface ApiResponse<T> {
  data: T;
}

// List endpoints answer with { entries } plus optional pagination metadata.
export interface EntriesResponse<T> {
  entries: T[];
  total_documents?: number;
}

export type AsyncStatus = 'failed' | 'idle' | 'loading' | 'succeeded';
