import { useCallback, useState } from 'react';

import { AsyncStatus } from '../../../lib/api/types';
import readService from './service/ReadService';
import { ReviewSummary } from './types';

// The list of written reviews. Only this screen reads it, so no slice.
export function useReviews() {
  const [entries, setEntries] = useState<ReviewSummary[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await readService.searchReviews();
      setEntries(response.entries ?? []);
      setStatus('succeeded');
    } catch {
      setEntries([]);
      setStatus('failed');
    }
  }, []);

  return { entries, load, status };
}
