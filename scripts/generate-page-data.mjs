
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "scraped-data", "data");
const outputDir = path.join(root, "pageData");
const site = "https://commonwealthmigration.ca";
const today = "2026-08-19";

const ircc = {
  hub: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html",
  express: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html",
  expressHow: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/works.html",
  categories: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html",
  rounds: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations.html",
  documents: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents.html",
  fsw: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html",
  cec: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/canadian-experience-class.html",
  fst: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-trades.html",
  pnp: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html",
  family: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship.html",
  work: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit.html",
  hire: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/hire-foreign-worker.html",
  study: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
  studyEligibility: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/eligibility.html",
  studentWork: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work.html",
  pgwp: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html",
  pgwpField: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility/field-of-study.html",
  visit: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html",
  eta: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html",
  superVisa: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/parent-grandparent-super-visa.html",
  superVisaEligibility: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/parent-grandparent-super-visa/eligibility.html",
  citizenship: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship.html",
  prCard: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/pr-card.html",
  startup: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html",
  refugees: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees.html",
  processing: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html",
  parents: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/sponsor-parents-grandparents.html",
  special: "https://www.canada.ca/en/immigration-refugees-citizenship/services/special-measures/situations-abroad.html",
};

const trust = {
  register: "https://www.cicc-ccic.ca/register/",
  jobBank: "https://www.jobbank.gc.ca/",
  esdc: "https://www.canada.ca/en/employment-social-development/services/foreign-workers.html",
  irb: "https://irb-cisr.gc.ca/en/Pages/index.aspx",
  court: "https://www.fct-cf.gc.ca/en/home",
  cbsa: "https://www.cbsa-asfc.gc.ca/",
};

const provinces = {
  alberta: ["Alberta", "AAIP", "https://www.alberta.ca/aaip.aspx", "occupation fit, employer support, and status timing"],
  "british-columbia": ["British Columbia", "BC PNP", "https://www.welcomebc.ca/Immigrate-to-B-C/About-The-BC-PNP", "wage, occupation, registration, and employer evidence"],
  manitoba: ["Manitoba", "MPNP", "https://immigratemanitoba.com/", "Manitoba connection, recruitment and EOI evidence"],
  "new-brunswick": ["New Brunswick", "NBPNP", "https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration.html", "community interest, employer support and regional fit"],
  newfoundland: ["Newfoundland and Labrador", "NLPNP", "https://www.gov.nl.ca/immigration/", "priority occupations, employer support and settlement"],
  northern: ["Yukon, Northwest Territories and Nunavut", "Northern pathways", ircc.pnp, "territorial employers, community size and federal alternatives"],
  "nova-scotia": ["Nova Scotia", "NSNP", "https://liveinnovascotia.com/", "occupation priorities, employers and Atlantic settlement"],
  "oinp-express-entry": ["Ontario", "OINP", "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp", "the relationship between Express Entry-aligned streams and current Ontario intake"],
  ontario: ["Ontario", "OINP", "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp", "Workforce Priority, job-offer evidence and EOI logic"],
  pei: ["Prince Edward Island", "PEI PNP", "https://www.princeedwardisland.ca/en/topic/immigrate-to-pei", "employer-backed routes and Atlantic alternatives"],
  saskatchewan: ["Saskatchewan", "SINP", "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/immigrants-and-new-migrants/immigrate-to-saskatchewan", "sector windows, EOI timing and job eligibility"],
};

const countries = {
  bangladesh: ["Bangladesh", "source-country documents, translations, funds and consistency"],
  india: ["India", "education verification, language results, occupation evidence and the difference between a profile and a complete application"],
  nepal: ["Nepal", "clear records, travel history and a defensible explanation of the proposed pathway"],
  nigeria: ["Nigeria", "funds, employment history, family ties and consistent evidence across forms"],
  pakistan: ["Pakistan", "document credibility, financial narrative, travel purpose and program fit"],
  philippines: ["the Philippines", "occupation evidence, credentials, family documentation and a route not dependent on one draw"],
  qatar: ["Qatar", "residence status, employment, finances and travel history"],
  "saudi-arabia": ["Saudi Arabia", "residence-based documents, employer evidence and a coherent reason for choosing Canada"],
  "sri-lanka": ["Sri Lanka", "education, employment, family context, finances and translation"],
  uae: ["the United Arab Emirates", "residence status, employer letters, funds and travel history across countries"],
  vietnam: ["Vietnam", "civil, education, financial and employment records that tell one consistent story"],
};

const cities = {
  brampton: ["Brampton", "local access, multilingual guidance and federal-rule compliance", "Brampton immigration consultant"],
  calgary: ["Calgary", "Alberta-focused planning with Canada-wide representation", "Calgary immigration consultant"],
  edmonton: ["Edmonton", "a fit check for Alberta, federal and employer-led pathways", "Edmonton immigration consultant"],
  hamilton: ["Hamilton", "GTA and Ontario support with provincial criteria in view", "Hamilton immigration consultant"],
  markham: ["Markham", "multilingual support for skilled workers, families and business owners", "Markham immigration consultant"],
  mississauga: ["Mississauga", "airport-connected families, professionals, students and employers", "Mississauga immigration consultant"],
  ottawa: ["Ottawa", "federal-program strategy with an Ontario and national lens", "Ottawa immigration consultant"],
  toronto: ["Toronto", "profile-specific planning for a high-volume metropolitan market", "Toronto immigration consultant"],
  vancouver: ["Vancouver", "British Columbia options compared with federal and employer routes", "Vancouver immigration consultant"],
  vaughan: ["Vaughan", "York Region access to RCIC-led planning for individuals and employers", "Vaughan immigration consultant"],
};

