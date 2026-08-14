/**
 * Parser for the processed scraped-content files in `scraped-data/data/`.
 *
 * Every `.md` file in that folder is one page of the source site with a
 * consistent structure:
 *
 *   # Title
 *   > **Source URL:** ...
 *   > **Last modified:** ...
 *   > **Sitemap priority:** ...
 *   > **Status:** ✅ ...
 *   ---
 *   ## SEO Metadata          (title tag, meta description, canonical, OG…)
 *   ## Heading Outline       (h1–h6 skeleton)
 *   ## Hero Section          (H1 + hero copy)
 *   ## Page Content          (the unique, keyword-optimized body copy)
 *   ## Links & CTAs          (anchor/URL reference table)
 *   ## Image Alt Texts
 *   ## Structured Data (JSON-LD)
 *
 * The parser returns a plain object consumed by the content renderer and by
 * metadata/sitemap generation.
 */

const KNOWN_SECTIONS = [
  "SEO Metadata",
  "Heading Outline",
  "Hero Section",
  "Page Content",
  "Links & CTAs on this page",
  "Image Alt Texts",
  "Structured Data (JSON-LD)",
];

/** Split raw markdown into its known `## Section` blocks. */
function splitSections(raw) {
  const sections = new Map();
  let current = null;
  let buffer = [];

  const flush = () => {
    if (current) sections.set(current, buffer.join("\n").trim());
  };

  for (const line of raw.split("\n")) {
    const match = line.match(/^## (.+)$/);
    if (match && KNOWN_SECTIONS.includes(match[1].trim())) {
      flush();
      current = match[1].trim();
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  flush();
  return sections;
}

/** Parse `- **Key:** value` lines (SEO metadata block). */
function parseKeyValueList(text) {
  const out = {};
  if (!text) return out;
  const keyRe = /[-*]\s*\*\*([^*]+):\*\*\s*(.*)$/g;
  let m;
  while ((m = keyRe.exec(text))) {
    out[m[1].trim()] = m[2].trim();
  }
  return out;
}

/** Parse `- # …` / `- ## …` heading-outline lines. */
function parseHeadingOutline(text) {
  const out = [];
  if (!text) return out;
  const re = /^\s*[-*]\s*(#{1,6})\s+(.*)$/gm;
  let m;
  while ((m = re.exec(text))) {
    out.push({ level: m[1].length, text: m[2].trim() });
  }
  return out;
}

/** Parse a markdown table into rows of cells (used for Links & CTAs). */
function parseMarkdownTable(text) {
  const rows = [];
  if (!text) return rows;
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    const cells = t
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim());
    if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue; // separator row
    if (cells.every((c) => /^(Anchor text|URL)$/i.test(c))) continue; // header row
    if (cells.length >= 2 && cells[0] && cells[1]) {
      rows.push({ anchor: cells[0], url: cells[1] });
    }
  }
  return rows;
}

/** Extract and parse all JSON-LD fenced blocks. */
function parseJsonLd(text) {
  const out = [];
  if (!text) return out;
  const re = /```(?:json)?\s*\n([\s\S]*?)\n```/g;
  let m;
  while ((m = re.exec(text))) {
    try {
      out.push(JSON.parse(m[1].trim()));
    } catch {
      // skip malformed blocks — they must never break the page
    }
  }
  return out;
}

/** Full parse of one scraped page file. */
export function parseScrapedFile(raw, filename = "") {
  const sections = splitSections(raw);

  const h1Match = raw.match(/^# (.+)$/m);
  const h1 = h1Match ? h1Match[1].trim() : "";

  // Source metadata blockquote
  const meta = {
    sourceUrl: raw.match(/^> \*\*Source URL:\*\* (.+)$/m)?.[1]?.trim() || "",
    lastModified: raw.match(/^> \*\*Last modified:\*\* (.+)$/m)?.[1]?.trim() || "",
    priority: parseFloat(raw.match(/^> \*\*Sitemap priority:\*\* (.+)$/m)?.[1]?.trim() || "0.7") || 0.7,
    status: raw.match(/^> \*\*Status:\*\* (.+)$/m)?.[1]?.trim() || "",
  };

  const seo = parseKeyValueList(sections.get("SEO Metadata"));
  const headingOutline = parseHeadingOutline(sections.get("Heading Outline"));
  const hero = sections.get("Hero Section") || "";
  const content = sections.get("Page Content") || "";
  const links = parseMarkdownTable(sections.get("Links & CTAs on this page"));
  const jsonLd = parseJsonLd(sections.get("Structured Data (JSON-LD)"));

  // Image alt texts: `- …` items
  const altTexts = (sections.get("Image Alt Texts") || "")
    .split("\n")
    .map((l) => l.replace(/^\s*[-*]\s*/, "").trim())
    .filter(Boolean);

  return {
    file: filename,
    h1,
    meta,
    seo: {
      title: seo["Title tag"] || h1,
      description: seo["Meta description"] || "",
      canonical: seo["Canonical URL"] || meta.sourceUrl || "",
      ogTitle: seo["OG title"] || "",
      ogDescription: seo["OG description"] || "",
      robots: seo["Robots"] || "index, follow",
      keywords: seo["Meta keywords"] && seo["Meta keywords"] !== "(none)" ? seo["Meta keywords"] : "",
    },
    headingOutline,
    hero,
    content,
    links,
    altTexts,
    jsonLd,
  };
}
