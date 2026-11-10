import { nullIfNotFound } from '../../../../lib/api/errors';
import { ApiResponse, EntriesResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { MovieDetailsItem } from '../../favorites/types';
import { MovieReviewResponse } from '../../reviews/types';

// The "write" screen only checks whether a review already exists and fetches
// the movie title before sending the user to the form.
class WriteService extends BaseService {
  protected prefix = 'write-review';

  async findReview(tconst: string): Promise<MovieReviewResponse | null> {
    // The backend answers 404 when the movie has no review yet.
    const response = await nullIfNotFound(this.get<EntriesResponse<MovieReviewResponse>>(tconst));
    return response?.entries?.[0] ?? null;
  }

  async getMovieTitle(tconst: string): Promise<string> {
    const response = await this.get<ApiResponse<MovieDetailsItem>>(tconst, 'favorites');
    return response.data?.primaryTitle ?? '';
  }
}

export default new WriteService();
