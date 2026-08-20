import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { currentPagePath } from "@/config/pageRoutes";
import { HERO_SLIDES } from "@/lib/heroSlides";
import { getBlogGroups } from "@/lib/blog";
import BlogCategoryTabs from "./BlogCategoryTabs";
import HeroCarousel from "@/components/home/HeroCarousel";
import ReferenceFooter from "@/components/home/ReferenceFooter";
import TemplateMotion from "@/components/home/TemplateMotion";

function TemplateLink({ children, path, className = "", ...props }) {
  return <Link href={currentPagePath(path)} className={className} {...props}>{children}</Link>;
}

export default function BlogIndexPage({ page }) {
  const groups = getBlogGroups();
  const postCount = groups.reduce((total, group) => total + group.posts.length, 0);
  const description = page?.seo?.description || "Clear, current Canadian immigration guidance for the decision in front of you.";

  return (
    <div className="cmg-template-home cmg-template-blog" data-concept="nocturne">
      <TemplateMotion />

      <section className="hero reference-blog-hero" aria-labelledby="blog-hero-title">
        <div className="ambient a" aria-hidden="true" />
        <div className="ambient b" aria-hidden="true" />
        <HeroCarousel slides={HERO_SLIDES} showControls={false} className="hero-background-carousel" />
        <div className="hero-layout">
          <div className="hero-copy reveal in">
            <p className="eyebrow">CMG insights · Canada immigration</p>
            <h1 id="blog-hero-title">Research the route.<br />Then decide.</h1>
            <p className="lead">{description}</p>
            <div className="hero-actions">
              <TemplateLink path={site.ctas.primary.href} className="btn btn-primary">
                Book a Consultation
                <ArrowRight width={18} height={18} aria-hidden="true" />
              </TemplateLink>
              <TemplateLink path={site.ctas.tools.href} className="btn btn-secondary">
                Explore free tools
                <ArrowUpRight width={18} height={18} aria-hidden="true" />
              </TemplateLink>
            </div>
            <div className="hero-trust" aria-label="Blog highlights">
              <span className="trust-chip"><ShieldCheck width={16} height={16} aria-hidden="true" /> Licensed RCIC insight</span>
              <span className="trust-chip"><BookOpen width={16} height={16} aria-hidden="true" /> {postCount} practical guides</span>
              <span className="trust-chip"><ArrowRight width={16} height={16} aria-hidden="true" /> Clear next steps</span>
            </div>
          </div>

          <div className="hero-visual reveal in" aria-label="Blog library overview">
            <article className="visual-card">
              <div className="mini-badges">
                <span className="mini-badge"><BookOpen width={15} height={15} aria-hidden="true" /> Research library</span>
                <span className="mini-badge">{groups.length} pathway categories</span>
              </div>
              <h2>Start with the question. Leave with a clearer next step.</h2>
              <p>Browse by pathway, then open the guide that matches your goal, timeline or concern.</p>
              <div className="visual-stats">
                <div><strong data-count={postCount}>{postCount}</strong><small>guides to<br />explore</small></div>
                <div><ShieldCheck width={24} height={24} aria-hidden="true" /><small>Evidence-led<br />research</small></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section reference-blog-library" id="articles">
        <div className="section-inner">
          <header className="section-head reference-blog-library__head reveal">
            <div>
              <p className="eyebrow">All articles</p>
              <h2>Guides grouped around your next decision</h2>
            </div>
            <p>Follow the category that fits your current question, then use the article as a starting point for a more focused review.</p>
          </header>

          <BlogCategoryTabs groups={groups} />
        </div>
      </section>

      <section className="cta-section reference-blog-cta">
        <div className="cta-shell">
          <div>
            <h2>Ready to make the research personal?</h2>
            <p>Bring the guide that caught your attention, your questions and your timeline to a focused consultation with a licensed Canadian immigration team.</p>
          </div>
          <TemplateLink path={site.ctas.primary.href} className="btn">
            Book a Consultation
            <ArrowUpRight width={19} height={19} aria-hidden="true" />
          </TemplateLink>
        </div>
      </section>

      <ReferenceFooter />
    </div>
  );
}
