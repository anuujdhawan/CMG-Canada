"use client";

import { cn } from "@/lib/utils";

/**
 * Single-source tool UI kit — every calculator/tool page MUST import from here.
 * All colors resolve through .env-driven CSS variables:
 *   --cmg-dark-* / --cmg-light-*  (template palette)
 *   --brand-*                      (canonical brand palette)
 * Component visuals switch automatically via html[data-theme="dark"|"light"].
 * No hardcoded hex values — beautified to complement the current site theme.
 */

// Card that wraps every tool. Theme-aware via .tool-card CSS.
export function ToolCard({ className, children, ...props }) {
  return (
    <div className={cn("tool-card", className)} {...props}>
      {children}
    </div>
  );
}

export function ToolHeader({ icon: Icon, title, subtitle, kicker, action, className }) {
  return (
    <div className={cn("tool-header", className)}>
      <div className="tool-header__left">
        <span className="tool-header__icon" aria-hidden>
          {Icon ? <Icon className="h-[1.2rem] w-[1.2rem]" /> : null}
        </span>
        <div className="tool-header__text">
          {kicker && <p className="tool-header__kicker">{kicker}</p>}
          <h2 className="tool-header__title">{title}</h2>
          {subtitle && <p className="tool-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="tool-header__action">{action}</div>}
    </div>
  );
}

export function ToolResetButton({ children = "Reset", ...props }) {
  return (
    <button type="button" className="tool-reset-btn" {...props}>
      {children}
    </button>
  );
}

export function ToolField({ label, htmlFor, hint, children, className }) {
  return (
    <div className={cn("tool-field", className)}>
      {label && (
        <label htmlFor={htmlFor} className="tool-field__label">
          {label}
        </label>
      )}
      {children}
      {hint && <p className="tool-field__hint">{hint}</p>}
    </div>
  );
}

export function ToolSelect({ className, children, ...props }) {
  return (
    <select className={cn("tool-input", className)} {...props}>
      {children}
    </select>
  );
}

export function ToolInput({ className, ...props }) {
  return <input className={cn("tool-input", className)} {...props} />;
}

export function ToolSearchInput({ className, ...props }) {
  return <input className={cn("tool-input tool-input--search", className)} {...props} />;
}

export function ToolCheckboxCard({ label, checked, onChange, hint, className }) {
  return (
    <label className={cn("tool-checkbox-card", checked && "is-checked", className)}>
      <span className="tool-checkbox-card__text">
        <span className="tool-checkbox-card__label">{label}</span>
        {hint && <span className="tool-checkbox-card__hint">{hint}</span>}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="tool-checkbox" />
    </label>
  );
}

export function ToolProgress({ value, max, labelLeft, labelRight }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="tool-progress">
      {(labelLeft || labelRight) && (
        <div className="tool-progress__labels">
          <span>{labelLeft}</span>
          <span>{labelRight ?? `${pct}%`}</span>
        </div>
      )}
      <div className="tool-progress__track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="tool-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function ToolPill({ children, active, className, ...props }) {
  return (
    <button type="button" className={cn("tool-pill", active && "is-active", className)} aria-pressed={active} {...props}>
      {children}
    </button>
  );
}

export function ToolResultCard({ children, variant = "primary", className }) {
  return <div className={cn("tool-result", `tool-result--${variant}`, className)}>{children}</div>;
}

export function ToolDivider({ className }) {
  return <hr className={cn("tool-divider", className)} />;
}

export function ToolOptionButton({ children, className, ...props }) {
  return (
    <button type="button" className={cn("tool-option-btn", className)} {...props}>
      {children}
    </button>
  );
}

export function ToolStat({ label, value }) {
  return (
    <div className="tool-stat">
      <span className="tool-stat__label">{label}</span>
      <span className="tool-stat__value">{value}</span>
    </div>
  );
}

export function ToolEmptyState({ children, className }) {
  return <div className={cn("tool-empty", className)}>{children}</div>;
}
