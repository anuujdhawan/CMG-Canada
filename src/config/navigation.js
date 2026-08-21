import { site } from "@/config/site";
import { currentPagePath } from "@/config/pageRoutes";

/**
 * Navigation structure — Commonwealth Migration Canada.
 *
 * The older, full content inventory is intentionally restored here: the
 * dropdowns expose the routes represented by the rewritten pageData pages, while
 * the shared red-only visual treatment remains controlled by the theme.
 */

const immigrateColumns = [
  {
    category: "Skilled & Express Entry",
    items: [
      { label: "Express Entry", desc: "FSW, CEC, FST & category draws", href: "/immigration/express-entry" },
      { label: "Federal Skilled Worker (FSW)", desc: "For skilled workers outside Canada", href: "/immigration/fsw" },
      { label: "Canadian Experience Class (CEC)", desc: "For workers already in Canada", href: "/immigration/cec" },
      { label: "Provincial Nominees (PNP)", desc: "Compare all provinces & territories", href: "/immigration/pnp" },
    ],
  },
  {
    category: "Business & Other Pathways",
    items: [
      { label: "Atlantic Immigration Program (AIP)", desc: "Employer-driven pathway to Atlantic Canada", href: "/immigration/pnp" },
      { label: "TR to PR Pathway", desc: "Temporary resident to permanent resident", href: "/immigration/tr-to-pr" },
      { label: "Business & Start-up Visa", desc: "For entrepreneurs and business owners", href: "/immigration/startup-visa" },
    ],
  },
];

const workStudyColumns = [
  {
    category: "Work in Canada",
    items: [
      { label: "Work Permits", desc: "Employer-specific, LMIA & open permits", href: "/immigration/work-permit" },
      { label: "PGWP", desc: "Post-graduation work permit", href: "/immigration/pgwp" },
      { label: "Spousal Work Permit", desc: "Open permits for spouses & partners", href: "/immigration/spousal-work-permit" },
      { label: "IEC (Working Holiday)", desc: "International Experience Canada", href: "/immigration/iec" },
    ],
  },
  {
    category: "Study & Visit",
    items: [
      { label: "Study Permits", desc: "Study at a Canadian DLI", href: "/immigration/study-permit" },
      { label: "Visitor Visa, eTA & Super Visa", desc: "TRV, eTA & parent Super Visa", href: "/immigration/visitor-visa" },
    ],
  },
];

const sponsorColumns = [
  {
    category: "Family Sponsorship",
    items: [
      { label: "Spousal / Partner Sponsorship", desc: "Sponsor a spouse or common-law partner", href: "/immigration/spousal-sponsorship" },
      { label: "Parents & Grandparents (PGP)", desc: "PGP lottery & Super Visa options", href: "/immigration/pgp" },
      { label: "Family Sponsorship", desc: "Dependent children & other relatives", href: "/immigration/family-sponsorship" },
    ],
  },
  {
    category: "Status & Admissibility",
    items: [
      { label: "PR Card & Citizenship", desc: "Renewals, PRTD & naturalization", href: "/immigration/citizenship" },
      { label: "Criminal Inadmissibility", desc: "TRP, rehabilitation & appeals", href: "/appeals/criminal-inadmissibility" },
    ],
  },
];

const refusalColumns = [
  {
    category: "Time-Critical Help",
    items: [
      { label: "Refusals & PFL Response", desc: "Visitor, study, work & sponsorship refusals", href: "/refusals" },
      { label: "IAD Appeals", desc: "Appeals before the Immigration Appeal Division", href: "/refusals" },
      { label: "Judicial Review", desc: "Federal Court leave & review", href: "/appeals/judicial-review" },
    ],
  },
];

const employerColumns = [
  {
    category: "Hire Global Talent",
    items: [
      { label: "LMIA (All Streams)", desc: "High-wage, low-wage & agri-food", href: "/for-employers/lmia" },
      { label: "Global Talent Stream", desc: "Two-week processing for tech roles", href: "/for-employers/global-talent-stream" },
      { label: "Employer Compliance", desc: "ESDC audits, inspections & obligations", href: "/for-employers/employer-compliance" },
      { label: "Recruitment (HGT Division)", desc: "End-to-end global recruitment support", href: "/for-employers" },
    ],
  },
];

