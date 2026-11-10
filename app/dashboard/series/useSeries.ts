import { useCallback, useState } from 'react';

import { isApiError } from '../../../lib/api/errors';
import { AsyncStatus } from '../../../lib/api/types';
import { API_MESSAGE } from '../../formatter';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import seriesService from './service/SeriesService';
import { SeriesEntry } from './types';

// The series list. Only this screen reads it, so no slice. add/remove/
// setWatched show the outcome toast and update the list in place.
export function useSeries() {
  const { showError, showSuccess } = useToastNotifications();
  const [series, setSeries] = useState<SeriesEntry[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');

  const load = useCallback(async (searchTerm = '') => {
    setStatus('loading');
    try {
      const response = await seriesService.searchSeries({ searchTerm });
      setSeries(response.entries ?? []);
      setStatus('succeeded');
    } catch (error) {
      // A cancelled search is superseded by the next one, not a failure.
      if (isApiError(error) && error.cancelled) return;
      setStatus('failed');
    }
  }, []);

  // Resolves true when the series was added, so the caller can close its dialog.
  const add = async (tconst: string): Promise<boolean> => {
    try {
      const response = await seriesService.addSeries(tconst);
      setSeries(prev => [...prev, response.data].sort((a, b) => a.primaryTitle.localeCompare(b.primaryTitle)));
      showSuccess({ title: `${response.data.primaryTitle} adicionada às séries.` });
      return true;
    } catch (error) {
      showError({ title: API_MESSAGE(isApiError(error) ? error.message : null, 'Não foi possível adicionar a série.') });
      return false;
    }
  };

  const remove = async (entry: SeriesEntry) => {
    try {
      await seriesService.removeSeries(entry.tconst);
      setSeries(prev => prev.filter(item => item.tconst !== entry.tconst));
      showSuccess({ title: `${entry.primaryTitle} removida das séries.` });
    } catch {
      showError({ title: 'Não foi possível remover a série.' });
    }
  };

  const setWatched = async (entry: SeriesEntry, watched: boolean) => {
    try {
      await seriesService.setWatched(entry.tconst, watched);
      setSeries(prev => prev.map(item => (item.tconst === entry.tconst ? { ...item, watched } : item)));
    } catch {
      showError({ title: 'Não foi possível atualizar o status.' });
    }
  };

  return { add, load, remove, series, setWatched, status };
}
