import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Breadcrumb trail — items: [{ label, href? }]
 * variant "dark" renders light text for use on the red hero band.
 */
export default function Breadcrumb({ items, variant = "light" }) {
  const dark = variant === "dark";
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/"
            className={cn("font-medium transition-colors", dark ? "text-white/70 hover:text-white" : "text-muted hover:text-primary")}
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className={cn("h-3.5 w-3.5", dark ? "text-white/40" : "text-muted/50")} aria-hidden />
            {item.href ? (
              <Link
                href={item.href}
                className={cn("font-medium transition-colors", dark ? "text-white/70 hover:text-white" : "text-muted hover:text-primary")}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn("font-semibold", dark ? "text-white" : "text-primary")}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
