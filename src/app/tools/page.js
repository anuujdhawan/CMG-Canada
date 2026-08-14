import { getPage } from "@/lib/sitePages";
import ContentPage, { rebrand } from "@/components/templates/ContentPage";
import InteractiveToolsGrid from "@/components/sections/InteractiveToolsGrid";
import PageIndexGrid from "@/components/sections/PageIndexGrid";

const toolsPage = getPage("/tools");

export const metadata = {
  title: { absolute: rebrand(toolsPage?.seo.title || "Free Canadian Immigration Calculators") },
  description: rebrand(toolsPage?.seo.description || "Free Canadian immigration calculators and eligibility tools."),
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  if (!toolsPage) return null;
  return (
    <>
      <ContentPage page={toolsPage} />
      <InteractiveToolsGrid />
      <PageIndexGrid pathname="/tools" />
    </>
  );
}
