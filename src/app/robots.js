import { site } from "@/config/site";

export default function robots() {
  const rules = [
    {
      userAgent: "*",
      allow: "/",
    },
  ];

  // Only advertise a sitemap once a client domain is configured.
  if (site.url) {
    return {
      rules,
      sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
      host: site.url.replace(/\/$/, ""),
    };
  }

  return { rules };
}
