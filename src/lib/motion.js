/**
 * Shared Framer Motion foundation (ported from the source project).
 * Plain data only — safe to import from server and client components.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1];
export const EASE_COUNT = [0.16, 1, 0.3, 1];
export const EASE_SPRING = [0.34, 1.56, 0.64, 1];

export const DURATION = {
  hover: 0.2,
  enter: 0.65,
  section: 0.9,
  count: 1,
};

export const STAGGER = 0.12;

export const sectionVariants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.section, ease: EASE_OUT },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.enter, ease: EASE_OUT },
  },
  sibling: { opacity: 0.85, y: 0, scale: 0.985 },
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.enter, ease: EASE_OUT },
  },
};

export const errorVariants = {
  hidden: { opacity: 0, y: -4, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -4,
    height: 0,
    transition: { duration: 0.15 },
  },
};

export function getRevealOffset(direction, distance) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return { y: distance };
  }
}
