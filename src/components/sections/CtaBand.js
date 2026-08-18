import Link from "next/link";
import { Phone, CalendarCheck, ClipboardCheck } from "lucide-react";
import { site } from "@/config/site";
import { localizeUrl } from "@/components/templates/MarkdownBlocks";

/**
 * Dark consultation CTA band shown at the end of content pages — phone,
 * book-consultation and free-assessment actions. Variant switches the
 * headline/copy for employer-focused pages.
 */
export default function CtaBand({ employer = false, cta }) {
  const ctaBlocks = Array.isArray(cta) ? cta : cta ? [cta] : [];
  const pageCtas = ctaBlocks.flatMap((block) => block.links || [])
    .map((link) => ({ label: link.anchor, href: localizeUrl(link.url) }))
    .filter((link) => link.label && link.href);
  const primaryCta = pageCtas[0] || (employer
    ? { label: "Book Employer Consultation", href: site.ctas.primary.href }
    : { label: "Book a Free Consultation", href: site.ctas.primary.href });
  const assessmentCta = pageCtas[1] || { label: "Free Assessment", href: site.ctas.assessment.href };
  const description = ctaBlocks.map((block) => block.text).filter(Boolean).join(" ") || (employer
    ? "Talk to our HGT division — we'll recommend the right LMIA or employer stream for your business."
    : "Our licensed consultants will review your profile and map the fastest route to your goal — at no cost.");

  return (
    <section className="cta-band relative isolate mt-16 overflow-hidden rounded-[1.5rem] border border-line bg-gradient-to-br from-white via-white to-surface-alt p-7 text-navy-dark shadow-card sm:p-9">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent-soft/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-tex-diagonal opacity-10" />
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="relative max-w-xl">
          <p className="eyebrow text-primary">Licensed RCIC · CICC-Regulated</p>
          <h2 className="mt-2 font-serif text-2xl font-bold leading-snug text-navy-dark">
            {employer ? "Ready to hire global talent?" : "Not sure which pathway fits your profile?"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        </div>
        <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-accent-soft"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-dark"
          >
            <CalendarCheck className="h-4 w-4" />
            {primaryCta.label}
          </Link>
          <Link
            href={assessmentCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-soft px-5 py-3 text-sm font-bold text-primary-dark transition-colors hover:bg-primary hover:text-white"
          >
            <ClipboardCheck className="h-4 w-4" />
            {assessmentCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
