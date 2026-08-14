import { cn } from "@/lib/utils";

/**
 * Reusable section band: centralizes the `section-pad` + `site-container`
 * boilerplate and background tones so pages can be assembled mix-and-match.
 *
 * Props:
 *   tone        — "white" (default) | "surface" | "navy"
 *   as          — element to render (default "section")
 *   className   — extra classes on the band itself
 *   containerClassName — extra classes on the inner max-width container
 */
const tones = {
  white: "",
  surface: "bg-surface",
  navy: "bg-primary text-white",
};

export default function Section({
  tone = "white",
  as: Tag = "section",
  className,
  containerClassName,
  children,
}) {
  return (
    <Tag className={cn("section-pad", tones[tone], className)}>
      <div className={cn("site-container", containerClassName)}>{children}</div>
    </Tag>
  );
}
