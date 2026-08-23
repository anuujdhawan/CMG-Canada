import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";
import PaymentForm from "@/components/forms/PaymentForm";
import ReferenceServicePage from "@/components/home/ReferenceServicePage";

const pagePath = "/contact/pay-immigration-consultation-canada";
const page = getPage(pagePath);

export const metadata = buildMetadata({
  title: rebrand(page?.seo.title || page?.h1 || "Pay Online"),
  description: rebrand(page?.seo.description || "Make a secure online payment to Commonwealth Migration Canada by card."),
  path: pagePath,
});

const interactiveHeading = {
  eyebrow: "Secure Checkout",
  title: "Pay Your Invoice Online",
  lead: "Enter the amount your consultant quoted you and continue to Stripe's secure checkout — takes less than a minute.",
};

export default function PayImmigrationConsultationCanadaPage() {
  return (
    <ReferenceServicePage page={page} interactivePosition="top" interactiveHeading={interactiveHeading}>
      <PaymentForm />
    </ReferenceServicePage>
  );
}
