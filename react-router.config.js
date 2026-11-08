import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "vite";

const SITE_URL = "https://www.sachin96boy.dev";

// Expose VITE_* variables from .env to the build-time data fetches below
// (variables already set in the environment, e.g. on Vercel, take priority).
for (const [key, value] of Object.entries(loadEnv("production", process.cwd(), "VITE_"))) {
  process.env[key] ??= value;
}

/** Every project page is pre-rendered; ids come from Firebase at build time. */
async function projectPaths() {
  const { getProjects } = await import("./src/lib/firebaseData.js");
  const projects = await getProjects();
  return projects.map((p) => `/portfolio/project/${p.id}`);
}

/** Lists every pre-rendered page (each is a directory with an index.html). */
function listPages(clientDir, dir = clientDir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listPages(clientDir, full, out);
    else if (entry.name === "index.html") {
      const rel = path.relative(clientDir, dir).split(path.sep).join("/");
      out.push(rel ? `/${rel}` : "/");
    }
  }
  return out;
}

/** @type {import("@react-router/dev/config").Config} */
export default {
  appDirectory: "src",
  // Static site: every known page is rendered to HTML at build time; anything else is served
  // the SPA fallback (build/client/__spa-fallback.html) and rendered in the browser.
  ssr: false,
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...(await projectPaths())];
  },
  async buildEnd({ reactRouterConfig }) {
    const clientDir = path.resolve(reactRouterConfig.buildDirectory, "client");
    const urls = listPages(clientDir)
      .sort()
      .map((p) => `  <url><loc>${new URL(p, SITE_URL).href}</loc></url>`);
    fs.writeFileSync(
      path.join(clientDir, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
    );
    console.log(`Sitemap: ${urls.length} URLs -> ${path.relative(process.cwd(), clientDir)}/sitemap.xml`);
  },
};
