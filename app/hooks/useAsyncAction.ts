import { useCallback, useRef, useState } from 'react';

// Wraps an async handler with a `loading` flag and ignores calls while one is
// still running. Replaces the setIsLoading(true) / try / finally every page
// used to repeat.
export function useAsyncAction<Args extends unknown[]>(action: (...args: Args) => Promise<unknown>) {
  const [loading, setLoading] = useState(false);
  const runningRef = useRef(false);
  const actionRef = useRef(action);
  actionRef.current = action;

  const run = useCallback(async (...args: Args) => {
    if (runningRef.current) return;
    runningRef.current = true;
    setLoading(true);
    try {
      await actionRef.current(...args);
    } finally {
      runningRef.current = false;
      setLoading(false);
    }
  }, []);

  return { loading, run };
}
