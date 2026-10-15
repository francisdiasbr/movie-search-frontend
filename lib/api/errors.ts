// Error thrown by BaseApi for every failed request. The backend answers
// { data: '<message>' } on most errors and { message } when Mongo is down, so
// the readable message is extracted from either field.
export class ApiError extends Error {
  body: unknown;
  cancelled: boolean;
  status: number;

  constructor(message: string, status = 0, body: unknown = null, cancelled = false) {
    super(message);
    this.name = 'ApiError';
    this.body = body;
    this.cancelled = cancelled;
    this.status = status;
  }

  static cancelled(): ApiError {
    return new ApiError('Request cancelled', 0, null, true);
  }

  static fromResponse(status: number, text: string): ApiError {
    let body: unknown = text;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }
    const { data, message } = (body ?? {}) as { data?: unknown; message?: unknown };
    const readable =
      typeof data === 'string' ? data : typeof message === 'string' ? message : `HTTP error ${status}`;
    return new ApiError(readable, status, body);
  }
}

// Serializable shape stored in redux via rejectWithValue.
export interface ApiErrorPayload {
  cancelled?: boolean;
  message: string;
  status?: number;
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

export const isCancelled = (error: unknown): boolean =>
  (isApiError(error) && error.cancelled) || (error as ApiErrorPayload | undefined)?.cancelled === true;

export const toApiErrorPayload = (error: unknown, fallback: string): ApiErrorPayload => {
  if (isApiError(error)) {
    return {
      cancelled: error.cancelled,
      message: error.cancelled ? fallback : error.message || fallback,
      status: error.status,
    };
  }
  if (error instanceof Error) {
    return { message: error.message || fallback };
  }
  return { message: fallback };
};