const toolsColumns = [
  {
    category: "Free Self-Service Tools",
    items: [
      { label: "CRS Calculator", desc: "Estimate your Express Entry score", href: "/tools/crs-calculator" },
      { label: "PNP Eligibility Check", desc: "See which provincial streams fit", href: "/tools/pnp-eligibility" },
      { label: "NOC / Occupation Finder", desc: "Match your job to a NOC code", href: "/tools/noc-finder" },
    ],
  },
  {
    category: "Plan & Prepare",
    items: [
      { label: "Document Checklist", desc: "Know exactly what to prepare", href: "/tools/document-checklist" },
      { label: "Free Assessment", desc: "Find your best pathway — free", href: "/tools/free-assessment" },
    ],
  },
];

const resourcesColumns = [
  {
    category: "Learn & Prepare",
    items: [
      { label: "Blog", desc: "Expert guides by licensed RCICs", href: "/blog" },
      { label: "FAQs", desc: "Common immigration questions", href: "/faqs" },
      { label: "Guides", desc: "Document checklists & guides", href: "/resources/document-checklist" },
      { label: "Immigration Draws", desc: "Live Express Entry & PNP results", href: "/draw-results" },
    ],
  },
];

const aboutColumns = [
  {
    category: "Our Firm",
    items: [
      { label: "About Us", desc: "Licensed RCICs since day one", href: "/about-us" },
      { label: "Our Team", desc: "Meet the consultants", href: "/team" },
      { label: "How It Works", desc: "From assessment to approval", href: "/how-it-works" },
      { label: "Our Office", desc: "Brampton, Ontario — Canada-wide", href: "/contact-us" },
    ],
  },
];

const contactColumns = [
  {
    category: "Get in Touch",
    items: [
      { label: "Book Consultation", desc: "Choose a time that suits you", href: "/book" },
      { label: "Book Urgent Consultation", desc: "Refusal? Don't wait", href: "/book", urgent: true },
      { label: "Make Payment", desc: "Secure online payment", href: site.ctas.payment.href },
    ],
  },
];

const toolsResourcesColumns = [toolsColumns[0], resourcesColumns[0]];
const companyColumns = [aboutColumns[0], contactColumns[0]];

const immigrateLinks = immigrateColumns.flatMap((column) => column.items);
const workStudyLinks = workStudyColumns.flatMap((column) => column.items);
const sponsorLinks = sponsorColumns.flatMap((column) => column.items);
const refusalLinks = refusalColumns.flatMap((column) => column.items);
const employerLinks = employerColumns.flatMap((column) => column.items);
const toolsLinks = toolsColumns.flatMap((column) => column.items);
const resourcesLinks = resourcesColumns.flatMap((column) => column.items);
const aboutLinks = aboutColumns.flatMap((column) => column.items);
const contactLinks = contactColumns.flatMap((column) => column.items);

