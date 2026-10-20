import { ApiResponse } from '../../../../lib/api/types';
import BaseService from '../../../../lib/service/BaseService';
import { RecentMovie } from '../types';

class BelasArtesService extends BaseService {
  protected prefix = 'belas-artes';

  listRecentlyAdded(): Promise<ApiResponse<{ movies: RecentMovie[] }>> {
    return this.get('recent');
  }
}

export default new BelasArtesService();
