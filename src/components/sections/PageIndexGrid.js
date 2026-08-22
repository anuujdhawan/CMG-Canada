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
  // The rewritten URL system intentionally uses keyword-led routes, so the
  // homepage is no longer a shallow parent for the entire inventory. Keep the
  // homepage index useful without rendering all 137 pages as one giant grid.
  const visibleChildren = base === "" ? children.slice(0, 12) : children;

  const isCities = base === "/immigration-consultant";
  const isTools = base === "/tools";
  const Icon = isTools ? Calculator : isCities ? MapPin : null;

  return (
    <section aria-label="Related pages" className="reference-index-grid">
      <div className="reference-index-grid__inner">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">
              {base === "/blog" ? "Latest articles" : isCities ? "Serving cities across Canada" : "Explore"}
            </p>
            <h2>
              {base === "/blog" ? "Read the guides, then decide" : `${segmentLabel(base.split("/").pop())} guides`}
            </h2>
          </div>
          <Link
            href={base}
            className="reference-index-grid__view-all"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="reference-index-grid__cards">
          {visibleChildren.map((page, index) => {
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
