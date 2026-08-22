/**
 * Shared hero tokens — every page hero (home, content pages and tools)
 * uses the same gradient, generous padding and title sizing so the hero
 * band looks and feels identical site-wide.
 */

export const HERO_GRADIENT = "var(--brand-navy)";

/** Shared hero shell — the CSS contract keeps every route the same height. */
export const HERO_PADDING = "hero-shell";

/** Consistent display title for every page hero. */
export const HERO_TITLE_CLASS =
  "hero-title font-bold leading-[1.08] text-white";

/** Small trust markers shown consistently across content and tool heroes. */
export const HERO_TRUST_BADGES = [
  "CICC-regulated",
  "Canada-wide support",
  "No-obligation first step",
];
