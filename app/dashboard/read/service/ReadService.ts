import { EntriesResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { ReviewSummary } from '../types';

class ReadService extends BaseService {
  protected prefix = 'write-review';

  searchReviews(filters: Record<string, unknown> = {}): Promise<EntriesResponse<ReviewSummary>> {
    return this.post({ filters }, this.path('search'));
  }
}

export default new ReadService();
