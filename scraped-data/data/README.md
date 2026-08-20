# Commonwealth Migration Canada — Unique English SEO Content (processed)

This folder contains **fresh, unique English content** for every page of
https://commonwealthmigration.ca — **138 pages, one `.md` file per page** (137
sitemap pages + index), each marked with a `✅ Unique English content
(processed)` status banner.

## What this folder is

The raw scrape in `../commonwealthmigration/` preserves the site's wording verbatim.
This folder is different: every page has been **rewritten from scratch in
English** — same SEO targets, same keyword research, but **unique phrasing and
structure**, so the content is original rather than a copy.

## How keywords are handled

- Each page's **keyword targets are extracted from the page itself** — its
  title tag, meta description, H1/H2 headings, and body copy are the site's own
  researched keywords (e.g. "Express Entry", "PNP", "CRS", "LMIA", "PGWP",
  "Licensed RCIC", city names, NOC/TEER codes).
- Those keywords are **woven back into the unique rewrite** at the same natural
  density and in the same key placements:
  - Title tag (primary keyword phrase first)
  - Meta description (keyword-rich, 150–160 chars)
  - H1 (primary keyword)
  - H2/H3 headings (secondary keywords — identical hierarchy kept)
  - First paragraph and body copy (natural keyword use)
  - Alt text, anchor text, JSON-LD (unchanged — they carry keywords)
- **Never translated, never dropped, never paraphrased** into other terms — the
  keywords stay exactly as researched.

## File structure (identical to source)

Each file keeps the source layout so it stays machine-comparable:

1. `# Title` (H1-equivalent title tag)
2. Source URL / lastmod / priority block
3. **SEO Metadata** — title tag, meta description, canonical, OG, robots
4. **Heading Outline** — full h1–h6 hierarchy (unchanged — this is the SEO skeleton)
5. **Hero Section** — unique rewrite of hero headline + supporting copy + stats/CTAs
6. **Page Content** — unique rewrite of every section in heading order
7. **Links & CTAs** — unchanged (URLs + anchor text carry internal-link keywords)
8. **Image Alt Texts** — unchanged
9. **Structured Data (JSON-LD)** — unchanged schema

## Human touch & authority links

Every rewrite is written in a **natural, human tone** — plain sentences a real
applicant would read, not keyword-stuffed copy. In addition, each page weaves
in **links to high-authority official sources** to support rankings:

- [IRCC (canada.ca)](https://www.canada.ca/en/immigration-refugees-citizenship.html) — official program rules
- [CICC (college-ic.ca)](https://college-ic.ca/) — regulator / licence verification
- [ESDC foreign workers](https://www.canada.ca/en/employment-social-development/services/foreign-workers.html) — LMIA/TFWP
- [ontario.ca OINP](https://www.ontario.ca/page/ontario-immigrant-nominee-program) — Ontario PNP

See `AUTHORITY_LINKS.md` for the full strategy.

## QA

- 138 source pages → 138 rewritten files (verified no missing pages)
- Every file contains the page's primary keyword in the title, H1, and meta
  description
- Every file carries the `✅ Unique English content (processed)` banner
- Prose is rewritten (fresh sentences), keywords preserved — `grep`-checkable
