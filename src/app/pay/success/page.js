import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

const pagePath = "/pay/success";

export const metadata = buildMetadata({
  title: "Payment Received",
  description: "Your payment was received successfully.",
  path: pagePath,
  noIndex: true,
});

export default function PaySuccessPage() {
  return (
    <main className="mx-auto max-w-xl px-5 pt-[168px] pb-20 text-center md:px-8 md:pb-28">
      <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden />
      <h1 className="mt-5 text-3xl font-bold text-ink md:text-4xl">Payment Received</h1>
      <p className="mt-3 text-[15px] text-muted">
        Thank you — your payment has been received. A confirmation receipt has been sent by Stripe to the email
        you provided. If you have any questions, contact us at{" "}
        <a href={site.emailHref} className="font-semibold text-secondary underline underline-offset-2">
          {site.email}
        </a>
        .
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-brand-lg bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Back to Home
      </Link>
    </main>
  );
}
