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
  primary: env("NEXT_PUBLIC_THEME_PRIMARY", "#C8102E"), // Canada red — primary actions
  primaryDark: env("NEXT_PUBLIC_THEME_PRIMARY_DARK", "#A31227"), // deeper red for hover/depth
  primaryLight: env("NEXT_PUBLIC_THEME_PRIMARY_LIGHT", "#E51F3F"), // bright red for hovers
  secondary: env("NEXT_PUBLIC_THEME_SECONDARY", "#E51F3F"), // bright red accents
  accent: env("NEXT_PUBLIC_THEME_ACCENT", "#C8102E"), // maple-leaf red
  accentDark: env("NEXT_PUBLIC_THEME_ACCENT_DARK", "#A31227"), // darker red for hover
  accentSoft: env("NEXT_PUBLIC_THEME_ACCENT_SOFT", "#FDF0F1"), // pale red tint (badges, chips)
  navy: env("NEXT_PUBLIC_THEME_NAVY", "#6E0E1C"), // deep maroon — dark bands & footer
  navyDark: env("NEXT_PUBLIC_THEME_NAVY_DARK", "#4A0810"), // darkest maroon
  surface: env("NEXT_PUBLIC_THEME_SURFACE", "#FDF0F1"), // soft tinted surface
  surfaceAlt: env("NEXT_PUBLIC_THEME_SURFACE_ALT", "#F9E3E5"), // deeper surface
  text: env("NEXT_PUBLIC_THEME_TEXT", "#21181B"), // ink text
  muted: env("NEXT_PUBLIC_THEME_MUTED", "#6B5560"), // secondary text
  border: env("NEXT_PUBLIC_THEME_BORDER", "#F0D3D6"), // hairline borders
  gold: env("NEXT_PUBLIC_THEME_GOLD", "#C89B2A"), // regulatory accent
  // Hero gradient stops (top → middle → bottom)
  heroStart: env("NEXT_PUBLIC_THEME_HERO_START", "#E05A64"),
  heroMid: env("NEXT_PUBLIC_THEME_HERO_MID", "#C8102E"),
  heroEnd: env("NEXT_PUBLIC_THEME_HERO_END", "#A31227"),
  // Hero spacing — top clears the floating navbar; bottom is content padding
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
  // Shadow tints are intentionally neutral-ish red; adjust in globals.css
  // if a client wants shadow colors to track the new brand color exactly.
  shadows: {
    card: "0 1px 3px rgba(200, 16, 46, 0.05), 0 4px 14px rgba(200, 16, 46, 0.07)",
    cardHover: "0 4px 14px rgba(200, 16, 46, 0.10), 0 12px 28px rgba(200, 16, 46, 0.10)",
    dropdown: "0 12px 40px rgba(110, 14, 28, 0.18), 0 4px 12px rgba(110, 14, 28, 0.10)",
    banner: "0 8px 24px rgba(200, 16, 46, 0.28), 0 2px 8px rgba(200, 16, 46, 0.20)",
  },
  typography: {
    fontSans: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif",
    fontSerif: "var(--font-baskerville), 'Libre Baskerville', Georgia, serif",
  },
};

export default theme;
