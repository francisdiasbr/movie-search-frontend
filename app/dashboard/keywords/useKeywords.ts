import { useCallback, useState } from 'react';

import { isApiError } from '../../../lib/api/errors';
import { AsyncStatus } from '../../../lib/api/types';
import keywordsService from './service/KeywordsService';

export type AddKeywordResult = 'added' | 'conflict' | 'duplicate' | 'error';

// The favourite keywords list, shared by the keywords page and the movie
// detail page. The result is only used locally, so there is no slice.
export function useKeywords() {
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

  const add = async (keyword: string): Promise<AddKeywordResult> => {
    try {
      await keywordsService.add(keyword);
      setKeywords(prev => [...prev, keyword]);
      return 'added';
    } catch (error) {
      if (isApiError(error) && error.status === 409) {
        return keywords.includes(keyword) ? 'duplicate' : 'conflict';
      }
      return 'error';
    }
  };

  const remove = async (keyword: string): Promise<boolean> => {
    try {
      await keywordsService.removeKeyword(keyword);
      setKeywords(prev => prev.filter(item => item !== keyword));
      return true;
    } catch {
      return false;
    }
  };

  return { add, keywords, load, remove, status };
}
