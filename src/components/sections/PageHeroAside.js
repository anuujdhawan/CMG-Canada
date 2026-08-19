import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { rebrand } from "@/components/templates/MarkdownBlocks";

const TOPIC_EXCLUSIONS = /frequently asked|related services|contact us|ready to|book a consultation/i;

function pageContext(path = "") {
  if (path.startsWith("/tools")) return "Free planning tools";
  if (path.startsWith("/employers")) return "Employer immigration guidance";
  if (path.startsWith("/refusals") || path.startsWith("/appeals")) return "Refusal and appeal guidance";
  if (path.startsWith("/about") || path.startsWith("/team")) return "Your licensed Canadian team";
  return "Licensed Canadian immigration guidance";
}

function shortTitle(value = "") {
  return rebrand(value)
    .replace(/\s*\|.*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pageTopics(page, title) {
  const headline = shortTitle(title || page?.h1).toLowerCase();
  return (page?.headingOutline || [])
    .filter((heading) => heading.level === 2 && heading.text && !TOPIC_EXCLUSIONS.test(heading.text))
    .map((heading) => shortTitle(heading.text))
    .filter((heading, index, all) => heading.toLowerCase() !== headline && all.indexOf(heading) === index)
    .slice(0, 2);
}

export default function PageHeroAside({ page, title }) {
  const isHomepage = page?.path === "/";
  const context = pageContext(page?.path);
  const topics = pageTopics(page, title);
  const titleLabel = shortTitle(title || page?.h1 || "your immigration plan");
  const description = rebrand(page?.seo?.description || "Use this guide to understand the route, prepare the right evidence and choose a sensible next step.");

  return (
    <aside className="homepage-hero__aside page-hero-aside" aria-label={isHomepage ? "Why work with CMG" : `${titleLabel} page summary`}>
      <div aria-hidden className="homepage-hero__aside-orb" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="homepage-hero__aside-badge">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            CICC-regulated
          </span>
          <span className="homepage-hero__aside-location">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Canada-wide
          </span>
        </div>

        {isHomepage ? (
          <>
            <p className="mt-8 max-w-[18rem] font-serif text-[1.65rem] font-bold leading-tight text-navy-dark sm:text-[1.9rem]">
              A calmer start to a complicated journey.
            </p>
            <p className="mt-3 max-w-[23rem] text-sm leading-relaxed text-muted">
              Begin with a clear route, practical guidance and a licensed team who can stay with your file from first question to final decision.
            </p>
            <div className="homepage-hero__aside-stats mt-8">
              <div>
                <strong>15+</strong>
                <span>years of team experience</span>
              </div>
              <div>
                <Clock className="h-5 w-5 text-primary" aria-hidden />
                <span>Clear next steps, not guesswork</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="page-hero-aside__context mt-8">{context}</p>
            <p className="mt-2 max-w-[22rem] font-serif text-[1.5rem] font-bold leading-tight text-navy-dark sm:text-[1.75rem]">
              A clearer plan for {titleLabel}.
            </p>
            <p className="page-hero-aside__description mt-3 max-w-[23rem] text-sm leading-relaxed text-muted">
              {description}
            </p>

            {topics.length > 0 && (
              <div className="page-hero-aside__topics mt-6">
                <p>Inside this guide</p>
                <ul>
                  {topics.map((topic) => (
                    <li key={topic}>
                      <span aria-hidden />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="homepage-hero__aside-stats mt-6">
              <div>
                <strong>{topics.length || "1"}</strong>
                <span>{topics.length === 1 ? "key section in this guide" : "key sections in this guide"}</span>
              </div>
              <div>
                <Clock className="h-5 w-5 text-primary" aria-hidden />
                <span>Clear next steps, not guesswork</span>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
