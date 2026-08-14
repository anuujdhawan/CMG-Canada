import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { parseBlocks, Block, rebrand } from "@/components/templates/MarkdownBlocks";
import { breadcrumbsFor } from "@/lib/sitePages";
import MapleLeaves from "@/components/sections/MapleLeaves";
import BigMapleLeaf from "@/components/sections/BigMapleLeaf";
import { HERO_GRADIENT, HERO_PADDING, HERO_TITLE_CLASS } from "@/lib/hero";

/**
 * Dark hero band used at the top of every content page: gradient navy
 * backdrop, optional breadcrumbs, H1, the page's hero-copy blocks, and the
 * animated maple leaves on the homepage. Extracted so ContentPage and any
 * future page shell can reuse it.
 */
export default function HeroBand({ page }) {
  const crumbs = page.path === "/" ? [] : breadcrumbsFor(page.path, rebrand(page.h1));
  const heroBlocks = parseBlocks(page.hero.replace(/^# .+\n?/, "").trim());

  return (
    <section className="relative overflow-hidden text-white" style={{ background: HERO_GRADIENT }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-tex-grid opacity-40" />
      <MapleLeaves />
      <BigMapleLeaf />
      <div className={`relative site-container ${HERO_PADDING}`}>
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-white/65">
              {crumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight aria-hidden className="h-3 w-3 text-white/40" />}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-white/90">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          <h1 className={HERO_TITLE_CLASS}>{rebrand(page.h1)}</h1>
          {heroBlocks.length > 0 && (
            <div className="mt-5 space-y-4 [&_strong]:text-white [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-accent-soft">
              {heroBlocks.map((block, i) => (
                <Block key={i} block={block} dark />
              ))}
            </div>
          )}
        </div>
      </div>
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-accent via-primary to-gold" />
    </section>
  );
}
