import { fallbackSocial, profile } from "../data/profile";

export const SITE_URL = "https://www.sachin96boy.dev";
const DEFAULT_TITLE = `${profile.name} | Personal Website`;

/**
 * Standard per-page meta descriptors for React Router `meta` exports:
 * title, description, Open Graph and the canonical URL.
 */
export function pageMeta({ title, description, path = "/", noindex = false }) {
  const fullTitle = title ? `${title} | ${profile.name}` : DEFAULT_TITLE;
  const url = new URL(path, SITE_URL).href;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
    ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
  ];
}

/** Shortens text for meta descriptions without cutting a word in half. */
export function summarize(text = "", max = 155) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max - 1))}…`;
}

/** schema.org Person, for the home page. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  url: SITE_URL,
  image: "https://avatars.githubusercontent.com/u/52316373",
  jobTitle: profile.roles[0],
  email: `mailto:${profile.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
  address: { "@type": "PostalAddress", addressCountry: "LK" },
  sameAs: Object.values(fallbackSocial),
};
