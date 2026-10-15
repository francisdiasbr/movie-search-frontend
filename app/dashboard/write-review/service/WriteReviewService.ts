import { ApiResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { CreateReviewPayload, CreateReviewResponse } from '../types';

class WriteReviewService extends BaseService {
  protected prefix = 'write-review';

  create(review: CreateReviewPayload): Promise<ApiResponse<CreateReviewResponse>> {
    const body = {
      content: {
        en: { text: review.content.en.text },
        pt: { text: review.content.pt.text },
      },
      primaryTitle: review.primaryTitle,
      references: review.references,
      tconst: review.tconst,
    };
    return this.post(body, this.path(review.tconst));
  }
}

export default new WriteReviewService();
