import Image from "next/image";

const contentImage = (file, label, alt, caption) => ({
  file,
  src: `/images/pages/${file}.webp`,
  label,
  alt,
  caption,
});

/*
 * Every asset below is an existing WebP file in public/images/pages. Keeping
 * the editorial metadata beside the filename makes the frame useful for
 * search accessibility as well as visual storytelling.
 */
const IMAGE_LIBRARY = {
  airport: contentImage("airport", "Arrive prepared", "Airplane wing above the clouds on arrival to Canada", "A travel plan is strongest when purpose, documents and timing tell the same story."),
  autumnForest: contentImage("autumn-forest", "A new chapter", "Autumn forest in Canada", "A long-term pathway deserves a clear destination and a route built around the applicant's real facts."),
  businessPlan: contentImage("business-plan", "Make it defensible", "Business plan and immigration notes arranged for review", "A decision-maker should be able to follow the commercial need, evidence and immigration strategy."),
  businessPlanning: contentImage("business-planning", "Plan the route", "Business team planning a Canadian immigration pathway", "Strong business files connect the idea, the people and the next compliance decision."),
  businessTeam: contentImage("business-team", "One team", "Business team collaborating in a modern office", "Employer and applicant decisions move more smoothly when responsibilities are visible from the start."),
  businessman: contentImage("businessman", "Lead with intent", "Business professional reviewing work at a desk", "A focused review turns a broad commercial goal into an actionable immigration plan."),
  businesswoman: contentImage("businesswoman", "Build with purpose", "Business professional working through planning notes", "The right pathway connects a credible business plan to the requirements of the program."),
  calculator: contentImage("calculator", "Check the numbers", "Laptop displaying an immigration calculator and planning notes", "Scores, funds and thresholds are useful only when they are checked against the complete evidence."),
  canadaFlag: contentImage("canada-flag", "A place to build", "Canadian flag outside a modern building", "The destination is important, but a well-supported route makes the next step clearer."),
  cityNight: contentImage("city-night", "Find your place", "Canadian city skyline illuminated after dark", "Permanent residence planning should fit both the applicant's profile and the future they are building."),
  citySkyline: contentImage("city-skyline", "Choose the setting", "Canadian city skyline viewed across the water", "A route can look different depending on the province, community and opportunity it connects to."),
  cityStreet: contentImage("city-street", "Settle in", "People walking through a Canadian city street", "Understanding the destination helps connect an immigration decision with everyday life in Canada."),
  couple: contentImage("couple", "Move together", "Couple walking together in a Canadian city", "Family pathways work best when the relationship, history and shared plans are presented clearly."),
  documents: contentImage("documents", "Build the evidence", "Immigration documents arranged for a careful review", "A clear record lets the reviewer trace each important claim back to the document that supports it."),
  engineer: contentImage("engineer", "Show the skill", "Engineer reviewing detailed plans at work", "Occupation, duties and experience need to line up before a work or employer pathway is chosen."),
  family: contentImage("family", "Keep the family close", "Family spending time together at home", "A family application should make the relationship, history and intended next step easy to understand."),
  graduation: contentImage("graduation", "Plan beyond graduation", "Graduates celebrating at a Canadian university", "Study planning is stronger when the program choice connects to status, work and long-term options."),
  handshake: contentImage("handshake", "Work together", "Employer and advisor shaking hands after a consultation", "A well-owned file gives every participant a clear role and a reliable next step."),
  handshakeTwo: contentImage("handshake-two", "Agree the next step", "Two people shaking hands after an immigration consultation", "A focused consultation turns questions into an accountable plan."),
  mapleLeaf: contentImage("maple-leaf", "A Canadian beginning", "Red maple leaf against a Canadian landscape", "Preparation creates confidence whether the route is temporary, permanent or family-led."),
  meetingWhiteboard: contentImage("meeting-whiteboard", "Shape the response", "Team working through a case plan on a whiteboard", "Complex files become easier to protect when the concern, evidence and deadline are visible together."),
  mountainLake: contentImage("mountain-lake", "The destination", "Mountain lake beneath a bright Canadian sky", "The destination matters, but so does choosing a route that the evidence can support."),
  officeDesk: contentImage("office-desk", "Own the timeline", "Organized desk with a laptop, notes and a case plan", "A well-managed file keeps documents, requests and deadlines visible until the decision is made."),
  officeMeeting: contentImage("office-meeting", "Talk it through", "Professionals discussing an important plan in a bright office", "A clear conversation can turn a complicated file into a sequence of manageable decisions."),
  students: contentImage("students", "Find your place", "Students walking across a Canadian university campus", "The right study choice balances the program, purpose, budget and longer-term pathway."),
  studentsNursing: contentImage("students-nursing", "Build the skill", "Students learning together in a healthcare classroom", "Program details and future work plans should support the story told in the study application."),
  studentsStudy: contentImage("students-study", "Learn with a plan", "International students studying together", "A credible study plan connects school choice, funds, purpose and compliance."),
  teamLaptops: contentImage("team-laptops", "Work with clarity", "Professionals collaborating at laptops in a modern office", "The right work pathway starts with the facts an employer and an application need to show."),
  teamMeeting: contentImage("team-meeting", "Review together", "Professionals collaborating around a table", "A shared review helps separate the key evidence from the documents that do not move the decision forward."),
  torontoNight: contentImage("toronto-night", "A route through Canada", "Toronto skyline after dark", "A Canadian destination becomes more attainable when the route and evidence are planned together."),
  torontoSkyline: contentImage("toronto-skyline", "Canada-wide", "Toronto skyline with the CN Tower", "A clear location story helps connect an immigration pathway with the life it is meant to support."),
  travelPassport: contentImage("travel-passport", "Ready to travel", "Passport and boarding pass prepared for travel", "Temporary residence applications need a consistent purpose, itinerary and supporting record."),
  university: contentImage("university", "Choose well", "Modern Canadian university architecture", "School choice is only one part of a study plan; funds, purpose and compliance matter too."),
  universityCampus: contentImage("university-campus", "Choose the campus", "Canadian university campus building", "The program, institution and post-study plan should make sense together before filing."),
  vancouver: contentImage("vancouver", "Find your city", "Vancouver skyline and harbour", "Destination, opportunity and status planning work best when they are considered as one decision."),
  vancouverHarbour: contentImage("vancouver-harbour", "Make the landing clear", "Vancouver harbour and mountain skyline", "A destination-led plan still needs evidence, timing and a route that matches the applicant's facts."),
  workers: contentImage("workers", "Build the workforce", "Workers on a Canadian construction site", "Employer and work-permit files should connect the real vacancy, duties, wage and worker evidence."),
};

