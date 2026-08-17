import Link from "next/link";
import { ArrowRight, CalendarCheck, Calculator, MapPin, Search, ClipboardCheck } from "lucide-react";
import { site } from "@/config/site";
import RelatedLinks from "./RelatedLinks";

const RAIL_TOOLS = [
  { label: "CRS Calculator", href: "/tools/crs-calculator", icon: Calculator },
  { label: "PNP Eligibility", href: "/tools/pnp-eligibility", icon: MapPin },
  { label: "NOC Finder", href: "/tools/noc-finder", icon: Search },
  { label: "Free Assessment", href: "/tools/free-assessment", icon: ClipboardCheck },
];

/**
 * Sticky right rail for content pages — a red consultation card, a compact
 * tools card and related links. Fills desktop whitespace and adds deep
 * internal links; stacks below the article on mobile.
 */
export default function PageRail({ related = [], showTools = true }) {
  return (
    <div className="space-y-6 lg:sticky lg:top-28">
      {/* Book consultation — quiet navy anchor card */}
      <div className="card-red-edge relative overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-premium">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 hero-tex-diagonal opacity-25" />
        <div className="relative">
          <p className="eyebrow text-accent-soft">Licensed RCIC</p>
          <h2 className="mt-2 font-serif text-lg font-bold leading-snug text-white">
            Not sure which pathway fits?
          </h2>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/80">
            Get a free 30-minute consultation with a regulated consultant — no obligation.
          </p>
          <Link
            href={site.ctas.primary.href}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-bold text-navy shadow-lg transition-colors hover:bg-accent-soft"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden />
            {site.ctas.primary.label}
          </Link>
        </div>
      </div>

      {/* Quick tools */}
      {showTools && (
        <div className="card-red-edge overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="relative border-b border-line bg-surface px-5 py-4">
            <p className="eyebrow text-accent-dark">Free tools</p>
            <h2 className="mt-1 text-[15px] font-bold text-navy">Check eligibility now</h2>
          </div>
          <ul className="space-y-1 p-4">
            {RAIL_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 text-[13px] font-semibold text-navy transition-colors hover:bg-surface hover:text-primary"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    {tool.label}
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-line bg-surface/50 px-5 py-3">
            <Link href="/tools" className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-accent-dark transition-colors hover:text-primary">
              View all tools
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      )}

      {/* Related links */}
      <RelatedLinks links={related} compact />
    </div>
  );
}
