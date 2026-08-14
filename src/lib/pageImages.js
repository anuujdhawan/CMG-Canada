/**
 * Curated image map — every page gets relevant, locally-hosted webp photos
 * (public/images/pages/*.webp) inserted into its content flow so pages look
 * premium without bloating load (files are pre-resized/optimised).
 *
 * Rules are matched top-to-bottom; the first rule whose `match` regex tests
 * true supplies the images. Each rule returns up to 6 images; ContentPage
 * inserts at most 3–4 per page (well under the 8-image cap).
 */

const IMG = (name, alt, caption = "") => ({
  src: `/images/pages/${name}.webp`,
  alt,
  caption,
});

const RULES = [
  {
    match: /^\/$/,
    images: [
      IMG("toronto-skyline", "Toronto skyline with the CN Tower at sunset", "Canada's largest city — home to our Brampton office and GTA clients"),
      IMG("canada-flag", "Canadian flag flying against a clear sky", "Welcome to Canada — a country built by newcomers"),
      IMG("office-meeting", "Consultants reviewing an immigration file with a client", "Every file is handled end-to-end by a licensed RCIC"),
      IMG("students", "International students walking across a university campus", "From study permits to PGWP to permanent residence"),
      IMG("family", "A family together in a bright home", "Family reunification is at the heart of Canadian immigration"),
      IMG("calculator", "Estimating an Express Entry CRS score", "Free tools to see where your profile stands"),
    ],
  },
  {
    match: /^\/immigration\/express-entry/,
    images: [
      IMG("toronto-skyline", "Toronto financial district skyline", "Express Entry candidates settle across Canada's major cities"),
      IMG("calculator", "Calculating a CRS score on a laptop", "Understand your Comprehensive Ranking System score"),
      IMG("business-team", "Skilled professionals collaborating", "FSW, CEC and FST — points-based selection"),
      IMG("documents", "Preparing application documents", "Decision-ready files that stand up to scrutiny"),
    ],
  },
  {
    match: /^\/immigration\/(fsw|cec|tr-to-pr|startup-visa|work-permit|spousal-work-permit|iec|pgwp)/,
    images: [
      IMG("office-meeting", "Consultation with a licensed immigration consultant", "Clear guidance for every pathway"),
      IMG("documents", "Organised application paperwork", "Checklist-driven, decision-ready files"),
      IMG("team-laptops", "Professionals working at laptops", "From application to approval, one team"),
    ],
  },
  {
    match: /^\/immigration\/pnp/,
    images: [
      IMG("vancouver-harbour", "Vancouver harbour and skyline", "Each province and territory runs its own PNP"),
      IMG("city-street", "A Canadian city street in summer", "Choose the province that fits your goals"),
      IMG("mountain-nature", "Canadian Rockies landscape", "From BC to Atlantic Canada — provincial pathways"),
    ],
  },
  {
    match: /^\/immigration\/(study-permit|student|pgwp)/,
    images: [
      IMG("university-campus", "Historic university campus building", "Study at a Canadian Designated Learning Institution"),
      IMG("students", "Students on campus between classes", "From study permit to PGWP to permanent residence"),
      IMG("graduation", "Graduates celebrating in caps and gowns", "Graduate, work and stay — your Canadian journey"),
    ],
  },
  {
    match: /^\/immigration\/(visitor|visa|super)/,
    images: [
      IMG("travel-passport", "Passport and travel documents on a desk", "Visitor visas, eTAs and Super Visas"),
      IMG("airport", "Airplane wing above the clouds", "Plan your visit with confidence"),
      IMG("toronto-skyline", "Toronto skyline", "Family visits, business trips and more"),
    ],
  },
  {
    match: /^\/immigration\/(spousal|sponsor|family|pgp)/,
    images: [
      IMG("family", "A family together", "Sponsor your spouse, partner, parents or children"),
      IMG("couple", "A couple walking together", "Inland or overseas — spousal sponsorship done right"),
      IMG("canada-flag", "Canadian flag", "Bring the people who matter most to Canada"),
    ],
  },
  {
    match: /^\/immigration\/(citizenship|pr-card|status|restoration)/,
    images: [
      IMG("canada-flag", "Canadian flag waving", "From permanent resident to Canadian citizen"),
      IMG("documents", "Citizenship and PR card documents", "Renewals, PRTDs and naturalization"),
      IMG("office-desk", "Neat office desk with paperwork", "Status matters — keep it current"),
    ],
  },
  {
    match: /^\/appeals\/|^\/refusals/,
    images: [
      IMG("documents", "Legal documents under review", "Refusal letters, PFLs and GCMS notes"),
      IMG("office-meeting", "Consultant explaining an appeal strategy", "Time-critical responses within statutory windows"),
      IMG("handshake", "A reassuring handshake", "A refusal is not the end of the road"),
    ],
  },
  {
    match: /^\/for-employers/,
    images: [
      IMG("workers", "Workers on a construction site", "High- and low-wage LMIA streams"),
      IMG("engineer", "Engineer reviewing blueprints", "Global Talent Stream for tech roles"),
      IMG("handshake", "Employer and consultant shaking hands", "Hire and retain global talent compliantly"),
      IMG("business-team", "Business team in a meeting", "ESDC compliance, audits and inspections"),
    ],
  },
  {
    match: /^\/tools/,
    images: [
      IMG("calculator", "Calculating scores on a laptop", "See where your profile stands — free"),
      IMG("documents", "Document checklist on a desk", "Know exactly what to prepare"),
      IMG("office-desk", "Planning documents at a desk", "Free self-service tools, built by licensed RCICs"),
    ],
  },
  {
    match: /^\/blog/,
    images: [
      IMG("autumn-leaves", "Maple leaves in autumn colours", "Guides written by licensed RCICs"),
      IMG("students", "Students studying together", "Expert, up-to-date immigration guidance"),
      IMG("documents", "Preparing a strong application", "Read the guides, then decide"),
    ],
  },
  {
    match: /^\/immigration-consultant/,
    images: [
      IMG("city-street", "A Canadian city street", "Serving newcomers across Canada"),
      IMG("toronto-skyline", "Toronto skyline", "GTA and Brampton based, Canada-wide reach"),
      IMG("vancouver-harbour", "Vancouver harbour", "Licensed RCICs wherever you are"),
    ],
  },
  {
    match: /^\/resources|^\/faqs|^\/guides/,
    images: [
      IMG("documents", "Guides and checklists", "Prepare with confidence"),
      IMG("office-meeting", "Consultation with a licensed consultant", "Answers to your most common questions"),
    ],
  },
  {
    match: /.*/,
    images: [
      IMG("toronto-skyline", "Toronto skyline", "Canada-wide immigration services"),
      IMG("office-meeting", "Immigration consultation", "Speak with a licensed RCIC"),
      IMG("documents", "Preparing your application", "Decision-ready files"),
    ],
  },
];

/** Pick the first rule matching the path and return its images (max `limit`). */
export function getPageImages(path, limit = 6) {
  const rule = RULES.find((r) => r.match.test(path));
  return (rule?.images || RULES[RULES.length - 1].images).slice(0, limit);
}
