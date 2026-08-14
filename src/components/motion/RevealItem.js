"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { itemVariants } from "@/lib/motion";

/**
 * Child item for a staggered RevealGroup.
 */
export function RevealItem({ children, className, ...rest }) {
  const shouldReduce = useReducedMotion() ?? false;

  if (shouldReduce) {
    return (
      <motion.div className={cn(className)} initial={false} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div className={cn(className)} variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}

export default RevealItem;
