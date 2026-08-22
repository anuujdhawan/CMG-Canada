import Link from "next/link";
import { cn } from "@/lib/utils";

/** Shared card shell — link-wrapped card with hover lift + shadow. */
export default function CardShell({ href, children, className, ariaLabel, motion = "lift", role }) {
  const motionClasses = motion === "none"
    ? ""
    : "transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-hover";
  const classes = cn(
    "card-shell flex h-full flex-col rounded-2xl border p-6",
    motionClasses,
    className
  );
  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes} role={role}>
        {children}
      </Link>
    );
  }
  return <div className={classes} role={role}>{children}</div>;
}
