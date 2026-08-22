"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BadgeDollarSign,
  BookOpenCheck,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  ListChecks,
  Map,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Timer,
  Wheat,
  Zap} from "lucide-react";
import { site } from "@/config/site";
import { currentPagePath } from "@/config/pageRoutes";
import { HERO_SLIDES } from "@/lib/heroSlides";
import HeroCarousel from "./HeroCarousel";
import HeroProofCard from "./HeroProofCard";
import LiveSuccessVideos from "./LiveSuccessVideos";
import TemplateMotion from "./TemplateMotion";

const href = (path) => currentPagePath(path);

const PATHWAYS = [
  ["Permanent residence", "Express Entry & PR", "Build a stronger federal profile with CRS strategy, program fit and a clear plan.", "/immigration/express-entry", CompassIcon],
  ["PNP pathways", "Provincial nominees", "Compare provinces and nomination streams before you commit to a route.", "/immigration/pnp", MapPin],
  ["Work in Canada", "Work permits", "Explore employer-specific, open work permit and LMIA-supported options.", "/immigration/work-permit", BriefcaseBusiness],
  ["Study to settle", "Study permits", "Plan your study permit, school choice and post-graduation pathway together.", "/immigration/study-permit", GraduationCap],
  ["Bring family closer", "Family sponsorship", "Understand spousal, partner, parent and dependent-child sponsorship routes.", "/immigration/family-sponsorship", HeartHandshake],
  ["A better next step", "Refusals & appeals", "Turn refusal reasons, GCMS notes and procedural fairness letters into a plan.", "/appeals/canada-visa-refusal-help", ShieldCheck]];

const SERVICES = [
  ["FSW, CEC and FST, plus CRS strategy and category-based draws.", "Express Entry & PR", "/immigration/express-entry", BadgeCheck],
  ["PGWP, employer-specific and open permits, spousal permits and restoration.", "Work permits", "/work-study/canada-work-permit", BriefcaseBusiness],
  ["DLI planning, PAL where required, study plans and post-graduation pathways.", "Study permits", "/work-study/canada-study-permit", GraduationCap],
  ["Spousal, partner, parent and dependent-child sponsorship routes.", "Family sponsorship", "/sponsor-status/family-sponsorship-canada", HeartHandshake],
  ["TRVs, eTA, business visitors and Super Visa preparation.", "Visitor, eTA & Super Visa", "/work-study/canada-visitor-visa", MapPin],
  ["Start-up Visa, self-employed pathways and provincial entrepreneur streams.", "Business immigration", "/immigration/canada-business-immigration", BadgeDollarSign],
  ["Expired permits, overstays and regaining status where IRCC allows.", "Restoration & status", "/sponsor-status/pr-card-renewal-canada", ShieldCheck],
  ["GCMS, procedural fairness responses, reapplications, appeals and review referrals.", "Refusals & PFL", "/appeals/canada-visa-refusal-help", BookOpenCheck],
  ["PR card renewals, PRTD, residency obligations and citizenship.", "PR card & citizenship", "/sponsor-status/canadian-citizenship-application", BadgeCheck]];

const GUIDE_ITEMS = [
  ["Immigration hub", "Every PR, temporary and citizenship route indexed consistently across the site.", "/immigration/canadian-immigration-pathways"],
  ["Provinces & territories", "Compare streams from British Columbia to the Atlantic before choosing a province.", "/immigration/provincial-nominee-program-canada"],
  ["Express Entry", "Understand CRS, the three federal programs and category-based draws.", "/immigration/express-entry-canada"],
  ["Calculators", "Use CRS, FSW 67 and provincial tools before paying filing fees.", "/tools/canada-immigration-calculators"],
  ["Employers · HGT", "Explore LMIA, GTS, recruitment and compliance through one employer journey.", "/employers/employer-immigration-services-canada"]];

