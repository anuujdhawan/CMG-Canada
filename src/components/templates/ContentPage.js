import { parseBlocks, rebrand, localizeUrl } from "@/components/templates/MarkdownBlocks";
import { site } from "@/config/site";
import { breadcrumbsFor } from "@/lib/sitePages";
import { HERO_TRUST_BADGES } from "@/lib/hero";
import { cleanRelatedLinks } from "@/components/sections/RelatedLinks";
import ReferenceHomepage from "@/components/home/ReferenceHomepage";
import ReferenceServicePage from "@/components/home/ReferenceServicePage";
import ContactForm from "@/components/forms/ContactForm";

// Re-exported so existing callers (catch-all route, PageIndexGrid) keep working
export { rebrand, localizeUrl, cleanRelatedLinks };

function localizeJsonLdValue(value) {
  if (Array.isArray(value)) return value.map(localizeJsonLdValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeJsonLdValue(item)]));
  }
  if (typeof value !== "string" || !/^https?:\/\//i.test(value)) return value;

  try {
    const parsed = new URL(value);
    const hostname = parsed.hostname.toLowerCase();
    if (hostname !== "commonwealthmigration.ca" && hostname !== "www.commonwealthmigration.ca") return value;
    return new URL(localizeUrl(value), site.url).toString();
  } catch {
    return value;
  }
}

function cleanJsonLd(obj) {
  const clone = localizeJsonLdValue(JSON.parse(JSON.stringify(obj)));
  if (Array.isArray(clone.sameAs)) {
    clone.sameAs = [];
    for (const url of Object.values(site.social)) {
      if (url && !clone.sameAs.includes(url)) clone.sameAs.push(url);
    }
    if (clone.sameAs.length === 0) delete clone.sameAs;
  }
  return clone;
}

function getHeroContent(page) {
  const heroBlocks = parseBlocks(page.hero);
  const contentPreviewBlocks = heroBlocks.length > 0 ? heroBlocks : parseBlocks(page.content);
  const titleIndex = heroBlocks.findIndex((block) => block.type === "heading" && block.level === 1);
  const titleBlock = titleIndex >= 0 ? heroBlocks[titleIndex] : null;
  const contentTitle = contentPreviewBlocks.find((block) => block.type === "heading" && block.level >= 2);
  const heroTitle = rebrand(titleBlock?.text || contentTitle?.text || page.h1);
  const supportingBlocks = contentPreviewBlocks.slice(titleIndex >= 0 ? titleIndex + 1 : 0);
  const leadBlock = supportingBlocks.find((block) => block.type === "paragraph");
  const badgeBlock = supportingBlocks.find((block) => block.type === "list");
  const badges = badgeBlock?.items?.map((item) => rebrand(item).replace(/^[·•→\s]+/, "").trim()).filter(Boolean).slice(0, 3);
  return {
    title: heroTitle,
    breadcrumbs: page.path === "/" ? [] : breadcrumbsFor(page.path, heroTitle),
    leadBlock,
    badges: badges?.length ? badges : HERO_TRUST_BADGES,
  };
}

/* ContentPage — unified new theme (no maple leaf, .env-driven dark/light) */
export default function ContentPage({ page, children }) {
  if (page.path === "/") {
    return (
      <>
        <ReferenceHomepage page={page} heroData={getHeroContent(page)} />
        {page.jsonLd.map((obj, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: rebrand(JSON.stringify(cleanJsonLd(obj))) }} />
        ))}
      </>
    );
  }

  if (page.path === "/contact/contact-immigration-consultant-brampton") {
    return (
      <>
        <ReferenceServicePage page={page}>
          <ContactForm />
        </ReferenceServicePage>
        {page.jsonLd.map((obj, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: rebrand(JSON.stringify(cleanJsonLd(obj))) }} />
        ))}
      </>
    );
  }

  // All remaining pages (blog, resources, legal, generic, tools hub) use ReferenceServicePage
  return (
    <>
      <ReferenceServicePage page={page}>{children}</ReferenceServicePage>
      {page.jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: rebrand(JSON.stringify(cleanJsonLd(obj))) }} />
      ))}
    </>
  );
}
