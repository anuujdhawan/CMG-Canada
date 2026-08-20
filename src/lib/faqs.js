const SPECIFIC_FAQS = {
  "/login": [
    {
      question: "What can I do in the client portal?",
      answer: "The client portal is designed for case updates, document uploads and messages with your consultant in one place.",
    },
    {
      question: "How do I get client portal access?",
      answer: "Email the team using the address on this page to request access. We will confirm your account details and guide you through the next step.",
    },
  ],
  "/tools/crs-calculator": [
    {
      question: "What does the CRS calculator estimate?",
      answer: "It estimates your Express Entry Comprehensive Ranking System score using factors such as age, education, language, work experience and adaptability.",
    },
    {
      question: "Is the CRS result an official IRCC decision?",
      answer: "No. It is a planning estimate based on the information you enter. Confirm your profile against the current IRCC rules before submitting an application.",
    },
  ],
  "/tools/pnp-eligibility": [
    {
      question: "What does the PNP eligibility check assess?",
      answer: "It uses your profile details to suggest provincial nomination streams that may deserve further research, including factors such as occupation, language, experience and ties.",
    },
    {
      question: "Does a PNP result guarantee a nomination?",
      answer: "No. Provincial programs have their own criteria, invitations and document requirements. Use the result as a starting point for a more detailed assessment.",
    },
  ],
  "/tools/noc-finder": [
    {
      question: "What does the NOC Finder help me identify?",
      answer: "It helps you compare your duties with Canadian occupation descriptions and find a likely NOC and TEER category for further eligibility research.",
    },
    {
      question: "Why does the NOC code matter?",
      answer: "Your occupation code can affect Express Entry, work permit and LMIA planning. The duties must match your real work, not only your job title.",
    },
  ],
  "/tools/document-checklist": [
    {
      question: "Which application types does the checklist cover?",
      answer: "The checklist helps organise common Express Entry, work permit, study permit, spousal sponsorship and visitor visa documents.",
    },
    {
      question: "Can a checklist replace a document review?",
      answer: "No. It is a preparation aid. Your final document set depends on your pathway, personal history, country of residence and the instructions attached to your application.",
    },
  ],
  "/tools/free-assessment": [
    {
      question: "What happens during a free assessment?",
      answer: "You share the basics of your goal and profile so the team can identify possible pathways, immediate gaps and the most useful next step.",
    },
    {
      question: "Do I need every document before requesting an assessment?",
      answer: "No. Start with the information you have. The assessment can help you understand which documents and facts will matter most before you prepare the full application.",
    },
  ],
};

function isFaqType(value) {
  return Array.isArray(value) ? value.includes("FAQPage") : value === "FAQPage";
}

function structuredFaqItems(page) {
  const items = [];
  for (const json of page?.jsonLd || []) {
    const nodes = [json, ...(Array.isArray(json?.["@graph"]) ? json["@graph"] : [])];
    for (const node of nodes) {
      if (!isFaqType(node?.["@type"])) continue;
      const entities = Array.isArray(node.mainEntity) ? node.mainEntity : node.mainEntity ? [node.mainEntity] : [];
      for (const entity of entities) {
        const question = typeof entity?.name === "string" ? entity.name.trim() : "";
        const answer = typeof entity?.acceptedAnswer?.text === "string" ? entity.acceptedAnswer.text.trim() : "";
        if (question && answer) items.push({ question, answer });
      }
    }
  }
  return items;
}

function fallbackFaqItems(page) {
  if (SPECIFIC_FAQS[page?.path]) return SPECIFIC_FAQS[page.path];

  const title = String(page?.h1 || "this immigration guide")
    .split("|")[0]
    .replace(/\b20\d{2}\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const description = String(page?.seo?.description || "").trim();
  const topics = (page?.headingOutline || [])
    .filter((heading) => heading.level >= 2 && !/faq|ready to|contact|book|related/i.test(heading.text))
    .map((heading) => heading.text.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 2);

  const items = [];
  items.push({
    question: `What does the ${title} guide cover?`,
    answer: description || `This guide explains the main eligibility, preparation and pathway considerations for ${title.toLowerCase()}.`,
  });
  if (topics.length > 0) {
    items.push({
      question: `Which parts of ${title} should I review first?`,
      answer: `Start with ${topics.join(" and ")}. These sections explain the main eligibility, preparation and pathway considerations covered by this guide.`,
    });
  }
  items.push({
    question: "What is the best next step for my situation?",
    answer: "Use the detailed guidance on this page to understand the route, then speak with a licensed RCIC if your history, documents or deadline need a tailored review.",
  });
  return items;
}

const EXCLUDED_PATHS = new Set(["/privacy", "/terms", "/disclaimer", "/pay"]);

/** Return page-specific FAQ content sourced from the pageData Markdown contract. */
export function getPageFaqs(page, limit = 8) {
  if (!page || EXCLUDED_PATHS.has(page.path)) return [];

  const exact = structuredFaqItems(page);
  const source = exact.length > 0 ? exact : fallbackFaqItems(page);
  const seen = new Set();
  return source.filter((item) => {
    const key = item.question.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}
