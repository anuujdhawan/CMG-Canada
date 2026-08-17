"use client";

import { useReducedMotion } from "framer-motion";
import { CANADA_LEAF_PATH, CANADA_LEAF_VIEWBOX } from "@/lib/canadaLeaf";

/**
 * MapleLeaves — a light, decorative animation for the hero band.
 *
 * Gently falling, swaying and spinning maple leaves drift down the hero.
 * Each leaf uses the exact 11-point stylized maple leaf from the Canadian
 * flag (shared via @/lib/canadaLeaf). Purely CSS-driven (no JS ticks),
 * fully decorative (aria-hidden) and respects prefers-reduced-motion by
 * rendering static leaves.
 */

// Deterministic leaf field — pseudo-random positions/sizes/durations so the
// server and client render identically (no hydration mismatch).
const LEAVES = [
  { left: "4%", top: "-6%", size: 26, fall: 16, delay: 0, sway: 4.2, spin: 22, opacity: 0.14 },
  { left: "12%", top: "-18%", size: 18, fall: 21, delay: 3.2, sway: 5.4, spin: 18, opacity: 0.1 },
  { left: "22%", top: "-10%", size: 32, fall: 26, delay: 1.4, sway: 6.8, spin: 30, opacity: 0.12 },
  { left: "31%", top: "-24%", size: 16, fall: 18, delay: 5.6, sway: 3.6, spin: 26, opacity: 0.08 },
  { left: "42%", top: "-8%", size: 22, fall: 23, delay: 2.1, sway: 5.0, spin: 20, opacity: 0.1 },
  { left: "52%", top: "-20%", size: 28, fall: 19, delay: 7.0, sway: 7.2, spin: 24, opacity: 0.14 },
  { left: "61%", top: "-12%", size: 17, fall: 25, delay: 4.3, sway: 4.4, spin: 16, opacity: 0.09 },
  { left: "70%", top: "-6%", size: 24, fall: 17, delay: 0.8, sway: 6.0, spin: 28, opacity: 0.11 },
  { left: "78%", top: "-22%", size: 30, fall: 22, delay: 6.2, sway: 5.8, spin: 19, opacity: 0.13 },
  { left: "86%", top: "-10%", size: 19, fall: 27, delay: 2.8, sway: 3.2, spin: 23, opacity: 0.1 },
  { left: "93%", top: "-16%", size: 26, fall: 20, delay: 4.9, sway: 6.4, spin: 31, opacity: 0.12 },
  { left: "47%", top: "-30%", size: 21, fall: 29, delay: 8.1, sway: 4.8, spin: 21, opacity: 0.1 },
];

export default function MapleLeaves() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {LEAVES.map((leaf, i) => (
        <div
          key={i}
          className="absolute leaf-fall"
          style={
            shouldReduce
              ? { left: leaf.left, top: `${12 + (i % 5) * 16}%`, opacity: leaf.opacity * 0.55, animation: "none" }
              : {
                  left: leaf.left,
                  top: leaf.top,
                  opacity: leaf.opacity,
                  animationDuration: `${leaf.fall}s`,
                  animationDelay: `${leaf.delay}s`,
                }
          }
        >
          <div
            className="leaf-sway"
            style={
              shouldReduce
                ? { animation: "none" }
                : { animationDuration: `${leaf.sway}s`, animationDelay: `${-leaf.delay}s` }
            }
          >
            <svg
              width={leaf.size}
              height={leaf.size}
              viewBox={CANADA_LEAF_VIEWBOX}
              className="leaf-spin"
              style={
                shouldReduce
                  ? { animation: "none" }
                  : { animationDuration: `${leaf.spin}s`, animationDelay: `${-leaf.delay}s` }
              }
            >
              <path d={CANADA_LEAF_PATH} fill="white" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
