import { buildMetadata } from "@/lib/seo";
import ToolShell from "@/components/templates/ToolShell";
import AssessmentForm from "@/components/forms/AssessmentForm";

export const metadata = buildMetadata({
  title: "Free Assessment",
  description:
    "Submit your profile for a free written eligibility review by our consultants — no obligation.",
  path: "/tools/free-assessment",
});

export default function FreeAssessmentPage() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Free Assessment"
      lead="Tell us about your profile and goals. A consultant reviews your situation and replies within two business days with a written, honest assessment — free and without obligation."
      currentSlug="free-assessment"
    >
      <AssessmentForm />
    </ToolShell>
  );
}
