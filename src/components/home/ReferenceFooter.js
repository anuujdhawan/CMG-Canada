"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Mail, Phone, MapPin, Sparkles, ExternalLink } from "lucide-react";
import { site } from "@/config/site";
import { currentPagePath } from "@/config/pageRoutes";
import { socialIcons } from "@/components/ui/SocialIcons";

const href = (path) => currentPagePath(path);

function TemplateLink({ children, path, ...props }) {
  return (
    <Link href={href(path)} {...props}>
      <span>{children}</span>
      <ArrowUpRight size={11} className="reference-footer__link-arrow" aria-hidden />
    </Link>
  );
}

const SOCIAL_KEYS = ["linkedin", "facebook", "instagram", "youtube"];

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

export default function ReferenceFooter() {
  const socialLinks = SOCIAL_KEYS.filter((k) => site.social[k]);
  return (
    <footer className="reference-footer">
      <div className="reference-footer__accent" aria-hidden />
      <div className="reference-footer__bg" aria-hidden>
        <div className="reference-footer__pattern" />
        <div className="reference-footer__orb reference-footer__orb--a" />
        <div className="reference-footer__orb reference-footer__orb--b" />
      </div>

      <div className="reference-footer__inner">
        <div className="reference-footer__grid">
          <div className="reference-footer__brand">
            <Link href={href("/")} className="reference-footer__logo" aria-label={`${site.name} home`}>
              <Image className="reference-footer__logo-image" src={site.logos.footer} alt={site.name} width={1912} height={1140} />
            </Link>
            <p className="reference-footer__desc">
              CICC-regulated licensed RCICs serving clients across Canada — Express Entry, PNPs, employer files, work and study permits, family sponsorship and refusals.
            </p>
            <span className="reference-footer__license">
              <span className="reference-footer__license-icon">
                <ShieldCheck size={13} aria-hidden />
              </span>
              Licensed RCIC {site.rcic.number} · CICC-Regulated
            </span>

            <div className="reference-footer__contact">
              <a href={site.emailHref} className="reference-footer__contact-link">
                <Mail size={12} aria-hidden /> {site.email}
              </a>
              <a href={site.phoneHref} className="reference-footer__contact-link">
                <Phone size={12} aria-hidden /> {site.phone}
              </a>
              <span className="reference-footer__contact-link reference-footer__contact-link--muted">
                <MapPin size={12} aria-hidden /> {site.address.full}
              </span>
            </div>

            <div className="reference-footer__actions">
              <TemplateLink path={site.ctas.primary.href} className="reference-footer__cta">
                <Sparkles size={13} aria-hidden /> Book consultation
              </TemplateLink>
              {socialLinks.length > 0 && (
                <div className="reference-footer__social">
                  {socialLinks.map((key) => {
                    const Icon = socialIcons[key];
                    if (!Icon) return null;
                    return (
                      <a key={key} href={site.social[key]} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on ${key}`} className="reference-footer__social-link">
                        <Icon className="h-[14px] w-[14px]" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <nav className="reference-footer__col" aria-label="Immigrate">
            <h3>
              <span className="reference-footer__col-line" aria-hidden />
              Immigrate
            </h3>
            <TemplateLink path="/immigration/express-entry">Express Entry</TemplateLink>
            <TemplateLink path="/immigration/pnp">Provincial nominees</TemplateLink>
            <TemplateLink path="/immigration/canada-business-immigration">Business immigration</TemplateLink>
            <TemplateLink path="/appeals/canada-visa-refusal-help">Refusals &amp; appeals</TemplateLink>
          </nav>

          <nav className="reference-footer__col" aria-label="Work and Study">
            <h3>
              <span className="reference-footer__col-line" aria-hidden />
              Work &amp; Study
            </h3>
            <TemplateLink path="/work-study/canada-work-permit">Work permits</TemplateLink>
            <TemplateLink path="/work-study/canada-study-permit">Study permits</TemplateLink>
            <TemplateLink path="/work-study/canada-visitor-visa">Visitor &amp; Super Visa</TemplateLink>
            <TemplateLink path="/for-employers/lmia">LMIA &amp; GTS</TemplateLink>
          </nav>

          <nav className="reference-footer__col" aria-label="Contact">
            <h3>
              <span className="reference-footer__col-line" aria-hidden />
              Contact
            </h3>
            <TemplateLink path={site.ctas.primary.href}>Book consultation</TemplateLink>
            <a href={site.emailHref} className="reference-footer__plain-link">
              <span>{site.email}</span>
              <ExternalLink size={11} className="reference-footer__link-arrow" aria-hidden />
            </a>
            <a href={site.phoneHref} className="reference-footer__plain-link">
              <span>{site.phone}</span>
              <ExternalLink size={11} className="reference-footer__link-arrow" aria-hidden />
            </a>
          </nav>

          <div className="reference-footer__trust">
            <div className="reference-footer__trust-label">
              <span className="reference-footer__trust-line" aria-hidden />
              <span>Regulated &amp; Recognised By</span>
              <span className="reference-footer__trust-line" aria-hidden />
            </div>
            <div className="reference-footer__trust-grid">
              {REGULATORY_BODIES.map((body) => (
                <a
                  key={body.name}
                  href={body.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-footer__trust-card"
                >
                  <span className="reference-footer__trust-card-icon">
                    <ExternalLink size={14} aria-hidden />
                  </span>
                  <span className="reference-footer__trust-card-name">{body.name}</span>
                  <span className="reference-footer__trust-card-full">{body.full}</span>
                  <span className="reference-footer__trust-card-sub">{body.sub}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="reference-footer__bottom">
          <span className="reference-footer__copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <nav className="reference-footer__legal" aria-label="Legal">
            <a href={site.legal.privacy.href}>{site.legal.privacy.label}</a>
            <span aria-hidden>·</span>
            <a href={site.legal.terms.href}>{site.legal.terms.label}</a>
            <span aria-hidden>·</span>
            <a href={site.legal.disclaimer.href}>{site.legal.disclaimer.label}</a>
          </nav>
          <span className="reference-footer__disclaimer">General information only. Immigration outcomes depend on individual circumstances and current IRCC requirements.</span>
        </div>
      </div>
    </footer>
  );
}
