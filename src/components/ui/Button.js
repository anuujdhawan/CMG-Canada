import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Button / button-link with centralized variants.
 * Renders <Link> when `href` is provided, otherwise a <button>.
 */
const variants = {
  primary:
    "bg-primary text-white hover:bg-navy shadow-md focus-visible:outline-accent",
  accent:
    "bg-accent text-white hover:bg-accent-dark shadow-banner focus-visible:outline-accent",
  outline:
    "border border-primary/25 bg-white text-primary hover:border-primary/50 hover:bg-accent-soft",
  ghost: "text-primary hover:bg-primary/5",
  light:
    "bg-white text-primary hover:bg-surface-alt shadow-sm",
  lightOutline:
    "border border-white/30 bg-white/5 text-white hover:bg-white/15",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-[15px]",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={props.type ?? "button"} className={classes} {...props}>
      {children}
    </button>
  );
}
