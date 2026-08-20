import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { tools } from "@/data/tools";
import iconMap, { fallbackIcon } from "@/lib/icons";
import { currentPagePath } from "@/config/pageRoutes";

export default function InteractiveToolsGrid() {
  return (
    <section aria-label="Free interactive tools" className="reference-index-grid reference-index-grid--tools">
      <div className="reference-index-grid__inner">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Try them now</p>
            <h2>Free interactive tools</h2>
            <p className="reference-index-grid__lead">Answer a few questions and get an instant read on where you stand — no sign-up required.</p>
          </div>
        </div>

        <div className="reference-tool-grid">
          {tools.map((tool, index) => {
            const Icon = iconMap[tool.icon] || fallbackIcon;
            return (
              <Link
                key={tool.slug}
                href={currentPagePath(`/tools/${tool.slug}`)}
                className="reference-tool-tile group"
              >
                <div className="reference-tool-tile__body">
                  <div className="reference-tool-tile__top">
                    <span className="reference-tool-tile__icon group-hover:scale-105">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="reference-tool-tile__number">0{index + 1}</span>
                  </div>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <span className="reference-tool-tile__action">
                    Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
