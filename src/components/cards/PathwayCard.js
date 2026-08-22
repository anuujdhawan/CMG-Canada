import { ArrowRight } from "lucide-react";
import CardShell from "./CardShell";
import { cn } from "@/lib/utils";

/**
 * Shared dark-red pathway card used by navigation bands and structured
 * content patterns. Keeping the visual contract here prevents pages from
 * growing their own slightly-different card implementations.
 */
export default function PathwayCard({
  href,
  label,
  eyebrow,
  description,
  icon: Icon,
  index = 0,
  actionLabel = "Explore pathway",
  ariaLabel,
  role,
  className,
}) {
  return (
    <CardShell
      href={href}
      ariaLabel={ariaLabel || label}
      role={role}
      motion="none"
      className={cn("pathway-card group p-0", className)}
    >
      <div className="pathway-card__top">
        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="pathway-card__icon">
            {Icon ? <Icon className="h-5 w-5" aria-hidden /> : <span aria-hidden>↗</span>}
          </span>
          <span className="pathway-card__number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <p className="relative z-10 mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-dark">{eyebrow}</p>
        <h3 className="relative z-10 mt-2 text-[17px] font-bold leading-snug text-navy">{label}</h3>
      </div>
      <div className="pathway-card__body">
        <p className="text-[13px] leading-relaxed text-muted">{description}</p>
        {href && actionLabel && (
          <span className="pathway-card__action">
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
          </span>
        )}
      </div>
    </CardShell>
  );
}
