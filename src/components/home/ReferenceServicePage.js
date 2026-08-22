import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calculator, FileCheck2, Plus, ShieldCheck, Target } from "lucide-react";
import { currentPagePath } from "@/config/pageRoutes";
import { site } from "@/config/site";
import { HERO_SLIDES } from "@/lib/heroSlides";
import { getPageFaqs } from "@/lib/faqs";
import { Block, parseBlocks, rebrand } from "@/components/templates/MarkdownBlocks";
import HeroCarousel from "./HeroCarousel";
import HeroProofCard from "./HeroProofCard";
import ServiceImageGallery from "./ServiceImageGallery";
import ServiceContentImageFrame, { getServiceContentImages } from "./ServiceContentImageFrame";
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

function groupContentBlocks(blocks) {
  const leading = [];
  const sections = [];
  let current = null;

  blocks.forEach((block) => {
    if (block.type === "heading" && block.level === 2) {
      current = [block];
      sections.push(current);
      return;
    }
    if (current) current.push(block);
    else leading.push(block);
  });

  return { leading, sections };
}

function renderContentBlocks(blocks, prefix) {
  return blocks.map((block, index) => <Block key={`${prefix}-${block.type}-${index}`} block={block} />);
}

function isFaqSection(section) {
  return section.some((block) => block.type === "heading" && block.level === 2 && /faq|questions people ask|frequently asked/i.test(block.text));
}

