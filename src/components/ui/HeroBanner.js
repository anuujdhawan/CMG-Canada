"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Award, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HERO_PADDING, HERO_TITLE_CLASS } from "@/lib/hero";
import MapleLeaves from "@/components/sections/MapleLeaves";
import BigMapleLeaf from "@/components/sections/BigMapleLeaf";

/**
 * Shared hero used by content pages, tools, the client portal and the home
 * route. Keep route-specific parsing outside this component.
 */

const TRUST_BADGE_ICONS = [ShieldCheck, Award, Clock];

export default function HeroBanner({
  eyebrow,
  headline,
  subheadline,
  leadContent,
  breadcrumbs = [],
  className,
  ctaButtons = [],
  trustBadges = [],
  children,
  variant = "default",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shouldReduce = useReducedMotion() ?? false;

  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentStyle = shouldReduce ? undefined : { y: contentY, opacity: contentOpacity, willChange: "transform" };
  const isHomepage = variant === "home";

  return (
    <motion.section
      ref={ref}
      aria-label="Page introduction"
      className={cn("relative overflow-hidden text-white", HERO_PADDING, isHomepage ? "homepage-hero" : "site-page-hero", className)}
      style={{ isolation: "isolate" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-tex-grid opacity-[0.08]" />
      <motion.div className="hero-light-orb hero-light-orb--left" style={shouldReduce ? {} : { y: glowY }} aria-hidden />
      <motion.div className="hero-light-orb hero-light-orb--right" style={shouldReduce ? {} : { y: glowY }} aria-hidden />
      <MapleLeaves />
      <BigMapleLeaf />

      <div className="hero-inner site-container relative z-10">
        <motion.div className="hero-copy w-full max-w-4xl" style={contentStyle}>
          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold text-white/65">
                {breadcrumbs.map((crumb, index) => (
                  <li key={`${crumb.href}-${crumb.label}`} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight aria-hidden className="h-3 w-3 text-white/35" />}
                    {index === breadcrumbs.length - 1 ? (
                      <span aria-current="page" className="text-white/90">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link href={crumb.href} className="transition-colors hover:text-white">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="hero-eyebrow">
            <span aria-hidden className="hero-eyebrow-line" />
            {eyebrow}
          </div>

          <div>
            <h1 className={cn(HERO_TITLE_CLASS, "mb-4")}>{headline}</h1>
          </div>

          {(leadContent || subheadline) && (
            <div className="hero-lead mb-5 max-w-xl">
              {leadContent || <p className="text-sm leading-relaxed text-white/85 sm:text-base">{subheadline}</p>}
            </div>
          )}

          {!isHomepage && children}

          {ctaButtons.length > 0 && (
            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {ctaButtons.map((cta) => (
                  <div key={`${cta.href}-${cta.label}`} className="w-full sm:w-auto">
                    <Link href={cta.href} className={cn("hero-button", cta.variant === "dark" ? "hero-button--dark" : "hero-button--light")}>
                      {cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {trustBadges.length > 0 && (
            <div className="mt-5">
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((label, index) => {
                  const Icon = TRUST_BADGE_ICONS[index % TRUST_BADGE_ICONS.length];
                  return (
                    <div key={label}>
                      <span className="hero-badge">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-accent-soft" />
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
        {isHomepage && <div className="homepage-hero__aside-slot">{children}</div>}
      </div>
      <div aria-hidden className="hero-bottom-rule absolute inset-x-0 bottom-0 h-1" />
    </motion.section>
  );
}
