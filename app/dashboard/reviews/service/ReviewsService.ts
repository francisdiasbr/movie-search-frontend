import { ApiResponse, EntriesResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import {
  AuthoralReviewResponse,
  CreateAuthoralReviewPayload,
  MovieReviewResponse,
  ReviewSummary,
  UpdateAuthoralReviewPayload,
} from '../types';

class ReviewsService extends BaseService {
  protected prefix = 'write-review';

  create(review: CreateAuthoralReviewPayload): Promise<ApiResponse<AuthoralReviewResponse>> {
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

  getByTconst(tconst: string): Promise<EntriesResponse<MovieReviewResponse>> {
    return this.get(tconst);
  }

  removeReview(tconst: string): Promise<ApiResponse<unknown>> {
    return this.remove(tconst);
  }

  searchReviews(filters: Record<string, unknown> = {}): Promise<EntriesResponse<ReviewSummary>> {
    return this.post({ filters }, this.path('search'));
  }

  update(tconst: string, data: UpdateAuthoralReviewPayload): Promise<ApiResponse<MovieReviewResponse>> {
    return this.put(tconst, { ...data });
  }
}

export default new ReviewsService();
