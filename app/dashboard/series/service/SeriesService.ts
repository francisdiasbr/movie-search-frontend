import { ApiResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { SeriesEntry, SeriesSearchParams, SeriesSearchResponse } from '../types';

class SeriesService extends BaseService {
  protected prefix = 'series';

  addSeries(tconst: string): Promise<ApiResponse<SeriesEntry>> {
    return this.post(undefined, this.path(tconst));
  }

  removeSeries(tconst: string): Promise<ApiResponse<unknown>> {
    return this.remove(tconst);
  }

  // Cancels the previous in-flight search so a stale response never
  // overwrites a newer one while the user is typing.
  searchSeries(params: SeriesSearchParams = {}): Promise<SeriesSearchResponse> {
    return this.post({ search_term: params.searchTerm ?? '' }, this.path('search'), { cancelPrevious: true });
  }

  setWatched(tconst: string, watched: boolean): Promise<ApiResponse<SeriesEntry>> {
    return this.put(tconst, { watched });
  }
}

export default new SeriesService();
