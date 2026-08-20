import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, FileCheck2, ShieldCheck, Target, Timer } from "lucide-react";
import { currentPagePath } from "@/config/pageRoutes";
import { site } from "@/config/site";
import { getServiceHeroSlide, HERO_SLIDES } from "@/lib/heroSlides";
import { Block, parseBlocks, rebrand } from "@/components/templates/MarkdownBlocks";
import HeroCarousel from "./HeroCarousel";
import ReferenceFooter from "./ReferenceFooter";
import TemplateMotion from "./TemplateMotion";

const href = (path) => currentPagePath(path);

function TemplateLink({ children, path, className = "", ...props }) {
  return <Link href={href(path)} className={className} {...props}>{children}</Link>;
}

function ServiceSectionHeading({ eyebrow, title, lead }) {
  return (
    <header className="section-head reveal">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      {lead && <p>{lead}</p>}
    </header>
  );
}

function getLead(page, blocks) {
  const heroBlocks = parseBlocks(page.hero || "");
  return rebrand(heroBlocks.find((block) => block.type === "paragraph")?.text || page.seo?.description || blocks.find((block) => block.type === "paragraph")?.text || "A clear, evidence-led plan for your Canadian immigration goal.");
}

export default function ReferenceServicePage({ page, children }) {
  const blocks = parseBlocks(page.content || "");
  const slide = getServiceHeroSlide(page.path);
  const headings = blocks.filter((block) => block.type === "heading" && block.level >= 2).slice(0, 5);
  const lead = getLead(page, blocks);
  const title = rebrand(page.h1);

  return (
    <div className="cmg-template-home cmg-template-service" data-concept="nocturne">
      <TemplateMotion />
      <section className="hero service-hero" aria-labelledby="service-hero-title">
        <div className="ambient a" aria-hidden="true" />
        <div className="ambient b" aria-hidden="true" />
        <HeroCarousel slides={[slide || HERO_SLIDES[0]]} showControls={false} className="hero-background-carousel" />
        <div className="hero-layout">
          <div className="hero-copy reveal in">
            <p className="eyebrow">Licensed Canadian immigration guidance</p>
            <h1 id="service-hero-title">{title}</h1>
            <p className="lead">{lead}</p>
            <div className="hero-actions">
              <TemplateLink path={site.ctas.primary.href} className="btn btn-primary">Book a Consultation <ArrowRight width={18} height={18} aria-hidden="true" /></TemplateLink>
              <TemplateLink path={site.ctas.assessment.href} className="btn btn-secondary">Free Assessment <ArrowUpRight width={18} height={18} aria-hidden="true" /></TemplateLink>
            </div>
            <div className="hero-trust"><span className="trust-chip"><ShieldCheck width={16} height={16} aria-hidden="true" /> CICC-regulated</span><span className="trust-chip"><Target width={16} height={16} aria-hidden="true" /> Strategy-led</span><span className="trust-chip"><Timer width={16} height={16} aria-hidden="true" /> Clear next steps</span></div>
          </div>
          <div className="hero-visual reveal in" aria-label="Service pathway overview">
            <article className="visual-card"><div className="mini-badges"><span className="mini-badge"><ShieldCheck width={15} height={15} aria-hidden="true" /> CICC-regulated</span><span className="mini-badge">{slide?.label || "Canada-wide support"}</span></div><h2>One route. One owner. A clearer file.</h2><p>We connect your goal, evidence and deadline into one service plan.</p><div className="visual-stats"><div><strong>01</strong><small>Understand<br />the file</small></div><div><CheckCircle2 width={24} height={24} aria-hidden="true" /><small>Move with<br />confidence</small></div></div></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <ServiceSectionHeading eyebrow="A sharper service plan" title="Built around the decision your file needs" lead="The right service is more than a checklist. It is a sequence that turns your facts into a coherent, review-ready pathway." />
          <div className="service-grid">
            {[['Diagnose', 'Start with the facts, goals, history and deadlines that shape the route.', Target], ['Build', 'Organize evidence, explanations and forms around the decision-maker’s concern.', FileCheck2], ['Protect', 'Keep ownership, communication and the next deadline visible from start to finish.', ShieldCheck]].map(([heading, description, Icon], index) => <article className="service-card reveal" key={heading} style={{ '--delay': `${index * 60}ms` }}><span className="icon-box"><Icon width={22} height={22} aria-hidden="true" /></span><h3>{heading}</h3><p>{description}</p><ArrowUpRight width={18} height={18} aria-hidden="true" /></article>)}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="section-inner service-route-layout">
          <div className="service-route-copy reveal"><p className="eyebrow">What this service covers</p><h2>Read the detail, then choose the next step</h2><p>Use the guide below to understand the route before you book. Your existing page content remains the source of truth; this surface gives it the same visual hierarchy as the reference homepage.</p><TemplateLink path={site.ctas.primary.href} className="btn btn-primary">Talk through your file <ArrowUpRight width={18} height={18} aria-hidden="true" /></TemplateLink></div>
          <ol className="guide-list service-route-list">{headings.map((heading, index) => <li className="reveal" key={`${heading.text}-${index}`} style={{ '--delay': `${index * 50}ms` }}><span>0{index + 1}</span><div><strong>{rebrand(heading.text)}</strong><p>Open this section for the practical detail, evidence and requirements that shape the pathway.</p></div><ArrowUpRight width={18} height={18} aria-hidden="true" /></li>)}</ol>
        </div>
      </section>

      <section className="section service-reading-section">
        <div className="section-inner service-reading-shell">
          <ServiceSectionHeading eyebrow="Your service guide" title="The details that move the file forward" lead="Review the complete guide below, then use the consultation path when your situation needs a tailored strategy." />
          <article className="service-reading reveal in">{blocks.map((block, index) => <Block key={`${block.type}-${index}`} block={block} />)}</article>
        </div>
      </section>

      {children && <section className="section alt service-interactive-section"><div className="section-inner service-interactive-shell"><ServiceSectionHeading eyebrow="Your next step" title="Turn the overview into a focused review" lead="Complete the guided form below and bring the result into a consultation when your situation needs tailored strategy." />{children}</div></section>}

      <section className="cta-section"><div className="cta-shell"><div><h2>Ready to make the next step clearer?</h2><p>Bring your questions, history and documents to a focused review with a licensed Canadian immigration team.</p></div><TemplateLink path={site.ctas.primary.href} className="btn">Book a Consultation <ArrowUpRight width={19} height={19} aria-hidden="true" /></TemplateLink></div></section>
      <ReferenceFooter />
    </div>
  );
}
