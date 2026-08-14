import { buildMetadata } from "@/lib/seo";
import ToolShell from "@/components/templates/ToolShell";
import NocFinder from "@/components/tools/NocFinder";

export const metadata = buildMetadata({
  title: "NOC / Occupation Finder",
  description:
    "Search a demo subset of NOC 2021 occupations by keyword or code and filter by TEER category.",
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
