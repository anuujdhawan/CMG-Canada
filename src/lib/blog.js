import { getAllPages } from "./sitePages";

export const BLOG_CATEGORIES = [
  {
    slug: "express-entry",
    label: "Express Entry",
    title: "Points, programs and permanent residence",
    description: "Understand the federal programs, CRS strategy and category-based decisions before you submit a profile.",
  },
  {
    slug: "work-permits",
    label: "Work permits & PR",
    title: "Work in Canada, then plan what comes next",
    description: "Compare work permit options, employer requirements and routes that may connect temporary status to permanent residence.",
  },
  {
    slug: "study-permits",
    label: "Study permits & student pathways",
    title: "Study with the next chapter in view",
    description: "Plan the study permit, school evidence and post-graduation options as one connected pathway.",
  },
  {
    slug: "family-sponsorship",
    label: "Family sponsorship",
    title: "Bring the people who matter closer",
    description: "Explore sponsorship planning with a clear view of evidence, eligibility and the route ahead.",
  },
  {
    slug: "provincial-nominee-programs",
    label: "Provincial nominee programs",
    title: "Compare provinces before you commit",
    description: "Use a practical lens for provincial streams, employer pathways and the details that make a route defensible.",
  },
  {
    slug: "employer-immigration",
    label: "Employer immigration",
    title: "Build a workforce pathway that holds up",
    description: "Research LMIA and employer-led programs with documentation, compliance and timing in the same frame.",
  },
  {
    slug: "visitor-visas",
    label: "Visitor visas & travel",
    title: "Prepare the temporary visit carefully",
    description: "Make the purpose of travel, ties and supporting evidence easy for a decision-maker to understand.",
  },
  {
    slug: "refusals",
    label: "Refusals & appeals",
    title: "Read the decision before choosing the response",
    description: "Turn refusal reasons and procedural concerns into a measured plan for what to do next.",
  },
  {
    slug: "immigration-guides",
    label: "Immigration planning guides",
    title: "Choose guidance that fits the file",
    description: "Practical research for selecting a representative, organizing a case and making the next conversation useful.",
  },
];

const CATEGORY_BY_SLUG = Object.fromEntries(BLOG_CATEGORIES.map((category) => [category.slug, category]));

const BLOG_IMAGE_BY_FILE = {
  "blog__canada-visitor-visa-refused.md": {
    src: "/images/pages/travel-passport.webp",
    alt: "Passport and travel documents prepared for a Canadian visitor visa application",
  },
  "blog__canada-work-permit-types.md": {
    src: "/images/pages/workers.webp",
    alt: "Workers reviewing a plan for employment in Canada",
  },
  "blog__express-entry-beginners-guide.md": {
    src: "/images/pages/calculator.webp",
    alt: "Calculator and notes used to plan an Express Entry profile",
  },
  "blog__express-entry-category-based-selection.md": {
    src: "/images/pages/documents.webp",
    alt: "Organized immigration documents ready for a category-based selection review",
  },
  "blog__crs-score-canada.md": {
    src: "/images/pages/canada-flag.webp",
    alt: "Canadian flag representing a permanent residence planning decision",
  },
  "blog__express-entry-vs-pnp.md": {
    src: "/images/pages/city-skyline.webp",
    alt: "Canadian city skyline used to compare federal and provincial immigration routes",
  },
  "blog__choose-brampton-immigration-consultant.md": {
    src: "/images/pages/office-meeting.webp",
    alt: "Immigration consultation meeting in a professional office",
  },
  "blog__choose-immigration-consultant-canada.md": {
    src: "/images/pages/team-laptops.webp",
    alt: "Consulting team collaborating on a Canadian immigration file",
  },
  "blog__immigration-refusal-canada.md": {
    src: "/images/pages/meeting-whiteboard.webp",
    alt: "Team reviewing evidence and next steps after an immigration refusal",
  },
  "blog__international-student-to-canadian-pr.md": {
    src: "/images/pages/students-study.webp",
    alt: "International students studying together while planning their Canadian future",
  },
  "blog__lmia-canada-explained.md": {
    src: "/images/pages/business-team.webp",
    alt: "Business team discussing an employer immigration plan",
  },
  "blog__ontario-pnp.md": {
    src: "/images/pages/toronto-skyline.webp",
    alt: "Toronto skyline representing an Ontario provincial nominee pathway",
  },
  "blog__spousal-sponsorship-canada.md": {
    src: "/images/pages/couple.webp",
    alt: "Couple planning a family sponsorship application together",
  },
  "blog__work-permit-to-pr-canada.md": {
    src: "/images/pages/handshake.webp",
    alt: "Professional handshake representing a work permit to permanent residence plan",
  },
};

const BLOG_IMAGE_BY_CATEGORY = {
  "express-entry": {
    src: "/images/pages/documents.webp",
    alt: "Organized immigration documents prepared for an Express Entry review",
  },
  "work-permits": {
    src: "/images/pages/workers.webp",
    alt: "Workers reviewing a Canadian employment and immigration plan",
  },
  "study-permits": {
    src: "/images/pages/students-study.webp",
    alt: "International students planning their studies and future in Canada",
  },
  "family-sponsorship": {
    src: "/images/pages/family.webp",
    alt: "Family planning a Canadian sponsorship pathway together",
  },
  "provincial-nominee-programs": {
    src: "/images/pages/canada-flag.webp",
    alt: "Canadian flag representing a provincial immigration pathway",
  },
  "employer-immigration": {
    src: "/images/pages/business-team.webp",
    alt: "Business team reviewing an employer immigration plan",
  },
  "visitor-visas": {
    src: "/images/pages/travel-passport.webp",
    alt: "Passport and travel documents prepared for a Canadian visit",
  },
  refusals: {
    src: "/images/pages/meeting-whiteboard.webp",
    alt: "Team reviewing an immigration refusal and the next steps",
  },
  "immigration-guides": {
    src: "/images/pages/office-meeting.webp",
    alt: "Immigration consultation meeting about a Canadian pathway",
  },
};

const DEFAULT_BLOG_IMAGE = {
  src: "/images/pages/documents.webp",
  alt: "Canadian immigration documents prepared for review",
};

function readableTitle(title) {
  return title
    .replace(/:\s*research the decision before the form.*$/i, "")
    .replace(/:\s*clearer information for your next step.*$/i, "")
    .trim();
}

function categoryForPath(pathname) {
  const slug = pathname.split("/")[2];
  return CATEGORY_BY_SLUG[slug] || BLOG_CATEGORIES[BLOG_CATEGORIES.length - 1];
}

function imageForPost(page, category) {
  return BLOG_IMAGE_BY_FILE[page.file] || BLOG_IMAGE_BY_CATEGORY[category.slug] || DEFAULT_BLOG_IMAGE;
}

export function getBlogPosts() {
  return getAllPages()
    .filter((page) => page.path.startsWith("/blog/"))
    .map((page) => {
      const category = categoryForPath(page.path);
      return {
        ...page,
        title: readableTitle(page.h1 || page.seo.title),
        category,
        image: imageForPost(page, category),
      };
    })
    .sort((a, b) => {
      const categoryDifference = BLOG_CATEGORIES.indexOf(a.category) - BLOG_CATEGORIES.indexOf(b.category);
      if (categoryDifference !== 0) return categoryDifference;
      return a.title.localeCompare(b.title);
    });
}

export function getBlogGroups() {
  const posts = getBlogPosts();
  return BLOG_CATEGORIES
    .map((category) => ({
      ...category,
      posts: posts.filter((post) => post.category.slug === category.slug),
    }))
    .filter((group) => group.posts.length > 0);
}
