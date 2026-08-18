import { notFound } from "next/navigation";
import { getAllPages, getPage } from "@/lib/sitePages";
import { site } from "@/config/site";
import ContentPage, { rebrand, localizeUrl } from "@/components/templates/ContentPage";
import PageIndexGrid from "@/components/sections/PageIndexGrid";

export const dynamicParams = false;

/** Prerender every approved Markdown page (including the home route). */
export function generateStaticParams() {
  return getAllPages().map((page) => ({
    slug: page.path === "/" ? [] : page.path.slice(1).split("/"),
  }));
}

function pathFromParams(slug) {
  const segments = Array.isArray(slug) ? slug : [];
  return `/${segments.join("/")}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pathname = pathFromParams(slug);
  const page = getPage(pathname);
  if (!page) return {};

  const title = rebrand(page.seo.title || page.h1);
  const description = rebrand(page.seo.description || site.meta.defaultDescription);
  // Source-domain canonical → this site's own URL when possible
  const canonical = localizeUrl(page.seo.canonical || page.path);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonical || undefined },
    openGraph: {
      type: "website",
      locale: site.meta.locale,
      siteName: site.name,
      title: page.seo.ogTitle || title,
      description: page.seo.ogDescription || description,
      url: canonical || undefined,
      images: [{ url: site.meta.ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.ogTitle || title,
      description: page.seo.ogDescription || description,
      images: [site.meta.ogImage],
    },
  };
}

export default async function ContentRoute({ params }) {
  const { slug } = await params;
  const pathname = pathFromParams(slug);
  const page = getPage(pathname);
  if (!page) notFound();

  return (
    <>
      <ContentPage page={page} />
      <PageIndexGrid pathname={pathname} />
    </>
  );
}
