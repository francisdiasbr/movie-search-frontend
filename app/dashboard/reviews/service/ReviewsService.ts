import { ApiResponse, EntriesResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { MovieReviewResponse, UpdateAuthoralReviewPayload } from '../types';

class ReviewsService extends BaseService {
  protected prefix = 'write-review';

  getByTconst(tconst: string): Promise<EntriesResponse<MovieReviewResponse>> {
    return this.get(tconst);
  }

  update(tconst: string, data: UpdateAuthoralReviewPayload): Promise<ApiResponse<MovieReviewResponse>> {
    return this.put(tconst, { ...data });
  }
}

export default new ReviewsService();
