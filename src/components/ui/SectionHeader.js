import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion";

/**
 * Standard animated section header (eyebrow + title + lead).
 * Composes the scroll-reveal animation with SectionHeading so sections
 * don't repeat the Reveal + heading boilerplate.
 */
export default function SectionHeader({ eyebrow, title, lead, align = "center", className }) {
  return (
    <Reveal amount={0.2} className={align === "center" ? cn("flex justify-center", className) : className}>
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} align={align} />
    </Reveal>
  );
}
