import {
  Briefcase,
  Calculator,
  Compass,
  FileCheck,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentPagePath } from "@/config/pageRoutes";
import PathwayCard from "@/components/cards/PathwayCard";

const HOME_PATHWAYS = [
  {
    label: "Express Entry & PR",
    eyebrow: "Permanent residence",
    description: "Build a stronger federal profile with CRS strategy, program fit and a clear plan.",
    href: "/immigration/express-entry",
    icon: Compass,
  },
  {
    label: "Provincial nominees",
    eyebrow: "PNP pathways",
    description: "Compare provinces and nomination streams before you commit to a route.",
    href: "/immigration/pnp",
    icon: MapPin,
  },
  {
    label: "Work permits",
    eyebrow: "Work in Canada",
    description: "Explore employer-specific, open work permit and LMIA-supported options.",
    href: "/immigration/work-permit",
    icon: Briefcase,
  },
  {
    label: "Study permits",
    eyebrow: "Study to settle",
    description: "Plan your study permit, school choice and post-graduation pathway together.",
    href: "/immigration/study-permit",
    icon: GraduationCap,
  },
  {
    label: "Family sponsorship",
    eyebrow: "Bring family closer",
    description: "Understand spousal, partner, parent and dependent-child sponsorship routes.",
    href: "/immigration/family-sponsorship",
    icon: Heart,
  },
  {
    label: "Refusals & appeals",
    eyebrow: "A better next step",
    description: "Turn refusal reasons, GCMS notes and procedural fairness letters into a plan.",
    href: "/refusals",
    icon: ShieldCheck,
  },
];

const PAGE_PATHWAYS = [
  {
    label: "Check your eligibility",
    eyebrow: "Start with clarity",
    description: "Use a quick profile check to see which Canadian routes deserve your attention.",
    href: "/tools",
    icon: Compass,
  },
  {
    label: "Compare programs",
    eyebrow: "Choose the route",
    description: "Move from a broad goal to the program and province that best fit your situation.",
    href: "/immigration/pnp",
    icon: Search,
  },
  {
    label: "Prepare your documents",
    eyebrow: "Build the file",
    description: "Get organised early with practical checklists for the next stage of your application.",
    href: "/tools/document-checklist",
    icon: FileCheck,
  },
  {
    label: "Talk to a licensed RCIC",
    eyebrow: "Make it personal",
    description: "Get a grounded strategy before forms, deadlines and filing fees start to multiply.",
    href: "/tools/free-assessment",
    icon: MessageCircle,
  },
];

const TOOL_PATHWAYS = [
  {
    label: "Estimate your CRS",
    eyebrow: "Express Entry",
    description: "See how your age, language, education and experience add up.",
    href: "/tools/crs-calculator",
    icon: Calculator,
  },
  {
    label: "Check PNP fit",
    eyebrow: "Provincial routes",
    description: "Map your profile to the nomination streams most worth researching.",
    href: "/tools/pnp-eligibility",
    icon: MapPin,
  },
  {
    label: "Find your NOC",
    eyebrow: "Occupation search",
    description: "Start with the right occupation code for your work and immigration plan.",
    href: "/tools/noc-finder",
    icon: Search,
  },
  {
    label: "Request an assessment",
    eyebrow: "No-obligation review",
    description: "Share the basics of your profile and receive a written eligibility view.",
    href: "/tools/free-assessment",
    icon: MessageCircle,
  },
];

const PORTAL_PATHWAYS = [
  {
    label: "Review your pathway",
    eyebrow: "Before you file",
    description: "Start with a free assessment if you are still deciding which route fits.",
    href: "/tools/free-assessment",
    icon: Compass,
  },
  {
    label: "Use the free tools",
    eyebrow: "Self-service",
    description: "Get a quick CRS, PNP or document snapshot before speaking with our team.",
    href: "/tools",
    icon: Calculator,
  },
  {
    label: "Contact your consultant",
    eyebrow: "Need a hand",
    description: "Email the team if you need access or help with your client portal journey.",
    href: "/contact-us",
    icon: MessageCircle,
  },
];

