import "react-chatbot-kit/build/main.css";
import "@/styles/globals.css";
import { site } from "@/config/site";
import { theme, themeCssVars, templateThemeCssVars } from "@/config/theme";
import { buildMetadata } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";
import ConsultationModal from "@/components/layout/ConsultationModal";
import GuidedChatbot from "@/components/chatbot/GuidedChatbot";

export const metadata = {
  title: {
    template: `%s | ${site.name}`,
    default: site.meta.defaultTitle,
  },
  metadataBase: site.url ? new URL(site.url) : undefined,
  ...buildMetadata({
    description: site.meta.defaultDescription,
    path: "/",
    keywords: site.meta.keywords,
  }),
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/apple-icon.png",
  },
};

export const viewport = {
  themeColor: theme.colors.primary,
  width: "device-width",
  initialScale: 1,
};

/** Sitewide Organization + WebSite structured data. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: [site.tradingName, site.shortName].filter(Boolean),
  description: site.description,
  url: site.url,
  ...(site.email.includes("@") ? { email: site.email } : {}),
  ...(site.phone.replace(/\D/g, "").length >= 7 ? { telephone: site.phone } : {}),
  priceRange: "$$",
  currenciesAccepted: "CAD",
  areaServed: { "@type": "Country", name: site.address.country },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    ...(site.address.region ? { addressRegion: site.address.region } : {}),
    postalCode: site.address.postal,
    addressCountry: site.address.country,
  },
  sameAs: Object.values(site.social).filter(Boolean),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  inLanguage: "en-CA",
};

// Apply the persisted theme before the browser paints the page. Reading
// localStorage in ThemeToggle's effect alone causes a one-frame dark theme
// flash on refreshes when the saved preference is light.
const themeInitScript = `
  (function () {
    try {
      var savedTheme = window.localStorage.getItem("cmg-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        document.documentElement.dataset.theme = savedTheme;
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      style={{ ...themeCssVars, ...templateThemeCssVars }}
      className="h-full antialiased"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Single site-wide font — applied once on <body> below and inherited
            by every component. Change the family here + in globals.css only. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout wraps every route */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
        />
      </head>
      {/* THE single site-wide font application point. Every component on the
          site inherits this — never add per-component font-family rules. */}
      <body
        className="flex min-h-full flex-col"
        style={{ fontFamily: "Manrope, system-ui, sans-serif" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgressBar />
        <Header />
        <main id="main-content" className="site-theme flex-1 pb-12 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <WhatsAppBubble />
        <ConsultationModal />
        <GuidedChatbot />
      </body>
    </html>
  );
}
