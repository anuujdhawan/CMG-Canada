"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { containerVariants } from "@/lib/motion";

/**
 * Orchestration container — staggers its RevealItem children on reveal.
 */
export function RevealGroup({ children, className, amount = 0.15, staggerDelay, ...rest }) {
  const shouldReduce = useReducedMotion() ?? false;

  if (shouldReduce) {
    return (
      <motion.div className={cn(className)} initial={false} {...rest}>
        {children}
      </motion.div>
    );
  }

  const variants =
    staggerDelay === undefined
      ? containerVariants
      : {
          hidden: {},
          visible: { transition: { staggerChildren: staggerDelay } },
        };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default RevealGroup;
