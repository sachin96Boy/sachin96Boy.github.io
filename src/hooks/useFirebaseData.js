import { useCallback, useEffect, useState } from "react";

/** Module-level cache so components that need the same data share one request. */
const cache = new Map();

function request(key, load) {
  if (!cache.has(key)) {
    const promise = load();
    // Drop failed requests from the cache so Retry actually retries.
    promise.catch(() => cache.delete(key));
    cache.set(key, promise);
  }
  return cache.get(key);
}

/**
 * Loads data in the browser with a shared cache.
 *
 * @param {string} key          cache key, e.g. "social"
 * @param {() => Promise<any>} load  a getter from src/lib/firebaseData.js
 * @returns {{ data: any, loading: boolean, error: Error | null, retry: () => void }}
 */
export function useFirebaseData(key, load) {
  const [state, setState] = useState({ data: undefined, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    request(key, load)
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (active) setState({ data: undefined, loading: false, error });
      });
    return () => {
      active = false;
    };
    // `load` is a stable module-level getter; the key identifies the request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt]);

  const retry = useCallback(() => {
    cache.delete(key);
    setAttempt((n) => n + 1);
  }, [key]);

  return { ...state, retry };
}
