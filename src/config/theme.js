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
const cssFontFamily = (family) => JSON.stringify(family);

export const fonts = {
  display: env("NEXT_PUBLIC_FONT_DISPLAY", "Cormorant Garamond"),
  body: env("NEXT_PUBLIC_FONT_BODY", "Manrope"),
  importUrl: env(
    "NEXT_PUBLIC_FONT_IMPORT_URL",
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
  ),
};

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
  heroMinHeight: env("NEXT_PUBLIC_THEME_HERO_MIN_HEIGHT", "38rem")};

const templateColors = {
  dark: {
    primary: env("NEXT_PUBLIC_TEMPLATE_DARK_PRIMARY", "#f31f3f"),
    secondary: env("NEXT_PUBLIC_TEMPLATE_DARK_SECONDARY", "#070d16"),
    accent: env("NEXT_PUBLIC_TEMPLATE_DARK_ACCENT", "#c01847"),
    bg: env("NEXT_PUBLIC_TEMPLATE_DARK_BG", "#070d16"),
    surface: env("NEXT_PUBLIC_TEMPLATE_DARK_SURFACE", "#111925"),
    surfaceAlt: env("NEXT_PUBLIC_TEMPLATE_DARK_SURFACE_ALT", "#0b121d"),
    ink: env("NEXT_PUBLIC_TEMPLATE_DARK_INK", "#f7f8fb"),
    muted: env("NEXT_PUBLIC_TEMPLATE_DARK_MUTED", "#aeb8c5"),
    border: env("NEXT_PUBLIC_TEMPLATE_DARK_BORDER", "rgba(255,255,255,.13)")},
  light: {
    primary: env("NEXT_PUBLIC_TEMPLATE_LIGHT_PRIMARY", "#f31f3f"),
    secondary: env("NEXT_PUBLIC_TEMPLATE_LIGHT_SECONDARY", "#ffffff"),
    accent: env("NEXT_PUBLIC_TEMPLATE_LIGHT_ACCENT", "#c01847"),
    bg: env("NEXT_PUBLIC_TEMPLATE_LIGHT_BG", "#f6f7f9"),
    surface: env("NEXT_PUBLIC_TEMPLATE_LIGHT_SURFACE", "#ffffff"),
    surfaceAlt: env("NEXT_PUBLIC_TEMPLATE_LIGHT_SURFACE_ALT", "#eef0f3"),
    ink: env("NEXT_PUBLIC_TEMPLATE_LIGHT_INK", "#10151d"),
    muted: env("NEXT_PUBLIC_TEMPLATE_LIGHT_MUTED", "#5d6875"),
    border: env("NEXT_PUBLIC_TEMPLATE_LIGHT_BORDER", "rgba(7,13,22,.14)")}};

const templateButtons = {
  nav: {
    background: env("NEXT_PUBLIC_TEMPLATE_NAV_CTA", "#ff2746"),
    text: env("NEXT_PUBLIC_TEMPLATE_NAV_CTA_TEXT", "#ffffff"),
    hoverBackground: env("NEXT_PUBLIC_TEMPLATE_NAV_CTA_HOVER", "#ffffff"),
    hoverText: env("NEXT_PUBLIC_TEMPLATE_NAV_CTA_HOVER_TEXT", "#a20b28"),
  },
  hero: {
    dark: {
      background: env("NEXT_PUBLIC_TEMPLATE_HERO_CTA_DARK", "#050912"),
      text: env("NEXT_PUBLIC_TEMPLATE_HERO_CTA_DARK_TEXT", "#ffffff"),
      hoverBackground: env("NEXT_PUBLIC_TEMPLATE_HERO_CTA_DARK_HOVER", "#c91235"),
      hoverText: env("NEXT_PUBLIC_TEMPLATE_HERO_CTA_DARK_HOVER_TEXT", "#ffffff"),
    },
    light: {
      background: env("NEXT_PUBLIC_TEMPLATE_HERO_CTA_LIGHT", "#c91235"),
      text: env("NEXT_PUBLIC_TEMPLATE_HERO_CTA_LIGHT_TEXT", "#ffffff"),
      hoverBackground: env("NEXT_PUBLIC_TEMPLATE_HERO_CTA_LIGHT_HOVER", "#050912"),
      hoverText: env("NEXT_PUBLIC_TEMPLATE_HERO_CTA_LIGHT_HOVER_TEXT", "#ffffff"),
    },
  },
};

/** CSS custom-property overrides injected on <html> (see layout.js). */
export const themeCssVars = {
  "--font-display": cssFontFamily(fonts.display),
  "--font-body": cssFontFamily(fonts.body),
  // Legacy aliases remain available, but now resolve to the template fonts.
  "--font-cormorant": cssFontFamily(fonts.display),
  "--font-manrope": cssFontFamily(fonts.body),
  "--font-baskerville": cssFontFamily(fonts.display),
  "--font-jakarta": cssFontFamily(fonts.body),
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
  "--brand-hero-min-height": colors.heroMinHeight};

/** Reference-template palette variables. Components select the active set by
 * switching the root data-theme attribute; values remain controlled by .env. */
export const templateThemeCssVars = {
  "--cmg-dark-primary": templateColors.dark.primary,
  "--cmg-dark-secondary": templateColors.dark.secondary,
  "--cmg-dark-accent": templateColors.dark.accent,
  "--cmg-dark-bg": templateColors.dark.bg,
  "--cmg-dark-surface": templateColors.dark.surface,
  "--cmg-dark-surface-alt": templateColors.dark.surfaceAlt,
  "--cmg-dark-ink": templateColors.dark.ink,
  "--cmg-dark-muted": templateColors.dark.muted,
  "--cmg-dark-border": templateColors.dark.border,
  "--cmg-light-primary": templateColors.light.primary,
  "--cmg-light-secondary": templateColors.light.secondary,
  "--cmg-light-accent": templateColors.light.accent,
  "--cmg-light-bg": templateColors.light.bg,
  "--cmg-light-surface": templateColors.light.surface,
  "--cmg-light-surface-alt": templateColors.light.surfaceAlt,
  "--cmg-light-ink": templateColors.light.ink,
  "--cmg-light-muted": templateColors.light.muted,
  "--cmg-light-border": templateColors.light.border,
  "--cmg-template-nav-cta": templateButtons.nav.background,
  "--cmg-template-nav-cta-text": templateButtons.nav.text,
  "--cmg-template-nav-cta-hover": templateButtons.nav.hoverBackground,
  "--cmg-template-nav-cta-hover-text": templateButtons.nav.hoverText,
  "--cmg-template-hero-cta-dark": templateButtons.hero.dark.background,
  "--cmg-template-hero-cta-dark-text": templateButtons.hero.dark.text,
  "--cmg-template-hero-cta-dark-hover": templateButtons.hero.dark.hoverBackground,
  "--cmg-template-hero-cta-dark-hover-text": templateButtons.hero.dark.hoverText,
  "--cmg-template-hero-cta-light": templateButtons.hero.light.background,
  "--cmg-template-hero-cta-light-text": templateButtons.hero.light.text,
  "--cmg-template-hero-cta-light-hover": templateButtons.hero.light.hoverBackground,
  "--cmg-template-hero-cta-light-hover-text": templateButtons.hero.light.hoverText,
};

export const theme = {
  colors,
  fonts,
  template: templateColors,
  buttons: templateButtons,
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
    fontSans: "var(--font-body), Manrope, system-ui, sans-serif",
    fontSerif: "var(--font-display), 'Cormorant Garamond', Georgia, serif",
  },
};

export default theme;