const FAQS = [
  ["What does a licensed RCIC help with?", "A licensed Regulated Canadian Immigration Consultant can assess eligibility, develop strategy, prepare or review documentation, represent a client where authorized, and help respond when a file becomes complex."],
  ["Which pathway should I review first?", "Begin with your goal: permanent residence, a provincial nomination, work, study, family sponsorship, temporary entry or a refusal response. The pathway cards above give you the right starting point."],
  ["What is the best next step for my situation?", "Use the free tools to understand the broad route, then book a tailored review when your history, documents, employer situation or deadline requires a strategy built around your specific file."]];

function CompassIcon(props) {
  return <Map {...props} />;
}

function TemplateLink({ children, path, className = "", ...props }) {
  return <Link href={href(path)} className={className} {...props}>{children}</Link>;
}

function SectionHeading({ eyebrow, title, lead, className = "" }) {
  return (
    <header className={`section-head reveal ${className}`.trim()}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {lead && <p>{lead}</p>}
    </header>
  );
}

function IconBox({ icon: Icon }) {
  return <span className="icon-box"><Icon width={22} height={22} aria-hidden="true" /></span>;
}

export default function ReferenceHomepage({ page, heroData }) {
  const pageDataTitle = heroData?.title || page?.h1;
  const pageDataLead = heroData?.leadBlock?.text || page?.seo?.description;
  const heroTitle = pageDataTitle || "Your Permanent Residence, Planned by a Licensed RCIC";
  const heroLead = pageDataLead || "No matter which door into Canada you are walking through, a single licensed team can plan it end to end.";

  return (
    <div className="cmg-template-home" data-concept="nocturne">
      <TemplateMotion />
      <section className="hero" aria-labelledby="hero-title">
        <div className="ambient a" aria-hidden="true" />
        <div className="ambient b" aria-hidden="true" />
        <HeroCarousel slides={HERO_SLIDES} showControls={false} className="hero-background-carousel" />
        <div className="hero-layout">
          <div className="hero-copy reveal in">
            <p className="eyebrow">Licensed Canadian immigration guidance</p>
            <h1 id="hero-title">{heroTitle}</h1>
            <p className="lead">{heroLead}</p>
            <div className="hero-actions">
              <TemplateLink path={site.ctas.primary.href} className="btn btn-primary">Book a Consultation <ArrowRight width={18} height={18} aria-hidden="true" /></TemplateLink>
              <TemplateLink path="/tools/crs-calculator" className="btn btn-secondary">Check your CRS <Calculator width={18} height={18} aria-hidden="true" /></TemplateLink>
            </div>
          </div>
          <div className="hero-visual reveal in">
            <HeroProofCard />
          </div>
        </div>
      </section>

      <section className="section" id="pathways">
        <div className="section-inner">
          <SectionHeading className="pathways-section-head" title="Choose the pathway that feels like yours" lead="The best immigration plan starts with the right question. Pick a goal and we will take you to the deeper guide, tools and next steps." />
          <div className="path-grid">
            {PATHWAYS.map(([overline, title, description, path, Icon], index) => (
              <TemplateLink key={title} path={path} className="path-card reveal" style={{ "--delay": `${index * 45}ms` }}>
                <span className="card-number">0{index + 1}</span>
                <IconBox icon={Icon} />
                <span className="overline">{overline}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="text-link">Explore pathway <ArrowUpRight width={18} height={18} aria-hidden="true" /></span>
              </TemplateLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="consultant">
        <div className="section-inner consultant-layout">
          <article className="consultant-panel reveal">
            <p className="eyebrow">Licensed RCIC · Canada-wide</p>
            <h2>Case Strategy Lead</h2>
            <p className="role">CICC-regulated guidance for complex Canadian immigration files</p>
            <ul className="expertise">
              {["Refusal, inadmissibility and deadline reviews", "Employer compliance and workforce planning", "Express Entry profile and document strategy", "Provincial pathway comparison across Canada", "Atlantic, western and prairie program research", "Procedural fairness and response planning"].map((item) => <li key={item}><CheckCircle2 width={17} height={17} aria-hidden="true" />{item}</li>)}
            </ul>
            <div className="profile-meta"><span>Canada-wide service</span><span>Evidence-led preparation</span><span>Plain-language guidance</span></div>
          </article>
          <aside className="quick-panel reveal">
            <p className="eyebrow">High-stakes files · Sharper strategy</p>
            <h3>Not sure which pathway fits?</h3>
            <p>Start with a free profile review, then decide what needs deeper strategy.</p>
            <div className="quick-links">
              {[["Book a consultation", site.ctas.primary.href], ["CRS Calculator", "/tools/crs-calculator-canada"], ["PNP Eligibility", "/tools/pnp-eligibility-canada"], ["NOC Finder", "/tools/noc-finder-canada"]].map(([label, path]) => <TemplateLink key={label} path={path}>{label}<ArrowUpRight width={17} height={17} aria-hidden="true" /></TemplateLink>)}
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-inner">
          <SectionHeading eyebrow="Choose who we are helping today" title="One team for every stage of the journey" lead="Apply as an individual, with your family or on behalf of a company. Each route opens into in-depth guidance, practical tools and a defined next step." />
          <div className="service-grid">
            {SERVICES.map(([description, title, path, Icon], index) => <TemplateLink key={title} path={path} className="service-card reveal" style={{ "--delay": `${index * 45}ms` }}><IconBox icon={Icon} /><h3>{title}</h3><p>{description}</p><ArrowUpRight width={18} height={18} aria-hidden="true" /></TemplateLink>)}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="section-inner guide-layout">
          <div className="guide-image reveal"><Image src="/images/pages/toronto-skyline.webp" alt="Toronto skyline from a Canadian autumn park" fill sizes="(max-width: 880px) 100vw, 40vw" /></div>
          <div className="guide-copy">
            <SectionHeading eyebrow="Plan your pathway" title="Read the guides, then decide" lead="The service grid is designed for quick entry. These deeper hubs show how programs fit together—so you already know the right questions when you book." />
            <ol className="guide-list">
              {GUIDE_ITEMS.map(([title, description, path], index) => <li key={title} className="reveal" style={{ "--delay": `${index * 45}ms` }}><span>0{index + 1}</span><div><strong>{title}</strong><p>{description}</p></div><TemplateLink path={path} aria-label={`Open ${title}`}><ArrowUpRight width={18} height={18} aria-hidden="true" /></TemplateLink></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="section-inner eligibility-layout">
          <div className="eligibility-copy reveal"><p className="eyebrow">Free eligibility snapshot</p><h2>See how your profile fits Canadian programs</h2><p>Answer a few short questions and see where your profile stands against Express Entry, PNPs, work and study permits, and visitor routes.</p><div className="feature-list">{[["CRS & eligibility", "Understand broad program fit."], ["Pathway match", "Surface routes worth researching."], ["Free to use", "No obligation to begin."], ["Clear next steps", "Know what to prepare next."]].map(([title, description]) => <div className="feature" key={title}><strong>{title}</strong><small>{description}</small></div>)}</div></div>
          <article className="eligibility-card reveal"><div className="card-top"><div><span>Profile snapshot</span><h3>Pathway readiness</h3></div><div className="score-ring"><strong>72%</strong></div></div><div className="snapshot">{[["Express Entry foundation", "Review", BadgeCheck], ["Provincial options", "Explore", Map], ["Work pathway", "Compare", BriefcaseBusiness], ["Study route", "Plan", GraduationCap]].map(([label, status, Icon]) => <div key={label}><Icon width={20} height={20} aria-hidden="true" />{label}<span>{status}</span></div>)}</div></article>
        </div>
      </section>

      <section className="section dark" id="refusals">
        <div className="section-inner refusal-layout"><div className="refusal-copy reveal"><p className="eyebrow">When the file gets complicated</p><h2>Refusals and procedural fairness are not the end of the line</h2><p>Officers decide on the file they see. We isolate the stated concerns and build evidence-backed replies, reapplications or appeal paths.</p><div className="quote">“A refusal is often a presentation problem. We fix the presentation.”</div></div><div className="refusal-grid">{[["Visitor visa refused", "Ties, funds or purpose—we strengthen the evidence and narrative.", MapPin], ["Study permit refused", "Study plan, finances or program fit—we identify and repair the gaps.", BookOpenCheck], ["Sponsorship refused", "Genuineness or eligibility—we organize the proof around the concern.", HeartHandshake], ["Procedural fairness", "Short deadlines require a focused, evidence-backed reply and clear ownership.", Timer]].map(([title, description, Icon], index) => <article className="refusal-card reveal" key={title} style={{ "--delay": `${index * 60}ms` }}><IconBox icon={Icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></div>
      </section>

      <LiveSuccessVideos />

      <section className="section dark" id="employers"><div className="section-inner employer-layout"><div className="employer-copy reveal"><p className="eyebrow">For Canadian employers</p><h2>Canada’s employer immigration specialists</h2><p>LMIA, Global Talent Stream, ESDC compliance and employer-side provincial representation—structured around defensible files and audit readiness.</p><div className="employer-stat"><strong data-count="500">500<span>+</span></strong><span>LMIAs filed across streams</span></div></div><div className="employer-grid">{[["High- & low-wage LMIA", "Full LMIA strategy and documentation support across wage levels.", BadgeDollarSign], ["Global Talent Stream", "Expedited employer pathways for eligible tech and in-demand roles.", Zap], ["Agricultural LMIA", "Seasonal and year-round agricultural stream preparation.", Wheat], ["ESDC compliance", "Audit readiness, employer obligations and TFWP integrity.", ShieldCheck]].map(([title, description, Icon], index) => <article className="employer-card reveal" key={title} style={{ "--delay": `${index * 60}ms` }}><IconBox icon={Icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="section alt"><div className="section-inner"><SectionHeading eyebrow="How it works" title="A sharper plan changes the outcome" lead="Understand the issue, shape the evidence, protect the deadline and choose the route that fits the file." /><div className="process-grid">{[["Diagnose", "Identify what the decision-maker actually needs to see."], ["Build", "Organize facts, documents and explanations around the concern."], ["Protect", "Assign ownership and move before a procedural deadline closes."], ["Decide", "Reapply, appeal or seek review with a route shaped to the file."]].map(([title, description], index) => <article className="process-step reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="section" id="tools"><div className="section-inner"><SectionHeading eyebrow="Free tools, all in one place" title="Make your next decision with better numbers" lead="Start with an estimate, then bring the result into a focused immigration strategy when the situation requires it." /><div className="tool-grid">{[["CRS Calculator", "Estimate your Express Entry score.", "/tools/crs-calculator-canada", Calculator], ["PNP Eligibility", "Surface provincial pathways to research.", "/tools/pnp-eligibility-canada", Map], ["NOC Finder", "Identify your occupation classification.", "/tools/noc-finder-canada", Search], ["Document Checklist", "Organize requirements by pathway.", "/tools/document-checklist-canada", ListChecks], ["Free Assessment", "Start with a guided profile review.", "/assessment/free-canada-immigration-assessment", FileCheck2]].map(([title, description, path, Icon], index) => <TemplateLink path={path} key={title} className="homepage-tool-card reveal" style={{ "--delay": `${index * 45}ms` }}><span className="tool-index">0{index + 1}</span><IconBox icon={Icon} /><span><strong>{title}</strong><small>{description}</small></span><ArrowUpRight width={18} height={18} aria-hidden="true" /></TemplateLink>)}</div></div></section>

      <section className="cta-section" id="consultation"><div className="cta-shell"><div className="reveal"><h2>Not sure which pathway fits your profile?</h2><p>Our licensed consultants will review your profile and map the clearest route to your goal—without pressure.</p></div><TemplateLink path={site.ctas.primary.href} className="btn reveal">Book a Free Consultation <ArrowUpRight width={19} height={19} aria-hidden="true" /></TemplateLink></div></section>

      <section className="section"><div className="section-inner faq-shell"><div className="faq-intro reveal"><p className="eyebrow">Clear answers, before you decide</p><h2>Frequently asked questions</h2><p>Open a question to understand the context behind the pathway and what to check next.</p></div><div className="faq-list">{FAQS.map(([question, answer], index) => <details className="faq-item reveal" key={question} open={index === 0}><summary>{question}<span><Plus width={20} height={20} aria-hidden="true" /></span></summary><div><p>{answer}</p></div></details>)}</div></div></section>

    </div>
  );
}
