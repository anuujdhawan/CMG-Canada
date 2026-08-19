import Link from "next/link";
import { ArrowRight, CalendarCheck, Calculator, MapPin, Search, ClipboardCheck } from "lucide-react";
import { site } from "@/config/site";
import RelatedLinks from "./RelatedLinks";
import { currentPagePath } from "@/config/pageRoutes";

const RAIL_TOOLS = [
  { label: "CRS Calculator", href: "/tools/crs-calculator", icon: Calculator },
  { label: "PNP Eligibility", href: "/tools/pnp-eligibility", icon: MapPin },
  { label: "NOC Finder", href: "/tools/noc-finder", icon: Search },
  { label: "Free Assessment", href: "/tools/free-assessment", icon: ClipboardCheck },
];

export default function PageRail({ related = [], showTools = true }) {
  return (
    <div className="page-rail">
      {/* Book consultation — the prominent dark-red anchor card */}
      <div className="page-rail-card page-rail-card--consultation card-red-edge relative overflow-hidden rounded-[1.75rem] border-2 border-line bg-gradient-to-br from-primary-dark via-navy-dark to-primary p-8 text-white shadow-premium sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 hero-tex-diagonal opacity-25" />
        <div className="relative">
          <p className="eyebrow text-accent-soft text-base tracking-[0.18em] sm:text-lg">Licensed RCIC</p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.16] text-white sm:text-[2.15rem]">
            Not sure which pathway fits?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-xl">
            Get a free 30-minute consultation with a regulated consultant — no obligation.
          </p>
          <Link
            href={site.ctas.primary.href}
            className="mt-8 inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-bold text-primary-dark shadow-lg transition-colors hover:bg-accent-soft sm:min-h-[5.75rem] sm:px-7 sm:py-5 sm:text-xl"
          >
            <CalendarCheck className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden />
            {site.ctas.primary.label}
          </Link>
        </div>
      </div>

      {/* Quick tools */}
      {showTools && (
        <div className="page-rail-card page-rail-card--tools card-red-edge overflow-hidden rounded-[1.75rem] border-2 border-line bg-white shadow-card">
          <div className="relative border-b border-line bg-gradient-to-br from-white via-white to-surface-alt px-8 py-8 sm:px-10 sm:py-9">
            <p className="eyebrow text-primary text-base tracking-[0.18em] sm:text-lg">Free tools</p>
            <h2 className="mt-3 text-2xl font-bold text-primary-dark sm:text-[2rem]">Check eligibility now</h2>
          </div>
          <ul className="p-4 sm:p-5">
            {RAIL_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <li key={tool.href}>
                  <Link
                    href={currentPagePath(tool.href)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-base font-semibold text-primary-dark transition-colors hover:bg-surface hover:text-primary sm:py-3 sm:text-lg"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    {tool.label}
                    <ArrowRight className="ml-auto h-6 w-6 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-line bg-surface/50 px-8 py-5 sm:px-10">
            <Link href={currentPagePath("/tools")} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-dark sm:text-base">
              View all tools
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      )}

      <RelatedLinks links={related} compact />
    </div>
  );
}
