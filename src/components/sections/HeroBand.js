import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { parseBlocks, Block, rebrand } from "@/components/templates/MarkdownBlocks";
import { breadcrumbsFor } from "@/lib/sitePages";
import { site } from "@/config/site";
import MapleLeaves from "@/components/sections/MapleLeaves";
import BigMapleLeaf from "@/components/sections/BigMapleLeaf";
import { HERO_GRADIENT, HERO_PADDING, HERO_TITLE_CLASS, HERO_TRUST_BADGES } from "@/lib/hero";

/**
 * Dark hero band used at the top of every content page: gradient navy
 * backdrop, optional breadcrumbs, H1, the page's hero-copy blocks, and the
 * animated maple leaves on the homepage. Extracted so ContentPage and any
 * future page shell can reuse it.
 */
export default function HeroBand({ page }) {
  const heroBlocks = parseBlocks(page.hero);
  const contentPreviewBlocks = heroBlocks.length > 0 ? heroBlocks : parseBlocks(page.content);
  const titleIndex = heroBlocks.findIndex((block) => block.type === "heading" && block.level === 1);
  const titleBlock = titleIndex >= 0 ? heroBlocks[titleIndex] : null;
  const contentTitle = contentPreviewBlocks.find((block) => block.type === "heading" && block.level >= 2);
  const heroTitle = rebrand(titleBlock?.text || contentTitle?.text || page.h1);
  const crumbs = page.path === "/" ? [] : breadcrumbsFor(page.path, heroTitle);
  const supportingBlocks = contentPreviewBlocks.slice(titleIndex >= 0 ? titleIndex + 1 : 0);
  const leadBlock = supportingBlocks.find((block) => block.type === "paragraph");
  const badgeBlock = supportingBlocks.find((block) => block.type === "list");
  const badges = badgeBlock?.items
    ?.map((item) => rebrand(item).replace(/^[·•→\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section aria-label="Page introduction" className={`relative overflow-hidden text-white ${HERO_PADDING}`} style={{ background: HERO_GRADIENT }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-tex-grid opacity-50" />
      <div aria-hidden className="hero-light-orb hero-light-orb--left" />
      <div aria-hidden className="hero-light-orb hero-light-orb--right" />
      <MapleLeaves />
      <BigMapleLeaf />
      <div className="hero-inner site-container relative z-10">
        <div className="hero-copy max-w-4xl">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold text-white/65">
                {crumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight aria-hidden className="h-3 w-3 text-white/35" />}
                    {i === crumbs.length - 1 ? (
                      <span aria-current="page" className="text-white/90">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link href={crumb.href} className="transition-colors hover:text-white">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <p className="hero-eyebrow">
            <span aria-hidden className="hero-eyebrow-line" />
            Licensed Canadian immigration guidance
          </p>
          <h1 className={HERO_TITLE_CLASS}>{heroTitle}</h1>
          {leadBlock && (
            <div className="hero-lead mt-5 max-w-2xl [&_strong]:text-white [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-accent-soft">
              <Block block={leadBlock} dark />
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={site.ctas.primary.href} className="hero-button hero-button--light">
              {site.ctas.primary.label}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href={site.ctas.assessment.href} className="hero-button hero-button--dark">
              Free Assessment
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {(badges?.length ? badges : HERO_TRUST_BADGES).map((badge) => (
              <span key={badge} className="hero-badge">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden className="hero-bottom-rule absolute inset-x-0 bottom-0 h-1" />
    </section>
  );
}
