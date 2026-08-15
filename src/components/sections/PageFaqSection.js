import Accordion from "@/components/ui/Accordion";
import { rebrand } from "@/components/templates/MarkdownBlocks";

export default function PageFaqSection({ page, items }) {
  if (!items || items.length === 0) return null;

  const topic = rebrand(page?.h1 || "this page").replace(/\s+/g, " ").trim();
  const displayItems = items.map((item) => ({
    question: rebrand(item.question),
    answer: rebrand(item.answer),
  }));

  return (
    <section aria-labelledby="page-faq-title" className="page-faq-section">
      <div className="site-container section-pad">
        <div className="page-faq-section__shell">
          <div className="page-faq-section__intro">
            <p className="eyebrow text-accent-soft">Clear answers, before you decide</p>
            <h2 id="page-faq-title" className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/72">
              Helpful answers about {topic}. Open a question to get the context behind the pathway and know what to check next.
            </p>
          </div>

          <Accordion items={displayItems} defaultOpen={0} idPrefix="page-faq" className="page-faq-section__accordion" />
        </div>
      </div>
    </section>
  );
}
