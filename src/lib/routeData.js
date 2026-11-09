/**
 * Builds a `clientLoader` that prefers fresh data from Firebase and falls back to the
 * build-time snapshot (the pre-rendered `.data` file) if Firebase can't be reached.
 *
 * - First page load: the pre-rendered HTML already contains the build-time data; root.jsx
 *   revalidates once after hydration, which runs this and swaps in fresh data.
 * - Client-side navigation: runs this directly, so pages never show stale data.
 * - Pages that weren't pre-rendered (e.g. a project added after the last deploy): Firebase
 *   provides the data; there is no snapshot to fall back to.
 */
export function freshOrSnapshot(load) {
  return async function clientLoader(args) {
    try {
      return await load(args);
    } catch (error) {
      try {
        return await args.serverLoader();
      } catch {
        throw error;
      }
    }
  };
}
