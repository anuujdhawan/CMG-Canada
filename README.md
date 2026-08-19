# Commonwealth Migration Canada — Immigration Website

A polished, production-quality **immigration consultancy website prototype** built
as a reusable template. After a client approves it, the project can be duplicated
and rebranded for that client with minimal code changes.

- **Framework:** Next.js (App Router) · JavaScript only — no TypeScript
- **Rendering:** Server Components by default; React Compiler enabled
- **Styling:** Tailwind CSS v4 with centralized design tokens
- **Motion:** Framer Motion (scroll reveals, parallax hero, animated process tracker, scroll progress bar)
- **Brand:** Commonwealth Migration Canada
- **Theme:** Canada red (#C8102E) — the chrome (floating pill navbar, gradient footer,
  starfield hero) follows the source template's visual system, recolored blue→red

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
```

## Where things live

| Concern | Location |
| --- | --- |
| Brand, contact, CTAs, legal links, metadata defaults | `src/config/site.js` |
| Colors, radii, shadows, typography | `NEXT_PUBLIC_THEME_*` in `.env` → `src/config/theme.js` → `:root` in `src/styles/globals.css` |
| Navigation (header, mobile, footer) | `src/config/navigation.js` |
| Scroll-reveal motion (framer-motion) | `src/lib/motion.js` + `src/components/motion/` |
| Floating CTA + sticky mobile bar | `src/components/layout/FloatingCTA.js`, `StickyMobileCTA.js` |
| Homepage/marketing copy | `src/config/content.js` |
| Program records (25 programs) | `src/data/programs.js` |
| Consultancy services | `src/data/services.js` |
| FAQs, team, blog, guides, tools, NOC demo data | `src/data/*.js` |
| Metadata builder (domain-agnostic SEO) | `src/lib/seo.js` |
| Rewritten SEO page content and route map | `pageData/` and `scripts/generate-page-data.mjs` |
| Single environment file | `.env` |
| Logos / icons / OG image | `public/images/` |

## Rebranding for a client

1. **`.env`** — set brand name, support email, phone, social links, site URL,
   integration keys, **and the entire color palette + hero spacing**
   (`NEXT_PUBLIC_THEME_*`). This is the only env file (`NEXT_PUBLIC_` only for
   browser-safe values). Edit → rebuild → the whole site recolors.
2. **`public/images/`** — replace `logo-large.png`, `logo-small.png`, `icon.png`,
   `apple-icon.png` and `og-default.png` (keep the same filenames).
3. **`src/config/site.js`** — tagline, description, address, hours, CTA labels, legal links.
4. **`src/config/navigation.js`** — menu labels, order, enabled/disabled items, URLs.
5. **`src/data/`** — replace program copy, FAQs, team, blog and guide content.
6. **`src/config/content.js`** — hero copy, values, process steps, testimonials.
7. Verify: `npm run lint`, `npm run build`, and check every route returns 200.

The current production domain is configured in `.env` as
`https://commonwealthmigration.ca`. The rewritten Markdown pages use keyword-led
routes from `pageData/`; the former scraped paths redirect permanently to those
new routes.

## Demo / placeholder functionality

- **Forms** (contact, consultation, urgent, assessment, newsletter) validate and submit
  to `/api/forms`, which acknowledges locally unless `FORM_ENDPOINT_URL`/`CRM_API_URL`
  is configured — no backend required to demo.
- **Tools** — CRS calculator, PNP eligibility check, NOC finder, document checklist:
  working front-end logic marked as estimates/demo data. Verify against current
  IRCC/official sources before client launch.
- **Payment & Client Login** — UI shells only; wire a real provider before launch.
- **Team profiles, testimonials, draw data, guides** — placeholders in `src/data/`.

## Legal

This prototype provides general information only — not legal advice, and never a
guarantee of visa or permanent-residence approval. Confirm program names,
eligibility and requirements against current IRCC guidance before public launch.
