import Link from "next/link";
import { ArrowRight, CalendarDays, Calculator, MapPin } from "lucide-react";
import { getAllPages, segmentLabel } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";

/** Shorten an SEO title for card display without gutting its keywords. */
function shortTitle(title) {
  // Keep everything before a trailing "| Licensed RCIC"-style suffix
  const cut = rebrand(title).split("|")[0].trim();
  return cut.length > 70 ? `${cut.slice(0, 67).trimEnd()}…` : cut;
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

/**
 * For hub routes (e.g. /tools, /blog, /immigration/pnp) renders a grid of the
 * direct child pages — deep, natural internal links that help crawlers index
 * every page. Returns null for non-hub routes.
 */
export default function PageIndexGrid({ pathname }) {
  const pages = getAllPages();
  const base = pathname === "/" ? "" : pathname;
  const children = pages
    .filter((p) => {
      if (base === "" || p.path === "/") return false;
      if (!p.path.startsWith(`${base}/`)) return false;
      const rest = p.path.slice(base.length + 1).split("/");
      return rest.length === 1; // direct children only
    })
    .sort((a, b) => Number(b.meta.priority) - Number(a.meta.priority) || a.path.localeCompare(b.path));

  if (children.length < 3) return null;

  const isBlog = base === "/blog";
  const isCities = base === "/immigration-consultant";
  const isTools = base === "/tools";
  const Icon = isTools ? Calculator : isCities ? MapPin : null;

  return (
    <section aria-label="Related pages" className="band-red-tint border-t border-line">
      <div className="site-container section-pad pt-12 lg:pt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-accent-dark">
              {isBlog ? "Latest articles" : isCities ? "Serving cities across Canada" : "Explore"}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-navy sm:text-[1.75rem]">
              {isBlog ? "Read the guides, then decide" : `${segmentLabel(base.split("/").pop())} guides`}
            </h2>
          </div>
          <Link
            href={base}
            className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-primary hover:text-accent-dark transition-colors sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((page, index) => (
            <Link
              key={page.path}
              href={page.path}
              className="card-red-edge group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-0 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
            >
              <div className="relative bg-gradient-to-br from-navy-dark via-navy to-primary px-5 py-5 text-white">
                <div aria-hidden className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                <div className="relative flex items-center justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/12 text-white shadow-sm transition-transform group-hover:scale-105">
                    {Icon ? <Icon className="h-4 w-4" aria-hidden /> : <span className="text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>}
                  </span>
                  {isBlog && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white/65">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(page.meta.lastModified)}
                    </span>
                  )}
                </div>
                <p className="relative mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">Explore next</p>
              </div>
              <div className="flex flex-1 flex-col p-6 pt-5">
                <h3 className="text-[15px] font-bold leading-snug text-navy transition-colors group-hover:text-primary">
                  {shortTitle(page.h1)}
                </h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted">{rebrand(page.seo.description)}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-primary">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
              <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-8 h-24 w-24 rounded-full bg-surface opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
