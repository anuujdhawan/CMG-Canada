import Link from "next/link";
import { cn } from "@/lib/utils";

/** Shared card shell — link-wrapped card with hover lift + shadow. */
export default function CardShell({ href, children, className, ariaLabel }) {
  const classes = cn(
    "flex h-full flex-col rounded-2xl border border-line bg-white p-6",
    "transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-hover",
    className
  );
  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
