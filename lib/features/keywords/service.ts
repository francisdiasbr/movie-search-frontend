import { ApiResponse } from '../../api/types';
import BaseService from '../../service/BaseService';
import { Keyword, SuggestMoviesResponse } from './types';

class KeywordsService extends BaseService {
  protected prefix = 'keywords';

  add(keyword: string): Promise<ApiResponse<Keyword>> {
    return this.post({ keyword });
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
