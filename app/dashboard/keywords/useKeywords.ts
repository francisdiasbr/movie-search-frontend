import { useState } from 'react';

import { isApiError } from '../../../lib/api/errors';
import keywordsService from './service/KeywordsService';

export type AddKeywordResult = 'added' | 'conflict' | 'duplicate' | 'error';

export function useKeywords() {
  const [keywords, setKeywords] = useState<string[]>([]);

  const load = async () => {
    try {
      const response = await keywordsService.list();
      setKeywords((response.data ?? []).map(item => item.keyword));
    } catch {
      // The list simply stays as it was.
    }
  };

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

  return { keywords, load, add, remove };
}
