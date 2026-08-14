import { cn } from "@/lib/utils";

const inputBase =
  "h-11 w-full rounded-brand-md border bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:ring-2";

const stateCls = (error) =>
  error
    ? "border-error focus:border-error focus:ring-error/25"
    : "border-line focus:border-secondary focus:ring-secondary/30";

export function Field({ label, htmlFor, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
        {required && <span className="ml-0.5 text-accent" aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ className, error, ...props }) {
  return <input className={cn(inputBase, stateCls(error), className)} {...props} />;
}

export function SelectInput({ className, error, children, ...props }) {
  return (
    <select className={cn(inputBase, stateCls(error), className)} {...props}>
      {children}
    </select>
  );
}

export function TextArea({ className, error, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-brand-md border bg-white px-3.5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:ring-2",
        stateCls(error),
        className
      )}
      {...props}
    />
  );
}

export function CheckboxField({ label, htmlFor, checked, onChange, error }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
        <input
          id={htmlFor}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand-accent)]"
        />
        {label}
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
