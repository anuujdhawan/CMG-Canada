"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CANADA_LEAF_PATH, CANADA_LEAF_VIEWBOX } from "@/lib/canadaLeaf";

/**
 * BigMapleLeaf — the hero's centerpiece animation.
 *
 * A large stylized maple leaf in the EXACT shape of the Canadian flag leaf,
 * gently breathing, swaying and floating over the hero. Decorative
 * (aria-hidden) and respects prefers-reduced-motion by rendering static.
 */
export default function BigMapleLeaf() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-[1] hidden sm:block"
      style={{ bottom: "6%", right: "5%", opacity: shouldReduce ? 0.24 : undefined }}
      animate={
        shouldReduce
          ? {}
          : {
              opacity: [0.16, 0.28, 0.16],
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
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 68%)",
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
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#F3D7DB" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d={CANADA_LEAF_PATH} fill="url(#bigleaf-fill)" />
      </svg>
    </motion.div>
  );
}
