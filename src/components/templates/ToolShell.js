import PageHeader from "@/components/ui/PageHeader";
import Disclaimer from "@/components/ui/Disclaimer";
import CtaBanner from "@/components/ui/CtaBanner";
import Section from "@/components/ui/Section";
import DarkRedPathwaySection from "@/components/sections/DarkRedPathwaySection";
import ToolsShowcase from "@/components/sections/ToolsShowcase";
import PageFaqSection from "@/components/sections/PageFaqSection";
import PageHeroAside from "@/components/sections/PageHeroAside";
import { getPage } from "@/lib/sitePages";
import { getPageFaqs } from "@/lib/faqs";

export default function ToolShell({ eyebrow, title, lead, currentSlug, pagePath: explicitPagePath, children }) {
  const pagePath = explicitPagePath || `/tools/${currentSlug}`;
  const page = getPage(pagePath) || {
    path: pagePath,
    h1: title,
    seo: { description: lead },
    headingOutline: [],
    jsonLd: [],
  };
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead}>
        <PageHeroAside page={page} title={title} />
      </PageHeader>

      <DarkRedPathwaySection variant="tools" className="homepage-pathways" />

      <Section className="content-stage" containerClassName="mx-auto max-w-6xl">
        <div className="article-shell p-5 sm:p-8 lg:p-10">
          <div className="relative z-10 mx-auto max-w-4xl">{children}</div>
        </div>
      </Section>

      <ToolsShowcase />

      <Section className="band-red-tint border-t border-line" containerClassName="mx-auto max-w-6xl">
        <div className="mt-8">
          <Disclaimer className="mx-auto max-w-3xl" />
        </div>
      </Section>

      <PageFaqSection page={page} items={getPageFaqs(page)} />

      <CtaBanner />
    </>
  );
}
