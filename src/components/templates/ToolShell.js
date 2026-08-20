import { getPage } from "@/lib/sitePages";
import ReferenceServicePage from "@/components/home/ReferenceServicePage";

export default function ToolShell({ eyebrow, title, lead, currentSlug, pagePath: explicitPagePath, children }) {
  const pagePath = explicitPagePath || `/tools/${currentSlug}`;
  const page = getPage(pagePath) || {
    path: pagePath,
    h1: title,
    seo: { description: lead },
    headingOutline: [],
    jsonLd: [],
  };
  // Tool routes use the same reusable reference service shell as every other
  // content route. This keeps the hero, typography, motion, footer and both
  // theme palettes in one place instead of maintaining a second tool theme.
  return <ReferenceServicePage page={{ ...page, h1: page.h1 || title }}>{children}</ReferenceServicePage>;
}
