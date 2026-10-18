import { ApiResponse, EntriesResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { Keyword, SuggestMoviesResponse } from '../types';

class KeywordsService extends BaseService {
  protected prefix = 'keywords';

  add(keyword: string): Promise<ApiResponse<Keyword>> {
    return this.post({ keyword });
  }

  // Saves a suggested movie in the collection (favorites resource).
  addToCollection(tconst: string): Promise<ApiResponse<unknown>> {
    return this.post(undefined, `favorites/${encodeURIComponent(tconst)}`);
  }

  // Which of the suggested movies are already in the collection.
  async findCollectedTconsts(tconsts: string[]): Promise<Set<string>> {
    if (tconsts.length === 0) return new Set();
    const response = await this.post<EntriesResponse<{ tconst: string }>>(
      { filters: { tconst: { $in: tconsts } }, page_size: 0 },
      'favorites/search'
    );
    return new Set((response.entries ?? []).map(entry => entry.tconst));
  }

  list(): Promise<ApiResponse<Keyword[]>> {
    return this.get();
  }

  removeKeyword(keyword: string): Promise<ApiResponse<unknown>> {
    return this.remove(keyword);
  }

  suggestMovies(keywords: string[]): Promise<ApiResponse<SuggestMoviesResponse>> {
    return this.post({ keywords }, this.path('suggest-movies'));
  }
}

export default new KeywordsService();
