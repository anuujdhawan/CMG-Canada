import { cn } from "@/lib/utils";

/** Small brand-tinted icon container used at the top of cards. */
export default function CardIconBox({ children, className }) {
  return (
    <div
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
        "bg-gradient-to-br from-primary to-primary-light text-white shadow-sm transition-colors duration-200",
        "group-hover:from-primary-dark group-hover:to-primary",
        className
      )}
    >
      {children}
    </div>
  );
}
