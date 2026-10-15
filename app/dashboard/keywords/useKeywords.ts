import { useCallback, useState } from 'react';

import { isApiError } from '../../../lib/api/errors';
import { AsyncStatus } from '../../../lib/api/types';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import keywordsService from './service/KeywordsService';

// The favourite keywords list, shared by the keywords page and the movie
// detail page. The result is only used locally, so there is no slice.
// add/remove already show the outcome toast.
export function useKeywords() {
  const { showError, showInfo, showSuccess, showWarning } = useToastNotifications();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await keywordsService.list();
      setKeywords((response.data ?? []).map(item => item.keyword));
      setStatus('succeeded');
    } catch {
      setStatus('failed');
    }
  }, []);

  const add = async (keyword: string) => {
    try {
      await keywordsService.add(keyword);
      setKeywords(prev => [...prev, keyword]);
      showSuccess({ title: 'Palavra-chave adicionada.' });
    } catch (error) {
      if (isApiError(error) && error.status === 409) {
        if (keywords.includes(keyword)) showInfo({ title: 'Palavra-chave já existe.', duration: 2000 });
        else showWarning({ title: 'Palavra-chave não permitida.' });
        return;
      }
      showError({ title: 'Erro ao adicionar palavra-chave.' });
    }
  };

  const remove = async (keyword: string) => {
    try {
      await keywordsService.removeKeyword(keyword);
      setKeywords(prev => prev.filter(item => item !== keyword));
      showSuccess({ title: 'Palavra-chave removida.' });
    } catch {
      showError({ title: 'Erro ao remover palavra-chave.' });
    }
  };

  return { add, keywords, load, remove, status };
}
