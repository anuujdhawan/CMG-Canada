"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E";

const STATS = [
  { label: "Regulated Consultants", desc: "Accountable to a professional code of conduct" },
  { label: "97% Success Rate", desc: "Across application types supported" },
  { label: "500+ Applications", desc: "Professionals, families, students and employers" },
];

const AVATARS = [
  { initials: "AS", gradient: "var(--brand-primary)" },
  { initials: "MK", gradient: "var(--brand-primary-dark)" },
  { initials: "SN", gradient: "var(--brand-primary-light)" },
];

function LiveDot({ shouldReduce }) {
  return (
    <span className="relative flex h-2 w-2">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
        animate={shouldReduce ? {} : { opacity: [0.6, 0], scale: [1, 2.2] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
  );
}

/**
 * CTA banner in the source style: word-by-word headline reveal, breathing
 * red radial spotlight, stats, avatars and an availability chip.
 * variant: "standard" | "urgent"
 */
export default function CtaBanner({ variant = "standard", title, description }) {
  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const urgent = variant === "urgent";

  const fallbackTitle = urgent ? "Urgent case? Let's talk today." : "Ready to Start Your Canadian Journey?";
  const fallbackDesc = urgent
    ? "Refusals, procedural fairness letters and deadlines move fast. Our urgent team responds within one business day."
    : "Book a free 30-minute consultation with one of our regulated consultants. No obligation, no jargon — just expert information tailored to you.";

  const headlineWords = (title || fallbackTitle).split(" ").map((word, i) => ({
    text: word,
    italic: i === (title || fallbackTitle).split(" ").length - 1,
  }));

  return (
    <section aria-label="Call to action — start your Canadian immigration journey" className="bg-red-soft px-4 py-5 sm:px-6 sm:py-8">
      <div ref={sectionRef} className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-line bg-white py-12 shadow-premium sm:py-16">
        {/* Grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: `url("${GRAIN_SVG}")`, backgroundRepeat: "repeat", opacity: 0.05 }}
        />

        {/* Quiet neutral surface keeps the CTA secondary to the content. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(0, 48, 135, 0.02)" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
        />

        <div className="relative z-10 w-full px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
            {/* LEFT */}
            <motion.div
              className="flex flex-col"
              initial={shouldReduce ? false : { x: -24, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="mt-6 max-w-xl font-serif font-bold !text-primary leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                {headlineWords.map(({ text, italic }, i) => {
                  const isLast = i === headlineWords.length - 1;
                  const baseDelay = 0.28 + i * 0.075 + (isLast ? 0.06 : 0);
                  return (
                    <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0">
                      <motion.span
                        className={cn("inline-block", italic && "italic")}
                        initial={shouldReduce ? false : { y: "105%" }}
                        animate={isInView ? { y: "0%" } : {}}
                        transition={{ duration: 0.55, delay: baseDelay, ease: EASE }}
                      >
                        {text}
                      </motion.span>
                    </span>
                  );
                })}
              </h2>

              <motion.p
                className="mt-4 max-w-md text-base leading-relaxed text-muted"
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.52, delay: 0.78, ease: EASE }}
              >
                {description || fallbackDesc}
              </motion.p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href={site.ctas.primary.href}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-8 py-4 font-semibold text-white shadow-md transition-colors hover:bg-navy"
                >
                  {site.ctas.primary.label}
                </Link>
                <motion.a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-8 py-4 text-white shadow-md transition-colors"
                  style={{ backgroundColor: "var(--brand-primary-dark)" }}
                  aria-label="Call us now"
                  initial={shouldReduce ? false : { opacity: 0, scale: 0.94 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.42, delay: 1.02, ease: EASE }}
                  whileHover={shouldReduce ? {} : { scale: 1.01 }}
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  Call Us Now
                </motion.a>
              </div>
            </motion.div>

            {/* Vertical divider (lg only) */}
            <motion.div
              aria-hidden
              className="hidden lg:block w-px bg-black/20 self-center"
              initial={shouldReduce ? false : { height: 0, opacity: 0 }}
              animate={isInView ? { height: 128, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            />

            {/* RIGHT */}
            <motion.div
              className="flex flex-col justify-center gap-6"
              initial={shouldReduce ? false : { x: 24, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              <motion.span
                className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 inline-flex items-center gap-2 self-start"
                initial={shouldReduce ? false : { opacity: 0, y: -8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
              >
                <LiveDot shouldReduce={shouldReduce} />
                <span className="text-[13px] text-emerald-600">Next available slot — book now</span>
              </motion.span>

              <div className="flex flex-col">
                {STATS.map(({ label, desc }, i) => (
                  <motion.div
                    key={label}
                    initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: EASE }}
                  >
                    {i > 0 && <div className="h-px bg-black/20 my-4" />}
                    <p className="text-[15px] font-semibold text-navy">{label}</p>
                    <p className="mt-0.5 text-[13px] text-muted">{desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex items-center gap-3 flex-wrap"
                initial={shouldReduce ? false : { opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.65, ease: EASE }}
              >
                <div className="flex items-center">
                  {AVATARS.map((datum, i) => (
                    <div
                      key={datum.initials}
                      aria-hidden
                      className={cn(
                        "w-8 h-8 rounded-full ring-2 ring-primary/60 flex-shrink-0 flex items-center justify-center",
                        i > 0 && "-ml-2"
                      )}
                      style={{ background: datum.gradient }}
                    >
                      <span className="text-white text-[10px] font-bold leading-none select-none">
                        {datum.initials}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-[13px] text-muted">
                  Join 500+ applicants who chose Canada via {site.name}
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 flex-wrap"
                initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.75, ease: EASE }}
              >
                <span className="text-[12px] text-muted">Regulated</span>
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-primary" aria-hidden />
                <span className="text-[12px] text-muted">Indemnity Insured</span>
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-primary" aria-hidden />
                <span className="text-[12px] text-muted">500+ Approved</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
