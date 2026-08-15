"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Clock } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HERO_GRADIENT, HERO_PADDING, HERO_TITLE_CLASS } from "@/lib/hero";
import MapleLeaves from "@/components/sections/MapleLeaves";
import BigMapleLeaf from "@/components/sections/BigMapleLeaf";

/**
 * Shared tool / transaction hero. Its shell, typography, actions and trust
 * markers intentionally mirror HeroBand so every route feels like one site.
 */

const TRUST_BADGE_ICONS = [ShieldCheck, Award, Clock];

export default function HeroBanner({
  eyebrow,
  headline,
  subheadline,
  height = "large",
  className,
  ctaButtons = [],
  trustBadges = [],
  children,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shouldReduce = useReducedMotion() ?? false;

  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentStyle = shouldReduce ? undefined : { y: contentY, opacity: contentOpacity, willChange: "transform" };

  return (
    <motion.section
      ref={ref}
      className={cn("relative overflow-hidden", HERO_PADDING, className)}
      style={{ background: HERO_GRADIENT, isolation: "isolate" }}
    >
      <motion.div className="hero-light-orb hero-light-orb--left" style={shouldReduce ? {} : { y: glowY }} aria-hidden />
      <motion.div className="hero-light-orb hero-light-orb--right" style={shouldReduce ? {} : { y: glowY }} aria-hidden />
      <MapleLeaves />
      <BigMapleLeaf />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 58%, rgba(74,8,16,0.34) 100%)" }}
        aria-hidden
      />

      <div className="hero-inner site-container relative z-10">
        <motion.div className="hero-copy w-full max-w-4xl" style={contentStyle}>
          <div className="hero-eyebrow">
            <span aria-hidden className="hero-eyebrow-line" />
            {eyebrow}
          </div>

          <div>
            <h1 className={cn(HERO_TITLE_CLASS, "mb-5")}>{headline}</h1>
          </div>

          {subheadline && (
            <div className="mb-7 max-w-2xl">
              <p className="text-sm leading-relaxed text-white/85 sm:text-base">{subheadline}</p>
            </div>
          )}

          {children}

          {ctaButtons.length > 0 && (
            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {ctaButtons.map((cta) => (
                  <div key={cta.href} className="w-full sm:w-auto">
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
            <div className="mt-7">
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
      </div>
      <div aria-hidden className="hero-bottom-rule absolute inset-x-0 bottom-0 h-1" />
    </motion.section>
  );
}
