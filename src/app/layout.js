import { Libre_Baskerville, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { site } from "@/config/site";
import { theme, themeCssVars } from "@/config/theme";
import { buildMetadata } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import FloatingCTA from "@/components/layout/FloatingCTA";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-baskerville",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

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
  email: site.email,
  telephone: site.phone,
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
    <html lang="en" style={themeCssVars} className={`${jakarta.variable} ${baskerville.variable} h-full antialiased`}>
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
        <main id="main-content" className="flex-1 pb-12 lg:pb-0">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
