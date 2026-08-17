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
  primary: env("NEXT_PUBLIC_THEME_PRIMARY", "#E1251B"),
  primaryDark: env("NEXT_PUBLIC_THEME_PRIMARY_DARK", "#B71C1C"),
  primaryLight: env("NEXT_PUBLIC_THEME_PRIMARY_LIGHT", "#F06A60"),
  secondary: env("NEXT_PUBLIC_THEME_SECONDARY", "#D94437"),
  accent: env("NEXT_PUBLIC_THEME_ACCENT", "#E1251B"),
  accentDark: env("NEXT_PUBLIC_THEME_ACCENT_DARK", "#B71C1C"),
  accentSoft: env("NEXT_PUBLIC_THEME_ACCENT_SOFT", "#FDE9E6"),
  navy: env("NEXT_PUBLIC_THEME_NAVY", "#9E2A24"),
  navyDark: env("NEXT_PUBLIC_THEME_NAVY_DARK", "#7A1C18"),
  surface: env("NEXT_PUBLIC_THEME_SURFACE", "#FFF9F8"),
  surfaceAlt: env("NEXT_PUBLIC_THEME_SURFACE_ALT", "#FCE7E4"),
  text: env("NEXT_PUBLIC_THEME_TEXT", "#4A1915"),
  muted: env("NEXT_PUBLIC_THEME_MUTED", "#9A5B54"),
  border: env("NEXT_PUBLIC_THEME_BORDER", "#F2C8C2"),
  gold: env("NEXT_PUBLIC_THEME_GOLD", "#C74B3F"),
  // Hero colour stops retained for compatibility with existing integrations.
  heroStart: env("NEXT_PUBLIC_THEME_HERO_START", "#F17970"),
  heroMid: env("NEXT_PUBLIC_THEME_HERO_MID", "#E1251B"),
  heroEnd: env("NEXT_PUBLIC_THEME_HERO_END", "#C12820"),
  // Keep spacing configurable from .env; the compact CSS contract applies the visual reduction.
  heroPadTop: env("NEXT_PUBLIC_THEME_HERO_PAD_TOP", "7rem"),
  heroPadBottom: env("NEXT_PUBLIC_THEME_HERO_PAD_BOTTOM", "2.5rem"),
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
  "--brand-hero-start": colors.heroStart,
  "--brand-hero-mid": colors.heroMid,
  "--brand-hero-end": colors.heroEnd,
  "--brand-hero-pad-top": colors.heroPadTop,
  "--brand-hero-pad-bottom": colors.heroPadBottom,
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
    card: "0 1px 3px rgba(74, 25, 21, 0.03), 0 8px 24px rgba(74, 25, 21, 0.05)",
    cardHover: "0 6px 18px rgba(74, 25, 21, 0.06), 0 16px 34px rgba(74, 25, 21, 0.06)",
    dropdown: "0 16px 42px rgba(74, 25, 21, 0.1), 0 4px 12px rgba(74, 25, 21, 0.04)",
    banner: "0 8px 24px rgba(74, 25, 21, 0.08), 0 2px 8px rgba(74, 25, 21, 0.04)",
  },
  typography: {
    fontSans: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif",
    fontSerif: "var(--font-baskerville), 'Libre Baskerville', Georgia, serif",
  },
};

export default theme;
