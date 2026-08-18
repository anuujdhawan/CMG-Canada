import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import { socialIcons } from "@/components/ui/SocialIcons";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";
import BigMapleLeaf from "@/components/sections/BigMapleLeaf";

const SOCIAL_ITEMS = [
  { key: "linkedin", label: `${site.name} on LinkedIn` },
  { key: "facebook", label: `${site.name} on Facebook` },
  { key: "instagram", label: `${site.name} on Instagram` },
  { key: "youtube", label: `${site.name} on YouTube` },
];

const REGULATORY_BODIES = [
  {
    name: "IRCC",
    full: "Immigration, Refugees and Citizenship Canada",
    sub: "Federal Immigration Authority",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  },
  {
    name: "CICC",
    full: "College of Immigration and Citizenship Consultants",
    sub: "Regulator of RCIC Consultants",
    href: "https://college-ic.ca/",
  },
  {
    name: "ESDC",
    full: "Employment and Social Development Canada",
    sub: "LMIA & Labour Programs",
    href: "https://www.canada.ca/en/employment-social-development/services/foreign-workers.html",
  },
  {
    name: "CBSA",
    full: "Canada Border Services Agency",
    sub: "Border & Enforcement Authority",
    href: "https://www.cbsa-asfc.gc.ca/",
  },
];

/** Server component — plain link column. */
function LinkColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-dark">{title}</p>
      <ul>
        {links.map((link) => (
          <li key={link.href + link.label} className="mt-2">
            <Link href={link.href} className="text-sm text-navy hover:text-primary transition-colors duration-180">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const socialLinks = SOCIAL_ITEMS.filter(({ key }) => site.social[key]);
  const linkColumns = navigation.footer;

  return (
    <footer
      className="site-footer pt-10 pb-5"
      style={{
        background: "var(--brand-surface)",
      }}
    >
      <BigMapleLeaf className="footer-big-maple-leaf" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))]">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="inline-flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2">
              <Image
                src={site.logos.large}
                alt={site.name}
                width={1912}
                height={1140}
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="mt-2 text-sm font-medium text-primary-dark">
              Canada Immigration <strong className="font-bold">Simplified</strong>
            </p>

            <p className="mt-2 max-w-65 text-[12px] leading-[1.45] text-muted">
              <strong className="font-semibold text-primary-dark">CICC-regulated licensed RCICs</strong> serving clients across
              Canada — Express Entry, every PNP stream, LMIA (HGT), work & study permits, family sponsorship, and refusals.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent-soft px-3 py-1.5">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-semibold text-primary-dark">Licensed RCIC {site.rcic.number} · CICC-Regulated</span>
            </div>

            {/* Contact */}
            <div className="mt-3 space-y-1.5 text-[12px] leading-[1.45] text-muted">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {site.address.line1}, {site.address.city} {site.address.postal}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={site.phoneHref} className="hover:text-primary transition-colors">
                  {site.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${site.email}`} className="hover:text-primary transition-colors">
                  {site.email}
                </a>
              </p>
            </div>

            {/* Social row */}
            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-2">
                {socialLinks.map(({ key, label }) => {
                  const Icon = socialIcons[key];
                  return (
                    <a
                      key={key}
                      href={site.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center rounded-full bg-accent-soft p-1.5 text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Link columns */}
          {linkColumns.map((col) => (
            <LinkColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Regulatory trust bar */}
        <div className="mt-8">
          <div className="border-t-4 border-primary pt-4">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-primary-dark">
              Regulated &amp; Recognised By
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {REGULATORY_BODIES.map((body) => (
                <a
                  key={body.name}
                  href={body.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface-alt px-4 py-3 hover:bg-accent-soft transition-colors"
                >
                  <ExternalLink size={18} className="text-primary" />
                  <span className="text-[12px] font-bold text-primary-dark text-center leading-tight">{body.name}</span>
                  <span className="text-[10px] text-muted text-center leading-tight">{body.full}</span>
                  <span className="text-[10px] text-muted/75 text-center leading-tight">{body.sub}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal bottom bar */}
        <div className="mt-8 border-t border-line pt-4">
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4">
            <p className="text-[12px] text-primary-dark">© {year} {site.name}. All rights reserved.</p>
            <p className="text-[12px] text-muted italic">
              Licensed by {site.rcic.regulator}
            </p>
          </div>

          <p className="mt-3 text-[11px] text-muted italic text-center">
            {site.tradingName} is a trading name. Content on this site is general information only and does not constitute
            legal advice. Immigration outcomes depend on individual circumstances and current IRCC requirements. {site.name}{" "}
            <strong className="font-semibold text-primary-dark">does not guarantee</strong> visa approval.
          </p>
        </div>
      </div>
    </footer>
  );
}
