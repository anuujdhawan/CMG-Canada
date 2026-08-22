import { site } from "@/config/site";

/**
 * Centralized, domain-agnostic metadata builder.
 *
 * Canonical/OG URLs are derived from NEXT_PUBLIC_SITE_URL — the prototype
 * ships with an empty URL, so no real domain ever leaks into metadata.
 */

/** Absolute URL from a path, or "" when no site URL is configured. */
export function absoluteUrl(path = "") {
  if (!site.url) return "";
  return `${site.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  keywords,
  noIndex = false,
} = {}) {
  const resolvedTitle = title || site.meta.defaultTitle;
  const resolvedDescription = description || site.meta.defaultDescription;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(site.meta.ogImage);

  return {
    // Omit `title` entirely when no page title is given, so the root layout's
    // `title.template` + `default` handle the final document title (an explicit
    // `title: undefined` would overwrite the layout template on spread).
    ...(title ? { title } : {}),
    description: resolvedDescription,
    ...(keywords && { keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords }),
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type,
      locale: site.meta.locale,
      siteName: site.name,
      title: resolvedTitle,
      description: resolvedDescription,
      url: url || undefined,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630, alt: site.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default buildMetadata;
