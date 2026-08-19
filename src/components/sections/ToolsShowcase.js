import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tools } from "@/data/tools";
import iconMap, { fallbackIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { currentPagePath } from "@/config/pageRoutes";

/** Shared long-form tools directory band shown across the site. */
export default function ToolsShowcase({ className }) {
  return (
    <section aria-labelledby="tools-showcase-title" className={cn("tools-showcase", className)}>
      <div className="tools-showcase__head">
        <div>
          <p className="eyebrow text-primary">Free tools, all in one place</p>
          <h2 id="tools-showcase-title" className="mt-2 font-serif text-2xl font-bold text-navy-dark sm:text-3xl">
            Make your next decision with better numbers
          </h2>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted">
            Start with a quick estimate, then bring the result into a more focused immigration strategy.
          </p>
        </div>
        <Link href={currentPagePath("/tools")} className="tools-showcase__view-all group">
          View all tools
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>

      <div className="tools-showcase__links">
        {tools.map((tool, index) => {
          const Icon = iconMap[tool.icon] || fallbackIcon;
          return (
            <Link key={tool.slug} href={currentPagePath(`/tools/${tool.slug}`)} className="tools-showcase__link group">
              <span className="tools-showcase__icon">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="tools-showcase__number">0{index + 1}</span>
                <span className="tools-showcase__label">{tool.title}</span>
              </span>
              <ArrowRight className="tools-showcase__arrow" aria-hidden />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
