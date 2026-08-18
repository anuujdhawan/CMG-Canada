import Link from "next/link";
import { ArrowRight, Calculator, MapPin } from "lucide-react";
import { getAllPages, segmentLabel } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";
import PathwayCard from "@/components/cards/PathwayCard";

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

  const isCities = base === "/immigration-consultant";
  const isTools = base === "/tools";
  const Icon = isTools ? Calculator : isCities ? MapPin : null;

  return (
    <section aria-label="Related pages" className="homepage-pathways border-t border-line">
      <div className="site-container section-pad pt-12 lg:pt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-accent-dark">
              {base === "/blog" ? "Latest articles" : isCities ? "Serving cities across Canada" : "Explore"}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-navy sm:text-[1.75rem]">
              {base === "/blog" ? "Read the guides, then decide" : `${segmentLabel(base.split("/").pop())} guides`}
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
          {children.map((page, index) => {
            const published = formatDate(page.meta.lastModified);
            const eyebrow = base === "/blog"
              ? published || "Latest guide"
              : isCities
                ? "Canada-wide service"
                : `${segmentLabel(base.split("/").pop())} guide`;
            return (
              <PathwayCard
                key={page.path}
                href={page.path}
                label={shortTitle(page.h1)}
                eyebrow={eyebrow}
                description={rebrand(page.seo.description)}
                icon={Icon}
                index={index}
                actionLabel="Read guide"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
