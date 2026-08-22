/**
 * Parser for the rewritten page content files in `pageData/`.
 *
 * Each Markdown file is a page with consistent sections for SEO metadata,
 * hero copy, page content, links, image alt text and structured data. The
 * parser returns the stable page contract consumed by the shared renderer,
 * metadata generation and sitemap.
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

function parseKeyValueList(text) {
  const out = {};
  if (!text) return out;
  const keyRe = /[-*]\s*\*\*([^*]+):\*\*\s*(.*)$/g;
  let match;
  while ((match = keyRe.exec(text))) out[match[1].trim()] = match[2].trim();
  return out;
}

function parseHeadingOutline(text) {
  const out = [];
  if (!text) return out;
  const headingRe = /^\s*[-*]\s*(#{1,6})\s+(.*)$/gm;
  let match;
  while ((match = headingRe.exec(text))) out.push({ level: match[1].length, text: match[2].trim() });
  return out;
}

function parseMarkdownTable(text) {
  const rows = [];
  if (!text) return rows;
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|")) continue;
    const cells = trimmed.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
    if (cells.every((cell) => /^:?-{2,}:?$/.test(cell))) continue;
    if (cells.every((cell) => /^(Anchor text|URL)$/i.test(cell))) continue;
    if (cells.length >= 2 && cells[0] && cells[1]) rows.push({ anchor: cells[0], url: cells[1] });
  }
  return rows;
}

function parseJsonLd(text) {
  const out = [];
  if (!text) return out;
  const jsonRe = /```(?:json)?\s*\n([\s\S]*?)\n```/g;
  let match;
  while ((match = jsonRe.exec(text))) {
    try {
      out.push(JSON.parse(match[1].trim()));
    } catch {
      // Malformed source JSON-LD must not prevent the page from rendering.
    }
  }
  return out;
}

export function parsePageDataFile(raw, filename = "") {
  const sections = splitSections(raw);
  const h1 = raw.match(/^# (.+)$/m)?.[1]?.trim() || "";
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
  const altTexts = (sections.get("Image Alt Texts") || "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-*]\s*/, "").trim())
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
      robots: seo.Robots || "index, follow",
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