/*
 * The pools are intentionally more specific than the broad gallery
 * categories. A route gets a small, relevant visual story and then chooses a
 * deterministic pair from that story, so two pages in the same category do
 * not automatically receive the same two frames.
 */
const STORY_POOLS = [
  {
    match: /employers\/|employer|global-talent|tfwp|esdc|foreign-recruitment|intra-company|lmia-(?:employer|refusal)/,
    files: ["businessTeam", "workers", "businessPlan", "meetingWhiteboard", "engineer", "handshake", "teamMeeting"],
  },
  {
    match: /appeal|refusal|inadmissib|misrepresent|judicial|temporary-resident-permit|trp/,
    files: ["documents", "officeMeeting", "meetingWhiteboard", "officeDesk", "teamLaptops", "handshakeTwo", "cityNight"],
  },
  {
    match: /spous|family|parent|pgp|citizenship|pr-card/,
    files: ["couple", "family", "handshakeTwo", "documents", "canadaFlag", "torontoSkyline", "mapleLeaf"],
  },
  {
    match: /study|student|pgwp|education|university|work-and-study/,
    files: ["studentsStudy", "universityCampus", "graduation", "students", "studentsNursing", "university", "documents", "canadaFlag"],
  },
  {
    match: /work-permit|work visa|caregiver|international-experience|open-work|lmia-exempt/,
    files: ["workers", "engineer", "teamLaptops", "officeDesk", "documents", "teamMeeting", "canadaFlag"],
  },
  {
    match: /visitor|super-visa|eta|transit|airport|travel|visitor-record/,
    files: ["travelPassport", "airport", "cityStreet", "cityNight", "canadaFlag", "vancouverHarbour", "mountainLake", "documents"],
  },
  {
    match: /business|start-up|startup|entrepreneur|self-employed/,
    files: ["businesswoman", "businessPlanning", "businessPlan", "businessman", "businessTeam", "officeMeeting", "handshake"],
  },
  {
    match: /express-entry|crs|federal-skilled|canadian-experience|provincial-nominee|pnp|agri-food|rural|municipal|draw-results|calculator/,
    files: ["calculator", "documents", "officeDesk", "teamLaptops", "citySkyline", "torontoSkyline", "canadaFlag", "autumnForest"],
  },
  {
    match: /immigrate-to-canada|immigration-consultant|about|contact|assessment|resources|document-checklist|processing-times/,
    files: ["officeMeeting", "handshakeTwo", "documents", "torontoSkyline", "cityStreet", "mapleLeaf", "officeDesk"],
  },
];

const DEFAULT_POOL = ["documents", "officeMeeting", "citySkyline", "canadaFlag", "mapleLeaf", "officeDesk", "torontoNight"];

function routeHash(value = "") {
  return [...value].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 7);
}

function getStoryPool(page) {
  const text = `${page?.path || ""} ${page?.h1 || ""} ${page?.seo?.description || ""}`.toLowerCase();
  return STORY_POOLS.find((story) => story.match.test(text))?.files || DEFAULT_POOL;
}

export function getServiceContentImages(page) {
  const pool = getStoryPool(page).filter((file) => IMAGE_LIBRARY[file]);
  const seed = routeHash(page?.path || page?.h1 || "");
  const firstIndex = seed % pool.length;
  const step = 1 + ((seed >>> 5) % (pool.length - 1));
  const secondIndex = (firstIndex + step) % pool.length;
  return [IMAGE_LIBRARY[pool[firstIndex]], IMAGE_LIBRARY[pool[secondIndex]]];
}

export default function ServiceContentImageFrame({ image, side = "left", children }) {
  return (
    <section className={`service-content-media-band service-content-media-band--${side} reveal`}>
      <figure className="service-content-media-frame">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 880px) 100vw, 42vw" />
        <div className="service-content-media-frame__wash" aria-hidden="true" />
        <figcaption>
          <span>{image.label}</span>
          <small>{image.caption}</small>
        </figcaption>
      </figure>
      <div className="service-content-media-copy">{children}</div>
    </section>
  );
}
