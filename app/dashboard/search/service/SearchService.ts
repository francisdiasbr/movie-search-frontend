import { ApiResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { MovieDetailsItem } from '../../favorites/types';

class SearchService extends BaseService {
  protected prefix = 'favorites';

  add(tconst: string): Promise<ApiResponse<MovieDetailsItem>> {
    return this.post(undefined, this.path(tconst));
  }
}

export default new SearchService();
