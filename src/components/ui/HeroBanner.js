"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Clock } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { HERO_GRADIENT, HERO_PADDING, HERO_TITLE_CLASS } from "@/lib/hero";
import MapleLeaves from "@/components/sections/MapleLeaves";
import BigMapleLeaf from "@/components/sections/BigMapleLeaf";

/**
 * Inner-page hero (source-compatible): red gradient, parallax on scroll,
 * the shared falling-maple-leaf animation + big centerpiece leaf, and a
 * word-by-word headline reveal — identical maple-leaf treatment to every
 * content-page hero. Composed by PageHeader.
 */

const TRUST_BADGE_ICONS = [ShieldCheck, Award, Clock];

// All heights share the site-wide hero padding so every page hero feels
// identical; "full" simply adds vertical centering height.
const HEIGHT_PADDING = {
  full: `${HERO_PADDING} flex min-h-[85svh] items-center`,
  large: HERO_PADDING,
  medium: HERO_PADDING,
  compact: HERO_PADDING,
};

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

  const glowStyle = shouldReduce ? undefined : { y: glowY };
  const contentStyle = shouldReduce ? undefined : { y: contentY, opacity: contentOpacity, willChange: "transform" };

  return (
    <motion.section
      ref={ref}
      className={cn("relative flex items-start justify-center overflow-hidden", HEIGHT_PADDING[height] || HEIGHT_PADDING.large, className)}
      style={{ background: HERO_GRADIENT, isolation: "isolate" }}
    >
      {/* Soft depth glow */}
      <motion.div className="absolute inset-0" style={glowStyle ? { y: glowY } : {}} aria-hidden />

      {/* Shared maple-leaf animation — same as every content-page hero */}
      <MapleLeaves />
      <BigMapleLeaf />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 62%, rgba(110,14,28,0.30) 100%)" }}
        aria-hidden
      />

      {/* Content */}
      <motion.div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center" style={contentStyle}>
        <Reveal delay={0.15} amount={0.1} className="flex items-center justify-center gap-2 mb-5 px-2">
          <span className="h-px w-6 shrink-0" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.8))" }} />
          <p className="eyebrow tracking-widest text-center leading-snug text-white/90">{eyebrow}</p>
          <span className="h-px w-6 shrink-0" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.8))" }} />
        </Reveal>

        <Reveal delay={0.35} amount={0.1}>
          <h1 className={cn(HERO_TITLE_CLASS, "mb-6")}>{headline}</h1>
        </Reveal>

        {subheadline && (
          <Reveal delay={0.6} amount={0.1} className="mb-8">
            <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-white/85">{subheadline}</p>
          </Reveal>
        )}

        {children}

        {ctaButtons.length > 0 && (
          <Reveal delay={0.85} distance={0} amount={0.05}>
            <RevealGroup className="flex flex-col sm:flex-row gap-3 justify-center mb-10 w-full px-2 sm:px-6 lg:px-0" amount={0.1} staggerDelay={0.14}>
              {ctaButtons.map((cta) => (
                <RevealItem key={cta.href} className="w-full sm:flex-1">
                  <Link
                    href={cta.href}
                    className={
                      cta.variant === "dark"
                        ? "flex items-center justify-center gap-2 w-full border-2 border-transparent bg-navy-dark text-white font-sans font-bold tracking-wide px-8 py-4 rounded-lg text-sm hover:bg-navy transition-colors shadow-lg"
                        : "flex items-center justify-center gap-2 w-full border-2 border-transparent bg-white text-primary font-sans font-bold tracking-wide px-8 py-4 rounded-lg text-sm hover:bg-accent-soft transition-colors shadow-lg"
                    }
                  >
                    {cta.label}
                    {cta.icon && <ArrowRight className="h-4 w-4" />}
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        )}

        {trustBadges.length > 0 && (
          <Reveal delay={1.05} distance={0} amount={0.05}>
            <RevealGroup className="flex flex-wrap gap-2 justify-center" amount={0.1} staggerDelay={0.08}>
              {trustBadges.map((label, index) => {
                const Icon = TRUST_BADGE_ICONS[index % TRUST_BADGE_ICONS.length];
                return (
                  <RevealItem key={label}>
                    <span className="inline-flex items-center gap-1.5 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold bg-white/10 border border-white/30 text-white">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-white" />
                      {label}
                    </span>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </Reveal>
        )}
      </motion.div>
    </motion.section>
  );
}
