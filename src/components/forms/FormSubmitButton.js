import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Submit button with built-in loading spinner.
 * variant: "primary" | "accent"
 */
const variants = {
  primary: "bg-primary hover:bg-primary-dark",
  accent: "bg-accent hover:bg-accent-dark",
};

export default function FormSubmitButton({ loading, variant = "primary", icon: Icon, className, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-brand-lg px-6 py-3 text-[15px] font-semibold text-white transition-colors disabled:opacity-60 sm:w-auto",
        variants[variant] || variants.primary,
        className
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : Icon ? (
        <Icon className="h-4 w-4" aria-hidden />
      ) : null}
      {children}
    </button>
  );
}
