import { AsyncStatus } from '../../../lib/api/types';

export interface SearchState {
  addStatus: AsyncStatus;
  error: string | null;
}
