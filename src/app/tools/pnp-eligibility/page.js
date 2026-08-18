import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";
import ToolShell from "@/components/templates/ToolShell";
import PnpEligibility from "@/components/tools/PnpEligibility";

const page = getPage("/tools/pnp-eligibility");

export const metadata = buildMetadata({
  title: rebrand(page?.seo.title || page?.h1 || "PNP Eligibility Check"),
  description: rebrand(page?.seo.description || "Answer six questions to see which provincial nomination streams may fit your profile."),
  path: "/tools/pnp-eligibility",
});

export default function PnpEligibilityPage() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="PNP Eligibility Check"
      lead="A quick, private questionnaire that maps your profile to the provincial nomination stream categories most likely to fit."
      currentSlug="pnp-eligibility"
    >
      <PnpEligibility />
    </ToolShell>
  );
}
