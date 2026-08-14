import { getPage } from "@/lib/sitePages";
import ContentPage, { rebrand } from "@/components/templates/ContentPage";
import CrsCalculator from "@/components/tools/CrsCalculator";

const crsPage = getPage("/tools/crs-calculator");

export const metadata = {
  title: { absolute: rebrand(crsPage?.seo.title || "Free CRS Score Calculator 2026 | Express Entry") },
  description: rebrand(crsPage?.seo.description || "Free Express Entry CRS calculator. Estimate your Comprehensive Ranking System score."),
  alternates: { canonical: "/tools/crs-calculator" },
};

export default function CrsCalculatorPage() {
  if (!crsPage) return null;
  return (
    <ContentPage page={crsPage}>
      <section aria-label="CRS calculator" className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-navy">Estimate your CRS score</h2>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-dark">
            Free tool
          </span>
        </div>
        <p className="mt-1.5 text-[13px] text-muted">
          Answer the questions below for a close estimate based on the official IRCC scoring grid.
        </p>
        <div className="mt-6">
          <CrsCalculator />
        </div>
      </section>
    </ContentPage>
  );
}
