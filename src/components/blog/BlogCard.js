import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function formatDate(value) {
  if (!value) return "Guide";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Guide";
  return new Intl.DateTimeFormat("en-CA", { month: "short", year: "numeric" }).format(date);
}

export default function BlogCard({ post, index = 0 }) {
  return (
    <Link href={post.path} className="reference-blog-card reveal" style={{ "--delay": `${index * 55}ms` }}>
      <figure className="reference-blog-card__media">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span className="reference-blog-card__media-index">{String(index + 1).padStart(2, "0")}</span>
      </figure>
      <div className="reference-blog-card__body">
        <div className="reference-blog-card__meta">
          <span>{post.category.label}</span>
          <span>{formatDate(post.meta.lastModified)}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.seo.description}</p>
        <span className="reference-blog-card__action">
          Read article
          <ArrowUpRight width={17} height={17} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

