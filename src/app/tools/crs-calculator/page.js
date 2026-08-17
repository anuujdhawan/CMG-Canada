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
      <section aria-label="CRS calculator" className="card-red-edge overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="relative border-b border-line bg-surface px-6 py-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-navy">Estimate your CRS score</h2>
              <p className="mt-1 text-[13px] text-muted">
                Answer the questions below for a close estimate based on the official IRCC scoring grid.
              </p>
            </div>
            <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              Free tool
            </span>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <CrsCalculator />
        </div>
      </section>
    </ContentPage>
  );
}
