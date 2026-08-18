/**
 * Central theme configuration — powered by the SINGLE `.env` file.
 *
 * Every brand color is read from `NEXT_PUBLIC_THEME_*` (see the "Theme"
 * section of `.env`), so a client can recolor the whole site by editing
 * `.env` and rebuilding. Fallbacks below match the defaults in
 * `src/styles/globals.css`.
 *
 * The exported `themeCssVars` map is injected as inline CSS variables on
 * the <html> element by `src/app/layout.js`, overriding the `:root`
 * defaults in globals.css — every Tailwind utility (bg-primary,
 * text-accent, border-line, …) resolves through those variables.
 */
const env = (key, fallback = "") => process.env[key] || fallback;

const colors = {
  primary: env("NEXT_PUBLIC_THEME_PRIMARY", "#D80621"),
  primaryDark: env("NEXT_PUBLIC_THEME_PRIMARY_DARK", "#B3122A"),
  primaryLight: env("NEXT_PUBLIC_THEME_PRIMARY_LIGHT", "#EF5A6A"),
  secondary: env("NEXT_PUBLIC_THEME_SECONDARY", "#C8102E"),
  accent: env("NEXT_PUBLIC_THEME_ACCENT", "#D80621"),
  accentDark: env("NEXT_PUBLIC_THEME_ACCENT_DARK", "#B3122A"),
  accentSoft: env("NEXT_PUBLIC_THEME_ACCENT_SOFT", "#FFF1F2"),
  navy: env("NEXT_PUBLIC_THEME_NAVY", "#B21A2E"),
  navyDark: env("NEXT_PUBLIC_THEME_NAVY_DARK", "#A51A2A"),
  surface: env("NEXT_PUBLIC_THEME_SURFACE", "#FFFDFC"),
  surfaceAlt: env("NEXT_PUBLIC_THEME_SURFACE_ALT", "#FFF8F8"),
  text: env("NEXT_PUBLIC_THEME_TEXT", "#381116"),
  muted: env("NEXT_PUBLIC_THEME_MUTED", "#6F4A50"),
  border: env("NEXT_PUBLIC_THEME_BORDER", "#EBC5CA"),
  gold: env("NEXT_PUBLIC_THEME_GOLD", "#B55B53"),
  success: env("NEXT_PUBLIC_THEME_SUCCESS", "#2E8B57"),
  warning: env("NEXT_PUBLIC_THEME_WARNING", "#B7791F"),
  error: env("NEXT_PUBLIC_THEME_ERROR", "#B3122A"),
  // Hero colour stops retained for compatibility with existing integrations.
  heroStart: env("NEXT_PUBLIC_THEME_HERO_START", "#FFE4E7"),
  heroMid: env("NEXT_PUBLIC_THEME_HERO_MID", "#D80621"),
  heroEnd: env("NEXT_PUBLIC_THEME_HERO_END", "#B3122A"),
  // Keep spacing configurable from .env; the compact CSS contract applies the visual reduction.
  heroPadTop: env("NEXT_PUBLIC_THEME_HERO_PAD_TOP", "7rem"),
  heroPadBottom: env("NEXT_PUBLIC_THEME_HERO_PAD_BOTTOM", "2.5rem"),
  heroMinHeight: env("NEXT_PUBLIC_THEME_HERO_MIN_HEIGHT", "38rem"),
};

/** CSS custom-property overrides injected on <html> (see layout.js). */
export const themeCssVars = {
  "--brand-primary": colors.primary,
  "--brand-primary-dark": colors.primaryDark,
  "--brand-primary-light": colors.primaryLight,
  "--brand-secondary": colors.secondary,
  "--brand-accent": colors.accent,
  "--brand-accent-dark": colors.accentDark,
  "--brand-accent-soft": colors.accentSoft,
  "--brand-navy": colors.navy,
  "--brand-navy-dark": colors.navyDark,
  "--brand-surface": colors.surface,
  "--brand-surface-alt": colors.surfaceAlt,
  "--brand-text": colors.text,
  "--brand-muted": colors.muted,
  "--brand-border": colors.border,
  "--brand-gold": colors.gold,
  "--brand-success": colors.success,
  "--brand-warning": colors.warning,
  "--brand-error": colors.error,
  "--brand-hero-start": colors.heroStart,
  "--brand-hero-mid": colors.heroMid,
  "--brand-hero-end": colors.heroEnd,
  "--brand-hero-pad-top": colors.heroPadTop,
  "--brand-hero-pad-bottom": colors.heroPadBottom,
  "--brand-hero-min-height": colors.heroMinHeight,
};

export const theme = {
  colors,
  radius: {
    sm: "0.375rem",
    md: "0.625rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem",
    full: "9999px",
  },
  // Shadows stay very soft so the red palette does not glow around every card.
  shadows: {
    card: "0 1px 3px color-mix(in srgb, var(--brand-navy) 3%, transparent), 0 8px 24px color-mix(in srgb, var(--brand-navy) 5%, transparent)",
    cardHover: "0 6px 18px color-mix(in srgb, var(--brand-navy) 6%, transparent), 0 16px 34px color-mix(in srgb, var(--brand-navy) 6%, transparent)",
    dropdown: "0 16px 42px color-mix(in srgb, var(--brand-navy) 10%, transparent), 0 4px 12px color-mix(in srgb, var(--brand-navy) 4%, transparent)",
    banner: "0 8px 24px color-mix(in srgb, var(--brand-navy) 8%, transparent), 0 2px 8px color-mix(in srgb, var(--brand-navy) 4%, transparent)",
  },
  typography: {
    fontSans: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif",
    fontSerif: "var(--font-baskerville), 'Libre Baskerville', Georgia, serif",
  },
};

export default theme;
