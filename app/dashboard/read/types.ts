import { AsyncStatus } from '../../../lib/api/types';

export interface ReviewSummary {
  created_at: string;
  primaryTitle: string;
  review: string;
  tconst: string;
  title: string;
}

export interface ReadState {
  entries: ReviewSummary[];
  error: string | null;
  status: AsyncStatus;
}