function ServiceFaqSection({ page }) {
  const faqs = getPageFaqs(page);
  if (faqs.length === 0) return null;

  return (
    <section className="section tool-faq-section" id="faq" aria-labelledby="tool-faq-title">
      <div className="section-inner faq-shell">
        <div className="faq-intro reveal">
          <p className="eyebrow">Clear answers, before you decide</p>
          <h2 id="tool-faq-title">Frequently asked questions</h2>
          <p>Open a question to understand what the tool can show, what it cannot decide and what to check next.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item reveal" key={faq.question} open={index === 0}>
              <summary>{faq.question}<span><Plus width={20} height={20} aria-hidden="true" /></span></summary>
              <div><p>{faq.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ReferenceServicePage({ page, children }) {
  const blocks = parseBlocks(page.content || "");
  const isToolPage = page.path.startsWith("/tools/") || page.path === "/assessment/free-canada-immigration-assessment";
  const lead = getLead(page, blocks);
  const title = rebrand(page.h1);
  const { leading, sections: allSections } = groupContentBlocks(blocks);
  const sections = isToolPage ? allSections.filter((section) => !isFaqSection(section)) : allSections;
  const headings = sections.flat().filter((block) => block.type === "heading" && block.level >= 2).slice(0, 5);
  const contentImages = getServiceContentImages(page);
  const firstImageSection = sections.length > 1 ? 1 : 0;
  const secondImageSection = sections.length > 3 ? 3 : Math.min(2, Math.max(sections.length - 1, 0));

  return (
    <div className="cmg-template-home cmg-template-service" data-concept="nocturne">
      <TemplateMotion />
      <section className="hero service-hero" aria-labelledby="service-hero-title">
        <div className="ambient a" aria-hidden="true" />
        <div className="ambient b" aria-hidden="true" />
        <HeroCarousel slides={HERO_SLIDES} showControls={false} className="hero-background-carousel" />
        <div className="hero-layout">
          <div className="hero-copy reveal in">
            <p className="eyebrow">Licensed Canadian immigration guidance</p>
            <h1 id="service-hero-title">{title}</h1>
            <p className="lead">{lead}</p>
            <div className="hero-actions">
              <TemplateLink path={site.ctas.primary.href} className="btn btn-primary">Book a Consultation <ArrowRight width={18} height={18} aria-hidden="true" /></TemplateLink>
              <TemplateLink path="/tools/crs-calculator" className="btn btn-secondary">Check your CRS <Calculator width={18} height={18} aria-hidden="true" /></TemplateLink>
            </div>
          </div>
          <div className="hero-visual reveal in">
            <HeroProofCard ariaLabel="Track record and files we handle" />
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

      <ServiceImageGallery page={page} />

      <section className="section alt">
        <div className="section-inner service-route-layout">
          <div className="service-route-copy reveal"><p className="eyebrow">What this service covers</p><h2>Read the detail, then choose the next step</h2><p>Use the guide below to understand the route before you book. Your existing page content remains the source of truth; this surface gives it the same visual hierarchy as the reference homepage.</p><TemplateLink path={site.ctas.primary.href} className="btn btn-primary">Talk through your file <ArrowUpRight width={18} height={18} aria-hidden="true" /></TemplateLink></div>
          <ol className="guide-list service-route-list">{headings.map((heading, index) => <li className="reveal" key={`${heading.text}-${index}`} style={{ '--delay': `${index * 50}ms` }}><span>0{index + 1}</span><div><strong>{rebrand(heading.text)}</strong><p>Open this section for the practical detail, evidence and requirements that shape the pathway.</p></div><ArrowUpRight width={18} height={18} aria-hidden="true" /></li>)}</ol>
        </div>
      </section>

      <section className="section service-reading-section">
        <div className="section-inner service-reading-shell">
          <ServiceSectionHeading eyebrow="Your service guide" title="The details that move the file forward" lead="Review the complete guide below, then use the consultation path when your situation needs a tailored strategy." />
          <article className="service-reading reveal in">
            {renderContentBlocks(leading, "leading")}
            {sections.map((section, index) => {
              if (index === firstImageSection) {
                return <ServiceContentImageFrame key={`image-frame-${index}`} image={contentImages[0]} side="left">{renderContentBlocks(section, `frame-left-${index}`)}</ServiceContentImageFrame>;
              }
              if (index === secondImageSection && secondImageSection !== firstImageSection) {
                return <ServiceContentImageFrame key={`image-frame-${index}`} image={contentImages[1]} side="right">{renderContentBlocks(section, `frame-right-${index}`)}</ServiceContentImageFrame>;
              }
              return <div className="service-content-full-width" key={`content-section-${index}`}>{renderContentBlocks(section, `full-${index}`)}</div>;
            })}
            {secondImageSection === firstImageSection && <ServiceContentImageFrame image={contentImages[1]} side="right"><p>When the route needs a second perspective, a focused review helps connect the facts, evidence and next decision.</p></ServiceContentImageFrame>}
          </article>
        </div>
      </section>

      {children && <section className="section alt service-interactive-section"><div className="section-inner service-interactive-shell"><ServiceSectionHeading eyebrow="Your next step" title="Turn the overview into a focused review" lead="Complete the guided form below and bring the result into a consultation when your situation needs tailored strategy." />{children}</div></section>}

      {isToolPage && <ServiceFaqSection page={page} />}

      <section className="cta-section"><div className="cta-shell"><div><h2>Ready to make the next step clearer?</h2><p>Bring your questions, history and documents to a focused review with a licensed Canadian immigration team.</p></div><TemplateLink path={site.ctas.primary.href} className="btn">Book a Consultation <ArrowUpRight width={19} height={19} aria-hidden="true" /></TemplateLink></div></section>

      <section className="service-transition-section" aria-labelledby="service-transition-title">
        <div className="service-transition-shell">
          <div className="service-transition-copy">
            <p className="eyebrow">Keep exploring your pathway</p>
            <h2 id="service-transition-title">Make the next decision with better context</h2>
            <p>Use a free tool to pressure-test the route, or return to the pathway library when you are ready to compare options.</p>
          </div>
          <nav className="service-transition-links" aria-label="Continue exploring">
            <TemplateLink path={site.ctas.tools.href} className="service-transition-link">
              <span><strong>Explore free tools</strong><small>Start with practical numbers and checklists.</small></span>
              <ArrowUpRight width={18} height={18} aria-hidden="true" />
            </TemplateLink>
            <TemplateLink path="/" className="service-transition-link">
              <span><strong>View all pathways</strong><small>Compare immigration routes and services.</small></span>
              <ArrowUpRight width={18} height={18} aria-hidden="true" />
            </TemplateLink>
          </nav>
        </div>
      </section>
    </div>
  );
}
