/**
 * Shared hero tokens — every page hero (home, content pages, tools, login)
 * uses the same gradient, generous padding and title sizing so the hero
 * band looks and feels identical site-wide.
 */

export const HERO_GRADIENT =
  "linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-dark) 45%, var(--brand-primary-dark) 100%)";

/** Generous vertical space — clears the fixed utility bar + floating pill. */
export const HERO_PADDING = "pt-40 pb-16 sm:pt-44 sm:pb-20 lg:pt-52 lg:pb-24";

/** Consistent, slightly smaller display title for every page hero. */
export const HERO_TITLE_CLASS =
  "font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl";