const HOME_MID_PATHWAYS = [
  {
    label: "Diagnose the real issue",
    eyebrow: "Start with evidence",
    description: "Go beyond the headline refusal reason and identify what the officer actually needed to see.",
    href: "/refusals",
    icon: Search,
  },
  {
    label: "Build the response",
    eyebrow: "Make it persuasive",
    description: "Organise documents, explanations and supporting facts around the decision-maker's concerns.",
    href: "/tools/free-assessment",
    icon: FileCheck,
  },
  {
    label: "Protect the deadline",
    eyebrow: "Move with urgency",
    description: "PFLs and refusal windows move quickly, so the plan needs ownership and a clear next action.",
    href: "/tools/free-assessment",
    icon: ShieldCheck,
  },
  {
    label: "Know your options",
    eyebrow: "Choose the right route",
    description: "Reapply, appeal or seek review with a strategy shaped around your file — not a generic checklist.",
    href: "/contact-us",
    icon: Compass,
  },
];

const VARIANTS = {
  home: {
    eyebrow: "Start with the right route",
    title: "Choose the pathway that feels like yours",
    lead: "The best immigration plan starts with the right question. Pick a goal and we will take you to the deeper guide, tools and next steps.",
    cards: HOME_PATHWAYS,
  },
  page: {
    eyebrow: "Your next best move",
    title: "Keep your application moving",
    lead: "Use these focused entry points to turn research into a clearer plan — then come back to the guide below when you are ready for the detail.",
    cards: PAGE_PATHWAYS,
  },
  tools: {
    eyebrow: "Make the numbers useful",
    title: "A quicker way to find your starting point",
    lead: "Use the right tool for the question in front of you, then bring the result into a more informed consultation.",
    cards: TOOL_PATHWAYS,
  },
  portal: {
    eyebrow: "A little more direction",
    title: "Take the next step with confidence",
    lead: "Whether you are preparing to work with us or already have a case in progress, these links keep the journey simple.",
    cards: PORTAL_PATHWAYS,
  },
  homeMid: {
    eyebrow: "When the file gets complicated",
    title: "A sharper plan changes the outcome",
    lead: "Refusals, PFLs and high-stakes files need a more deliberate middle section: understand the problem, shape the evidence and move before the window closes.",
    cards: HOME_MID_PATHWAYS,
    darkBand: true,
  },
};

export default function DarkRedPathwaySection({ variant = "page", className }) {
  const content = VARIANTS[variant] || VARIANTS.page;
  const headingId = `dark-red-pathways-${variant}`;
  const compact = content.cards.length < 5;
  const darkBand = content.darkBand === true;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("dark-red-pathway relative overflow-hidden", darkBand && "dark-red-pathway--dark", className)}
    >
      <div aria-hidden className="dark-red-pathway__orb dark-red-pathway__orb--top" />
      <div aria-hidden className="dark-red-pathway__orb dark-red-pathway__orb--bottom" />
      <div aria-hidden className="dark-red-pathway__grid" />

      <div className="site-container section-pad relative z-10">
        <div className="dark-red-pathway__intro">
          <div className="max-w-2xl">
            <p className={cn("eyebrow", darkBand ? "text-accent-soft" : "text-primary")}>{content.eyebrow}</p>
            <h2 id={headingId} className={cn("mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl", darkBand ? "text-white" : "text-navy")}>
              {content.title}
            </h2>
            <p className={cn("mt-4 max-w-2xl text-[15px] leading-relaxed sm:text-base", darkBand ? "text-white/75" : "text-navy/75")}>
              {content.lead}
            </p>
          </div>
          <div className="dark-red-pathway__signal" aria-hidden>
            <span className="dark-red-pathway__signal-dot" />
            <span>Licensed guidance · Canada-wide</span>
          </div>
        </div>

        <div className={cn("mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5", compact ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {content.cards.map((card, index) => {
            return (
              <PathwayCard
                key={card.href + card.label}
                href={currentPagePath(card.href)}
                label={card.label}
                eyebrow={card.eyebrow}
                description={card.description}
                icon={card.icon}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
