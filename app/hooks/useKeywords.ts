import { useState } from 'react';

import BaseService from '../../lib/api/service';

export function useKeywords() {
  const [keywords, setKeywords] = useState<string[]>([]);

  const load = async () => {
    try {
      const response = await BaseService.get('keywords');
      setKeywords((response.data ?? []).map((kw: any) => kw.keyword));
    } catch {}
  };

  const add = async (keyword: string): Promise<'added' | 'duplicate' | 'conflict' | 'error'> => {
    try {
      await BaseService.post('keywords', { keyword });
      setKeywords((prev) => [...prev, keyword]);
      return 'added';
    } catch (error: any) {
      const status = error.response?.status ?? error.responseText?.includes('409') ? 409 : 0;
      if (status === 409) return keywords.includes(keyword) ? 'duplicate' : 'conflict';
      return 'error';
    }
  };

  const remove = async (keyword: string): Promise<boolean> => {
    try {
      await BaseService.delete(`keywords/${keyword}`);
      setKeywords((prev) => prev.filter((k) => k !== keyword));
      return true;
    } catch {
      return false;
    }
  };

  return { keywords, load, add, remove };
}
