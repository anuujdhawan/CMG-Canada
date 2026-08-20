import "react-chatbot-kit/build/main.css";
import "@/styles/globals.css";
import { site } from "@/config/site";
import { fonts, theme, themeCssVars, templateThemeCssVars } from "@/config/theme";
import { buildMetadata } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import ConsultationModal from "@/components/layout/ConsultationModal";
import GuidedChatbot from "@/components/chatbot/GuidedChatbot";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";

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
  ...(site.phone.match(/\d{7,}/) ? { telephone: site.phone } : {}),
  priceRange: "$$",
  currenciesAccepted: "CAD",
  areaServed: { "@type": "Country", name: site.address.country },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      style={{ ...themeCssVars, ...templateThemeCssVars }}
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fonts.importUrl} />
      </head>
      <body className="flex min-h-full flex-col">
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
        <ConsultationModal />
        <WhatsAppBubble />
        <GuidedChatbot />
      </body>
    </html>
  );
}
