/**
 * Page registry — maps every scraped `.md` file in `scraped-data/data/` to a
 * route on this site.
 *
 * Filenames mirror the source URL structure with `__` as the path separator:
 *   `immigration__pnp__ontario.md`  →  `/immigration/pnp/ontario`
 *   `index.md`                      →  `/`
 *
 * This single module powers the catch-all route, the sitemap, and the
 * internal-linking index grids.
 */

import fs from "fs";
import path from "path";
import { parseScrapedFile } from "./scraped";

const DATA_DIR = path.join(process.cwd(), "scraped-data", "data");

/** Files that are documentation, not pages. */
const SKIP_FILES = new Set(["README.md", "AUTHORITY_LINKS.md"]);

export function isPageFile(file) {
  return file.endsWith(".md") && !SKIP_FILES.has(file);
}

export function listPageFiles() {
  return fs
    .readdirSync(DATA_DIR)
    .filter(isPageFile)
    .sort();
}

/** `immigration__pnp__ontario.md` → `/immigration/pnp/ontario` */
export function filenameToPath(file) {
  const base = file.replace(/\.md$/, "");
  if (base === "index") return "/";
  return `/${base.split("__").join("/")}`;
}

/** `/immigration/pnp/ontario` → `immigration__pnp__ontario.md` */
export function pathToFilename(pathname) {
  const clean = String(pathname || "/")
    .split("#")[0]
    .split("?")[0]
    .replace(/^\/+|\/+$/g, "");
  if (!clean) return "index.md";
  return `${clean.split("/").join("__")}.md`;
}

/** Load + parse a single page by its URL path. Returns null if unknown. */
export function getPage(pathname) {
  const file = pathToFilename(pathname);
  const full = path.join(DATA_DIR, file);
  if (!fs.existsSync(full)) return null;
  return {
    path: pathname.startsWith("/") ? pathname : `/${pathname}`,
    ...parseScrapedFile(fs.readFileSync(full, "utf8"), file),
  };
}

/** Load + parse every page. */
export function getAllPages() {
  return listPageFiles().map((file) => ({
    path: filenameToPath(file),
    ...parseScrapedFile(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), file),
  }));
}

/** Human label for a URL segment (used in breadcrumbs / index grids). */
const SEGMENT_LABELS = {
  immigration: "Immigration",
  immigrate: "Immigrate",
  "immigration-consultant": "Immigration Consultants",
  "for-employers": "For Employers",
  appeals: "Appeals",
  "special-measures": "Special Measures",
  tools: "Tools",
  resources: "Resources",
  blog: "Blog",
  "document-checklist": "Document Checklists",
  pnp: "Provincial Nominees (PNP)",
  "about-us": "About Us",
  "how-it-works": "How It Works",
  "contact-us": "Contact Us",
  "immigration-draws": "Immigration Draws",
  "pnp-draws": "PNP Draws",
  "draw-results": "Draw Results",
  "work-study": "Work & Study",
  "for-individuals": "For Individuals",
  assessment: "Free Assessment",
  faqs: "FAQs",
  refusals: "Refusals & Appeals",
  team: "Our Team",
  book: "Book a Consultation",
  pay: "Make Payment",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  disclaimer: "Disclaimer",
};

export function segmentLabel(segment) {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Breadcrumb trail for a path: [{ label, href }]. */
export function breadcrumbsFor(pathname, lastLabel) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }];
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    crumbs.push({ label: segmentLabel(seg), href: acc });
  }
  if (lastLabel) crumbs[crumbs.length - 1] = { label: lastLabel, href: crumbs[crumbs.length - 1].href };
  return crumbs;
}
