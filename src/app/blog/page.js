import { site } from "@/config/site";
import { getPage } from "@/lib/sitePages";
import BlogIndexPage from "@/components/blog/BlogIndexPage";

export const dynamicParams = false;

export function generateMetadata() {
  const page = getPage("/blog");
  const title = page?.seo?.title || "Canada Immigration Blog";
  const description = page?.seo?.description || "Clear, practical Canadian immigration guides from Commonwealth Migration Canada.";
  const canonical = `${site.url.replace(/\/$/, "")}/blog`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: site.meta.locale,
      siteName: site.name,
      title,
      description,
      url: canonical,
      images: [{ url: site.meta.ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [site.meta.ogImage],
    },
  };
}

export default function BlogPage() {
  return <BlogIndexPage page={getPage("/blog")} />;
}

