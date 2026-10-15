import { ApiResponse, EntriesResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import {
  EditDetailsPayload,
  FavoritesSearchParams,
  FavoritesSearchResponse,
  MovieDetailsItem,
} from '../types';

class FavoritesService extends BaseService {
  protected prefix = 'favorites';

  edit(tconst: string, body: EditDetailsPayload): Promise<ApiResponse<MovieDetailsItem>> {
    return this.put(tconst, body);
  }

  // Which of the listed movies already have a review (write-review resource).
  async findReviewedTconsts(tconsts: string[]): Promise<Set<string>> {
    const response = await this.post<EntriesResponse<{ tconst: string }>>(
      { filters: { tconst: { $in: tconsts } } },
      'write-review/search'
    );
    return new Set((response.entries ?? []).map(entry => entry.tconst));
  }

  getDetails(tconst: string): Promise<ApiResponse<MovieDetailsItem>> {
    return this.get(tconst);
  }

  removeFavorite(tconst: string): Promise<ApiResponse<unknown>> {
    return this.remove(tconst);
  }

  removeReview(tconst: string): Promise<ApiResponse<unknown>> {
    return this.remove(tconst, 'write-review');
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
