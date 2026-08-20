/**
 * Central site/brand configuration — powered by the SINGLE `.env` file.
 *
 * Every value a client may want to change (brand name, contact details,
 * CTA links, logo paths, legal routes, theme colors) lives in `.env` and is
 * read here with sensible Commonwealth Migration Canada defaults. Edit `.env`
 * and rebuild to rebrand or re-theme the whole site — nothing else changes.
 */

// Next.js can only inline public environment variables in Client Components
// when each variable is referenced statically (process.env.NEXT_PUBLIC_*).
// Keep the lookup helper, but build its input from static references so the
// server and browser receive the same configured values.
const publicEnv = {
  NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME,
  NEXT_PUBLIC_BRAND_TRADING: process.env.NEXT_PUBLIC_BRAND_TRADING,
  NEXT_PUBLIC_BRAND_SHORT: process.env.NEXT_PUBLIC_BRAND_SHORT,
  NEXT_PUBLIC_BRAND_TAGLINE: process.env.NEXT_PUBLIC_BRAND_TAGLINE,
  NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  NEXT_PUBLIC_SUPPORT_EMAIL_HREF: process.env.NEXT_PUBLIC_SUPPORT_EMAIL_HREF,
  NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE,
  NEXT_PUBLIC_PHONE_HREF: process.env.NEXT_PUBLIC_PHONE_HREF,
  NEXT_PUBLIC_ADDRESS_LINE1: process.env.NEXT_PUBLIC_ADDRESS_LINE1,
  NEXT_PUBLIC_ADDRESS_CITY: process.env.NEXT_PUBLIC_ADDRESS_CITY,
  NEXT_PUBLIC_ADDRESS_POSTAL: process.env.NEXT_PUBLIC_ADDRESS_POSTAL,
  NEXT_PUBLIC_ADDRESS_COUNTRY: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY,
  NEXT_PUBLIC_HOURS: process.env.NEXT_PUBLIC_HOURS,
  NEXT_PUBLIC_TIMEZONE: process.env.NEXT_PUBLIC_TIMEZONE,
  NEXT_PUBLIC_RCIC_NUMBER: process.env.NEXT_PUBLIC_RCIC_NUMBER,
  NEXT_PUBLIC_RCIC_REGULATOR: process.env.NEXT_PUBLIC_RCIC_REGULATOR,
  NEXT_PUBLIC_LOGO_LARGE: process.env.NEXT_PUBLIC_LOGO_LARGE,
  NEXT_PUBLIC_LOGO_WHITE: process.env.NEXT_PUBLIC_LOGO_WHITE,
  NEXT_PUBLIC_LOGO_FOOTER: process.env.NEXT_PUBLIC_LOGO_FOOTER,
  NEXT_PUBLIC_LOGO_FAVICON: process.env.NEXT_PUBLIC_LOGO_FAVICON,
  NEXT_PUBLIC_OG_IMAGE: process.env.NEXT_PUBLIC_OG_IMAGE,
  NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  NEXT_PUBLIC_YOUTUBE_URL: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  NEXT_PUBLIC_WHATSAPP_URL: process.env.NEXT_PUBLIC_WHATSAPP_URL,
  NEXT_PUBLIC_DEFAULT_TITLE: process.env.NEXT_PUBLIC_DEFAULT_TITLE,
  NEXT_PUBLIC_DEFAULT_DESCRIPTION: process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION,
  NEXT_PUBLIC_META_KEYWORDS: process.env.NEXT_PUBLIC_META_KEYWORDS,
  NEXT_PUBLIC_CTA_BOOK: process.env.NEXT_PUBLIC_CTA_BOOK,
  NEXT_PUBLIC_CTA_URGENT: process.env.NEXT_PUBLIC_CTA_URGENT,
  NEXT_PUBLIC_CTA_ASSESSMENT: process.env.NEXT_PUBLIC_CTA_ASSESSMENT,
  NEXT_PUBLIC_CTA_PAYMENT: process.env.NEXT_PUBLIC_CTA_PAYMENT,
  NEXT_PUBLIC_CLIENT_LOGIN_URL: process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL,
  NEXT_PUBLIC_CTA_TOOLS: process.env.NEXT_PUBLIC_CTA_TOOLS,
  NEXT_PUBLIC_LEGAL_PRIVACY: process.env.NEXT_PUBLIC_LEGAL_PRIVACY,
  NEXT_PUBLIC_LEGAL_TERMS: process.env.NEXT_PUBLIC_LEGAL_TERMS,
  NEXT_PUBLIC_LEGAL_DISCLAIMER: process.env.NEXT_PUBLIC_LEGAL_DISCLAIMER,
};

