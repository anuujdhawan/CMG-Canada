/**
 * Central site/brand configuration — powered by the SINGLE `.env` file.
 *
 * Every value a client may want to change (brand name, contact details,
 * CTA links, logo paths, legal routes, theme colors) lives in `.env` and is
 * read here with sensible Commonwealth Migration Canada defaults. Edit `.env`
 * and rebuild to rebrand or re-theme the whole site — nothing else changes.
 */

const env = (key, fallback = "") => {
  const value = process.env[key];
  return value && value.trim() ? value : fallback;
};

const PLACEHOLDER_BRAND = "Common Immigration"; // template placeholder — never used

const brandName = (() => {
  const configured = env("NEXT_PUBLIC_BRAND_NAME", "");
  return configured && configured !== PLACEHOLDER_BRAND ? configured : "Commonwealth Migration Canada";
})();

export const site = {
  // ---- Identity -------------------------------------------------------
  name: brandName,
  tradingName: env("NEXT_PUBLIC_BRAND_TRADING", "Commonwealth Migration"),
  shortName: env("NEXT_PUBLIC_BRAND_SHORT", "CMG"),
  tagline: env("NEXT_PUBLIC_BRAND_TAGLINE", "Your Canadian Permanent Residence, Planned by a Licensed RCIC"),
  description: env(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "Commonwealth Migration Canada is a CICC-regulated Canadian immigration consultancy. Licensed RCICs serving Canada-wide — Express Entry, PNP, LMIA, work & study permits, family sponsorship, and refusals."
  ),

  // ---- Contact ----------------------------------------------------------
  url: env("NEXT_PUBLIC_SITE_URL", "https://commonwealthmigration.ca"), // canonical/sitemap target
  email: env("NEXT_PUBLIC_SUPPORT_EMAIL", "info@commonwealthmigration.ca"),
  phone: env("NEXT_PUBLIC_PHONE", "+1 (647) 395-3471"),
  phoneHref: `tel:${env("NEXT_PUBLIC_PHONE", "+1 (647) 395-3471").replace(/[^+\d]/g, "")}`,

  address: {
    line1: env("NEXT_PUBLIC_ADDRESS_LINE1", "83 Kennedy Rd S, Unit 16"),
    city: env("NEXT_PUBLIC_ADDRESS_CITY", "Brampton, ON"),
    postal: env("NEXT_PUBLIC_ADDRESS_POSTAL", "L6W 3P3"),
    country: env("NEXT_PUBLIC_ADDRESS_COUNTRY", "Canada"),
  },
  hours: env(
    "NEXT_PUBLIC_HOURS",
    "Monday – Friday, 9:00 am – 6:00 pm · Saturday 10:00 am – 4:00 pm (EST)"
  ),
  timezone: env("NEXT_PUBLIC_TIMEZONE", "Eastern Time (ET)"),

  rcic: {
    number: env("NEXT_PUBLIC_RCIC_NUMBER", "R705959"),
    regulator: env("NEXT_PUBLIC_RCIC_REGULATOR", "College of Immigration and Citizenship Consultants (CICC)"),
  },

  // ---- Assets ---------------------------------------------------------
  logos: {
    large: env("NEXT_PUBLIC_LOGO_LARGE", "/images/logo-large.png"), // full wordmark (light background)
    white: env("NEXT_PUBLIC_LOGO_WHITE", "/images/logo-white.png"), // full wordmark (dark background)
    favicon: env("NEXT_PUBLIC_LOGO_FAVICON", "/images/icon.png"),
    og: env("NEXT_PUBLIC_OG_IMAGE", "/images/og-default.png"),
  },

  // ---- Social ---------------------------------------------------------
  social: {
    facebook: env("NEXT_PUBLIC_FACEBOOK_URL", "https://www.facebook.com/CMGMigration"),
    instagram: env("NEXT_PUBLIC_INSTAGRAM_URL", "https://www.instagram.com/cmgmigration"),
    linkedin: env("NEXT_PUBLIC_LINKEDIN_URL", "https://www.linkedin.com/company/commonwealthmigrationgroup"),
    youtube: env("NEXT_PUBLIC_YOUTUBE_URL", "https://www.youtube.com/@cmgmigration"),
  },

  // ---- Default metadata (used by lib/seo.js) --------------------------
  meta: {
    titleTemplate: `%s | ${brandName}`,
    defaultTitle: env("NEXT_PUBLIC_DEFAULT_TITLE", "Licensed RCIC Immigration Consultants | Canada & GTA"),
    defaultDescription: env(
      "NEXT_PUBLIC_DEFAULT_DESCRIPTION",
      "CICC-regulated RCICs in Brampton & GTA, Canada-wide. Express Entry, PNP, LMIA, work & study permits, family sponsorship, and refusals. Free assessment."
    ),
    keywords: env("NEXT_PUBLIC_META_KEYWORDS", "Canadian immigration, Express Entry, immigration consultants, study permit, work permit, PNP, LMIA, licensed RCIC").split(",").map((k) => k.trim()),
    ogImage: env("NEXT_PUBLIC_OG_IMAGE", "/images/og-default.png"),
    locale: "en_CA",
  },

  // ---- CTA strategy (centralized labels/links) ------------------------
  ctas: {
    primary: { label: "Book a Consultation", href: env("NEXT_PUBLIC_CTA_BOOK", "/book") },
    urgent: { label: "Book Urgent Consultation", href: env("NEXT_PUBLIC_CTA_URGENT", "/book") },
    assessment: { label: "Free Assessment", href: env("NEXT_PUBLIC_CTA_ASSESSMENT", "/assessment") },
    payment: { label: "Make Payment", href: env("NEXT_PUBLIC_CTA_PAYMENT", "/pay") },
    login: { label: "Client Login", href: env("NEXT_PUBLIC_CLIENT_LOGIN_URL", "https://secure.officio.ca/login") },
    tools: { label: "Free Tools", href: env("NEXT_PUBLIC_CTA_TOOLS", "/tools") },
  },

  // ---- Legal / compliance links ---------------------------------------
  legal: {
    privacy: { label: "Privacy Policy", href: env("NEXT_PUBLIC_LEGAL_PRIVACY", "/privacy") },
    terms: { label: "Terms of Use", href: env("NEXT_PUBLIC_LEGAL_TERMS", "/terms") },
    disclaimer: { label: "Disclaimer", href: env("NEXT_PUBLIC_LEGAL_DISCLAIMER", "/disclaimer") },
  },

  disclaimer:
    "Content on this site is general information only and does not constitute legal advice or a guarantee of visa or permanent-residence approval. Outcomes depend on individual circumstances and current Immigration, Refugees and Citizenship Canada (IRCC) requirements.",
};

/** Plain-text support email (no mailto formatting). */
export const supportEmail = site.email;

export default site;
