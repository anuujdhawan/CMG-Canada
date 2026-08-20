import routeMap from "../../pageData/route-map.json";

const routeByLegacyPath = Object.fromEntries(
  routeMap.flatMap((route) => [
    route.legacyPath,
    route.previousPath,
    ...(Array.isArray(route.redirectPaths) ? route.redirectPaths : []),
  ].filter(Boolean).map((source) => [source, route.path]))
);

// These interactive routes do not have a source Markdown page of their own.
const extraRoutes = {
  "/tools/free-assessment": "/assessment/free-canada-immigration-assessment",
  "/canada-immigration-calculators": "/tools/canada-immigration-calculators",
  "/crs-calculator-canada": "/tools/crs-calculator-canada",
  "/free-canada-immigration-assessment": "/assessment/free-canada-immigration-assessment",
  "/tools/pnp-eligibility": "/tools/pnp-eligibility-canada",
  "/tools/noc-finder": "/tools/noc-finder-canada",
  "/tools/document-checklist": "/tools/document-checklist-canada",
};

export function currentPagePath(pathname) {
  if (typeof pathname !== "string" || !pathname.startsWith("/")) return pathname;
  return extraRoutes[pathname] || routeByLegacyPath[pathname] || pathname;
}

export default routeByLegacyPath;
