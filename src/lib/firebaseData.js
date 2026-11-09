/**
 * Firebase Realtime Database access over REST (public read).
 * Works in the browser, during the pre-render build, and in plain Node scripts.
 *
 * Field names are normalized here so components only see the clean names:
 *   Projects[].Refference -> reference   (old misspelling still read until the DB is migrated)
 *   social.linkdin        -> linkedin    (see scripts/migrate-db-fields.mjs)
 */

function viteDatabaseUrl() {
  try {
    // Vite replaces exactly this member expression with the value at build time. Never use
    // `import.meta.env` on its own (or with `?.`): Vite then inlines the whole env object,
    // i.e. every VITE_* variable, into the client bundle.
    return import.meta.env.VITE_DATABASE_URL;
  } catch {
    return undefined; // plain Node (scripts, react-router.config.js): import.meta.env is undefined
  }
}

export function databaseUrl() {
  const url =
    viteDatabaseUrl() ?? (typeof process !== "undefined" ? process.env.VITE_DATABASE_URL : undefined);
  if (!url) throw new Error("VITE_DATABASE_URL is not set");
  return url.endsWith("/") ? url : `${url}/`;
}

/** GET `<db>/<path>.json`, optionally checking the top-level shape. */
export async function fetchCollection(path, { expect, signal } = {}) {
  const res = await fetch(`${databaseUrl()}${path}.json`, { signal });
  if (!res.ok) throw new Error(`Request for ${path} failed (${res.status})`);
  const data = await res.json();
  if (expect === "array" && !Array.isArray(data)) throw new Error(`Unexpected data for ${path}`);
  if (expect === "object" && (data === null || typeof data !== "object" || Array.isArray(data))) {
    throw new Error(`Unexpected data for ${path}`);
  }
  return data;
}

const pick = (...values) => values.find((v) => v !== undefined && v !== null && v !== "");

/** Firebase returns sequential keys as an array (with possible holes) and others as an object. */
const toList = (data) => (Array.isArray(data) ? data : Object.values(data ?? {})).filter(Boolean);

export function normalizeProject(project) {
  if (!project || typeof project !== "object") return null;
  const { Refference, Reference, ...rest } = project;
  return { ...rest, reference: pick(rest.reference, Reference, Refference) };
}

export function normalizeSocial(social) {
  const { linkdin, ...rest } = social ?? {};
  return { ...rest, linkedin: pick(rest.linkedin, linkdin) };
}

export async function getProjects(options) {
  return toList(await fetchCollection("Projects", options)).map(normalizeProject).filter(Boolean);
}

export async function getProject(id, options) {
  const projects = await getProjects(options);
  return projects.find((p) => String(p.id) === String(id)) ?? null;
}

export async function getWorkExperience(options) {
  return toList(await fetchCollection("workExperience", options));
}

export async function getSocial(options) {
  return normalizeSocial(await fetchCollection("social", { ...options, expect: "object" }));
}
