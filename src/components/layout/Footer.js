import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GraduationCap, MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { socialIcons } from "@/components/ui/SocialIcons";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";

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

function LinkColumn({ title, links }) {
  return (
    <nav aria-label={title} className="site-footer__col">
      <p className="site-footer__col-title">
        <span className="site-footer__col-title-line" aria-hidden />
        {title}
      </p>
      <ul className="site-footer__col-list">
        {links.map((link) => (
          <li key={link.href + link.label}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="site-footer__link">
                <span>{link.label}</span>
                <ArrowUpRight className="site-footer__link-arrow" size={12} aria-hidden />
              </a>
            ) : (
              <Link href={link.href} className="site-footer__link">
                <span>{link.label}</span>
                <ArrowUpRight className="site-footer__link-arrow" size={12} aria-hidden />
              </Link>
            )}
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
    <footer className="site-footer">
      {/* Top accent — uses .env primary gradient */}
      <div className="site-footer__accent" aria-hidden />
      {/* Ambient decor — all colors from .env via CSS variables */}
      <div className="site-footer__bg" aria-hidden>
        <div className="site-footer__grid-pattern" />
        <div className="site-footer__orb site-footer__orb--a" />
        <div className="site-footer__orb site-footer__orb--b" />
      </div>

      <div className="site-footer__inner max-w-7xl mx-auto px-5 md:px-8">
        {/* Main grid */}
        <div className="site-footer__main">
          {/* Brand */}
          <div className="site-footer__brand">
            <Link href="/" className="site-footer__logo" aria-label={`${site.name} home`}>
              <Image
                src={site.logos.footer}
                alt={site.name}
                width={1912}
                height={1140}
                className="site-footer__logo-img"
              />
            </Link>

            <p className="site-footer__tagline">
              Canada Immigration <strong>Simplified</strong>
            </p>

            <p className="site-footer__desc">
              <strong>CICC-regulated licensed RCICs</strong> serving clients across Canada — Express Entry, every PNP stream, LMIA (HGT), work & study permits, family sponsorship, and refusals.
            </p>

            <div className="site-footer__rcic">
              <span className="site-footer__rcic-icon">
                <GraduationCap size={14} aria-hidden />
              </span>
              <span>Licensed RCIC {site.rcic.number} · CICC-Regulated</span>
              <ShieldCheck size={12} className="site-footer__rcic-check" aria-hidden />
            </div>

            {/* Contact */}
            <div className="site-footer__contact">
              <p className="site-footer__locations-label">Our offices</p>
              <div className="site-footer__locations">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(site.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__office site-footer__office--primary"
                >
                  <span className="site-footer__office-heading">
                    <span className="site-footer__contact-icon">
                      <MapPin size={13} aria-hidden />
                    </span>
                    <span>
                      <strong>{site.name} ({site.shortName})</strong>
                      <small>Main Company · Canada</small>
                    </span>
                  </span>
                  <span className="site-footer__office-address">
                    <span>{site.address.line1}</span>
                    {[site.address.city, site.address.region, site.address.postal, site.address.country].filter(Boolean).join(", ")}
                  </span>
                </a>
                <a
                  href={site.sisterConcern.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__office site-footer__office--sister"
                >
                  <span className="site-footer__office-heading">
                    <span className="site-footer__contact-icon">
                      <MapPin size={13} aria-hidden />
                    </span>
                    <span>
                      <strong>{site.sisterConcern.name} ({site.sisterConcern.shortName})</strong>
                      <small>Sister Concern · Dubai</small>
                    </span>
                  </span>
                  <span className="site-footer__office-address">{site.sisterConcern.address}</span>
                </a>
              </div>
              <a href={site.phoneHref} className="site-footer__contact-row">
                <span className="site-footer__contact-icon">
                  <Phone size={13} aria-hidden />
                </span>
                <span>{site.phone}</span>
              </a>
              <a href={site.emailHref} className="site-footer__contact-row">
                <span className="site-footer__contact-icon">
                  <Mail size={13} aria-hidden />
                </span>
                <span>{site.email}</span>
              </a>
            </div>

            {/* Social + CTA */}
            <div className="site-footer__brand-actions">
              {socialLinks.length > 0 && (
                <div className="site-footer__social">
                  {socialLinks.map(({ key, label }) => {
                    const Icon = socialIcons[key];
                    return (
                      <a
                        key={key}
                        href={site.social[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="site-footer__social-link"
                      >
                        <Icon className="h-[15px] w-[15px]" />
                      </a>
                    );
                  })}
                </div>
              )}
              <Link href={site.ctas.assessment.href} className="site-footer__cta">
                <Sparkles size={14} aria-hidden />
                Free Assessment
              </Link>
            </div>

            <p className="site-footer__hours">
              {site.hours} <span>· {site.timezone}</span>
            </p>
          </div>

          {/* Link columns */}
          <div className="site-footer__links">
            {linkColumns.map((col) => (
              <LinkColumn key={col.title} title={col.title} links={col.links} />
            ))}

            {/* Regulatory trust bar — placed below link columns */}
            <div className="site-footer__trust">
              <div className="site-footer__trust-header">
                <span className="site-footer__trust-line" aria-hidden />
                <p>Regulated &amp; Recognised By</p>
                <span className="site-footer__trust-line" aria-hidden />
              </div>
              <div className="site-footer__trust-grid">
                {REGULATORY_BODIES.map((body) => (
                  <a
                    key={body.name}
                    href={body.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__trust-card"
                  >
                    <span className="site-footer__trust-card-icon">
                      <ExternalLink size={14} aria-hidden />
                    </span>
                    <span className="site-footer__trust-card-name">{body.name}</span>
                    <span className="site-footer__trust-card-full">{body.full}</span>
                    <span className="site-footer__trust-card-sub">{body.sub}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal bottom bar */}
        <div className="site-footer__bottom">
          <div className="site-footer__bottom-row">
            <p className="site-footer__copyright">
              © {year} {site.name}. All rights reserved.
              <span className="site-footer__dot" aria-hidden>
                ·
              </span>
              <span className="site-footer__regulator">Licensed by {site.rcic.regulator}</span>
            </p>
            <nav className="site-footer__legal" aria-label="Legal">
              <Link href={site.legal.privacy.href}>{site.legal.privacy.label}</Link>
              <span className="site-footer__legal-dot" aria-hidden>
                ·
              </span>
              <Link href={site.legal.terms.href}>{site.legal.terms.label}</Link>
              <span className="site-footer__legal-dot" aria-hidden>
                ·
              </span>
              <Link href={site.legal.disclaimer.href}>{site.legal.disclaimer.label}</Link>
              <span className="site-footer__legal-dot" aria-hidden>
                ·
              </span>
              <Link href={site.legal.refund.href}>{site.legal.refund.label}</Link>
            </nav>
          </div>

          <p className="site-footer__disclaimer">
            {site.tradingName} is a trading name. Content on this site is general information only and does not constitute
            legal advice. Immigration outcomes depend on individual circumstances and current IRCC requirements. {site.name}{" "}
            <strong>does not guarantee</strong> visa approval.
          </p>
        </div>
      </div>
    </footer>
  );
}
