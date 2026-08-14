import PageHeader from "@/components/ui/PageHeader";
import Disclaimer from "@/components/ui/Disclaimer";
import CtaBanner from "@/components/ui/CtaBanner";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ToolCard from "@/components/cards/ToolCard";
import { tools } from "@/data/tools";

export default function ToolShell({ eyebrow, title, lead, currentSlug, children }) {
  const related = tools.filter((tool) => tool.slug !== currentSlug);
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />

      <Section containerClassName="mx-auto max-w-3xl">{children}</Section>

      <Section tone="surface">
        <SectionHeader eyebrow="More tools" title="More free tools" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="mt-8">
          <Disclaimer className="mx-auto max-w-3xl" />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
