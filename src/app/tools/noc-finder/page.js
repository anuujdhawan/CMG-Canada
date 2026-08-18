import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";
import ToolShell from "@/components/templates/ToolShell";
import NocFinder from "@/components/tools/NocFinder";

const page = getPage("/tools/noc-finder");

export const metadata = buildMetadata({
  title: rebrand(page?.seo.title || page?.h1 || "NOC / Occupation Finder"),
  description: rebrand(page?.seo.description || "Search a demo subset of NOC 2021 occupations by keyword or code and filter by TEER category."),
  path: "/tools/noc-finder",
});

export default function NocFinderPage() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="NOC / Occupation Finder"
      lead="Find your occupation's NOC code and TEER category — the starting point for Express Entry, LMIA and most program eligibility."
      currentSlug="noc-finder"
    >
      <NocFinder />
    </ToolShell>
  );
}
