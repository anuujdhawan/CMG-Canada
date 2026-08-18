"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CANADA_LEAF_PATH, CANADA_LEAF_VIEWBOX } from "@/lib/canadaLeaf";

/**
 * BigMapleLeaf — a reusable Canadian maple-leaf animation for hero/footer
 * compositions.
 *
 * A large stylized maple leaf in the EXACT shape of the Canadian flag leaf,
 * gently breathing, swaying and floating over the hero. Decorative
 * (aria-hidden) and respects prefers-reduced-motion by rendering static.
 */
export default function BigMapleLeaf({ className = "" }) {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <motion.div
      aria-hidden
      className={`homepage-big-maple-leaf ${className}`.trim() + " pointer-events-none absolute z-[1] hidden sm:block"}
      style={{ bottom: "6%", right: "5%", opacity: shouldReduce ? 0.36 : undefined }}
      animate={
        shouldReduce
          ? {}
          : {
              opacity: [0.3, 0.42, 0.3],
              rotate: [-5, 5, -5],
              scale: [0.97, 1.04, 0.97],
              y: [0, -12, 0],
            }
      }
      transition={{
        opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 14, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Soft glow halo behind the leaf */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--brand-primary) 6%, transparent) 0%, transparent 68%)",
          transform: "scale(1.35)",
        }}
      />
      <svg
        width="100%"
        height="auto"
        viewBox={CANADA_LEAF_VIEWBOX}
        className="relative w-36 lg:w-52 xl:w-60 drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
      >
        <defs>
          <linearGradient id="bigleaf-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary-dark)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0.94" />
          </linearGradient>
        </defs>
        <path d={CANADA_LEAF_PATH} fill="url(#bigleaf-fill)" />
      </svg>
    </motion.div>
  );
}
