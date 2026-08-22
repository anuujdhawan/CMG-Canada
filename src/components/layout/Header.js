"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, AlertTriangle, ArrowRight } from "lucide-react";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";
import { cn, slugify } from "@/lib/utils";
import { isActiveNavItem } from "@/lib/navActive";
import { EASE_OUT, DURATION } from "@/lib/motion";
import { useScrolled } from "@/hooks/useScrolled";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

/* ─── Logo lockup (CMG wordmark) ──────────────────────────────────── */
function BrandLogo() {
  return (
    <Link href="/" className="flex items-center shrink-0" aria-label={`${site.name} — home`}>
      <div className="header-logo-shell flex items-center">
        <Image
          src={site.logos.white}
          alt={site.name}
          width={1912}
          height={1140}
          priority
          className="h-9 w-auto object-contain sm:h-10"
        />
      </div>
    </Link>
  );
}

/* ─── Dropdown panel wrapper ──────────────────────────────────────── */
function DropdownPanel({ children, className, id }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: EASE_OUT }}
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl p-5",
        "border border-line shadow-[0_20px_60px_color-mix(in_srgb,var(--brand-navy)_12%,transparent),0_4px_16px_color-mix(in_srgb,var(--brand-navy)_5%,transparent)]",
        "max-h-[calc(100vh-120px)] overflow-y-auto",
        className
      )}
    >
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-primary rounded-full" />
      {children}
    </motion.div>
  );
}

