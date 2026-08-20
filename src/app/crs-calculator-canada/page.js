import { getPage } from "@/lib/sitePages";
import ContentPage, { rebrand } from "@/components/templates/ContentPage";
import CrsCalculator from "@/components/tools/CrsCalculator";

const pagePath = "/tools/crs-calculator-canada";
const crsPage = getPage(pagePath);

export const metadata = {
  title: { absolute: rebrand(crsPage?.seo.title || crsPage?.h1 || "Free CRS Score Calculator 2026 | Express Entry") },
  description: rebrand(crsPage?.seo.description || "Free Express Entry CRS calculator. Estimate your Comprehensive Ranking System score."),
  alternates: { canonical: pagePath },
};

export default function CrsCalculatorCanadaPage() {
  if (!crsPage) return null;
  return (
    <ContentPage page={crsPage}>
      <CrsCalculator />
    </ContentPage>
  );
}
