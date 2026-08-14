import { site } from "@/config/site";
import { Info } from "lucide-react";

/** Reusable demo disclaimer note (tool pages, transaction shells). */
export default function Disclaimer({ className, children }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-brand-xl border border-line bg-surface px-4 py-3.5 text-[13px] leading-relaxed text-muted ${className ?? ""}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
      <p>{children || site.disclaimer}</p>
    </div>
  );
}
