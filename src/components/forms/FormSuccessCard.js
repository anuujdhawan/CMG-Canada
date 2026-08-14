import { CheckCircle2, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Success state card shown after a form submits.
 * tone: "success" | "urgent"
 */
const tones = {
  success: { icon: CheckCircle2, chip: "bg-success/10", color: "text-success" },
  urgent: { icon: CalendarClock, chip: "bg-accent/10", color: "text-accent" },
};

export default function FormSuccessCard({ title, tone = "success", className, children }) {
  const { icon: Icon, chip, color } = tones[tone] || tones.success;
  return (
    <div className={cn("rounded-brand-2xl border border-line bg-white p-8 text-center shadow-card sm:p-12", className)}>
      <span className={cn("mx-auto flex h-14 w-14 items-center justify-center rounded-full", chip)}>
        <Icon className={cn("h-7 w-7", color)} aria-hidden />
      </span>
      <h2 className="mt-5 text-2xl">{title}</h2>
      <div className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}
