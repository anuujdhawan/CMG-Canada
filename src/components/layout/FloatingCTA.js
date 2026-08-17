"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, CalendarCheck, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { EASE_OUT } from "@/lib/motion";

/**
 * Floating CTA stack (bottom-right): phone + book consultation buttons.
 * Mirrors the source's floating actions without the chat bot.
 */
export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <div className="fixed bottom-5 right-5 z-[65] hidden lg:flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              key="email"
              href={`mailto:${site.email}`}
              initial={shouldReduce ? false : { opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 8 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary shadow-hover ring-1 ring-line"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </motion.a>
            <motion.div
              key="book"
              initial={shouldReduce ? false : { opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 8 }}
              transition={{ duration: 0.2, delay: 0.06, ease: EASE_OUT }}
            >
              <Link
                href={site.ctas.primary.href}
                className="flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-hover hover:bg-navy"
              >
                <CalendarCheck className="h-4 w-4" />
                {site.ctas.primary.label}
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_24px_rgba(13,35,87,0.18)] hover:bg-navy transition-colors"
        whileHover={shouldReduce ? {} : { scale: 1.06 }}
        whileTap={shouldReduce ? {} : { scale: 0.95 }}
      >
        {open ? <X className="h-6 w-6" /> : <Mail className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
