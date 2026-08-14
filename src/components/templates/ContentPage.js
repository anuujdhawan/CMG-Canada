import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calculator, MapPin, Search } from "lucide-react";
import { parseBlocks, Block, rebrand, localizeUrl } from "@/components/templates/MarkdownBlocks";
import HeroBand from "@/components/sections/HeroBand";
import CtaBand from "@/components/sections/CtaBand";
import { site } from "@/config/site";
import { getPageImages } from "@/lib/pageImages";
import { cn } from "@/lib/utils";

// Re-exported so existing callers (catch-all route, PageIndexGrid) keep
// working — the implementation now lives in MarkdownBlocks.
export { rebrand, localizeUrl };

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
   Related links (from the page's own link inventory)
   ════════════════════════════════════════════════════════════════════ */

function cleanRelatedLinks(page, limit = 14) {
  const seen = new Set();
  const out = [];
  const skipAnchor = /skip to main content|make payment|book book consultation|^home$|read (all|our) reviews|google|pulse|nexus|vault|client login|get your free crs estimate|continue to services|view guide|learn more/i;

  for (const { anchor, url } of page.links || []) {
    if (!anchor || !url) continue;
    if (skipAnchor.test(anchor)) continue;
    if (/^tel:|^mailto:/i.test(url)) continue;
    if (/g\.page|google|facebook\.com|linkedin\.com|instagram\.com|officio\.ca|vercel\.app|cloudfront/i.test(url)) continue;
    const local = localizeUrl(url);
    if (!local.startsWith("/")) continue; // external authorities are already inline
    if (local === page.path) continue;

    let label = rebrand(anchor).replace(/\s*→+\s*$/g, "").trim();
    label = label.replace(/\s+/g, " ").trim();
    // Trim long card-style anchors at the first description divider
    if (label.length > 50) {
      const cut = label.match(/^(.+?)\s+(?:For|for|-|·|—)\s+/);
      if (cut) label = cut[1].trim();
    }
    if (label.length > 70) label = `${label.slice(0, 67).trimEnd()}…`;

    const key = local.split("#")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ label, href: local });
    if (out.length >= limit) break;
  }
  return out;
}

function RelatedLinks({ links }) {
  if (links.length === 0) return null;
  return (
    <section aria-label="Related topics" className="mt-14 rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
      <h2 className="text-lg font-bold text-navy">Explore related topics</h2>
      <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-start gap-2 text-[14px] font-semibold text-primary hover:text-accent-dark transition-colors"
            >
              <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform group-hover:scale-125" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   Premium content images — interleaved with the article flow so pages
   feel editorial, with captions that reinforce the page topic.
   ════════════════════════════════════════════════════════════════════ */

function ContentImage({ image, index }) {
  return (
    <figure className={cn("my-9", index % 2 === 1 && "sm:pl-4")}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-[0_10px_30px_rgba(110,14,28,0.10)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
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
    <section aria-label="Free eligibility tools" className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
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

      {/* Optional interactive slot (tools etc.) */}
      {children && (
        <div className="site-container pt-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
      )}

      {/* Body */}
      <div className="site-container section-pad">
        <div className="mx-auto max-w-3xl">
          <div>{renderBlocks}</div>

          {/* Tools strip on pathway pages */}
          {TOOLS_STRIP_PATHS.test(page.path) && <ToolsStrip />}

          {/* Related links */}
          <RelatedLinks links={related} />

          {/* CTA band */}
          <CtaBand employer={employer} />
        </div>
      </div>

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
