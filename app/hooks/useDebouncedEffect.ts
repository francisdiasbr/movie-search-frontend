import { DependencyList, useEffect, useRef } from 'react';

// Runs `effect` `delay` ms after the last change in `deps`. The mount render
// is skipped: pages fire their initial load themselves, this only reacts to
// the user changing filters.
export function useDebouncedEffect(effect: () => void, deps: DependencyList, delay = 500) {
  const hasMountedRef = useRef(false);
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const timeoutId = setTimeout(() => effectRef.current(), delay);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
