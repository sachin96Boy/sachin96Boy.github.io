import { useCallback, useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_DATABASE_URL ?? "";

/** Module-level cache so components that need the same document share one request. */
const cache = new Map();

function request(path) {
  if (!cache.has(path)) {
    const promise = fetch(`${BASE_URL}${path}.json`).then(async (res) => {
      if (!res.ok) throw new Error(`Request for ${path} failed (${res.status})`);
      return res.json();
    });
    // Drop failed requests from the cache so Retry actually retries.
    promise.catch(() => cache.delete(path));
    cache.set(path, promise);
  }
  return cache.get(path);
}

/**
 * Fetches a Firebase Realtime Database document over REST.
 *
 * @param {string} path   document path without `.json`, e.g. "social"
 * @param {{ expect?: "array" | "object" }} [options] validates the response shape
 * @returns {{ data: any, loading: boolean, error: Error | null, retry: () => void }}
 */
export function useFirebaseJson(path, { expect } = {}) {
  const [state, setState] = useState({ data: undefined, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    request(path)
      .then((data) => {
        if (!active) return;
        if (expect === "array" && !Array.isArray(data)) {
          throw new Error(`Unexpected data for ${path}`);
        }
        if (expect === "object" && (data === null || typeof data !== "object")) {
          throw new Error(`Unexpected data for ${path}`);
        }
        setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (active) setState({ data: undefined, loading: false, error });
      });
    return () => {
      active = false;
    };
  }, [path, expect, attempt]);

  const retry = useCallback(() => {
    cache.delete(path);
    setAttempt((n) => n + 1);
  }, [path]);

  return { ...state, retry };
}
