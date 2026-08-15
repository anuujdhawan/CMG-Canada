"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible single-open accordion.
 * items: [{ question, answer }] — answer may be a string or React node.
 */
export default function Accordion({ items, className, defaultOpen = 0, idPrefix = "accordion" }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className={cn("divide-y divide-line rounded-brand-xl border border-line bg-white", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="px-5 sm:px-6">
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={open}
                aria-controls={`${idPrefix}-panel-${i}`}
                id={`${idPrefix}-button-${i}`}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                <span className={cn("text-[15px] font-semibold sm:text-base", open ? "text-accent-dark" : "text-primary")}>
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
                    open && "rotate-180 text-accent"
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={`${idPrefix}-panel-${i}`}
              role="region"
              aria-labelledby={`${idPrefix}-button-${i}`}
              className={cn(
                "grid transition-all duration-200 ease-out",
                open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl text-[15px] leading-relaxed text-muted">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