const programData = {
  immigration: ["Canadian immigration pathways", "Canadian immigration pathways", "Compare permanent residence, work, study, family and temporary routes with a licensed RCIC plan.", "There is no universal Canadian immigration application. The correct starting point depends on work, language, education, family, funds, status, admissibility and destination.", ircc.hub],
  "agri-food": ["Agri-Food Pilot Canada", "Agri-Food immigration Canada", "Explore agri-food immigration options, work evidence and employer-supported alternatives with licensed guidance.", "Agriculture and food-sector cases need more than a job title; occupation, employer, authorized work and status must fit the live rules.", ircc.hub],
  "business-visa": ["Canada business immigration", "Canada business immigration", "Review Start-Up Visa and provincial entrepreneur routes with a source-of-funds and operating-plan review.", "Business immigration is not simply a net-worth exercise. The venture, founder role, funds and Canadian activity must make sense together.", ircc.startup],
  caregiver: ["caregiver immigration Canada", "Caregiver immigration Canada", "Compare caregiver work-permit and permanent-residence options with employer, occupation, family and status planning.", "Caregiver pathways are program-specific and evidence-heavy; the job, employer, work authorization, language, education and family facts must be checked against the live rules.", ircc.work],
  cec: ["Canadian Experience Class", "Canadian Experience Class Canada", "Turn qualifying Canadian skilled work into an Express Entry and permanent-residence plan.", "CEC can suit temporary workers who have built eligible Canadian experience, but duties, status, language and timing must line up.", ircc.cec],
  citizenship: ["Canadian citizenship application", "Canadian citizenship", "Plan physical presence, tax, language, knowledge-test and document steps before applying.", "Citizenship is a status milestone, not an automatic extension of permanent residence; travel and records matter.", ircc.citizenship],
  eta: ["Canada eTA", "Canada eTA", "Check who needs an eTA, how it differs from a visitor visa and what to verify before flying.", "An eTA is a travel authorization for eligible visa-exempt travellers; it is not a work permit, study permit or border-entry guarantee.", ircc.eta],
  "express-entry": ["Express Entry Canada", "Express Entry Canada", "Plan CRS, FSW, CEC, FST, category-based and PNP options around your real evidence.", "Express Entry is a ranking system layered over three federal programs. In 2026, IRCC lists French, healthcare and social services, STEM, trades, education, transport, Canadian-experience physician, senior-manager, researcher and skilled-military categories; category fit still sits on top of federal eligibility.", ircc.express],
  "family-sponsorship": ["family sponsorship Canada", "Family sponsorship Canada", "Prepare sponsor eligibility, relationship evidence, admissibility and the federal PR process.", "Family sponsorship asks whether the sponsor qualifies and whether the relationship is genuine and legally recognized.", ircc.family],
  fsw: ["Federal Skilled Worker Program", "Federal Skilled Worker Canada", "Review the 67-point selection grid, ECA, language, funds and Express Entry strategy.", "FSW is the federal route for skilled workers whose experience may be outside Canada; the 67-point grid is only the first gate.", ircc.fsw],
  "humanitarian-compassionate": ["humanitarian and compassionate Canada", "Humanitarian and compassionate Canada", "Explore H&C evidence, establishment, hardship, family impact and referral needs.", "An H&C request is exceptional and discretionary. It is not a substitute for every regular immigration program.", ircc.hub],
  iec: ["International Experience Canada", "International Experience Canada", "Understand country agreements, pools, categories, timing and work-permit conditions.", "IEC is a youth-mobility framework; nationality, category, age, quota and season determine what is available.", ircc.work],
  "lmia-exempt": ["LMIA-exempt work permit Canada", "LMIA-exempt work permits Canada", "Compare exemption categories, employer compliance and worker evidence before applying.", "LMIA-exempt does not mean automatic approval. The exemption code, offer, employer and worker must fit.", ircc.work],
  lmia: ["LMIA Canada", "LMIA Canada", "Understand the employer process, recruitment, wage, compliance and work-permit link.", "An LMIA is an employer-side process about a genuine vacancy, recruitment, wage and working conditions.", ircc.hire],
  "municipal-nominee": ["Municipal Nominee Program Canada", "Municipal immigration Canada", "Separate proposed or community-led ideas from live PNP, AIP and RCIP alternatives.", "Municipal immigration language can describe a concept rather than one federal application class; verify the route before relying on it.", ircc.pnp],
  "open-work-permit": ["open work permit Canada", "Open work permits Canada", "Check bridging, spouse, vulnerable-worker and special-measure categories before changing jobs.", "An open work permit is tied to a defined eligibility basis, not simply a desire to work for any employer.", ircc.work],
  pgp: ["Parents and Grandparents Program", "Parents and grandparents Canada", "Check PGP status, sponsor obligations and the Super Visa alternative using current IRCC guidance.", "IRCC currently shows the PGP as paused for new applications while existing files continue. The Super Visa remains a separate temporary option, so check the live notice before preparing a new sponsorship package.", ircc.parents],
  pgwp: ["PGWP Canada", "PGWP Canada", "Review DLI, program, language, field-of-study and work-to-PR considerations.", "A post-graduation work permit is not guaranteed for every Canadian course; DLI and program eligibility, language, timing, field-of-study rules and compliance matter. IRCC's 2026 field-of-study list should be checked before enrolment.", ircc.pgwp],
  pnp: ["Provincial Nominee Program Canada", "PNP Canada", "Compare provincial and territorial streams, enhanced and base pathways, jobs and federal processing.", "PNP is a collection of programs, not one national scorecard; each jurisdiction selects for its own needs.", ircc.pnp],
  "pr-card": ["PR card renewal Canada", "PR card renewal Canada", "Plan renewal, replacement, residency-obligation review and PRTD travel questions.", "A PR card proves status for travel, but the card and permanent-resident status are not the same thing.", ircc.prCard],
  refugees: ["refugee claim Canada", "Refugee protection Canada", "Understand refugee claims, IRB process, PRRA, protected-person PR and travel documents.", "Refugee protection is a high-stakes legal process with distinct decision-makers, evidence and deadlines.", ircc.refugees],
  "rural-northern": ["Rural Community Immigration Pilot Canada", "RCIP Canada", "Connect a participating community, genuine job offer, worker evidence and PR plan.", "RCIP is community-led; a job offer is only one part of the recommendation and federal process.", ircc.pnp],
  "spousal-sponsorship": ["spousal sponsorship Canada", "Spousal sponsorship Canada", "Choose inland or outland and organize a dated relationship record.", "Strong spousal files make the relationship understandable over time through forms, visits, communication and family context.", ircc.family],
  "spousal-work-permit": ["spousal open work permit Canada", "Spousal open work permit Canada", "Check the current relationship, worker, student or sponsorship category before applying.", "Eligibility is category-specific; the principal applicant's status, program or occupation and timing all matter.", ircc.work],
  "startup-visa": ["Start-Up Visa Canada", "Start-Up Visa Canada", "Review designated organizations, founder role, ownership, language, funds and PR planning.", "The Start-Up Visa is built around a qualifying venture and designated-organization support, not passive investment alone.", ircc.startup],
  "study-permit": ["Canada study permit", "Canada study permit", "Prepare DLI, PAL or TAL, funds, study purpose, compliance and PGWP planning.", "A study permit is a temporary-residence application; school choice, funds, purpose and compliance must be credible. Some public master's and doctoral applicants may fall under the 2026 PAL or TAL exemption, so verify the current exception rather than assuming it.", ircc.study],
  "super-visa": ["Canada Super Visa", "Canada Super Visa", "Review host income, invitation, medical exam, insurance and long-stay family visit rules.", "The Super Visa is temporary and requires both the host and visitor to satisfy current criteria.", ircc.superVisa],
  "tr-to-pr": ["temporary resident to permanent resident Canada", "Temporary resident to PR Canada", "Compare CEC, PNP, Atlantic, RCIP and employer-supported transition routes.", "Temporary status does not automatically convert to PR; the next route depends on work, language, employer, province and timing.", ircc.cec],
  "transit-visa": ["Canada transit visa", "Canada transit visa", "Check airport connections, passport, exemptions and when a visitor visa is needed.", "Transit rules depend on nationality, itinerary, airport and how long the traveller remains in Canada.", ircc.visit],
  "visitor-record": ["visitor record Canada", "Visitor record Canada", "Plan an extension, maintained status, restoration and documents before the authorized stay ends.", "A visitor record extends or changes stay conditions; it is not a visa and does not by itself authorize re-entry.", ircc.visit],
  "visitor-visa": ["Canada visitor visa", "Canada visitor visa", "Build a temporary purpose, funds, home-country ties, travel history and admissibility record.", "A visitor visa file must make the temporary trip believable through a coherent itinerary and return plan.", ircc.visit],
  "work-permit": ["Canada work permit", "Canada work permit", "Compare LMIA, LMIA-exempt, open, PGWP and employer-specific routes.", "The correct permit depends on job, employer, worker, exemption or LMIA basis, status and travel document.", ircc.work],
};

const employerData = {
  "for-employers.md": ["employer immigration services Canada", "Employer immigration services Canada", "Plan LMIA, Global Talent Stream, recruitment, compliance and PNP employer work from one employer-side brief.", "workforce planning through post-arrival compliance", ircc.hire],
  "for-employers__employer-compliance.md": ["TFWP employer compliance Canada", "TFWP employer compliance Canada", "Prepare records, wage controls, inspection readiness and corrective plans.", "record-keeping, inspection preparation and correcting gaps before they become findings", trust.esdc],
  "for-employers__foreign-recruitment.md": ["foreign recruitment Canada", "Foreign recruitment Canada", "Connect ethical international sourcing, Job Bank activity, LMIA recruitment and transparent offers.", "ethical sourcing, transparent recruitment and evidence of a genuine vacancy", trust.jobBank],
  "for-employers__global-talent-stream.md": ["Global Talent Stream Canada", "Global Talent Stream Canada", "Review Category A or B fit, wage, Labour Market Benefits Plan and work-permit coordination.", "speed with an evidence trail that can survive scrutiny", ircc.hire],
  "for-employers__intra-company-transfer.md": ["intra-company transfer Canada", "Intra-company transfer Canada", "Prove the corporate connection, qualifying role, Canadian entity and worker history.", "showing the relationship between entities and the worker's actual role", ircc.work],
  "for-employers__lmia-exempt.md": ["LMIA-exempt employer Canada", "LMIA-exempt employer Canada", "Identify the exemption code, employer submission and worker evidence before the offer.", "making the exemption, offer, fee and documents line up", ircc.work],
  "for-employers__lmia-refusal.md": ["LMIA refusal Canada", "LMIA refusal Canada", "Audit the stated concern, recruitment, wage, business and transition evidence before reapplying.", "turning a refusal letter into a corrective-action list", ircc.hire],
  "for-employers__lmia.md": ["LMIA employer services Canada", "LMIA employer services Canada", "Prepare high-wage, low-wage and agricultural LMIA evidence around a genuine vacancy.", "building the vacancy narrative from business need through employment terms", ircc.hire],
  "for-employers__pnp-employer-support.md": ["PNP employer support Canada", "PNP employer support Canada", "Align job, wage, employer, recruitment and worker records with a province's live stream.", "keeping the employer record synchronized with provincial rules", ircc.pnp],
};

const toolData = {
  "tools.md": ["Canada immigration calculators", "Canada immigration calculators", "CRS, CLB, FSW, PNP and RCIP screening tools", ircc.hub],
  "tools__alberta-pnp-calculator.md": ["Alberta PNP calculator", "Alberta PNP calculator", "AAIP profile screening", provinces.alberta[2]],
  "tools__bc-pnp-calculator.md": ["BC PNP calculator", "BC PNP calculator", "SIRS and Skills Immigration screening", provinces["british-columbia"][2]],
  "tools__clb-calculator.md": ["CLB calculator", "CLB calculator", "IELTS, CELPIP, PTE, TEF and TCF benchmark planning", ircc.express],
  "tools__crs-calculator.md": ["CRS calculator Canada", "CRS calculator Canada", "Express Entry score planning", ircc.rounds],
  "tools__fsw-67-point-calculator.md": ["FSW 67-point calculator", "FSW 67-point calculator", "Federal Skilled Worker screening", ircc.fsw],
  "tools__manitoba-pnp-calculator.md": ["Manitoba PNP calculator", "Manitoba PNP calculator", "MPNP EOI screening", provinces.manitoba[2]],
  "tools__new-brunswick-pnp-calculator.md": ["New Brunswick PNP calculator", "New Brunswick PNP calculator", "NBPNP stream matching", provinces["new-brunswick"][2]],
  "tools__newfoundland-pnp-calculator.md": ["Newfoundland PNP calculator", "Newfoundland PNP calculator", "NLPNP profile screening", provinces.newfoundland[2]],
  "tools__nova-scotia-pnp-calculator.md": ["Nova Scotia PNP calculator", "Nova Scotia PNP calculator", "NSNP and Atlantic screening", provinces["nova-scotia"][2]],
  "tools__oinp-calculator.md": ["OINP calculator", "OINP calculator", "Ontario EOI and job-offer screening", provinces.ontario[2]],
  "tools__rcip-calculator.md": ["RCIP calculator Canada", "RCIP calculator Canada", "Rural Community Immigration Pilot screening", ircc.pnp],
  "tools__sinp-calculator.md": ["SINP calculator", "SINP calculator", "Saskatchewan EOI screening", provinces.saskatchewan[2]],
};

