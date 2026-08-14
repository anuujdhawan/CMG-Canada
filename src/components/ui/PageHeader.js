import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import HeroBanner from "./HeroBanner";

/**
 * Inner-page hero in the homepage starfield style (source-compatible).
 * Every internal page that renders a <PageHeader> now gets the same
 * red-gradient starfield hero, parallax and word-reveal headline as the
 * homepage — with the page's own eyebrow / title / lead.
 *
 * Props:
 *   eyebrow  — small uppercase label above the title
 *   title    — page headline (word-by-word reveal)
 *   lead     — optional subheadline
 *   children — optional extra content below the lead
 *   height   — "full" | "large" | "medium" | "compact" (default "large")
 *   ctas     — optional [{ label, href, variant }] buttons
 *   trustBadges — optional string[] chips
 */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  children,
  className,
  height = "large",
  ctas,
  trustBadges,
}) {
  return (
    <HeroBanner
      eyebrow={eyebrow || "Regulated Canadian Immigration Consultants"}
      headline={title}
      subheadline={lead || ""}
      height={height}
      className={className}
      ctaButtons={
        ctas ||
        [
          { label: site.ctas.primary.label, href: site.ctas.primary.href, variant: "primary" },
          { label: "Free Assessment", href: "/tools/free-assessment", variant: "dark" },
        ]
      }
      trustBadges={trustBadges}
    >
      {children}
    </HeroBanner>
  );
}
