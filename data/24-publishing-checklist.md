# Publishing Checklist — SEO/AEO Content Rollout
For whoever implements the 23 content docs into the Next.js site (cmg-canada-dark → commonwealthmigration.ca)

---

## 1. Before you touch code — fix the placeholders

These appear across every page's schema and are currently fake site-wide. Fix once, they'll cascade:

| Placeholder | Where it lives | Fix with |
|---|---|---|
| `(555) 012-3456` | Header, footer, every CTA block, Contact page schema | Real business line |
| `support@example.com` | Footer, every schema block | Real support inbox |
| Business hours (Mon–Fri 9–5) | Contact page — flagged as unconfirmed | Confirm actual hours |
| `og-default.png` | Every `og:image` reference | Confirm this image exists at 1200×630, or swap in a page-specific image |

**Do this first.** Every page's JSON-LD references these — fixing them once in a shared config (e.g. `siteConfig.ts`) is far less error-prone than fixing 23 files individually.

---

## 2. Per-page implementation checklist

For each of the 23 pages:

- [ ] **Title tag** — copy exactly as written (all are 50–60 characters, front-loaded with the primary keyword + "Brampton")
- [ ] **Meta description** — copy exactly (all are 150–160 characters — don't let a CMS truncate mid-word)
- [ ] **Canonical URL** — must be self-referencing and use the production domain (`commonwealthmigration.ca`), not the Vercel preview domain
- [ ] **OG/Twitter tags** — map as given; confirm `og:image` resolves to a real, existing asset before launch (a broken OG image kills link-preview credibility on social/WhatsApp shares, which matters given the WhatsApp CTA already on the site)
- [ ] **JSON-LD block** — paste as `<script type="application/ld+json">` in the page `<head>` (Next.js: via `generateMetadata` or a `<Script>` component with `strategy="beforeInteractive"` or inline in the server component)
- [ ] **H1** — exactly one per page, matches the doc
- [ ] **Heading hierarchy** — H2s and H3s in the order given; don't skip levels (no H2 → H4)
- [ ] **Internal links** — implement every "Related pathways" link; these build the topical cluster Google and AI crawlers use to understand site structure
- [ ] **FAQ section** — render as visible on-page content (not hidden in a collapsed accordion that's empty in the DOM until clicked — use `<details>/<summary>` or ensure accordion content is server-rendered, not client-only-on-click, so crawlers see the answer text)
- [ ] **CTA buttons** — link to real, working `/book` and `/tools/*` routes

---

## 3. Schema validation (do this before every deploy, not just once)

- [ ] Run every page through [Google's Rich Results Test](https://search.google.com/test/rich-results) — confirm FAQPage, Service, LocalBusiness, Person, and HowTo schema all validate with zero errors
- [ ] Run the **Contact page** specifically through [Schema.org Validator](https://validator.schema.org/) — this is the LocalBusiness block carrying NAP data; errors here hurt local pack ranking the most
- [ ] Confirm NAP (Name, Address, Phone) is **byte-for-byte identical** across: homepage footer, Contact page, schema JSON-LD, and any Google Business Profile listing. Inconsistent NAP is one of the most common reasons local sites don't rank in the map pack.

---

## 4. Images

- [ ] Every image referenced needs real `alt` text — use the alt text suggested in each doc's meta table, written for the actual image, not generic ("RCIC reviewing an Express Entry profile with a client in Brampton office" — not "immigration image 1")
- [ ] Compress/serve via Next.js `<Image>` — the homepage already uses `_next/image` with `w=3840&q=75`; keep consistent
- [ ] Add location-relevant images where possible (Brampton/Peel Region specific, not generic stock Toronto skyline on every page — vary imagery per page topic)

---

## 5. Sitemap & robots.txt

Two files delivered alongside this checklist: `sitemap.xml` and `robots.txt`.

- [ ] Deploy `sitemap.xml` at the domain root, list it in `robots.txt` (already done in the file)
- [ ] Submit sitemap in Google Search Console after deploy
- [ ] Submit sitemap in Bing Webmaster Tools too — underrated for AI answer engines that partially rely on Bing's index (Copilot, some Perplexity sourcing)
- [ ] `robots.txt` explicitly allows GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, anthropic-ai, and CCBot — confirm none of these are blocked elsewhere (e.g. Cloudflare bot-fight mode, which can silently block them even if robots.txt allows them)

---

## 6. Post-launch (first 2 weeks)

- [ ] Verify Google Business Profile address/phone/hours match the Contact page exactly
- [ ] Request indexing for all 23 URLs individually in Search Console (don't just wait for the sitemap crawl)
- [ ] Check Core Web Vitals on the 5 highest-priority pages (Express Entry, PNP, Work Permit, Study Permit, Contact) — content additions shouldn't regress load speed
- [ ] Spot-check 3–4 target keywords in an incognito search from a Brampton/GTA IP or with location set to Brampton, ON, to confirm local relevance signals are firing

---

## 7. What's intentionally NOT in the content docs (your call, not mine)

- Actual phone number, email, and hours — flagged above, needs real data
- Final image selection/sourcing
- Pricing (none of the pages mention fees — confirm that's intentional per your compliance posture)
- French-language versions (Ontario doesn't require bilingual by law outside federal services, but if there's future demand from Francophone clients, that's a separate content project, not a translation of these)