const blogData = {
  "blog__canada-visitor-visa-refused-what-to-do.md": ["Canada visitor visa refused", "Canada visitor visa refused", "Read the refusal as an evidence map, then build a purposeful reapplication.", ircc.visit],
  "blog__canada-work-permit-types-guide-2026.md": ["Canada work permit types", "Canada work permit types", "Classify the job and worker before choosing LMIA, exemption, open or graduate options.", ircc.work],
  "blog__express-entry-beginners-guide-2026.md": ["Express Entry Canada 2026", "Express Entry for beginners", "Separate eligibility, pool ranking, invitation and the final PR application.", ircc.expressHow],
  "blog__express-entry-category-based-selection-2026.md": ["Express Entry category-based selection", "Express Entry category selection", "Category eligibility depends on defined work or language evidence and the round instructions.", ircc.categories],
  "blog__express-entry-crs-score-explained.md": ["CRS score Canada", "CRS score explained", "Turn the score breakdown into a prioritized improvement plan rather than chasing a historical cutoff.", ircc.rounds],
  "blog__express-entry-vs-pnp-which-is-right-for-you.md": ["Express Entry vs PNP", "Express Entry or PNP", "Compare a national pool strategy with a province-specific nomination.", ircc.pnp],
  "blog__how-to-choose-immigration-consultant-brampton-2026.md": ["Brampton immigration consultant", "Choosing a Brampton immigration consultant", "Verify the individual licence, service scope, fees and relevant experience.", trust.register],
  "blog__how-to-choose-immigration-consultant-canada-2026.md": ["immigration consultant Canada", "Choosing a Canadian immigration consultant", "Use a licensing and scope checklist before retaining a representative.", trust.register],
  "blog__immigration-application-refused-what-to-do-next.md": ["immigration refusal Canada", "Immigration refusal in Canada", "Secure the decision and deadline, then match the remedy to the error.", ircc.hub],
  "blog__international-student-to-canadian-pr-guide.md": ["international student to Canadian PR", "Student to Canadian PR", "Treat school choice, work authorization and future PR as one timeline.", ircc.pgwp],
  "blog__lmia-canada-explained-2026.md": ["LMIA Canada explained", "LMIA Canada explained", "Keep the employer's labour-market case separate from the worker's permit application.", ircc.hire],
  "blog__ontario-pnp-oinp-guide-2026.md": ["Ontario PNP 2026", "Ontario PNP and OINP", "Read the live stream notice instead of relying on last year's checklist.", provinces.ontario[2]],
  "blog__spousal-sponsorship-canada-guide-2026.md": ["spousal sponsorship Canada", "Spousal sponsorship in Canada", "Build a relationship record by chronology, quality and explanation.", ircc.family],
  "blog__work-permit-to-canadian-pr-pathways.md": ["work permit to PR Canada", "Work permit to PR", "Compare CEC, PNP, regional and employer routes before the permit clock runs down.", ircc.cec],
};

const resourceData = {
  "resources.md": ["Canada immigration resources", "Canada immigration resources", "Use checklists and official links to turn research into a filing plan."],
  "resources__document-checklist.md": ["Canada immigration document checklist", "Canada immigration document checklists", "Separate mandatory, conditional and explanatory evidence."],
  "resources__document-checklist__express-entry.md": ["Express Entry document checklist", "Express Entry document checklist", "Make each profile claim provable before the ITA clock starts."],
  "resources__document-checklist__spousal-sponsorship.md": ["spousal sponsorship document checklist", "Spousal sponsorship document checklist", "Organize evidence around a dated relationship timeline."],
  "resources__document-checklist__study-permit.md": ["study permit document checklist", "Study permit document checklist", "Connect the program, funds, purpose and compliance plan."],
  "resources__document-checklist__visitor-visa.md": ["visitor visa document checklist Canada", "Visitor visa document checklist", "Prove the temporary trip and the reason to return."],
  "resources__document-checklist__work-permit.md": ["work permit document checklist Canada", "Work permit document checklist", "Make worker, employer, job and LMIA or exemption evidence agree."],
  "resources__processing-times.md": ["IRCC processing times 2026", "IRCC processing times", "Use the estimate without treating it as a promise; protect status and respond to requests."],
};

const supportData = {
  "index.md": ["licensed RCIC immigration consultant Canada", "Licensed RCIC Immigration Consultants Canada", "A clearer Canadian immigration plan built around your facts.", "Immigration decisions get easier when the program, evidence, deadline and next step are visible in one plan."],
  "about-us.md": ["licensed RCIC immigration consultant", "About VMC Immigration Services", "Regulated advice with a human voice.", "Immigration work is personal, technical and time-sensitive. Our approach is to understand the facts first and explain the routes plainly."],
  "assessment.md": ["free Canada immigration assessment", "Free Canada Immigration Assessment", "Find the strongest next question before paying application fees.", "A useful assessment narrows the search: which programs fit, what evidence is missing, what deadline matters and what improvement could change the result."],
  "book.md": ["book immigration consultation Canada", "Book a Canada Immigration Consultation", "A consultation that ends with a decision map.", "A paid consultation is most useful when it answers a defined question. Bring the relevant documents and leave with a clearer route and evidence plan."],
  "contact-us.md": ["contact immigration consultant Brampton", "Contact a Licensed RCIC in Brampton", "Bring us the immigration question you are trying to solve.", "Tell us where you are, what you want to do in Canada and what has already happened."],
  "disclaimer.md": ["Canada immigration disclaimer", "Canada Immigration Information Disclaimer", "General information is a starting point, not a result.", "Immigration rules, forms, fees, programs and processing times change. Check official sources before acting."],
  "draw-results.md": ["Express Entry draw results 2026", "Express Entry Draw Results 2026", "Read the round type before the cutoff.", "A CRS cutoff is meaningful only with its date, draw type, invitation count and eligibility criteria."],
  "faqs.md": ["Canada immigration FAQs", "Canada Immigration FAQs", "Direct answers before you file.", "The best answer depends on the program and the facts. These answers point you toward the right official source."],
  "for-individuals.md": ["Canada immigration services for individuals", "Canada Immigration Services for Individuals", "Immigration services built around your real life.", "Your file is not a form-filling exercise. It is a chain of decisions about status, evidence, timing, family, work and study."],
  "how-it-works.md": ["how immigration consulting works Canada", "How Canada Immigration Consulting Works", "A visible workflow from profile review to submission.", "Good representation makes clear what is assessed, what you provide, what the representative does and what remains your decision."],
  "immigrate.md": ["immigrate to Canada", "Immigrate to Canada", "Compare the route before you commit.", "Permanent residence can be federal, provincial, family-based, business-led or community-linked."],
  "immigration-consultant.md": ["immigration consultant Canada", "Immigration Consultant Canada", "Licensed guidance with a clear scope.", "A regulated consultant should make decisions clearer, evidence more organized and deadlines easier to manage."],
  "immigration-draws.md": ["Canada immigration draws 2026", "Canada Immigration Draws 2026", "Connect each invitation to the program behind it.", "Draw news is useful only when you know what was invited, who was eligible and which authority ran the round."],
  "pay.md": ["pay immigration consultation Canada", "Secure Payment for Immigration Services", "Pay only after the service scope is clear.", "Before paying, make sure the invoice, service, timing and contact person match the written agreement."],
  "pnp-draws.md": ["PNP draw results 2026", "PNP Draw Results 2026", "Compare the stream, not just the score.", "Provincial draw results are snapshots of a stream's invitation strategy."],
  "privacy.md": ["VMC privacy policy", "Privacy Policy | VMC Immigration Services", "Protecting the information inside an immigration enquiry.", "Immigration enquiries can include identity, family, education, employment, financial, health and status information."],
  "refusals.md": ["Canada visa refusal help", "Canada Visa Refusal Help", "A refusal needs a diagnosis before a response.", "A refusal is a decision on the record the officer saw. Identify the concern and remedy before filing again."],
  "special-measures.md": ["Canada immigration special measures 2026", "Canada Immigration Special Measures", "Check status, eligibility and expiry.", "Special measures are temporary and fact-specific. A measure may apply only to certain people, dates or locations."],
  "team.md": ["licensed RCIC team Canada", "Meet Our Licensed RCIC Team", "The people behind the immigration plan.", "A good file is collaborative: you bring the lived facts and the representative brings program knowledge and process discipline."],
  "terms.md": ["VMC terms of service", "Terms of Service | VMC Immigration Services", "The terms governing this website and its services.", "Using this website means you agree to use its pages, tools, forms, links and contact channels lawfully."],
  "work-study.md": ["work and study in Canada", "Work and Study in Canada", "Make the temporary plan sustainable.", "Study and work decisions are connected by status, funds, program choice, job duties and timing."],
};

