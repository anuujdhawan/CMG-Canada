import { cn } from "@/lib/utils";

/**
 * Reusable heading component for long-form content pages.
 *
 * Every service page renders its markdown headings through this single
 * component (via MarkdownBlocks), so changing the presentation here
 * updates every page at once — no repetition, one source of truth.
 *
 * The visual language mirrors the reference template: clean serif
 * display type with a subtle accent rule, no boxed card treatment.
 */
export default function ContentHeading({ level = 2, children, className }) {
  const Tag = `h${Math.min(Math.max(level, 2), 6)}`;

  const sizeClasses = {
    2: "content-section-heading mt-12 mb-5 text-2xl sm:text-[1.75rem] lg:text-[2rem]",
    3: "content-subheading mt-9 mb-3 text-xl sm:text-[1.35rem]",
    4: "content-subheading mt-7 mb-2 text-lg",
    5: "content-subheading mt-6 mb-2 text-base",
    6: "content-subheading mt-6 mb-2 text-base",
  };

  return (
    <Tag className={cn("font-bold leading-snug", sizeClasses[level] || sizeClasses[6], className)}>
      {children}
    </Tag>
  );
}