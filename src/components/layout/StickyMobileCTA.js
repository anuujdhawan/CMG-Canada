"use client";

import Link from "next/link";
import { Mail, CalendarCheck } from "lucide-react";
import { site } from "@/config/site";

/**
 * Sticky bottom action bar for small screens (source-compatible).
 */
export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-[64] lg:hidden">
      <div className="flex items-stretch gap-px bg-white/90 backdrop-blur-md border-t border-line shadow-[0_-4px_20px_rgba(110,14,28,0.08)]">
        <a
          href={`mailto:${site.email}`}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-primary"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
        <Link
          href={site.ctas.primary.href}
          className="flex flex-1 items-center justify-center gap-2 bg-primary py-3.5 text-sm font-bold text-white hover:bg-navy"
        >
          <CalendarCheck className="h-4 w-4" />
          {site.ctas.primary.label}
        </Link>
      </div>
    </div>
  );
}
