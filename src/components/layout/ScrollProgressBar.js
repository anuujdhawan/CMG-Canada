"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const shouldReduce = useReducedMotion() ?? false;

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const progress = shouldReduce ? scrollYProgress : scaleX;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: progress, boxShadow: "0 0 8px rgba(0,48,135,0.22)" }}
      className="fixed top-0 inset-x-0 h-[3px] origin-left z-[60] bg-primary"
    />
  );
}
