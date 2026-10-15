import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

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
  private client: AxiosInstance;

  private requestsMap = new Map<string, AbortController>();

  constructor() {
    this.client = axios.create({ baseURL: this.url });

    // Every failed request leaves here as an ApiError, so callers never deal
    // with AxiosError directly. 401/403 handling would be added here if the
    // app ever gets authentication.
    this.client.interceptors.response.use(
      response => response,
      (error: unknown) => Promise.reject(this.toApiError(error))
    );
  }

  get url(): string {
    return import.meta.env.VITE_BASE_URL;
  }

  async fetch<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { blob = false, body, cancelPrevious = false, headers = {}, method = 'GET' } = options;
    const requestId = `${method} ${url}`;

    const config: AxiosRequestConfig = {
      data: body,
      headers,
      method,
      responseType: blob ? 'blob' : 'json',
      url,
    };

    let controller: AbortController | null = null;
    if (cancelPrevious) {
      this.cancelRequest(requestId);
      controller = new AbortController();
      this.requestsMap.set(requestId, controller);
      config.signal = controller.signal;
    }

    try {
      const response = await this.client.request<T>(config);
      return response.data;
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

  private toApiError(error: unknown): ApiError {
    if (error instanceof ApiError) return error;
    if (axios.isCancel(error)) return ApiError.cancelled();
    if (error instanceof AxiosError) {
      if (error.response) {
        return ApiError.fromResponse(error.response.status, error.response.data);
      }
      // Network failure, backend offline, CORS, etc.
      return new ApiError(error.message || 'Network error', 0);
    }
    return new ApiError(error instanceof Error ? error.message : 'Unexpected error', 0);
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
