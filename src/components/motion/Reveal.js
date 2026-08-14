"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DURATION, EASE_OUT, getRevealOffset } from "@/lib/motion";

/**
 * Fade + slide a single block into view on scroll (source-compatible).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 40,
  amount = 0.2,
  once = true,
  ...rest
}) {
  const shouldReduce = useReducedMotion() ?? false;

  if (shouldReduce) {
    return (
      <motion.div className={cn(className)} initial={false} {...rest}>
        {children}
      </motion.div>
    );
  }

  const offset = getRevealOffset(direction, distance);

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: DURATION.section, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
