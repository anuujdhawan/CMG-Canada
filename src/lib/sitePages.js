/**
 * Page registry — maps every rewritten `.md` file in `pageData/` to a
 * keyword-focused route on this site.
 *
 * `route-map.json` records one SEO-friendly route slug per page and keeps the
 * previous paths available for permanent redirects without making them
 * canonical URLs.
 *
 * This single module powers the catch-all route, sitemap and internal-linking
 * index grids.
 */

import fs from "fs";
import path from "path";
import { parsePageDataFile } from "./scraped";

const PAGE_DATA_DIR = path.join(process.cwd(), "pageData");
const ROUTE_MAP_FILE = path.join(PAGE_DATA_DIR, "route-map.json");
const ROUTE_MAP = fs.existsSync(ROUTE_MAP_FILE)
  ? JSON.parse(fs.readFileSync(ROUTE_MAP_FILE, "utf8"))
  : [];
const ROUTE_BY_FILE = new Map(ROUTE_MAP.map((route) => [route.outputFile, route]));
const FILE_BY_PATH = new Map(ROUTE_MAP.map((route) => [route.path, route.outputFile]));
const routeAliases = (route) => [
  route.legacyPath,
  route.previousPath,
  ...(Array.isArray(route.redirectPaths) ? route.redirectPaths : []),
].filter(Boolean);
const LEGACY_PATH_TO_FILE = new Map(
  ROUTE_MAP.flatMap((route) => routeAliases(route).map((source) => [source, route.outputFile]))
);

/** Files that are documentation, not pages. */
const SKIP_FILES = new Set(["README.md", "AUTHORITY_LINKS.md"]);

export function isPageFile(file) {
  return file.endsWith(".md") && !SKIP_FILES.has(file);
}

export function listPageFiles() {
  return fs.readdirSync(PAGE_DATA_DIR).filter(isPageFile).sort();
}

/** `express-entry-immigration-canada.md` → `/express-entry-immigration-canada` */
export function filenameToPath(file) {
  if (ROUTE_BY_FILE.has(file)) return ROUTE_BY_FILE.get(file).path;
  const base = file.replace(/\.md$/, "");
  if (base === "index") return "/";
  return `/${base.split("__").join("/")}`;
}

/** `/express-entry-immigration-canada` → `express-entry-immigration-canada.md` */
export function pathToFilename(pathname) {
  const clean = String(pathname || "/")
    .split("#")[0]
    .split("?")[0]
    .replace(/^\/+|\/+$/g, "");
  if (!clean) return "index.md";
  return `${clean.split("/").join("__")}.md`;
}

/** Convert a legacy page path to its current keyword-focused path. */
export function pathForLegacyPath(pathname) {
  const clean = String(pathname || "/")
    .split("#")[0]
    .split("?")[0]
    .replace(/^\/+|\/+$/g, "");
  const normalized = clean ? `/${clean}` : "/";
  const file = LEGACY_PATH_TO_FILE.get(normalized);
  return file && ROUTE_BY_FILE.has(file) ? ROUTE_BY_FILE.get(file).path : normalized;
}

/** Load + parse a single page by its URL path. Returns null if unknown. */
export function getPage(pathname) {
  const requestedPath = String(pathname || "/").replace(/\/$/, "") || "/";
  const directFile = pathToFilename(requestedPath);
  const file = FILE_BY_PATH.get(requestedPath) || (fs.existsSync(path.join(PAGE_DATA_DIR, directFile))
    ? directFile
    : LEGACY_PATH_TO_FILE.get(requestedPath));
  if (!file) return null;
  const full = path.join(PAGE_DATA_DIR, file);
  if (!fs.existsSync(full)) return null;
  const route = ROUTE_BY_FILE.get(file);
  return {
    path: route?.path || (requestedPath.startsWith("/") ? requestedPath : `/${requestedPath}`),
    ...parsePageDataFile(fs.readFileSync(full, "utf8"), file),
  };
}

/** Load + parse every page. */
export function getAllPages() {
  return listPageFiles().map((file) => ({
    path: filenameToPath(file),
    ...parsePageDataFile(fs.readFileSync(path.join(PAGE_DATA_DIR, file), "utf8"), file),
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
  "refund-policy": "Refund Policy",
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
