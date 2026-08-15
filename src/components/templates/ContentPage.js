import Image from "next/image";
import { ArrowRight, Calculator, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { parseBlocks, Block, rebrand, localizeUrl } from "@/components/templates/MarkdownBlocks";
import HeroBand from "@/components/sections/HeroBand";
import CtaBand from "@/components/sections/CtaBand";
import { site } from "@/config/site";
import PageRail from "@/components/sections/PageRail";
import { cleanRelatedLinks } from "@/components/sections/RelatedLinks";
import DarkRedPathwaySection from "@/components/sections/DarkRedPathwaySection";
import ToolsShowcase from "@/components/sections/ToolsShowcase";
import PageFaqSection from "@/components/sections/PageFaqSection";
import { getPageImages } from "@/lib/pageImages";
import { getPageFaqs } from "@/lib/faqs";
import { cn } from "@/lib/utils";

// Re-exported so existing callers (catch-all route, PageIndexGrid) keep
// working — the implementation now lives in MarkdownBlocks / RelatedLinks.
export { rebrand, localizeUrl, cleanRelatedLinks };

/**
 * Scrub scraped structured data: drop source-firm social profiles from
 * `sameAs` and substitute the configured Commonwealth social URLs, so JSON-LD
 * never points at the source firm's profiles.
 */
function cleanJsonLd(obj) {
  const clone = JSON.parse(JSON.stringify(obj));
  if (Array.isArray(clone.sameAs)) {
    clone.sameAs = clone.sameAs.filter((u) => !/visamaster/i.test(u));
    for (const url of Object.values(site.social)) {
      if (url && !clone.sameAs.includes(url)) clone.sameAs.push(url);
    }
    if (clone.sameAs.length === 0) delete clone.sameAs;
  }
  return clone;
}

/* ════════════════════════════════════════════════════════════════════
   Related links, rail and image handling live in their own reusable
   modules (RelatedLinks.js / PageRail.js / pageImages.js) — this file
   only composes them.
   ════════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════════
   Premium content images — interleaved with the article flow so pages
   feel editorial, with captions that reinforce the page topic.
   ════════════════════════════════════════════════════════════════════ */

function ContentImage({ image, index }) {
  return (
    <figure className={cn("my-9", index % 2 === 1 && "sm:pl-4")}>
      <div className="card-red-edge relative aspect-[16/10] overflow-hidden rounded-2xl border border-primary/25 shadow-[0_12px_34px_rgba(200,16,46,0.14)] ring-1 ring-primary/10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-2.5 flex items-start gap-2 text-[12.5px] leading-relaxed text-muted">
          <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ════════════════════════════════════════════════════════════════════
   Tools strip — a compact eligibility-tools card placed on pathway pages
   (immigration, refusals, employers), mirroring cmg_web's practice of
   surfacing tools on relevant content for both UX and internal linking.
   ════════════════════════════════════════════════════════════════════ */

const TOOLS_STRIP_PATHS = /^\/immigration\/|^\/refusals|^\/for-employers/;

const TOOL_QUICK_LINKS = [
  { label: "CRS Calculator", href: "/tools/crs-calculator", icon: Calculator },
  { label: "PNP Eligibility", href: "/tools/pnp-eligibility", icon: MapPin },
  { label: "NOC Finder", href: "/tools/noc-finder", icon: Search },
];

function ToolsStrip() {
  return (
    <section aria-label="Free eligibility tools" className="card-red-edge mt-12 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-surface to-white shadow-[0_12px_30px_rgba(200,16,46,0.12)]">
      <div className="flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md">
          <p className="eyebrow text-accent-dark">Free self-service tools</p>
          <h2 className="mt-1.5 font-serif text-xl font-bold text-navy">See where your profile stands</h2>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
            Built by licensed RCICs — instant results, no sign-up needed.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {TOOL_QUICK_LINKS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-4 py-2.5 text-[13px] font-bold text-primary transition-all duration-150 hover:border-primary hover:bg-primary hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {tool.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            );
          })}
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-primary"
          >
            All tools
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Insert images after section headings (or evenly if no headings exist). */
function interleaveImages(blocks, images) {
  if (images.length === 0) return blocks;
  const h2s = blocks
    .map((b, i) => (b.type === "heading" && b.level === 2 ? i : -1))
    .filter((i) => i >= 0);
  const out = [];
  images.forEach((image, k) => {
    const anchor = h2s[Math.min(k, Math.max(h2s.length - 1, 0))];
    const at =
      anchor !== undefined && anchor >= 0
        ? anchor + 1
        : Math.min(blocks.length, Math.round(((k + 1) * blocks.length) / (images.length + 1)));
    out.push({ at, image });
  });
  return out.sort((a, b) => a.at - b.at);
}

/* ════════════════════════════════════════════════════════════════════
   ContentPage — composition of reusable building blocks
   ════════════════════════════════════════════════════════════════════ */

export default function ContentPage({ page, children }) {
  const contentBlocks = parseBlocks(page.content);
  const related = cleanRelatedLinks(page);
  const employer = page.path.startsWith("/for-employers");
  const images = getPageImages(page.path, 4);
  const imageSlots = interleaveImages(contentBlocks, images);
  const hasHomeMidBand = page.path === "/";
  const faqItems = getPageFaqs(page);

  const renderBlocks = [];
  let slotIdx = 0;
  contentBlocks.forEach((block, i) => {
    const isLead = i === 0 && block.type === "paragraph";
    renderBlocks.push(<Block key={`b${i}`} block={block} lead={isLead} />);
    if (imageSlots[slotIdx]?.at === i) {
      renderBlocks.push(<ContentImage key={`img${slotIdx}`} image={imageSlots[slotIdx].image} index={slotIdx} />);
      slotIdx++;
    }
  });

  return (
    <>
      {/* Hero */}
      <HeroBand page={page} />

      {/*
       * Reference-inspired decision band: the home route gets the full
       * pathway grid, while every internal content route gets a tighter set
       * of next-step cards before the long-form reading surface.
       */}
      <DarkRedPathwaySection variant={page.path === "/" ? "home" : "page"} />

      {/* Optional interactive slot (tools etc.) */}
      {children && (
        <div className="content-stage pt-10 sm:pt-14">
          <div className="site-container">
            <div className="article-shell mx-auto max-w-6xl p-5 sm:p-8 lg:p-10">
              <div className="mx-auto max-w-4xl">{children}</div>
            </div>
          </div>
        </div>
      )}

      {/* Body — wide two-column article with sticky right rail */}
      <div className="content-stage section-pad">
        <div className="site-container">
          <div className="article-shell mx-auto max-w-7xl p-5 sm:p-8 lg:p-10 xl:p-12">
            <div className="relative z-10 lg:grid lg:grid-cols-[minmax(0,1.45fr)_minmax(285px,0.55fr)] lg:gap-10 xl:gap-12">
              {/* Main column */}
              <div className="min-w-0 [&_strong]:font-semibold [&_strong]:text-primary">
                <div>{renderBlocks}</div>

                {/* Tools strip on pathway pages */}
                {TOOLS_STRIP_PATHS.test(page.path) && <ToolsStrip />}
              </div>

              {/* Right rail — fills desktop whitespace, stacks on mobile */}
              <aside aria-label="Related tools and topics" className="mt-12 lg:mt-0">
                <PageRail related={related} />
              </aside>
            </div>

            {hasHomeMidBand && (
              <div className="relative z-10 mt-12 overflow-hidden rounded-brand-2xl">
                <DarkRedPathwaySection variant="homeMid" />
              </div>
            )}

            <ToolsShowcase className="relative z-10 mt-12" />

            {/* Full-width CTA band below the grid */}
            <div className="relative z-10 mt-12">
              <CtaBand employer={employer} />
            </div>
          </div>
        </div>
      </div>

      <PageFaqSection page={page} items={faqItems} />

      {/* Structured data */}
      {page.jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: rebrand(JSON.stringify(cleanJsonLd(obj))) }}
        />
      ))}
    </>
  );
}