/* ─── CMG-style mega dropdown (grouped columns + featured card) ─────── */
function MegaDropdown({ item, open, onClose }) {
  const columns = item.columns || [];
  const featured = item.featured;
  const gridCols = `${columns.map(() => "minmax(250px, 1fr)").join(" ")}${featured ? " minmax(0, 290px)" : ""}`;

  return (
    <AnimatePresence>
      {open && (        <DropdownPanel
          id={`${slugify(item.label)}-dropdown-panel`} className="w-max max-w-[92vw]">
          <div className="grid items-start gap-x-6 gap-y-1 pt-3" style={{ gridTemplateColumns: gridCols }}>
            {columns.map((col) => {
              const viewAll = col.items[0]?.href;
              return (
                <div key={col.category} className="flex flex-col">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary mb-3 pl-3.5">
                    <span aria-hidden className="h-1 w-3 rounded-full bg-accent" />
                    {col.category}
                  </p>
                  <div className="space-y-0.5">
                    {col.items.map((link) => (
                      <DropdownLink key={link.href + link.label} link={link} onClose={onClose} />
                    ))}
                  </div>
                  {viewAll && (
                    <Link
                      href={viewAll}
                      onClick={onClose}
                      className="dropdown-view-all group mt-2 flex items-center gap-1 pl-3.5 text-[12.5px] font-bold text-accent-dark hover:text-primary transition-colors no-underline after:hidden"
                    >
                      View all
                      <ArrowRight aria-hidden className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              );
            })}

            {featured && (
              <div className="flex flex-col bg-navy rounded-xl p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-2">{featured.label}</p>
                <p className="font-bold text-white text-lg mb-2 leading-snug">{featured.title}</p>
                <p className="text-sm text-white/70 leading-relaxed mb-4 flex-1">{featured.desc}</p>
                <Link
                  href={featured.href}
                  onClick={onClose}
                  className="text-xs font-bold text-white hover:text-accent-soft transition-colors inline-flex items-center gap-1"
                >
                  Learn More →
                </Link>
              </div>
            )}
          </div>
        </DropdownPanel>
      )}
    </AnimatePresence>
  );
}

function DropdownLink({ link, onClose }) {
  const content = (
    <span className="group relative flex items-start gap-3 px-3.5 py-3 transition-all duration-150">
      {link.urgent && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-1.5 text-[15px] font-semibold text-ink leading-tight transition-colors">
          <span className="truncate">{link.label}</span>
          {link.urgent && (
            <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white border border-primary shadow-sm">
              Urgent
            </span>
          )}
        </span>
        <span className="text-[13px] text-muted mt-1 leading-snug transition-colors">
          {link.desc || link.description}
        </span>
      </span>
      <ArrowRight
        aria-hidden
        className="mt-1 h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 text-primary transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </span>
  );

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className="block">
        {content}
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onClose} className="block">
      {content}
    </Link>
  );
}

/* ─── Responsive label: short on laptops, full name on wide screens ─── */
function NavLabel({ item }) {
  if (!item.shortLabel) return item.label;
  return (
    <>
      <span className="xl:hidden">{item.shortLabel}</span>
      <span className="hidden xl:inline">{item.label}</span>
    </>
  );
}

/* ─── Header ──────────────────────────────────────────────────────── */
export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useScrolled(20);

  const triggerRefs = useRef({});
  const timers = useRef({});

  const handleEnter = useCallback((label) => {
    if (timers.current[label]) clearTimeout(timers.current[label]);
    setOpenMenu(label);
  }, []);

  const handleLeave = useCallback((label) => {
    timers.current[label] = setTimeout(() => setOpenMenu((cur) => (cur === label ? null : cur)), 180);
  }, []);

  const close = useCallback(() => setOpenMenu(null), []);

  const handleKeyDown = useCallback(
    (e, label) => {
      if (e.key === "Escape" && openMenu === label) {
        e.preventDefault();
        setOpenMenu(null);
        triggerRefs.current[label]?.focus();
      }
    },
    [openMenu]
  );

  const navLinkClass =
    "px-1.5 py-2.5 rounded-md text-[13px] font-semibold text-white hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap";
  const dropdownBtnClass =
    "flex items-center gap-0.5 px-1.5 py-2.5 rounded-md text-[13px] font-semibold text-white hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap";

  return (
    <>
      <motion.header
        className="site-header fixed top-0 inset-x-0"
        style={{ zIndex: 200 }}
        transition={{ duration: DURATION.hover, ease: EASE_OUT }}
      >
        {/* Utility strip */}
        <div className="site-header__utility-strip">
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-5">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Main pill */}
        <div className="px-3 pt-3 sm:px-4">
          <div
            className={cn(
              "site-header__nav-shell relative mx-auto max-w-[1400px] backdrop-blur-md rounded-2xl border px-4 transition-shadow duration-300",
              scrolled
                ? "shadow-[0_8px_32px_color-mix(in_srgb,var(--brand-navy)_12%,transparent),0_2px_8px_color-mix(in_srgb,var(--brand-navy)_6%,transparent)]"
                : "shadow-[0_4px_24px_color-mix(in_srgb,var(--brand-navy)_8%,transparent),0_1px_4px_color-mix(in_srgb,var(--brand-navy)_4%,transparent)]"
            )}
          >
            <div className="flex items-center justify-between">
              <BrandLogo />

              {/* Desktop Nav */}
              <nav className="site-header__desktop-nav hidden lg:flex items-center gap-0.5" aria-label="Main">
                {navigation.header.map((item) => {
                  const open = openMenu === item.label;
                  const active = isActiveNavItem(pathname, item);
                  if (item.columns?.length && !item.standalone) {
                    return (
                      <div
                        key={item.label}
                        onMouseEnter={() => handleEnter(item.label)}
                        onMouseLeave={() => handleLeave(item.label)}
                      >
                        <button
                          ref={(el) => {
                            triggerRefs.current[item.label] = el;
                          }}
                          className={cn(dropdownBtnClass, (open || active) && "text-primary bg-primary/10", active && "nav-tab-active-light")}
                          aria-haspopup="true"
                          aria-expanded={open}
                          aria-controls={`${slugify(item.label)}-dropdown-panel`}
                          onClick={() => setOpenMenu(open ? null : item.label)}
                          onKeyDown={(e) => handleKeyDown(e, item.label)}
                        >
                          <NavLabel item={item} />
                          <ChevronDown
                            className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
                          />
                        </button>
                        <MegaDropdown item={item} open={open} onClose={close} />
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        navLinkClass,
                        item.standalone && "inline-flex items-center gap-1.5 text-accent-dark font-bold",
                        item.standalone && active && "nav-tab-active-light"
                      )}
                    >
                      {item.standalone && (
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      )}
                      <NavLabel item={item} />
                    </Link>
                  );
                })}
              </nav>

              {/* Right: CTA — always visible, never crowded out */}
              <div className="hidden lg:flex items-center">
                <Link
                  href={site.ctas.primary.href}
                  className="site-header__cta rounded-md bg-primary text-white font-bold px-4 py-2.5 text-[13px] hover:bg-navy transition-colors shadow-md whitespace-nowrap"
                >
                  {site.ctas.primary.label}
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="site-header__menu-button lg:hidden p-2.5 rounded-md text-primary hover:bg-primary/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}
