"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, X } from "lucide-react";
import { site } from "@/config/site";
import ConsultationForm from "@/components/forms/ConsultationForm";

function localPath(value) {
  try {
    const url = new URL(value, window.location.origin);
    return url.origin === window.location.origin ? url.pathname : null;
  } catch {
    return null;
  }
}

/**
 * Opens the existing consultation lead form in place for every local booking
 * CTA, so visitors do not lose their place by navigating to /book.
 */
export default function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const bookingPaths = new Set([
      "/book",
      localPath(site.ctas.primary.href),
      localPath(site.ctas.urgent.href),
    ].filter(Boolean));

    function handleBookingClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!target || target.target === "_blank" || target.hasAttribute("download")) return;

      const href = target.getAttribute("href");
      const path = href ? localPath(href) : null;
      if (!path || !bookingPaths.has(path)) return;

      event.preventDefault();
      setOpen(true);
    }

    document.addEventListener("click", handleBookingClick, true);
    return () => document.removeEventListener("click", handleBookingClick, true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[260] flex items-end justify-center bg-navy-dark/70 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <section
        className="relative flex max-h-[calc(100vh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-surface shadow-[0_28px_90px_rgba(74,8,16,0.35)] sm:max-h-[calc(100vh-3rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/15 bg-gradient-to-br from-navy via-primary to-primary-dark px-5 py-4 text-white backdrop-blur sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white shadow-sm">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="eyebrow text-accent-soft">Start with a conversation</p>
              <h2 id="consultation-modal-title" className="mt-1 truncate font-serif text-xl font-bold text-white sm:text-2xl">
                Book a free consultation
              </h2>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close consultation form"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto p-3 sm:p-6">
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
}