const focusedData = {
  "appeals__criminal-inadmissibility.md": ["criminal inadmissibility Canada", "Criminal Inadmissibility Canada 2026 | Rehabilitation and TRP", "Criminal inadmissibility to Canada: choose the remedy before travel", "Review criminal inadmissibility, rehabilitation, deemed rehabilitation and TRP options with evidence-led guidance before you book a trip.", "A criminal record can affect entry, a visa, a work permit or permanent residence. The offence, sentence, completion date, Canadian equivalency and purpose of travel determine the route.", "Start with the complete court disposition, sentence, police records, passport history and rehabilitation evidence. A criminal-record label alone is not enough to decide whether rehabilitation or a TRP is available.", "No. A TRP can provide temporary permission to enter despite inadmissibility, while rehabilitation may address future admissibility in defined cases. The correct option depends on the legal record and the reason for travel.", [trust.cbsa, ircc.visit, ircc.work, trust.register]],
  "appeals__judicial-review.md": ["immigration judicial review Canada", "Immigration Judicial Review Canada 2026 | Federal Court", "Judicial review: a Federal Court pathway after an immigration decision", "Understand Federal Court judicial review, leave, stays, mandamus, deadlines and the difference between review and a fresh application.", "Judicial review asks the Federal Court to assess the legality and reasonableness of a decision. It is not a second merits application and strict deadlines apply.", "Save the decision, application, correspondence, GCMS or record, and date received. Speak with an immigration lawyer promptly; an RCIC can help with immigration-file context but cannot act as Federal Court counsel.", "Judicial review is generally based on the record before the decision-maker, subject to limited exceptions. It is not a normal appeal with a new evidence package.", [trust.court, ircc.hub, trust.register]],
  "appeals__misrepresentation.md": ["misrepresentation Canada immigration", "Misrepresentation Canada Immigration 2026 | PFL Response", "Misrepresentation to IRCC: answer the record before the ban starts", "Facing a misrepresentation concern? Review PFL response strategy, evidence, consequences and legal referral needs before sending a rushed reply.", "Misrepresentation can involve a false statement, omission or document issue that affects a decision. The response must identify what was submitted, what was true, what mattered and whether procedural fairness was provided.", "Collect the application, forms, translations, correspondence, refusal or PFL and a dated explanation. Do not submit a new story without understanding the original record and the response deadline.", "A finding can create a five-year inadmissibility consequence, subject to the facts and decision. Get urgent advice before a PFL deadline or new application is submitted.", [ircc.hub, trust.cbsa, trust.register, trust.court]],
  "appeals__trp.md": ["Temporary Resident Permit Canada", "Temporary Resident Permit Canada 2026 | TRP Case Strategy", "Temporary Resident Permit: make the need to enter understandable", "Assess a Canadian Temporary Resident Permit for criminal, medical or other inadmissibility with purpose-of-entry and risk evidence guidance.", "A TRP is discretionary temporary permission for someone who is otherwise inadmissible. The case must explain the need to enter, benefit, risk, conditions and length of stay.", "Document the inadmissibility, exact trip, dates, Canadian host or employer, consequences of refusal, safeguards and return plan. A vague invitation is rarely enough for a discretionary decision.", "No. A TRP is temporary and discretionary; it can permit entry for a defined period but does not erase the underlying inadmissibility or guarantee a future permit or visa.", [trust.cbsa, ircc.visit, ircc.work, trust.register]],
  "special-measures__gaza.md": ["Gaza immigration Canada", "Gaza and Palestine Canada Immigration 2026 | Official Measures", "Gaza and Palestine measures: check eligibility, dates and status", "Review Canada's current immigration measures for Palestinians and eligible family members from Gaza with official notices and status planning.", "Palestine-related measures can depend on location, family relationship, arrival date, permit history and the expiry date of the temporary policy. Read the live notice before relying on an older route.", "Start with the [current IRCC situations-abroad page](" + ircc.special + ") and the [specific Palestine notice](https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/canada-updates-temporary-measures-palestinians.html). Save passport, family, arrival, status, permit and application records.", "Special measures may provide temporary status, permits, fee relief or a family process; they may not create permanent residence. Confirm the exact relief in the current notice.", ["https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/canada-updates-temporary-measures-palestinians.html", ircc.special, ircc.family, ircc.work, trust.register]],
  "special-measures__iran.md": ["Iran immigration Canada", "Iran Immigration Measures Canada 2026 | Status and Work", "Iran immigration measures: check the permit date before acting", "Review Canada's current temporary measures for eligible Iranian nationals, including work-permit extensions and regular visitor or study options.", "Iran-related measures are targeted and time-limited. Eligibility may depend on when a permit was issued, where the applicant is and which status they want to extend.", "Open the [official IRCC notice for Iranian nationals](https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/canada-extends-certain-temporary-special-measures-iranian-nationals.html) and record the permit issue date, current status, passport and requested extension.", "No. The current notice sets specific eligibility and expiry conditions. People who do not qualify may need the regular visitor, study, work or permanent-residence process.", ["https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/canada-extends-certain-temporary-special-measures-iranian-nationals.html", ircc.special, ircc.work, ircc.study, trust.register]],
  "special-measures__ukraine.md": ["Ukraine immigration Canada", "Ukraine Immigration Options Canada 2026 | Status Guide", "Ukraine immigration options: confirm temporary status and the next route", "Review Ukraine-related immigration options, CUAET history, temporary status, work permits, family pathways and current IRCC notices.", "Ukraine-related measures have changed over time. The next step depends on arrival date, current status, permit history, family facts and whether the goal is temporary protection or permanent residence.", "Start with IRCC's [current response to situations abroad](" + ircc.special + ") and confirm arrival and permit records. Compare regular work, study, family, Express Entry, PNP or humanitarian options as appropriate.", "Do not assume a historic CUAET intake remains open. Check the current IRCC notice for who can apply, which extensions are available and the deadline that applies.", [ircc.special, ircc.work, ircc.study, ircc.family, trust.register]],
};

function sourceMeta(file) {
  const raw = fs.readFileSync(path.join(sourceDir, file), "utf8");
  return {
    originalUrl: raw.match(/^> \*\*Source URL:\*\* (.+)$/m)?.[1]?.trim() || "",
    priority: raw.match(/^> \*\*Sitemap priority:\*\* (.+)$/m)?.[1]?.trim() || "0.7",
  };
}

function legacyRoute(file) {
  const base = file.replace(/\.md$/, "");
  return base === "index" ? "/" : "/" + base.split("__").join("/");
}

function slugify(value) {
  return clean(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/\b(?:vmc|visa master canada|visa master)\b/gi, "")
    .replace(/\b20\d{2}\b/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 78)
    .replace(/-+$/, "");
}

function filenameForPath(pathname) {
  if (pathname === "/") return "index.md";
  return pathname.replace(/^\//, "").replaceAll("/", "__") + ".md";
}

const routeSlugOverrides = {
  "about-us.md": "about-commonwealth-migration",
  "blog.md": "canada-immigration-guides",
  "blog__express-entry-beginners-guide-2026.md": "express-entry-beginners-guide",
  "blog__how-to-choose-immigration-consultant-brampton-2026.md": "choose-brampton-immigration-consultant",
  "blog__how-to-choose-immigration-consultant-canada-2026.md": "choose-immigration-consultant-canada",
  "immigration-consultant.md": "canada-immigration-consultant",
  "immigration__express-entry.md": "express-entry-canada",
  "immigration__spousal-sponsorship.md": "spousal-sponsorship-canada",
};

const previousFlatRouteOverrides = {
  "about-us.md": "about-commonwealth-migration",
  "blog.md": "canada-immigration-guides",
  "blog__express-entry-beginners-guide-2026.md": "express-entry-beginners-guide",
  "blog__how-to-choose-immigration-consultant-brampton-2026.md": "choose-brampton-immigration-consultant",
  "blog__how-to-choose-immigration-consultant-canada-2026.md": "choose-immigration-consultant-canada",
  "immigration-consultant.md": "canada-immigration-consultant",
  "immigration__express-entry.md": "express-entry-immigration-canada",
  "immigration__spousal-sponsorship.md": "spousal-sponsorship-program-canada",
};

const workStudyKeys = new Set([
  "caregiver",
  "eta",
  "iec",
  "lmia-exempt",
  "lmia",
  "open-work-permit",
  "pgwp",
  "spousal-work-permit",
  "study-permit",
  "super-visa",
  "transit-visa",
  "visitor-record",
  "visitor-visa",
  "work-permit",
]);

const sponsorStatusKeys = new Set([
  "citizenship",
  "family-sponsorship",
  "pgp",
  "pr-card",
  "spousal-sponsorship",
]);

function pageNameFor(file, spec) {
  if (routeSlugOverrides[file]) return routeSlugOverrides[file];
  if (file.startsWith("immigration__pnp__")) {
    const key = file.replace(/^immigration__pnp__/, "").replace(/\.md$/, "");
    const province = provinces[key];
    if (province) {
      if (key === "oinp-express-entry") return "ontario-express-entry-pnp";
      if (key === "northern") return "northern-territories-immigration";
      return slugify(province[0] + " PNP");
    }
  }
  if (file.startsWith("tools__")) {
    const toolSlug = slugify(spec.keyword || spec.h1 || label(file));
    return toolSlug.endsWith("-canada") ? toolSlug : toolSlug + "-canada";
  }
  if (file.startsWith("immigrate__")) {
    return slugify((spec.keyword || "").replace(/^immigrate to Canada\s+/i, ""));
  }
  return slugify(spec.keyword || spec.h1 || label(file));
}

function pagePathFor(file, spec) {
  if (file === "index.md") return "/";
  const pageName = pageNameFor(file, spec);
  if (file === "immigration.md") return "/immigration/" + pageName;
  if (file.startsWith("immigration__pnp__")) return "/immigration/provincial-nominee-program/" + pageName;
  if (file.startsWith("immigration__")) {
    const immigrationKey = file.replace(/^immigration__/, "").replace(/\.md$/, "");
    if (workStudyKeys.has(immigrationKey)) return "/work-study/" + pageName;
    if (sponsorStatusKeys.has(immigrationKey)) return "/sponsor-status/" + pageName;
    return "/immigration/" + pageName;
  }
  if (file === "immigrate.md") return "/immigrate-to-canada";
  if (file.startsWith("immigrate__")) return "/immigrate-to-canada/" + pageName;
  if (file === "immigration-consultant.md" || file.startsWith("immigration-consultant__")) return "/immigration-consultant/" + pageName;
  if (file === "blog.md" || file.startsWith("blog__")) return "/blog/" + pageName;
  if (file === "resources.md" || file.startsWith("resources__processing")) return "/resources/" + pageName;
  if (file === "resources__document-checklist.md") return "/resources/document-checklist/" + pageName;
  if (file.startsWith("resources__document-checklist__")) return "/resources/document-checklist/" + pageName;
  if (file === "tools.md" || file.startsWith("tools__")) return "/tools/" + pageName;
  if (file === "for-employers.md" || file.startsWith("for-employers__")) return "/employers/" + pageName;
  if (file === "special-measures.md" || file.startsWith("special-measures__")) return "/special-measures/" + pageName;
  if (file === "about-us.md" || file === "team.md" || file === "how-it-works.md") return "/about/" + pageName;
  if (file === "contact-us.md" || file === "book.md" || file === "pay.md") return "/contact/" + pageName;
  if (file === "assessment.md") return "/assessment/" + pageName;
  if (file === "for-individuals.md") return "/immigration-services/" + pageName;
  if (file === "refusals.md" || file.startsWith("appeals__")) return "/appeals/" + pageName;
  if (file === "immigration-draws.md" || file === "pnp-draws.md" || file === "draw-results.md" || file === "faqs.md") return "/resources/" + pageName;
  if (file === "privacy.md" || file === "terms.md" || file === "disclaimer.md") return "/legal/" + pageName;
  if (file === "work-study.md") return "/work-study/" + pageName;
  return "/" + pageName;
}

function previousFlatRouteMap(files) {
  const used = new Set();
  const paths = new Map();
  for (const file of files) {
    const spec = makeSpec(file);
    if (file === "index.md") {
      paths.set(file, "/");
      continue;
    }
    let slug = previousFlatRouteOverrides[file] || slugify(spec.keyword || spec.h1 || label(file));
    if (!slug) slug = slugify(label(file));
    if (used.has(slug)) slug = slugify(spec.h1 || label(file));
    if (used.has(slug)) slug = slugify(slug + " " + label(file));
    if (used.has(slug)) {
      const baseSlug = slug;
      let suffix = 2;
      while (used.has(slug)) slug = baseSlug + "-" + suffix++;
    }
    used.add(slug);
    paths.set(file, "/" + slug);
  }
  return paths;
}

function publicSpec(spec) {
  const replace = (value) => {
    if (typeof value === "string") {
      return value
        .replaceAll("Visa Master Canada", "Commonwealth Migration Canada")
        .replaceAll("Visa Master Can", "Commonwealth Migration")
        .replaceAll("Visa Master", "Commonwealth Migration")
        .replaceAll("VMC Immigration Services", "Commonwealth Migration Canada")
        .replaceAll("VMC Employer Immigration", "Commonwealth Migration Employer Immigration")
        .replaceAll("VMC Immigration", "Commonwealth Migration")
        .replaceAll("VMC", "Commonwealth Migration");
    }
    if (Array.isArray(value)) return value.map(replace);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replace(item)]));
    return value;
  };
  return replace(spec);
}

