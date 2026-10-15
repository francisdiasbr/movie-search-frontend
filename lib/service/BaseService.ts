import api, { RequestBody, RequestOptions } from '../api/BaseApi';

// Base for every feature service. Subclasses set `prefix` (the resource path
// under VITE_BASE_URL) and expose methods named after the business operation.
// No URL should be built outside a service.
abstract class BaseService {
  protected api = api;

  protected abstract prefix: string;

  protected path(...segments: Array<number | string | null | undefined>): string {
    return [this.prefix, ...segments]
      .filter(segment => segment !== null && segment !== undefined && segment !== '')
      .map(segment => encodeURIComponent(String(segment)))
      .join('/');
  }

  get<T>(id?: number | string, prefix = this.prefix, options?: RequestOptions): Promise<T> {
    const url = id !== undefined && id !== null && id !== '' ? `${prefix}/${encodeURIComponent(String(id))}` : prefix;
    return api.get<T>(url, options);
  }

  post<T>(body?: RequestBody, prefix = this.prefix, options?: RequestOptions): Promise<T> {
    return api.post<T>(prefix, body, options);
  }

  put<T>(id: number | string, body?: RequestBody, prefix = this.prefix, options?: RequestOptions): Promise<T> {
    return api.put<T>(`${prefix}/${encodeURIComponent(String(id))}`, body, options);
  }

  remove<T>(id: number | string, prefix = this.prefix, options?: RequestOptions): Promise<T> {
    return api.remove<T>(`${prefix}/${encodeURIComponent(String(id))}`, undefined, options);
  }

}

export default BaseService;
