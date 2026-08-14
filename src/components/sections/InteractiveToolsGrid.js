import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tools } from "@/data/tools";

const ICON_LABELS = {
  Calculator: "📊",
  MapPin: "📍",
  Search: "🔍",
  ClipboardCheck: "📋",
  FileSearch: "📄",
};

/** The five interactive tools (real client-side calculators). */
export default function InteractiveToolsGrid() {
  return (
    <section aria-label="Free interactive tools" className="border-t border-line bg-white">
      <div className="site-container section-pad pt-12 lg:pt-14">
        <p className="eyebrow text-accent-dark">Try them now</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-navy sm:text-[1.75rem]">Free interactive tools</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Answer a few questions and get an instant read on where you stand — no sign-up required.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-surface/50 p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
            >
              <span aria-hidden className="text-2xl">
                {ICON_LABELS[tool.icon] || "🛠️"}
              </span>
              <h3 className="mt-3 text-[14.5px] font-bold leading-snug text-navy transition-colors group-hover:text-primary">
                {tool.title}
              </h3>
              <p className="mt-1.5 line-clamp-3 flex-1 text-[12.5px] leading-relaxed text-muted">{tool.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-bold text-primary">
                Open tool
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
