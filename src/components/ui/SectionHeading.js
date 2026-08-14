import { cn } from "@/lib/utils";

/**
 * Standard section heading in the source style: centered eyebrow with
 * red rules on either side, bold title, optional lead.
 */
export default function SectionHeading({ eyebrow, title, lead, align = "center", className }) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left max-w-3xl";
  return (
    <div className={cn("max-w-3xl", alignCls, className)}>
      {eyebrow && (
        <div className={cn("flex items-center gap-3 mb-4", align === "center" ? "justify-center" : "justify-start")}>
          <span className="block h-px w-6 bg-primary" aria-hidden />
          <p className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase">{eyebrow}</p>
          <span className="block h-px w-6 bg-primary" aria-hidden />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] leading-tight">{title}</h2>
      {lead && <p className="mt-4 text-[15px] text-muted sm:text-base">{lead}</p>}
    </div>
  );
}
