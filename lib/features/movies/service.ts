import { ApiResponse } from '../../api/types';
import BaseService from '../../service/BaseService';
import { EditDetailsPayload, MovieDetailsItem } from '../movie/types';
import { FavoritesSearchParams, FavoritesSearchResponse } from './types';

class FavoritesService extends BaseService {
  protected prefix = 'favorites';

  add(tconst: string): Promise<ApiResponse<MovieDetailsItem>> {
    return this.post(undefined, this.path(tconst));
  }

  edit(tconst: string, body: EditDetailsPayload): Promise<ApiResponse<MovieDetailsItem>> {
    return this.put(tconst, { ...body });
  }

  getDetails(tconst: string): Promise<ApiResponse<MovieDetailsItem>> {
    return this.get(tconst);
  }

  removeFavorite(tconst: string): Promise<ApiResponse<unknown>> {
    return this.remove(tconst);
  }

  // Cancels the previous in-flight search so a stale response never
  // overwrites a newer one while the user is typing.
  searchFavorites(params: FavoritesSearchParams = {}): Promise<FavoritesSearchResponse> {
    const body = {
      filters: params.filters ?? {},
      search_term: params.searchTerm ?? '',
    };
    return this.post(body, this.path('search'), { cancelPrevious: true });
  }
}

export default new FavoritesService();
