import { ApiResponse, EntriesResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import {
  EditDetailsPayload,
  FavoritesFilters,
  FavoritesSearchParams,
  FavoritesSearchResponse,
  MovieDetailsItem,
  MovieLanguage,
} from '../types';

// The year bounds become one range condition; the other filters go as-is.
const toMongoFilters = ({ startYearFrom, startYearTo, ...filters }: FavoritesFilters) => {
  const startYear = {
    ...(startYearFrom !== undefined && { $gte: startYearFrom }),
    ...(startYearTo !== undefined && { $lte: startYearTo }),
  };
  return Object.keys(startYear).length ? { ...filters, startYear } : filters;
};

class FavoritesService extends BaseService {
  protected prefix = 'favorites';

  addFavorite(tconst: string): Promise<ApiResponse<MovieDetailsItem>> {
    return this.post(undefined, this.path(tconst));
  }

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

  // The backend stores English plus a Portuguese translation and applies the
  // requested one; `lang` in the answer says which one actually came.
  getDetails(tconst: string, lang: MovieLanguage = 'en'): Promise<ApiResponse<MovieDetailsItem>> {
    return this.api.get(`${this.path(tconst)}?lang=${lang}`);
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
      filters: toMongoFilters(params.filters ?? {}),
      page: params.page ?? 1,
      page_size: params.pageSize ?? 0,
      search_term: params.searchTerm ?? '',
    };
    return this.post(body, this.path('search'), { cancelPrevious: true });
  }

  // Generates the Portuguese version (Claude) and returns the movie in it.
  translate(tconst: string): Promise<ApiResponse<MovieDetailsItem>> {
    return this.post(undefined, this.path(tconst, 'translate'));
  }
}

export default new FavoritesService();
