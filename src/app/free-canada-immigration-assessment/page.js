import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";
import AssessmentForm from "@/components/forms/AssessmentForm";
import ReferenceServicePage from "@/components/home/ReferenceServicePage";

const pagePath = "/assessment/free-canada-immigration-assessment";
const page = getPage(pagePath);

export const metadata = buildMetadata({
  title: rebrand(page?.seo.title || page?.h1 || "Free Canada Immigration Assessment"),
  description: rebrand(page?.seo.description || "Submit your profile for a free written eligibility review by our consultants."),
  path: pagePath,
});

export default function FreeCanadaImmigrationAssessmentPage() {
  return <ReferenceServicePage page={page}><AssessmentForm /></ReferenceServicePage>;
}
