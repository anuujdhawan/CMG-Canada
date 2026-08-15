import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { rebrand, localizeUrl } from "@/components/templates/MarkdownBlocks";
import { cn } from "@/lib/utils";

/** Drop navigation/social/boilerplate anchors from the scraped link inventory. */
const SKIP_ANCHOR =
  /skip to main content|make payment|book book consultation|^home$|read (all|our) reviews|google|pulse|nexus|vault|client login|get your free crs estimate|continue to services|view guide|learn more/i;

export function cleanRelatedLinks(page, limit = 14) {
  const seen = new Set();
  const out = [];
  for (const { anchor, url } of page.links || []) {
    if (!anchor || !url) continue;
    if (SKIP_ANCHOR.test(anchor)) continue;
    if (/^tel:|^mailto:/i.test(url)) continue;
    if (/g\.page|google|facebook\.com|linkedin\.com|instagram\.com|officio\.ca|vercel\.app|cloudfront/i.test(url)) continue;
    const local = localizeUrl(url);
    if (!local.startsWith("/")) continue; // external authorities are already inline
    if (local === page.path) continue;

    let label = rebrand(anchor).replace(/\s*→+\s*$/g, "").trim();
    label = label.replace(/\s+/g, " ").trim();
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

/**
 * Related-topics card. `compact` renders as a slim right-rail card
 * (used by PageRail); the full variant is a rich bordered panel.
 */
export default function RelatedLinks({ links, compact = false }) {
  if (!links || links.length === 0) return null;

  if (compact) {
    return (
      <div className="card-red-edge overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-[0_8px_22px_rgba(200,16,46,0.1)]">
        <div className="relative border-b border-primary/10 bg-gradient-to-r from-primary/15 via-surface to-white px-5 py-4">
          <p className="eyebrow text-accent-dark">Keep exploring</p>
          <h2 className="mt-1 text-[15px] font-bold text-navy">Related topics</h2>
        </div>
        <ul className="space-y-1 p-4">
          {links.slice(0, 8).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-start gap-2 rounded-lg px-2 py-1.5 text-[13px] font-semibold text-primary transition-colors hover:bg-surface hover:text-accent-dark"
              >
                <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform group-hover:scale-125" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section
      aria-label="Related topics"
      className="card-red-edge mt-14 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-surface to-white p-6 shadow-[0_12px_30px_rgba(200,16,46,0.12)] sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-8 w-1 rounded-full bg-gradient-to-b from-primary-light to-gold" />
        <div>
          <p className="eyebrow text-accent-dark">Keep exploring</p>
          <h2 className="mt-1 text-lg font-bold text-navy">Explore related topics</h2>
        </div>
      </div>
      <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-start gap-2 rounded-lg px-1.5 py-1 text-[14px] font-semibold text-primary transition-colors hover:bg-surface hover:text-accent-dark"
            >
              <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform group-hover:scale-125" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-line pt-4">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-accent-dark hover:text-primary transition-colors">
          Browse all guides
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
