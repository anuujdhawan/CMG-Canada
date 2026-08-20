"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { currentPagePath } from "@/config/pageRoutes";

const href = (path) => currentPagePath(path);

function TemplateLink({ children, path, ...props }) {
  return <Link href={href(path)} {...props}>{children}</Link>;
}

export default function ReferenceFooter() {
  return (
    <>
      <footer className="reference-footer">
        <div className="reference-footer__grid">
          <div className="reference-footer__brand">
            <Link href={href("/")} className="reference-footer__logo" aria-label={`${site.name} home`}>
              <Image className="reference-footer__logo-image" src={site.logos.footer} alt={site.name} width={1912} height={1140} />
            </Link>
            <p>CICC-regulated licensed RCICs serving clients across Canada—Express Entry, PNPs, employer files, work and study permits, family sponsorship and refusals.</p>
            <span className="reference-footer__license"><ShieldCheck width={16} height={16} aria-hidden="true" /> Licensed RCIC {site.rcic.number} · CICC-Regulated</span>
          </div>
          <nav className="reference-footer__col" aria-label="Immigrate"><h3>Immigrate</h3><TemplateLink path="/immigration/express-entry">Express Entry</TemplateLink><TemplateLink path="/immigration/pnp">Provincial nominees</TemplateLink><TemplateLink path="/immigration/canada-business-immigration">Business immigration</TemplateLink><TemplateLink path="/appeals/canada-visa-refusal-help">Refusals &amp; appeals</TemplateLink></nav>
          <nav className="reference-footer__col" aria-label="Work and Study"><h3>Work &amp; Study</h3><TemplateLink path="/work-study/canada-work-permit">Work permits</TemplateLink><TemplateLink path="/work-study/canada-study-permit">Study permits</TemplateLink><TemplateLink path="/work-study/canada-visitor-visa">Visitor &amp; Super Visa</TemplateLink><TemplateLink path="/employers/employer-immigration-services-canada">Employer services</TemplateLink></nav>
          <nav className="reference-footer__col" aria-label="Contact"><h3>Contact</h3><TemplateLink path={site.ctas.primary.href}>Book consultation</TemplateLink><a href={site.emailHref}>{site.email}</a><a href={site.phoneHref}>{site.phone}</a><a href={site.ctas.login.href} target="_blank" rel="noopener noreferrer">Client login</a></nav>
        </div>
        <div className="reference-footer__bottom"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span><span>General information only. Immigration outcomes depend on individual circumstances and current requirements.</span></div>
      </footer>
    </>
  );
}
