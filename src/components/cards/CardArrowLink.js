import { ArrowRight } from "lucide-react";

/** Bottom-of-card arrow link — fills the remaining space to align cards. */
export default function CardArrowLink({ label = "Learn more" }) {
  return (
    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-primary transition-colors group-hover:text-accent-dark">
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
    </span>
  );
}
