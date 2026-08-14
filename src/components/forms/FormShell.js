import { cn } from "@/lib/utils";

/**
 * White card shell shared by all demo forms.
 * Pass `as="form"` (plus form props) when the card itself is the form.
 */
export function FormShell({ as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag className={cn("rounded-brand-2xl border border-line bg-white p-6 shadow-card sm:p-8", className)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Two-column responsive field grid (single column on mobile).
 */
export function FieldGrid({ className, children }) {
  return <div className={cn("grid gap-5 sm:grid-cols-2", className)}>{children}</div>;
}
