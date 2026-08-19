import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";
import ToolShell from "@/components/templates/ToolShell";
import AssessmentForm from "@/components/forms/AssessmentForm";

const pagePath = "/assessment/free-canada-immigration-assessment";
const page = getPage(pagePath);

export const metadata = buildMetadata({
  title: rebrand(page?.seo.title || page?.h1 || "Free Canada Immigration Assessment"),
  description: rebrand(page?.seo.description || "Submit your profile for a free written eligibility review by our consultants."),
  path: pagePath,
});

export default function FreeCanadaImmigrationAssessmentPage() {
  return (
    <ToolShell
      eyebrow="Free assessment"
      title="Free Canada Immigration Assessment"
      lead="Tell us about your profile and goals. A consultant reviews your situation and replies with a clear, honest next-step assessment."
      pagePath={pagePath}
    >
      <AssessmentForm />
    </ToolShell>
  );
}
