/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      // Template /programs → new /immigration structure
      { source: "/programs", destination: "/immigration", permanent: true },
      { source: "/programs/express-entry", destination: "/immigration/express-entry", permanent: true },
      { source: "/programs/federal-skilled-worker", destination: "/immigration/fsw", permanent: true },
      { source: "/programs/canadian-experience-class", destination: "/immigration/cec", permanent: true },
      { source: "/programs/pnp", destination: "/immigration/pnp", permanent: true },
      { source: "/programs/tr-to-pr", destination: "/immigration/tr-to-pr", permanent: true },
      { source: "/programs/business-startup-visa", destination: "/immigration/startup-visa", permanent: true },
      { source: "/programs/work-permits", destination: "/immigration/work-permit", permanent: true },
      { source: "/programs/pgwp", destination: "/immigration/pgwp", permanent: true },
      { source: "/programs/study-permits", destination: "/immigration/study-permit", permanent: true },
      { source: "/programs/visitor-visa-eta-super-visa", destination: "/immigration/visitor-visa", permanent: true },
      { source: "/programs/spousal-work-permit", destination: "/immigration/spousal-work-permit", permanent: true },
      { source: "/programs/iec-working-holiday", destination: "/immigration/iec", permanent: true },
      { source: "/programs/spousal-partner-sponsorship", destination: "/immigration/spousal-sponsorship", permanent: true },
      { source: "/programs/parents-grandparents-pgp", destination: "/immigration/pgp", permanent: true },
      { source: "/programs/family-sponsorship", destination: "/immigration/family-sponsorship", permanent: true },
      { source: "/programs/pr-card-citizenship", destination: "/immigration/citizenship", permanent: true },
      { source: "/programs/criminal-inadmissibility", destination: "/appeals/criminal-inadmissibility", permanent: true },
      { source: "/programs/refusals-pfl-response", destination: "/refusals", permanent: true },
      { source: "/programs/iad-appeals", destination: "/refusals", permanent: true },
      { source: "/programs/judicial-review", destination: "/appeals/judicial-review", permanent: true },
      { source: "/programs/lmia-all-streams", destination: "/for-employers/lmia", permanent: true },
      { source: "/programs/global-talent-stream", destination: "/for-employers/global-talent-stream", permanent: true },
      { source: "/programs/employer-compliance", destination: "/for-employers/employer-compliance", permanent: true },
      { source: "/programs/recruitment-hgt", destination: "/for-employers", permanent: true },
      { source: "/programs/atlantic-immigration-program", destination: "/immigration/pnp", permanent: true },

      // Template company/legal pages → new structure
      { source: "/services", destination: "/immigration", permanent: true },
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/about/team", destination: "/team", permanent: true },
      { source: "/about/how-it-works", destination: "/how-it-works", permanent: true },
      { source: "/about/office", destination: "/contact-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/consultation", destination: "/book", permanent: true },
      { source: "/consultation/urgent", destination: "/book", permanent: true },
      { source: "/payment", destination: "/pay", permanent: true },
      { source: "/resources/blog", destination: "/blog", permanent: true },
      { source: "/resources/faqs", destination: "/faqs", permanent: true },
      { source: "/resources/guides", destination: "/resources/document-checklist", permanent: true },
      { source: "/resources/draws", destination: "/draw-results", permanent: true },
    ];
  },
};

export default nextConfig;
