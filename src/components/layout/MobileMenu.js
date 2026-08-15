"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, X } from "lucide-react";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";
import { cn, slugify } from "@/lib/utils";
import { isActiveNavItem } from "@/lib/navActive";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Slide-over mobile navigation in the source sheet style:
 * red mark header, accordion groups, phone + red CTA footer.
 */
export default function MobileMenu({ onClose }) {
  const [expanded, setExpanded] = useState(null);
  const pathname = usePathname();
  const shouldReduce = useReducedMotion() ?? false;

  // Lock body scroll while mounted
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Close if the route changes while open
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setExpanded(null);
  }

  const collapseVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: {
      opacity: 1,
      height: "auto",
      overflow: "hidden",
      transition: { duration: 0.22, ease: EASE_OUT },
    },
    exit: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
      transition: { duration: 0.16, ease: EASE_OUT },
    },
  };

  return (
    <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy-dark/60"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        className="absolute right-0 top-0 flex h-full w-[85vw] sm:w-[320px] flex-col bg-white shadow-dropdown"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-line flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={site.logos.large}
              alt={site.name}
              width={1912}
              height={1140}
              className="h-9 w-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-lg text-muted hover:bg-surface transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5" aria-label="Mobile">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center px-4 py-3.5 rounded-xl text-ink font-semibold hover:bg-accent-soft hover:text-primary transition-all text-sm"
          >
            Home
          </Link>
          <Link
            href={site.ctas.payment.href}
            onClick={onClose}
            className="flex items-center px-4 py-3.5 rounded-xl text-ink font-semibold hover:bg-accent-soft hover:text-primary transition-all text-sm"
          >
            {site.ctas.payment.label}
          </Link>
          <a
            href={navigation.utility.login.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center px-4 py-3.5 rounded-xl text-ink font-semibold hover:bg-accent-soft hover:text-primary transition-all text-sm"
          >
            {navigation.utility.login.label}
          </a>

          {navigation.main.map((item) => {
            const hasChildren = item.children?.length > 0;
            const isOpen = expanded === item.label;
            const active = isActiveNavItem(pathname, item);
            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-4 py-3.5 rounded-xl text-ink font-semibold hover:bg-accent-soft hover:text-primary transition-all text-sm",
                    active && "text-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.label}>
                <button
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-ink font-semibold hover:bg-accent-soft hover:text-primary transition-all text-sm"
                  aria-expanded={isOpen}
                  aria-controls={`mobile-${slugify(item.label)}`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.urgent && (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-dark">
                        Urgent
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 text-muted transition-transform duration-200", isOpen && "rotate-180")}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`panel-${item.label}`}
                      id={`mobile-${slugify(item.label)}`}
                      variants={shouldReduce ? {} : collapseVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="ml-3 space-y-0.5 pb-2 border-l-2 border-primary/10 pl-3"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block px-3 py-2.5 rounded-xl text-sm text-muted font-medium hover:text-primary hover:bg-accent-soft transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block px-3 py-2.5 rounded-xl text-sm font-bold text-primary underline-offset-4 hover:underline"
                      >
                        View all {item.label.toLowerCase()} →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-line bg-accent-soft/40 space-y-2.5">
          <a
            href={`mailto:${navigation.utility.email}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <Mail className="h-4 w-4" />
            Email Us
          </a>
          <Link
            href={site.ctas.primary.href}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-primary text-white font-semibold py-3 text-sm hover:bg-primary-light transition-all shadow-md"
          >
            {site.ctas.primary.label}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

