import Link from "next/link";
import { Phone, CalendarCheck, ClipboardCheck } from "lucide-react";
import { site } from "@/config/site";

/**
 * Dark consultation CTA band shown at the end of content pages — phone,
 * book-consultation and free-assessment actions. Variant switches the
 * headline/copy for employer-focused pages.
 */
export default function CtaBand({ employer = false }) {
  const primaryCta = employer
    ? { label: "Book Employer Consultation", href: "/book" }
    : { label: "Book a Free Consultation", href: "/book" };

  return (
    <section className="relative isolate mt-16 overflow-hidden rounded-[1.5rem] bg-navy p-7 text-white shadow-premium sm:p-9">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-tex-diagonal opacity-30" />
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="relative max-w-xl">
          <p className="eyebrow text-accent-soft">Licensed RCIC · CICC-Regulated</p>
          <h2 className="mt-2 font-serif text-2xl font-bold leading-snug text-white">
            {employer ? "Ready to hire global talent?" : "Not sure which pathway fits your profile?"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {employer
              ? "Talk to our HGT division — we'll recommend the right LMIA or employer stream for your business."
              : "Our licensed consultants will review your profile and map the fastest route to your goal — at no cost."}
          </p>
        </div>
        <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-accent-soft"
          >
            <CalendarCheck className="h-4 w-4" />
            {primaryCta.label}
          </Link>
          <Link
            href={site.ctas.assessment.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20"
          >
            <ClipboardCheck className="h-4 w-4" />
            Free Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
