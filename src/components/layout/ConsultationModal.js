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
 * Opens the existing consultation lead form in place for every configured
 * local consultation CTA, so visitors do not lose their place while booking.
 */
export default function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const bookingPaths = new Set([
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
      className="consultation-modal fixed inset-0 z-[260] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <section
        className="consultation-modal__dialog relative flex max-h-[calc(100vh-1.5rem)] w-full flex-col overflow-hidden rounded-3xl sm:max-h-[calc(100vh-3rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
      >
        <div className="consultation-modal__header flex shrink-0 items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="consultation-modal__header-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="consultation-modal__kicker eyebrow">Start with a conversation</p>
              <h2 id="consultation-modal-title" className="consultation-modal__title mt-1 truncate">
                Book a free consultation
              </h2>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            className="consultation-modal__close flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
            aria-label="Close consultation form"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="consultation-modal__body min-h-0 overflow-y-auto p-3 sm:p-6">
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
}
