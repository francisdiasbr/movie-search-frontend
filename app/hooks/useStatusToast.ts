import { useEffect } from 'react';

import { AsyncStatus } from '../../lib/api/types';
import { useToastNotifications } from './useToastNotifications';

interface UseStatusToastOptions {
  // Message stored in redux by the rejected thunk.
  error?: string | null;
  // Fallback (or mapper) for the toast shown when status becomes 'failed'.
  errorMessage?: string | ((error: string | null | undefined) => string);
  onFailure?: () => void;
  onSuccess?: () => void;
  // Called after either outcome so the status goes back to 'idle'.
  reset?: () => void;
  status: AsyncStatus;
  successMessage?: string;
}

// Reacts once to a thunk finishing: shows the toast, runs the callback and
// resets the status. Replaces the useEffect every page used to repeat.
export function useStatusToast({
  error,
  errorMessage,
  onFailure,
  onSuccess,
  reset,
  status,
  successMessage,
}: UseStatusToastOptions) {
  const { showError, showSuccess } = useToastNotifications();

  useEffect(() => {
    if (status === 'succeeded') {
      if (successMessage) showSuccess({ title: successMessage });
      onSuccess?.();
      reset?.();
    } else if (status === 'failed') {
      const title =
        typeof errorMessage === 'function'
          ? errorMessage(error)
          : error || errorMessage || 'Ocorreu um erro inesperado.';
      showError({ title });
      onFailure?.();
      reset?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
}