function label(file) {
  return file.replace(/\.md$/, "").split("__").join(" / ").replaceAll("-", " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
}

function clean(value) {
  return value.replace(/\s+/g, " ").trim();
}

function seoTitle(value, keyword) {
  let title = clean(value);
  if (title.length > 65) title = clean(keyword + " 2026 | Commonwealth Migration");
  if (title.length > 65) title = clean(title.slice(0, 62).replace(/\s+\S*$/, "") + " | Commonwealth");
  if (title.length < 35) title = title + " | Canada";
  return title;
}

function seoDescription(value) {
  let description = clean(value);
  if (description.length > 165) {
    const firstSentence = description.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim();
    if (firstSentence && firstSentence.length >= 100) description = firstSentence;
  }
  if (description.length < 135) description += " See official rules before applying.";
  if (description.length < 135) description += " Canada-wide RCIC guidance available.";
  if (description.length > 165) description = clean(description.slice(0, 160).replace(/\s+\S*$/, "").replace(/[.!?]+$/, "")) + ".";
  return description;
}

function linksFor(spec, sourceUrl) {
  const list = (spec.links || []).slice();
  if (!list.includes(trust.register)) list.push(trust.register);
  if (sourceUrl.startsWith("https://www.canada.ca") && !list.includes(sourceUrl)) list.push(sourceUrl);
  const names = {};
  names[ircc.hub] = "official IRCC immigration hub";
  names[ircc.express] = "official IRCC Express Entry guide";
  names[ircc.expressHow] = "IRCC: how Express Entry works";
  names[ircc.categories] = "IRCC: category-based selection";
  names[ircc.rounds] = "IRCC: rounds of invitations";
  names[ircc.documents] = "IRCC: Express Entry documents";
  names[ircc.fsw] = "IRCC: Federal Skilled Worker eligibility";
  names[ircc.cec] = "IRCC: Canadian Experience Class eligibility";
  names[ircc.fst] = "IRCC: Federal Skilled Trades eligibility";
  names[ircc.pnp] = "IRCC: Provincial Nominee Program";
  names[ircc.family] = "IRCC: family sponsorship";
  names[ircc.work] = "IRCC: work permit requirements";
  names[ircc.hire] = "IRCC: hire a foreign worker";
  names[ircc.study] = "IRCC: study permit guide";
  names[ircc.studyEligibility] = "IRCC: study permit eligibility";
  names[ircc.studentWork] = "IRCC: work as a student";
  names[ircc.pgwp] = "IRCC: work after graduation";
  names[ircc.pgwpField] = "IRCC: PGWP field-of-study rules";
  names[ircc.visit] = "IRCC: visit Canada";
  names[ircc.eta] = "IRCC: eTA requirements";
  names[ircc.superVisa] = "IRCC: Super Visa";
  names[ircc.superVisaEligibility] = "IRCC: Super Visa eligibility";
  names[ircc.parents] = "IRCC: Parents and Grandparents Program";
  names[ircc.citizenship] = "IRCC: Canadian citizenship";
  names[ircc.prCard] = "IRCC: PR card";
  names[ircc.startup] = "IRCC: Start-Up Visa";
  names[ircc.refugees] = "IRCC: refugee protection";
  names[ircc.processing] = "IRCC: check processing times";
  names[ircc.special] = "IRCC: special measures abroad";
  names[trust.register] = "verify an RCIC on the CICC register";
  names[trust.jobBank] = "Government of Canada Job Bank";
  names[trust.esdc] = "ESDC temporary foreign worker guidance";
  names[trust.irb] = "Immigration and Refugee Board of Canada";
  names[trust.court] = "Federal Court of Canada";
  names[trust.cbsa] = "Canada Border Services Agency";
  const unique = [];
  for (const url of list) if (url && !unique.some(function (row) { return row[1] === url; })) unique.push([names[url] || "official program source", url]);
  return unique.slice(0, 6);
}

function hash(text) {
  let n = 0;
  for (const ch of text) n = (n * 31 + ch.charCodeAt(0)) >>> 0;
  return n;
}

function paragraphSections(spec, file) {
  const v = hash(file) % 4;
  if (spec.kind === "program") {
    const names = [
      spec.keyword + ": where this route can fit",
      "The evidence behind the decision",
      "The question to answer before applying",
      "Build a plan that survives a policy change",
    ];
    const lead = [
      "Use the " + spec.keyword + " route only after comparing your status, work, language, education, family, funds and destination. " + spec.angle.replace(/[.]+$/, "") + ".",
      "Start with the dates and documents that prove the claim. Work letters should describe duties; education should be verified; funds should have a traceable source; family and travel history should be consistent.",
      "Ask whether the route is open, whether you meet every threshold, and whether you can prove the facts. If one link is weak, fix that link before adding more generic documents.",
      "Keep a primary route and a practical alternative. Record expiry dates, language validity, status, intake windows and the official page used for each decision.",
    ];
    return [
      { h: names[v], text: lead[v], bullets: spec.fit },
      { h: "What to prepare before a submission", text: spec.prepare, bullets: ["check names and dates across documents", "explain gaps instead of hiding them", "verify the live official instructions"] },
      { h: "A direct answer for applicants", text: spec.answer, bullets: ["review the current program page", "keep a copy of the submitted record", "track requests and expiry dates"] },
    ];
  }
  if (spec.kind === "province") return [
    { h: "What " + spec.short + " is really assessing", text: spec.angle.replace(/[.]+$/, "") + ". A nomination is about more than a points result; job, employer, occupation, language, education, experience and genuine settlement intent must line up.", bullets: ["confirm the stream is open", "check the employer and job", "record every EOI answer"] },
    { h: "Prepare evidence that tells one story", text: "Keep the job offer, wage, duties, employer documents, work history, language result, education and status records together. If a material fact changes, update the province and the federal file.", bullets: ["match duties to the occupation", "save dated employer records", "do not reuse an outdated profile"] },
    { h: "How the nomination becomes PR", text: "A nomination is provincial selection, not the final federal decision. Depending on the stream, the applicant continues through Express Entry or a non-Express Entry process. Check the official instructions for the current sequence.", bullets: ["understand the federal stage", "plan funds and admissibility", "keep provincial intent credible"] },
  ];
  if (spec.kind === "country") return [
    { h: "Start with the " + spec.keyword + " document trail", text: spec.angle.replace(/[.]+$/, "") + ". Reconcile names, dates, employers, education records, police certificates, translations, funds and travel history before a form is opened.", bullets: ["record current residence status", "keep source documents available", "explain gaps early"] },
    { h: "Compare the routes honestly", text: "Express Entry and PNP are common PR routes, while work, study, visitor and family programs have different tests. A temporary visa is not automatically a permanent-residence pathway.", bullets: ["test federal eligibility", "research provincial fit", "protect temporary status"] },
    { h: "Answer the question officers will ask", text: "The strongest file makes the applicant's plan, evidence, funds, history and intended destination understandable. Use the official IRCC page for current criteria and a licensed review for complex facts.", bullets: ["state the purpose clearly", "connect funds to the plan", "keep every form consistent"] },
  ];
  if (spec.kind === "city") return [
    { h: "Finding a " + spec.keyword + " with federal accuracy", text: spec.angle.replace(/[.]+$/, "") + ". Local convenience should make reviews easier, not replace the federal or provincial rules that decide the application.", bullets: ["bring the actual documents", "state the deadline", "ask what the service includes"] },
    { h: "Who we help", text: "Individuals and families may need Express Entry, PNP, work, study, visitor, sponsorship, status, refusal or citizenship guidance. Employers may need LMIA, Global Talent Stream, recruitment, compliance or PNP support.", bullets: ["permanent residence planning", "temporary status and permits", "employer-side immigration"] },
    { h: "Verify the representative", text: "Use the CICC register to confirm the individual's licence. Ask for a written scope, fees, communication plan and copies of your records before retaining anyone.", bullets: ["verify the person, not only the brand", "avoid approval guarantees", "keep your own file copies"] },
  ];
  if (spec.kind === "employer") return [
    { h: spec.keyword + ": the employer decision before the form", text: "Fix the vacancy, wage, location, duties, start date, candidate, recruitment history and immigration basis first. " + spec.angle.replace(/[.]+$/, "") + ".", bullets: ["classify LMIA or exemption", "confirm wage and duties", "separate employer and worker steps"] },
    { h: "A record another reviewer can follow", text: "Keep business, recruitment, payroll, corporate, offer and worker documents in one chronology. Preserve the records required by the current Government of Canada and provincial process.", bullets: ["keep recruitment evidence", "document changes", "use transparent worker communications"] },
    { h: "Compliance continues after approval", text: "Track the permit, wage, duties, worksite, employer commitments, inspections, requests and expiry dates. Immigration support is not complete simply because the worker has arrived.", bullets: ["calendar every deadline", "store records securely", "escalate issues early"] },
  ];
  if (spec.kind === "tool") return [
    { h: "Use the " + spec.keyword + " in three passes", text: "Enter the facts you know, review which input has the biggest effect, and compare the estimate with the current official criteria. The result is " + spec.result + ".", bullets: ["use supportable inputs", "check test and document dates", "save the questions it creates"] },
    { h: "What the estimate can reveal", text: "A tool can show whether language, education, work, age, employer, province or family factors deserve attention. It cannot verify your documents or predict a future invitation.", bullets: ["find the strongest lever", "spot a missing document", "compare a backup route"] },
    { h: "What the tool cannot decide", text: "The result is not an ITA, nomination, work permit, study permit, visitor visa or PR approval. Refusal, inadmissibility, status and complex family facts need a file-specific review.", bullets: ["read the official source", "do not rely on historical cutoffs", "ask a licensed RCIC when facts are complex"] },
  ];
  if (spec.kind === "blog") return [
    { h: "The " + spec.keyword + " question", text: spec.angle.replace(/[.]+$/, "") + ". Start with the decision, date and document record rather than a generic checklist.", bullets: ["save the official notice", "separate rule from assumption", "write down the deadline"] },
    { h: "What to check in your own file", text: "Compare the official criteria with your forms, status, employment, education, funds, family, travel and prior applications. If the evidence does not support the answer, fix the record before filing.", bullets: ["label the evidence", "explain gaps", "keep changes transparent"] },
    { h: "A practical takeaway", text: "Use this guide to prepare better questions, then verify the live Government of Canada or provincial page. A past draw, policy, checklist or processing estimate is not a promise about the next case.", bullets: ["confirm the current rule", "choose the correct remedy", "keep a complete application copy"] },
  ];
  if (spec.kind === "resource") return [
    { h: "Use the " + spec.keyword + " as a control sheet", text: spec.angle.replace(/[.]+$/, "") + ". Add a status column, document owner, date obtained, translation need, expiry date and the form or question each document supports.", bullets: ["mark required and conditional items", "track translations", "check signatures and dates"] },
    { h: "Documents that need context", text: "A checklist cannot explain why employment changed, funds moved, a relationship developed across borders, a study gap exists or a previous file was refused. Add a concise explanation supported by records.", bullets: ["write a dated timeline", "use primary evidence", "avoid unexplained contradictions"] },
    { h: "Final review", text: "Compare names and dates across passports, forms, letters, police certificates, medicals, bank records and travel history. Then open the official source one more time before filing.", bullets: ["check the live form", "confirm fees", "save the final package"] },
  ];
  if (spec.kind === "focus") return [
    { h: "Start with " + spec.keyword + " and the deadline", text: spec.angle, bullets: ["save the complete decision", "record when it was received", "identify the decision-maker"] },
    { h: "Build the response around the record", text: "Collect the forms, documents, correspondence, translations, status history and evidence that the decision-maker saw. Explain the important fact in a dated, truthful and document-supported sequence.", bullets: ["separate facts from assumptions", "answer the stated concern", "do not submit contradictory versions"] },
    { h: "Use the correct professional boundary", text: spec.answer + " Where a matter involves criminal law, Federal Court litigation, removal or another legal specialty, obtain advice from the appropriate lawyer as well as immigration support.", bullets: ["protect the response deadline", "do not travel on an assumption", "keep every submission copy"] },
  ];
  return [
    { h: "Start with the " + spec.keyword + " decision", text: spec.angle, bullets: ["name the goal", "collect the relevant dates", "identify the official source"] },
    { h: "What a careful review should cover", text: "A useful review connects eligibility, documents, timing, status, family, funds, admissibility and the next action. General information is a starting point; the record in your case controls the advice.", bullets: ["keep facts consistent", "ask about the service scope", "protect deadlines"] },
    { h: "Use official information as the final check", text: "Rules and forms can change. Open the linked IRCC, provincial, regulator, IRB or Federal Court source before relying on a date, fee, score, program status or processing estimate.", bullets: ["verify the source date", "keep a copy of your record", "seek specialist help when needed"] },
  ];
}

function extraSections(spec, file, rows) {
  const v = hash(file) % 4;
  const primary = rows[0] || ["official Government of Canada source", ircc.hub];
  const secondary = rows[1] || ["CICC register", trust.register];
  const sourceText = "For the current rule, review the [" + primary[0] + "](" + primary[1] + ") and compare it with the [" + secondary[0] + "](" + secondary[1] + ").";
  if (spec.kind === "program") {
    const headings = ["The evidence that earns trust", "Common mistakes to remove early", "A second route can reduce pressure", "Keep the calendar visible"];
    const texts = [
      "A decision-maker should be able to trace the answer from the form to a dated document. For " + spec.keyword + ", explain unusual work, study, family, travel or funding facts instead of expecting a checklist to explain them.",
      "The most expensive mistakes are often ordinary: an expired language test, a job letter that lists a title but no duties, an unexplained status gap, an unverified translation, or a form answer that conflicts with an older application.",
      "A strong immigration plan does not depend on one draw, one employer or one intake window. Compare a federal route, a provincial option, a temporary-status plan or a family route when your facts support more than one possibility.",
      "Track passport validity, permit expiry, language validity, ECA dates, application windows, medical instructions, biometrics and response deadlines. Good timing protects otherwise usable evidence.",
    ];
    return [{ h: headings[v], text: texts[v], bullets: ["write the timeline", "label the supporting evidence", "ask what fact would change the route"] }, { h: "Official research to use before filing", text: sourceText + " These links are research anchors; the final application should use the current forms and instructions for your exact situation.", bullets: ["check the page date", "save the official checklist", "keep the submitted package"] }];
  }
  if (spec.kind === "province") return [{ h: "A provincial score is not an approval", text: "An EOI, registration or invitation is a step in the provincial process. The nomination and federal PR stages still depend on eligibility, admissibility, complete evidence and honest updates.", bullets: ["do not rely on an old cutoff", "keep the province informed of changes", "separate provincial and federal evidence"] }, { h: "Use the province's own source", text: sourceText + " Provincial instructions control the stream, while IRCC controls the federal permanent-residence stage.", bullets: ["confirm intake status", "check the employer rules", "review the federal process"] }];
  if (spec.kind === "country") return [{ h: "Residence is part of the story", text: "Nationality and current residence are different facts. Explain where you live, which country issued each record, how funds were earned, and why the proposed Canadian route makes sense from that position.", bullets: ["show lawful current status", "keep translations complete", "explain cross-border records"] }, { h: "Research from the official starting point", text: sourceText + " Use the country page to organize your questions, then verify the program and visa-office instructions that apply on the filing date.", bullets: ["confirm document rules", "check the correct application location", "do not copy another applicant's strategy"] }];
  if (spec.kind === "city") return [{ h: "A consultation should leave you with control", text: "You should know the proposed route, the evidence still needed, the deadline, the fee and the next decision. Local access is valuable when it improves communication and accountability.", bullets: ["ask for a written scope", "keep your own copies", "report changes promptly"] }, { h: "Independent verification matters", text: sourceText + " The regulator and official program page give you a way to check the advice before you commit.", bullets: ["verify the individual licence", "check the program authority", "avoid approval guarantees"] }];
  if (spec.kind === "employer") return [{ h: "Avoid three costly assumptions", text: "A job offer is not a permit, an LMIA is not a worker approval, and an exemption is not a waiver of employer compliance. Classify the route before recruiting or promising a start date.", bullets: ["price the complete process", "document the vacancy", "keep worker communications accurate"] }, { h: "Start with official employer guidance", text: sourceText + " Keep the employer file and worker file coordinated, but do not merge their separate legal responsibilities.", bullets: ["confirm the current stream", "preserve recruitment records", "calendar inspection and expiry risks"] }];
  if (spec.kind === "tool") return [{ h: "Turn the estimate into an action list", text: "If the result is lower than expected, do not change every part of your life at once. Identify the one or two improvements that are realistic before the next test, intake or application stage.", bullets: ["verify the input", "rank the available levers", "recalculate after a real change"] }, { h: "Read the linked source alongside the result", text: sourceText + " The source explains the legal test; the tool only helps you decide what to read next.", bullets: ["check current scoring", "review exceptions", "ask for a profile-specific assessment"] }];
  if (spec.kind === "blog") return [{ h: "What can change after publication", text: "Immigration categories, forms, fees, processing estimates, public policies and provincial intakes can change without preserving the assumptions in an older article. Treat the publication date as a prompt to verify, not as proof of currency.", bullets: ["check the live notice", "look for a new form", "recheck deadlines"] }, { h: "Keep the research chain visible", text: sourceText + " A clear source trail makes it easier to update your plan when the official instruction changes.", bullets: ["record the source date", "save the decision letter", "use current official terminology"] }];
  if (spec.kind === "resource") return [{ h: "When a checklist is not enough", text: "A missing document can be simple, but a refusal, status gap, inadmissibility concern, unusual family history or conflicting record needs interpretation. More uploads do not automatically repair a weak explanation.", bullets: ["flag material differences", "write a chronology", "get help before a deadline"] }, { h: "Use the official checklist as the final authority", text: sourceText + " This resource helps you organize the work; it does not replace the form instructions or document list for your application date.", bullets: ["confirm the program", "check country instructions", "save the completed checklist"] }];
  const supportHeadings = ["The right next step is specific", "Clarity is a trust signal", "Keep important facts together", "Research before you retain"];
  const supportTexts = [
    "A page can orient you, but the next step should name the program, document, status date, decision letter or question that needs attention.",
    "Clear scope, current sources, realistic limits and an understandable evidence plan are more useful than a broad promise of success.",
    "Passport, status, work, education, funds, family, travel and prior applications should be reviewed as one record when the decision depends on their interaction.",
    "Use the official source, regulator or decision-maker link before paying fees or sending sensitive documents. A careful intake starts with verification.",
  ];
  return [{ h: supportHeadings[v], text: supportTexts[v], bullets: ["name the decision", "collect the dates", "protect the deadline"] }, { h: "Official sources and responsible advice", text: sourceText + " When the issue is personal, urgent or legally complex, ask an authorized representative or lawyer to review the complete record.", bullets: ["verify current requirements", "keep a complete file copy", "ask who is authorized to help"] }];
}

function makeSpec(file) {
  const base = file.replace(/\.md$/, "").replace(/^immigration__/, "");
  if (focusedData[file]) {
    const f = focusedData[file];
    return { kind: "focus", keyword: f[0], title: f[1], h1: f[2], meta: f[3], hero: f[4], angle: f[5], answer: f[6], links: f[7], og: f[1] + " | VMC Immigration Services" };
  }
  if (file.startsWith("immigration__pnp__")) {
    const key = file.replace(/^immigration__pnp__/, "").replace(/\.md$/, "");
    const p = provinces[key];
    if (!p) throw new Error("Missing province " + file);
    const provincialKeyword = key === "oinp-express-entry" ? "Ontario Express Entry PNP" : p[1] + " " + p[0] + " immigration";
    const provincialH1 = key === "oinp-express-entry" ? "Ontario Express Entry PNP: check the current stream status" : p[0] + " PNP: build the provincial case around the live stream";
    const article = /^[AEIOU]/.test(p[0]) ? "An " : "A ";
    const provincialTitle = key === "oinp-express-entry" ? "Ontario Express Entry PNP 2026: Stream Status and Options" : p[0] + " PNP 2026: " + p[1] + " Streams, Jobs and PR Strategy";
    const provincialMeta = key === "northern" ? "Compare northern Canadian immigration, territorial nomination and community pathways with a licensed RCIC. Verify the live program rules." : "Review " + p[0] + " PNP and " + p[1] + " pathways, job, language, employer, EOI and Express Entry considerations with a licensed RCIC.";
    return { kind: "province", keyword: provincialKeyword, short: p[1], title: provincialTitle, h1: provincialH1, meta: provincialMeta, hero: article + p[0] + " immigration plan rewards a specific fit. Start with " + p[3] + ", then test the current stream before collecting evidence.", angle: "The official " + p[0] + " program page is the final check for the current stream, intake, occupation, job, language, employer and settlement rules.", fit: ["workers with a genuine " + p[0] + " job or occupation match", "graduates or temporary residents with a real provincial plan", "employers who need to understand the nomination role", "Express Entry candidates comparing a nomination"], prepare: "Use the official " + p[0] + " page to confirm the stream, then assemble job, wage, employer, language, education, experience, status and settlement evidence.", answer: "A desire to live in " + p[0] + " is important, but it is not the only requirement. You must meet the live stream criteria and provide the documents requested by the province and IRCC.", links: [p[2], ircc.pnp, ircc.express, trust.jobBank], og: p[1] + " guidance from VMC Immigration Services" };
  }
  if (file.startsWith("immigrate__")) {
    const c = countries[file.replace(/^immigrate__/, "").replace(/\.md$/, "")];
    if (!c) throw new Error("Missing country " + file);
    return { kind: "country", keyword: "immigrate to Canada from " + c[0], title: "Immigrate to Canada from " + c[0] + " in 2026 | Route Guide", h1: "Immigrate to Canada from " + c[0] + ": start with the evidence", meta: "Explore ways to immigrate to Canada from " + c[0] + ", including Express Entry, PNP, study, work, visitor and family routes with licensed guidance.", hero: c[1][0].toUpperCase() + c[1].slice(1) + " can matter more than copying a generic checklist. Build a route around your residence status, documents, work, education, language, funds and family facts.", angle: c[1][0].toUpperCase() + c[1].slice(1) + ".", answer: "There is no single best route for everyone from " + c[0] + ". The right program depends on work, language, education, family, funds, status, destination and admissibility evidence.", links: [ircc.hub, ircc.express, ircc.pnp, ircc.work, ircc.study], og: "Immigration options for applicants from " + c[0] };
  }
  if (file.startsWith("immigration-consultant__")) {
    const c = cities[file.replace(/^immigration-consultant__/, "").replace(/\.md$/, "")];
    if (!c) throw new Error("Missing city " + file);
    return { kind: "city", keyword: c[2], title: c[2][0].toUpperCase() + c[2].slice(1) + " | Licensed RCIC Canada", h1: c[2][0].toUpperCase() + c[2].slice(1) + " for a Canada-wide immigration plan", meta: "Looking for a " + c[2] + "? Get licensed RCIC guidance for Express Entry, PNP, work, study, sponsorship, refusals and employers.", hero: "VMC serves clients in " + c[0] + " with " + c[1] + ". Local convenience helps with meetings; the file still has to meet federal or provincial rules.", angle: c[1][0].toUpperCase() + c[1].slice(1) + ".", answer: "No. An authorized representative can explain criteria and prepare a stronger file, but IRCC, a province, the IRB or the Federal Court controls the outcome.", links: [ircc.hub, ircc.express, ircc.pnp, ircc.work, ircc.study], og: c[0] + " immigration support from a licensed RCIC" };
  }
  if (employerData[file]) {
    const e = employerData[file];
    return { kind: "employer", keyword: e[0], title: e[1] + " 2026 | Employer-Side Guidance", h1: e[1] + ": build the file before the worker starts", meta: e[2] + " Employer-side guidance from a licensed RCIC-led team.", hero: "Canadian employers need immigration files that are useful to the business and supportable on review. This page focuses on " + e[3] + ".", angle: e[3][0].toUpperCase() + e[3].slice(1) + ".", answer: "Start by classifying the role and immigration basis, then confirm the live program criteria and evidence before advertising, promising a permit or submitting an employer form.", links: [e[4], ircc.hire, ircc.work, trust.esdc, trust.jobBank], og: e[1] + " | VMC Employer Immigration" };
  }
  if (toolData[file]) {
    const t = toolData[file];
    const toolMeta = file === "tools.md" ? "Use free Canada immigration calculators for CRS, CLB, FSW, PNP and RCIP screening, then verify the estimate against current official rules." : "Use a free " + t[0] + " for " + t[2] + ", then verify the estimate against current official rules with a licensed RCIC.";
    return { kind: "tool", keyword: t[0], title: "Free " + t[1] + " 2026 | Canada Immigration Tool", h1: "Free " + t[1] + ": make the next question easier to answer", meta: toolMeta, hero: "Use this free tool to turn " + t[2].toLowerCase() + " into a planning conversation. It is a starting estimate, not a legal determination or a promise of an invitation.", angle: "The result should show which input deserves a closer review.", result: "a planning estimate", links: [t[3], ircc.hub, ircc.processing], og: "Free " + t[1] + " | VMC Immigration Services" };
  }
  if (blogData[file]) {
    const b = blogData[file];
    return { kind: "blog", keyword: b[0], title: b[1] + " | 2026 Canada Guide", h1: b[1] + ": research the decision before the form", meta: b[2] + " Read the current official source and prepare better questions before you file.", hero: b[2] + " This guide is for people who want to understand the decision before they spend money or submit a new application. Always check the official source for the current rule, date, fee or program status.", angle: b[2], answer: "Use the guide to prepare better questions, then verify the live Government of Canada or provincial page. A past policy, checklist, score or estimate is not a promise about the next case.", links: [b[3], ircc.hub, ircc.processing], og: b[1] + " | VMC Immigration Research" };
  }
  if (resourceData[file]) {
    const r = resourceData[file];
    return { kind: "resource", keyword: r[0], title: r[1] + " 2026 | VMC Immigration Resources", h1: r[1] + ": organize evidence in the right order", meta: r[2] + " Use the official source as the final check before filing.", hero: r[2] + " A guide is most useful when it helps you separate required, conditional and explanatory evidence.", angle: r[2], answer: "Use this resource to organize research, but check the current IRCC or provincial instructions for your program, country, status, forms, fees and application date.", links: [ircc.hub, ircc.processing, ircc.documents, ircc.work, ircc.study], og: r[1] + " | VMC Immigration Resources" };
  }
  if (programData[base]) {
    const p = programData[base];
    return { kind: "program", keyword: p[0], title: p[1] + " 2026: Eligibility, Evidence and Next Steps", h1: p[1] + ": a clearer plan for the evidence", meta: p[2] + " Check the official source and speak with a licensed RCIC before you apply.", hero: p[3] + " This page is a research starting point; use the linked official source for current criteria, forms, fees, intake and processing information.", angle: p[3], fit: ["applicants comparing this route with a federal or provincial alternative", "temporary residents protecting status while planning the next step", "families or employers who need an evidence-led route review"], prepare: "Start with status, dates, work duties, education, language, funds, family, travel and admissibility. Match each claim to the document that would prove it.", answer: "The official program page controls current eligibility. A licensed representative can compare the criteria with your facts, but no professional can guarantee a draw, nomination, permit or approval.", links: [p[4], ircc.hub, ircc.processing], og: p[1] + " | VMC Immigration Services" };
  }
  if (supportData[file]) {
    const s = supportData[file];
    return { kind: "support", keyword: s[0], title: s[1] + " | VMC Immigration Services", h1: s[1], meta: s[2] + " Canada-wide support from a licensed RCIC practice.", hero: s[3], angle: s[3], answer: "Use the page as a starting point, then verify the current official source and discuss your full facts with an authorized representative when the decision is personal or time-sensitive.", links: [ircc.hub, ircc.express, ircc.pnp, ircc.work, ircc.study], og: s[1] + " | VMC Immigration Services" };
  }
  const topic = label(file);
  return { kind: "support", keyword: topic, title: "A practical guide to " + topic + " | VMC", h1: topic + ": clearer information for your next step", meta: "Read a practical " + topic.toLowerCase() + " guide, then verify the current official Canada immigration requirements before acting.", hero: "This page gives you a clearer way to think about " + topic.toLowerCase() + ": start with the decision, gather the evidence and check the current official source.", angle: "The facts in your own record decide which rule applies.", answer: "Use this guide for preparation, then confirm current requirements with the official source or a licensed representative.", links: [ircc.hub, trust.register], og: topic + " | VMC Immigration Services" };
}

function faq(spec) {
  return [
    ["What is the first thing to verify about " + spec.keyword + "?", "Verify that the current program or process is open and that your status, documents, timing and core eligibility fit the official instructions."],
    ["Can a calculator or article guarantee an immigration result?", "No. Tools and guides help you prepare; IRCC, a province, the IRB or the Federal Court decides according to the process and record before it."],
    [spec.question || "When should I get a file-specific review?", spec.answer || "Get a review before paying fees or missing a deadline when the case involves a refusal, status issue, inadmissibility, complex family facts, employer compliance or conflicting documents."],
  ];
}

const bookPath = () => routeMap.get("book.md")?.path || "/book";
const contactPath = () => routeMap.get("contact-us.md")?.path || "/contact-us";

function render(spec, file, meta) {
  const pageSpec = publicSpec(spec);
  const title = seoTitle(pageSpec.title, pageSpec.keyword);
  const description = seoDescription(pageSpec.meta);
  const questions = faq(pageSpec);
  const rows = linksFor(pageSpec, meta.url);
  const sections = paragraphSections(pageSpec, file).concat(extraSections(pageSpec, file, rows));
  const headings = ["# " + pageSpec.h1];
  for (const s of sections) headings.push("## " + s.h);
  headings.push("## Questions people ask");
  for (const q of questions) headings.push("### " + q[0]);
  const content = [];
  for (const s of sections) content.push("## " + s.h, "", s.text, "", s.bullets.map(function (b) { return "- " + b; }).join("\n"));
  content.push("## Questions people ask", "", questions.map(function (q) { return "### " + q[0] + "\n\n" + q[1]; }).join("\n\n"));
  content.push("## A practical next step", "", "If you are ready to move from general research to a file-specific plan, [book a consultation with a licensed RCIC](" + site + bookPath() + "). Bring your current status, dates, documents and the question you need answered. We will tell you what fits, what needs work and what should be verified before submission.");
  const fence = String.fromCharCode(96).repeat(3);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": meta.url + "#webpage", url: meta.url, name: title, description: description, inLanguage: "en-CA", dateModified: today, isPartOf: { "@type": "WebSite", name: "Commonwealth Migration Canada", url: site }, about: { "@type": "Thing", name: pageSpec.keyword } },
    { "@type": "BreadcrumbList", itemListElement: meta.path === "/" ? [{ "@type": "ListItem", position: 1, name: "Home", item: site }] : [{ "@type": "ListItem", position: 1, name: "Home", item: site }, { "@type": "ListItem", position: 2, name: pageSpec.keyword, item: meta.url }] },
    { "@type": "FAQPage", mainEntity: questions.map(function (q) { return { "@type": "Question", name: q[0], acceptedAnswer: { "@type": "Answer", text: q[1] } }; }) },
  ] };
  return [
    "# " + pageSpec.h1, "",
    "> **Source URL:** " + meta.url,
    "> **Original Source URL:** " + (meta.originalUrl || "Not retained"),
    "> **Last modified:** " + today,
    "> **Sitemap priority:** " + meta.priority,
    "> **Status:** ✅ Fresh English rewrite | SEO/GEO/AEO reviewed", "",
    "## SEO Metadata", "",
    "- **Title tag:** " + title,
    "- **Meta description:** " + description,
    "- **Meta keywords:** (none)",
    "- **Canonical URL:** " + meta.url,
    "- **OG title:** " + clean(pageSpec.og || title),
    "- **OG description:** " + description,
    "- **Robots:** index, follow", "",
    "## Heading Outline", "",
    headings.map(function (h) { return "- " + h; }).join("\n"), "",
    "## Hero Section", "",
    "# " + pageSpec.h1, "",
    pageSpec.hero, "",
    (pageSpec.fit || ["eligibility and admissibility", "documents and timing", "a clear next step"]).map(function (b) { return "- " + b; }).join("\n"), "",
    "## Page Content", "",
    content.join("\n\n"), "",
    "## Links & CTAs on this page", "",
    "| Anchor text | URL |", "| --- | --- |",
    rows.map(function (r) { return "| " + r[0] + " | " + r[1] + " |"; }).join("\n"),
    "| Book a focused immigration consultation | " + site + bookPath() + " |",
    "| Contact Commonwealth Migration Canada | " + site + contactPath() + " |", "",
    "## Image Alt Texts", "",
    "- " + pageSpec.h1 + " | Commonwealth Migration Canada | Brampton and Canada-wide", "",
    "## Structured Data (JSON-LD)", "",
    fence + "json", JSON.stringify(schema, null, 2), fence, "",
  ].join("\n");
}

