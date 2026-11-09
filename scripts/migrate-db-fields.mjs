#!/usr/bin/env node
/**
 * One-off migration: rename misspelled Firebase Realtime Database fields.
 *
 *   Projects/<key>/Refference -> Projects/<key>/reference
 *   social/linkdin            -> social/linkedin
 *
 * Dry run (default, read-only):
 *   npm run migrate:db
 *
 * Check credentials (read-only, authenticated):
 *   npm run migrate:db -- --check
 *
 * Apply (one atomic multi-path PATCH):
 *   npm run migrate:db -- --apply
 *
 * Credentials, first match wins (put them in .env or the shell, never in a VITE_* variable,
 * which Vite treats as public):
 *   FIREBASE_SERVICE_ACCOUNT_BASE64   base64-encoded service-account JSON
 *   GOOGLE_APPLICATION_CREDENTIALS    path to the service-account JSON file
 *   FIREBASE_DB_SECRET                legacy database secret
 *
 * The site reads both the old and new names (src/lib/firebaseData.js), so it keeps working
 * before, during and after the migration. Items that already have the new key are skipped.
 * Credentials are only sent to Google/Firebase and are never printed.
 */
import fs from "node:fs";
import crypto from "node:crypto";

const APPLY = process.argv.includes("--apply");
const CHECK = process.argv.includes("--check");

if (fs.existsSync(".env")) process.loadEnvFile(".env");
const rawUrl = process.env.VITE_DATABASE_URL;
if (!rawUrl) {
  console.error("VITE_DATABASE_URL is not set (expected in .env or the environment).");
  process.exit(1);
}
const DB = rawUrl.endsWith("/") ? rawUrl : `${rawUrl}/`;

/** Fields to rename. `collection: true` means the rename applies to every child item. */
const RENAMES = [
  { path: "Projects", from: "Refference", to: "reference", collection: true },
  { path: "social", from: "linkdin", to: "linkedin" },
];

async function get(path) {
  const res = await fetch(`${DB}${path}.json`);
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  return res.json();
}

const preview = (v) => {
  const s = typeof v === "string" ? v : JSON.stringify(v);
  return s.length > 70 ? `${s.slice(0, 67)}...` : s;
};

function planRename(rename, data, changes, skipped) {
  const targets = rename.collection
    ? (Array.isArray(data) ? data.map((item, i) => [String(i), item]) : Object.entries(data ?? {}))
    : [[null, data]];
  for (const [key, item] of targets) {
    if (!item || typeof item !== "object" || item[rename.from] === undefined) continue;
    const base = key === null ? rename.path : `${rename.path}/${key}`;
    if (item[rename.to] !== undefined) {
      skipped.push(`${base}: already has "${rename.to}", left unchanged`);
      continue;
    }
    changes.push({ base, from: rename.from, to: rename.to, value: item[rename.from] });
  }
}

async function plan() {
  const changes = [];
  const skipped = [];
  for (const rename of RENAMES) {
    planRename(rename, await get(rename.path), changes, skipped);
  }
  // One multi-path update: set each new key and delete the old one, atomically.
  const updates = {};
  for (const c of changes) {
    updates[`${c.base}/${c.to}`] = c.value;
    updates[`${c.base}/${c.from}`] = null;
  }
  return { changes, updates, skipped };
}

/** Parses a service account given as base64 (or base64url / raw) JSON. */
function decodeServiceAccount(raw) {
  const text = raw.trim();
  const parsers = [
    () => JSON.parse(Buffer.from(text, "base64").toString("utf8")),
    () => JSON.parse(text),
    () => JSON.parse(decodeURIComponent(text)),
  ];
  for (const parse of parsers) {
    try {
      const sa = parse();
      if (sa && sa.client_email && sa.private_key) return sa;
    } catch {
      // try the next encoding
    }
  }
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_BASE64 is not a base64-encoded service-account JSON " +
      "(expected fields client_email and private_key)."
  );
}

function loadServiceAccount() {
  let sa = null;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    sa = decodeServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64);
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    sa = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"));
  }
  if (sa) sa.private_key = sa.private_key.replace(/\\n/g, "\n"); // tolerate double-escaped keys
  return sa;
}

/** Returns the query parameter used to authenticate REST requests. */
async function authParam() {
  if (process.env.VITE_ENCODED_SERVICE_ACCOUNT_KEY) {
    throw new Error(
      "Rename VITE_ENCODED_SERVICE_ACCOUNT_KEY to FIREBASE_SERVICE_ACCOUNT_BASE64: VITE_* variables are public."
    );
  }
  const sa = loadServiceAccount();
  if (!sa) {
    if (process.env.FIREBASE_DB_SECRET) return ["auth", process.env.FIREBASE_DB_SECRET];
    throw new Error(
      "No credentials: set FIREBASE_SERVICE_ACCOUNT_BASE64, GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_DB_SECRET."
    );
  }
  console.log(`Credentials: service account for project "${sa.project_id ?? "unknown"}"`);
  const tokenUri = sa.token_uri ?? "https://oauth2.googleapis.com/token";
  const now = Math.floor(Date.now() / 1000);
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope:
      "https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email",
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), sa.private_key).toString("base64url");
  const res = await fetch(tokenUri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`Service-account token exchange failed (${res.status})`);
  const { access_token: token } = await res.json();
  return ["access_token", token];
}

/** Read-only authenticated request: the rules endpoint is only readable with admin access. */
async function checkCredentials() {
  const [param, value] = await authParam();
  const res = await fetch(`${DB}.settings/rules.json?${param}=${encodeURIComponent(value)}`);
  if (!res.ok) throw new Error(`Authenticated read failed (${res.status}); the credentials lack admin access.`);
  console.log(`Authenticated read OK (${res.status}): the credentials have admin access. Nothing was written.`);
}

async function main() {
  if (CHECK) {
    console.log(`Database: ${new URL(DB).host}`);
    await checkCredentials();
    return;
  }

  const { changes, updates, skipped } = await plan();

  console.log(`Database: ${new URL(DB).host}`);
  console.log(`Mode:     ${APPLY ? "APPLY" : "dry run (no changes written)"}\n`);
  for (const c of changes) {
    console.log(`  ${c.base}/${c.from}  ->  ${c.to}   ${preview(c.value)}`);
  }
  for (const s of skipped) console.log(`  skipped ${s}`);
  if (!changes.length) {
    console.log("Nothing to migrate. All fields already use the new names.");
    return;
  }
  console.log(`\n${changes.length} field(s) to rename.`);

  if (!APPLY) {
    console.log("Run again with --apply (and credentials) to write these changes.");
    return;
  }

  const [param, value] = await authParam();
  const res = await fetch(`${DB}.json?${param}=${encodeURIComponent(value)}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`PATCH failed (${res.status}): ${(await res.text()).slice(0, 200)}`);

  const after = await plan();
  console.log(
    after.changes.length
      ? `Done, but ${after.changes.length} field(s) still use old names.`
      : "Done. Verified: no old field names remain."
  );
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
