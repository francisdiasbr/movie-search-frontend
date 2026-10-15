import { ApiError } from './errors';

export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type RequestBody = FormData | Record<string, unknown> | unknown[] | null | undefined;

export type QueryParams = Record<string, boolean | number | string | null | undefined>;

export interface RequestOptions {
  // Download the response as a Blob instead of parsing JSON.
  blob?: boolean;
  body?: RequestBody;
  // Abort a previous in-flight request to the same method + url before firing
  // this one. Useful for searches triggered while the user types.
  cancelPrevious?: boolean;
  headers?: Record<string, string>;
  method?: HttpMethod;
}

export const toQueryString = (params: QueryParams | string = {}): string => {
  if (typeof params === 'string') return params;
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;
    query.set(key, String(value));
  });
  return query.toString();
};

class BaseApi {
  private requestsMap = new Map<string, AbortController>();

  get url(): string {
    return import.meta.env.VITE_BASE_URL;
  }

  async fetch<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { blob = false, body, cancelPrevious = false, headers = {}, method = 'GET' } = options;
    const requestUrl = `${this.url}${url}`;
    const isFormData = body instanceof FormData;
    const requestId = `${method} ${requestUrl}`;

    const init: RequestInit = {
      headers: {
        ...(!isFormData && body !== undefined && body !== null && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      method,
    };
    if (body !== undefined && body !== null) {
      init.body = isFormData ? body : JSON.stringify(body);
    }

    let controller: AbortController | null = null;
    if (cancelPrevious) {
      this.cancelRequest(requestId);
      controller = new AbortController();
      this.requestsMap.set(requestId, controller);
      init.signal = controller.signal;
    }

    try {
      const response = await fetch(requestUrl, init);
      if (!response.ok) {
        throw ApiError.fromResponse(response.status, await response.text());
      }
      if (blob) {
        return (await response.blob()) as T;
      }
      const contentType = response.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        return (await response.json()) as T;
      }
      return (await response.text()) as T;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw ApiError.cancelled();
      }
      if (error instanceof ApiError) {
        throw error;
      }
      // Network failure, backend offline, CORS, etc.
      throw new ApiError(error instanceof Error ? error.message : 'Network error', 0);
    } finally {
      if (controller && this.requestsMap.get(requestId) === controller) {
        this.requestsMap.delete(requestId);
      }
    }
  }

  cancelRequest(requestId: string): void {
    const controller = this.requestsMap.get(requestId);
    if (controller) {
      controller.abort();
      this.requestsMap.delete(requestId);
    }
  }

  get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.fetch<T>(url, { ...options, method: 'GET' });
  }

  getBlob(url: string, options: RequestOptions = {}): Promise<Blob> {
    return this.fetch<Blob>(url, { ...options, blob: true, method: 'GET' });
  }

  patch<T>(url: string, body?: RequestBody, options: RequestOptions = {}): Promise<T> {
    return this.fetch<T>(url, { ...options, body, method: 'PATCH' });
  }

  post<T>(url: string, body?: RequestBody, options: RequestOptions = {}): Promise<T> {
    return this.fetch<T>(url, { ...options, body, method: 'POST' });
  }

  put<T>(url: string, body?: RequestBody, options: RequestOptions = {}): Promise<T> {
    return this.fetch<T>(url, { ...options, body, method: 'PUT' });
  }

  remove<T>(url: string, body?: RequestBody, options: RequestOptions = {}): Promise<T> {
    return this.fetch<T>(url, { ...options, body, method: 'DELETE' });
  }
}

export default new BaseApi();
