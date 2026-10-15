import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';

import { ApiErrorPayload, toApiErrorPayload } from './errors';
import type { AsyncStatus } from './types';

export type ApiThunk<Returned, Arg = void> = AsyncThunk<Returned, Arg, { rejectValue: ApiErrorPayload }>;

// Every thunk in the app has the same body: call the service and turn any
// failure into a serializable ApiErrorPayload with a pt-BR fallback message.
export const createApiThunk = <Returned, Arg = void>(
  type: string,
  fn: (arg: Arg) => Promise<Returned>,
  fallbackMessage: string
): ApiThunk<Returned, Arg> =>
  createAsyncThunk<Returned, Arg, { rejectValue: ApiErrorPayload }>(type, async (arg, { rejectWithValue }) => {
    try {
      return await fn(arg);
    } catch (error) {
      return rejectWithValue(toApiErrorPayload(error, fallbackMessage));
    }
  });

interface StatusState {
  error: string | null;
}

type StatusKey<State> = {
  [K in keyof State]: State[K] extends AsyncStatus ? K : never;
}[keyof State];

// Wires pending/fulfilled/rejected of a thunk to one status field of the
// slice. A cancelled request was superseded by a newer one that is still
// loading, so it never flips the status to failed.
export const addStatusCases = <State extends StatusState, Returned, Arg>(
  builder: ActionReducerMapBuilder<State>,
  thunk: ApiThunk<Returned, Arg>,
  statusKey: StatusKey<State>,
  onFulfilled?: (state: Draft<State>, action: PayloadAction<Returned>) => void
): ActionReducerMapBuilder<State> => {
  const setStatus = (state: Draft<State>, status: AsyncStatus) => {
    (state as Record<StatusKey<State>, AsyncStatus>)[statusKey] = status;
  };

  return builder
    .addCase(thunk.pending, state => {
      setStatus(state, 'loading');
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      setStatus(state, 'succeeded');
      onFulfilled?.(state, action as PayloadAction<Returned>);
    })
    .addCase(thunk.rejected, (state, action) => {
      if (action.payload?.cancelled) return;
      setStatus(state, 'failed');
      state.error = action.payload?.message ?? null;
    });
};
