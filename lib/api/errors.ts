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

  // Axios already parses JSON bodies; a plain string arrives when the backend
  // answers text or when the body could not be parsed.
  static fromResponse(status: number, rawBody: unknown): ApiError {
    let body: unknown = rawBody;
    if (typeof rawBody === 'string') {
      try {
        body = rawBody ? JSON.parse(rawBody) : null;
      } catch {
        body = rawBody;
      }
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

// Some resources answer 404 for "nothing here yet" (a movie without a review).
// That is an expected answer, not a failure, so it becomes null.
export const nullIfNotFound = async <T>(promise: Promise<T>): Promise<T | null> => {
  try {
    return await promise;
  } catch (error) {
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
};

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