const rawNavigation = {
  utility: {
    email: site.email,
  },

  header: [
    { label: "Home", href: "/" },
    {
      label: "Immigrate",
      href: "/immigration",
      columns: immigrateColumns,
      featured: {
        label: "Most Popular",
        title: "Express Entry",
        desc: "The main points-based pathway for skilled workers — FSW, CEC and FST under one system.",
        href: "/immigration/express-entry",
      },
    },
    {
      label: "Work & Study",
      shortLabel: "Work & Study",
      href: "/work-study",
      columns: workStudyColumns,
      featured: {
        label: "Career Pathway",
        title: "Study → Work → PR",
        desc: "From a study permit to a PGWP and permanent residence — one team, end to end.",
        href: "/immigration/study-permit",
      },
    },
    {
      label: "Sponsorship",
      shortLabel: "Sponsorship",
      href: "/immigration/family-sponsorship",
      columns: sponsorColumns,
      featured: {
        label: "Most Common",
        title: "Spousal Sponsorship",
        desc: "Reunite with your spouse or common-law partner — inland or overseas.",
        href: "/immigration/spousal-sponsorship",
      },
    },
    {
      label: "Appeals",
      shortLabel: "Appeals",
      href: "/refusals",
      standalone: true,
      columns: refusalColumns,
      featured: {
        label: "Time-Critical",
        title: "Refused? Don't give up.",
        desc: "We assess merits, respond to PFLs and appeal within statutory windows.",
        href: "/refusals",
      },
    },
    {
      label: "Employers",
      shortLabel: "Employers",
      href: "/for-employers",
      columns: employerColumns,
      featured: {
        label: "HGT Division",
        title: "LMIA Support",
        desc: "High- & low-wage LMIA, Global Talent Stream and ESDC compliance.",
        href: "/for-employers/lmia",
      },
    },
    {
      label: "Tools",
      shortLabel: "Tools",
      href: "/tools",
      columns: toolsResourcesColumns,
      featured: {
        label: "Free Tool",
        title: "CRS Calculator",
        desc: "See your Express Entry score in under two minutes.",
        href: "/tools/crs-calculator",
      },
    },
    {
      label: "About",
      href: "/about-us",
      columns: companyColumns,
      featured: {
        label: "Free First Step",
        title: "Book a Consultation",
        desc: "Speak with a licensed consultant about your goal — at no cost.",
        href: "/book",
      },
    },
  ],

  main: [
    { label: "Immigrate", href: "/immigration", description: "Permanent-residence pathways for skilled workers and entrepreneurs.", children: immigrateLinks },
    { label: "Work & Study", href: "/work-study", description: "Temporary status for work, study and visiting Canada.", children: workStudyLinks },
    { label: "Sponsorship", href: "/immigration/family-sponsorship", description: "Family reunification and status maintenance.", children: sponsorLinks },
    { label: "Appeals", href: "/refusals", description: "Time-critical help after a refusal or procedural fairness letter.", urgent: true, children: refusalLinks },
    { label: "Employers", href: "/for-employers", description: "Hire and retain global talent compliantly.", children: employerLinks },
    { label: "Tools", href: "/tools", description: "Free self-service immigration tools.", children: toolsLinks },
    { label: "About", href: "/about-us", description: "Who we are and how we work.", children: aboutLinks },
  ],

  footer: [
    { title: "Immigrate", links: [
      { label: "Express Entry", href: "/immigration/express-entry" },
      { label: "Provincial Nominees (PNP)", href: "/immigration/pnp" },
      { label: "Atlantic Immigration Program", href: "/immigration/pnp" },
      { label: "Business Immigration", href: "/immigration/startup-visa" },
    ] },
    { title: "Work & Study", links: [
      { label: "Work Permits", href: "/immigration/work-permit" },
      { label: "Study Permits", href: "/immigration/study-permit" },
      { label: "Visitor & Super Visa", href: "/immigration/visitor-visa" },
      { label: "LMIA & GTS", href: "/for-employers/lmia" },
    ] },
    { title: "Employers", links: [
      { label: "LMIA (All Streams)", href: "/for-employers/lmia" },
      { label: "Global Talent Stream", href: "/for-employers/global-talent-stream" },
      { label: "Employer Compliance", href: "/for-employers/employer-compliance" },
      { label: "Recruitment (HGT)", href: "/for-employers" },
    ] },
    { title: "Company", links: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Team", href: "/team" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Our Office", href: "/contact-us" },
    ] },
    { title: "Contact", links: [
      { label: "Book consultation", href: site.ctas.primary.href },
      { label: site.email, href: site.emailHref },
      { label: site.phone, href: site.phoneHref },
    ] },
  ],
};

function normalizeLinks(value) {
  if (Array.isArray(value)) return value.map(normalizeLinks);
  if (!value || typeof value !== "object") return value;
  const next = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeLinks(item)]));
  if (typeof next.href === "string") next.href = currentPagePath(next.href);
  return next;
}

export const navigation = normalizeLinks(rawNavigation);

export default navigation;