const env = (key, fallback = "") => {
  const value = publicEnv[key];
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
  email: env("NEXT_PUBLIC_SUPPORT_EMAIL", "Contact via website"),
  emailHref: env("NEXT_PUBLIC_SUPPORT_EMAIL_HREF", "/contact/contact-immigration-consultant-brampton"),
  phone: env("NEXT_PUBLIC_PHONE", "Contact via website"),
  phoneHref: env("NEXT_PUBLIC_PHONE_HREF", "/contact/contact-immigration-consultant-brampton"),
  whatsappUrl: (() => {
    const raw = env("NEXT_PUBLIC_WHATSAPP_URL", "").trim();
    if (!raw) return "";
    // Already a full WhatsApp URL — use as-is
    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)/i.test(raw)) return raw;
    if (/^https?:\/\//i.test(raw)) return raw;
    // Bare phone number (e.g. +14165551234 or 14165551234) → build wa.me link
    const digits = raw.replace(/[^\d]/g, "");
    if (digits.length >= 8) return `https://wa.me/${digits}`;
    return raw;
  })(),

  address: {
    line1: env("NEXT_PUBLIC_ADDRESS_LINE1", "Canada-wide service by appointment"),
    city: env("NEXT_PUBLIC_ADDRESS_CITY", "Canada"),
    postal: env("NEXT_PUBLIC_ADDRESS_POSTAL", ""),
    country: env("NEXT_PUBLIC_ADDRESS_COUNTRY", "Canada"),
  },
  hours: env(
    "NEXT_PUBLIC_HOURS",
    "Monday – Friday, 9:00 am – 6:00 pm · Saturday 10:00 am – 4:00 pm (EST)"
  ),
  timezone: env("NEXT_PUBLIC_TIMEZONE", "Eastern Time (ET)"),

  rcic: {
    number: env("NEXT_PUBLIC_RCIC_NUMBER", "CICC-regulated practice"),
    regulator: env("NEXT_PUBLIC_RCIC_REGULATOR", "College of Immigration and Citizenship Consultants (CICC)"),
  },

  // ---- Assets ---------------------------------------------------------
  logos: {
    large: env("NEXT_PUBLIC_LOGO_LARGE", "/images/logo-large.png"), // blue/red wordmark for light surfaces
    white: env("NEXT_PUBLIC_LOGO_WHITE", "/images/CMG-LOGO.webp"), // white/red template wordmark for dark surfaces
    footer: env("NEXT_PUBLIC_LOGO_FOOTER", "/images/cmg-logo-red.png"), // red/blue wordmark used in the footer in both themes
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
    primary: { label: "Book a Consultation", href: env("NEXT_PUBLIC_CTA_BOOK", "/contact/book-immigration-consultation-canada") },
    urgent: { label: "Book Urgent Consultation", href: env("NEXT_PUBLIC_CTA_URGENT", "/assessment/free-canada-immigration-assessment") },
    assessment: { label: "Free Assessment", href: env("NEXT_PUBLIC_CTA_ASSESSMENT", "/assessment/free-canada-immigration-assessment") },
    payment: { label: "Make Payment", href: env("NEXT_PUBLIC_CTA_PAYMENT", "/pay") },
    login: { label: "Client Login", href: env("NEXT_PUBLIC_CLIENT_LOGIN_URL", "https://secure.officio.ca/login") },
    tools: { label: "Free Tools", href: env("NEXT_PUBLIC_CTA_TOOLS", "/tools/canada-immigration-calculators") },
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
