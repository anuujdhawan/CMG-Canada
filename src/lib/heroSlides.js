/**
 * Shared hero imagery for the CMG visual system.
 *
 * The first slide is intentionally fixed to the supplied Toronto/CN Tower
 * photograph. Keeping the copy here makes the carousel and service heroes
 * small, reusable components instead of repeating image metadata in routes.
 */
export const HERO_SLIDES = [
  {
    src: "/images/hero/toronto-cn-tower-skyline.webp",
    alt: "Toronto skyline with the CN Tower under a clear blue sky",
    label: "Toronto · Start your Canadian journey"},
  {
    src: "/images/hero/calgary-downtown-skyline.webp",
    alt: "Calgary downtown skyline and bridge in daylight",
    label: "Calgary · Build your next chapter"},
  {
    src: "/images/hero/downtown-toronto-office-towers.webp",
    alt: "Downtown Toronto office towers viewed from below",
    label: "Opportunity · A plan built around your facts"},
  {
    src: "/images/hero/city-skyline-at-dusk.webp",
    alt: "City skyline and bridge reflected in the water at dusk",
    label: "Belonging · Find the route that fits"},
  {
    src: "/images/hero/toronto-skyline-autumn-park.webp",
    alt: "Toronto skyline beyond an autumn park",
    label: "Community · Make Canada home"},
  {
    src: "/images/hero/canadian-flag-modern-office.webp",
    alt: "Canadian flag outside a modern office building",
    label: "Canada · Move forward with confidence"},
  {
    src: "/images/hero/toronto-financial-district-street.webp",
    alt: "People walking through Toronto's financial district",
    label: "Momentum · Take the next clear step"}];

export function isServicePagePath(pathname = "") {
  return [
    "/immigration-services/",
    "/immigration/",
    "/work-study/",
    "/sponsor-status/",
    "/employers/",
    "/appeals/",
    "/immigration-consultant/",
    "/immigrate-to-canada/",
    "/assessment/",
    "/refusals"].some((prefix) => pathname === prefix.replace(/\/$/, "") || pathname.startsWith(prefix));
}

export function getServiceHeroSlide(pathname = "") {
  if (pathname.startsWith("/employers")) return HERO_SLIDES[5];
  if (pathname.startsWith("/work-study")) return HERO_SLIDES[2];
  if (pathname.startsWith("/sponsor-status")) return HERO_SLIDES[4];
  if (pathname.startsWith("/appeals") || pathname.startsWith("/refusals")) return HERO_SLIDES[6];
  if (pathname.startsWith("/immigration-consultant")) return HERO_SLIDES[1];
  if (pathname.startsWith("/immigrate-to-canada")) return HERO_SLIDES[4];
  if (pathname.startsWith("/assessment")) return HERO_SLIDES[3];
  if (pathname.startsWith("/immigration-services")) return HERO_SLIDES[0];
  return HERO_SLIDES[0];
}
