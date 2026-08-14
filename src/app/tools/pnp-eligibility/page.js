import { buildMetadata } from "@/lib/seo";
import ToolShell from "@/components/templates/ToolShell";
import PnpEligibility from "@/components/tools/PnpEligibility";

export const metadata = buildMetadata({
  title: "PNP Eligibility Check",
  description:
    "Answer six questions to see which provincial nomination streams may fit your profile.",
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
