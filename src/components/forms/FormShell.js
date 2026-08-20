import { cn } from "@/lib/utils";

/**
 * Form shell — single source for every assessment/contact form.
 * Theme-aware: dark/light via html[data-theme] + .env-driven --cmg-* vars.
 */
export function FormShell({ as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag className={cn("tool-card", className)} {...rest}>
      <div className="tool-card__body">{children}</div>
    </Tag>
  );
}

export function FieldGrid({ className, children }) {
  return <div className={cn("grid gap-5 sm:grid-cols-2", className)}>{children}</div>;
}
