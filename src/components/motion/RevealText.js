"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";

/**
 * Word-by-word mask reveal for headlines (source-compatible).
 */
export function RevealText({ text, className, as = "h2", delay = 0, amount = 0.15 }) {
  const shouldReduce = useReducedMotion() ?? false;
  const Tag = as;

  if (shouldReduce) {
    return <Tag className={cn(className)}>{text}</Tag>;
  }

  const words = text.split(/\s+/).filter(Boolean);
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: STAGGER, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            style={{ paddingRight: "0.25em" }}
            variants={{
              hidden: { y: "100%" },
              visible: {
                y: "0%",
                transition: { duration: DURATION.section, ease: EASE_OUT },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export default RevealText;
