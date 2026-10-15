import { ApiResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { CreateReviewPayload, CreateReviewResponse } from '../types';

class WriteReviewService extends BaseService {
  protected prefix = 'write-review';

  create(review: CreateReviewPayload): Promise<ApiResponse<CreateReviewResponse>> {
    return this.post(review, this.path(review.tconst));
  }
}

export default new WriteReviewService();
