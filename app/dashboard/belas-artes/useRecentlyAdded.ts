import { useCallback, useState } from 'react';

import { AsyncStatus } from '../../../lib/api/types';
import belasArtesService from './service/BelasArtesService';
import { RecentMovie } from './types';

// The movies recently added to Belas Artes. Only this screen reads them, so no slice.
export function useRecentlyAdded() {
  const [movies, setMovies] = useState<RecentMovie[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await belasArtesService.listRecentlyAdded();
      setMovies(response.data.movies ?? []);
      setStatus('succeeded');
    } catch {
      setMovies([]);
      setStatus('failed');
    }
  }, []);

  return { load, movies, status };
}
