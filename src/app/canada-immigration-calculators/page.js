import { getPage } from "@/lib/sitePages";
import ContentPage, { rebrand } from "@/components/templates/ContentPage";
import InteractiveToolsGrid from "@/components/sections/InteractiveToolsGrid";
import PageIndexGrid from "@/components/sections/PageIndexGrid";

const pagePath = "/tools/canada-immigration-calculators";
const toolsPage = getPage(pagePath);

export const metadata = {
  title: { absolute: rebrand(toolsPage?.seo.title || "Free Canadian Immigration Calculators") },
  description: rebrand(toolsPage?.seo.description || "Free Canadian immigration calculators and eligibility tools."),
  alternates: { canonical: pagePath },
};

export default function CanadaImmigrationCalculatorsPage() {
  if (!toolsPage) return null;
  return (
    <ContentPage page={toolsPage}>
      <InteractiveToolsGrid />
      <PageIndexGrid pathname={pagePath} />
    </ContentPage>
  );
}
