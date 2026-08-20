import { cn } from "@/lib/utils";

// Single-source field primitives — colors resolve via .env-driven vars (no hex)
const inputBase = "tool-input";
const stateCls = (error) => (error ? "border-error focus:border-error focus:ring-error/25" : "");

export function Field({ label, htmlFor, required, error, hint, children }) {
  return (
    <div className="tool-field">
      <label htmlFor={htmlFor} className="tool-field__label">
        {label}
        {required && <span className="ml-1" style={{ color: "var(--cmg-dark-primary)" }} aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && <p className="tool-field__hint">{hint}</p>}
      {error && <p role="alert" className="mt-1.5 text-xs font-medium" style={{ color: "var(--brand-error)" }}>{error}</p>}
    </div>
  );
}

export function TextInput({ className, error, ...props }) {
  return <input className={cn(inputBase, stateCls(error), className)} {...props} />;
}
export function SelectInput({ className, error, children, ...props }) {
  return <select className={cn(inputBase, stateCls(error), className)} {...props}>{children}</select>;
}
export function TextArea({ className, error, ...props }) {
  return <textarea className={cn("tool-input min-h-[7rem] py-3", stateCls(error), className)} {...props} />;
}
export function CheckboxField({ label, htmlFor, checked, onChange, error }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed" style={{ color:"var(--cmg-dark-ink)" }}>
        <input id={htmlFor} type="checkbox" checked={checked} onChange={onChange} className="tool-checkbox mt-0.5" />
        <span>{label}</span>
      </label>
      {error && <p role="alert" className="mt-1.5 text-xs font-medium" style={{ color:"var(--brand-error)" }}>{error}</p>}
    </div>
  );
}