fs.mkdirSync(outputDir, { recursive: true });
const files = fs.readdirSync(sourceDir).filter(function (f) { return f.endsWith(".md") && f !== "README.md" && f !== "AUTHORITY_LINKS.md"; }).sort();
const routeMap = new Map();
const usedPaths = new Set();
const previousPaths = previousFlatRouteMap(files);

for (const file of files) {
  const spec = makeSpec(file);
  const legacyPath = legacyRoute(file);
  let pagePath = pagePathFor(file, spec);
  if (!pagePath || pagePath === "/") pagePath = "/";
  if (usedPaths.has(pagePath)) {
    const basePath = pagePath;
    let suffix = 2;
    while (usedPaths.has(pagePath)) pagePath = basePath + "-" + suffix++;
  }
  usedPaths.add(pagePath);
  routeMap.set(file, {
    sourceFile: file,
    outputFile: filenameForPath(pagePath),
    legacyPath,
    previousPath: previousPaths.get(file),
    path: pagePath,
    url: site + (pagePath === "/" ? "" : pagePath),
    keyword: publicSpec(spec).keyword,
  });
}

for (const existing of fs.readdirSync(outputDir)) {
  if (existing.endsWith(".md")) fs.unlinkSync(path.join(outputDir, existing));
}

const routeRecords = [];
for (const file of files) {
  const routeInfo = routeMap.get(file);
  const original = sourceMeta(file);
  const meta = { ...original, ...routeInfo };
  fs.writeFileSync(path.join(outputDir, routeInfo.outputFile), render(makeSpec(file), file, meta));
  routeRecords.push(routeInfo);
}
fs.writeFileSync(path.join(outputDir, "route-map.json"), JSON.stringify(routeRecords, null, 2) + "\n");
console.log("Generated " + files.length + " keyword-routed pageData Markdown files in " + outputDir);
