"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlogCard from "./BlogCard";

export default function BlogCategoryTabs({ groups }) {
  const [activeSlug, setActiveSlug] = useState(groups[0]?.slug || "");
  const [isVertical, setIsVertical] = useState(false);
  const tabRefs = useRef([]);
  const activeGroup = groups.find((group) => group.slug === activeSlug) || groups[0];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateOrientation = () => setIsVertical(mediaQuery.matches);

    updateOrientation();
    mediaQuery.addEventListener("change", updateOrientation);

    return () => mediaQuery.removeEventListener("change", updateOrientation);
  }, []);

  function selectCategory(slug, shouldFocus = false) {
    setActiveSlug(slug);

    if (shouldFocus) {
      const nextIndex = groups.findIndex((group) => group.slug === slug);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  function moveTab(event, currentIndex) {
    const direction = event.key;
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(direction)) return;

    event.preventDefault();
    const nextIndex = direction === "Home"
      ? 0
      : direction === "End"
        ? groups.length - 1
        : (currentIndex + (direction === "ArrowLeft" || direction === "ArrowUp" ? -1 : 1) + groups.length) % groups.length;

    const nextSlug = groups[nextIndex]?.slug;
    if (nextSlug) selectCategory(nextSlug, true);
  }

  if (!activeGroup) return null;

  return (
    <div className="reference-blog-tabs-shell">
      <div
        className="reference-blog-tabs"
        role="tablist"
        aria-label="Blog categories"
        aria-orientation={isVertical ? "vertical" : "horizontal"}
      >
        {groups.map((group, index) => {
          const isActive = group.slug === activeGroup.slug;
          const tabId = `blog-tab-${group.slug}`;
          const panelId = `blog-panel-${group.slug}`;

          return (
            <button
              className={`reference-blog-tab${isActive ? " is-active" : ""}`}
              id={tabId}
              key={group.slug}
              ref={(element) => { tabRefs.current[index] = element; }}
              role="tab"
              type="button"
              aria-controls={panelId}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectCategory(group.slug)}
              onKeyDown={(event) => moveTab(event, index)}
            >
              <span>{group.label}</span>
              <small>{String(group.posts.length).padStart(2, "0")}</small>
            </button>
          );
        })}
      </div>

      <section
        className="reference-blog-tab-panel"
        id={`blog-panel-${activeGroup.slug}`}
        key={activeGroup.slug}
        role="tabpanel"
        aria-labelledby={`blog-tab-${activeGroup.slug}`}
        tabIndex={0}
      >
        <div className="reference-blog-group__head">
          <div>
            <p className="eyebrow">{activeGroup.label}</p>
            <h3>{activeGroup.title}</h3>
          </div>
          <p>{activeGroup.description}</p>
        </div>
        {activeGroup.posts[0] && (
          <Link
            href={activeGroup.posts[0].path}
            className="reference-blog-group__banner"
            aria-label={`Open ${activeGroup.posts[0].title}`}
          >
            <Image
              src={activeGroup.posts[0].image.src}
              alt={activeGroup.posts[0].image.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 72vw"
              priority={false}
            />
            <span className="reference-blog-group__banner-overlay" aria-hidden="true" />
            <span className="reference-blog-group__banner-label">
              <span>Open: {activeGroup.posts[0].title}</span>
              <ArrowUpRight width={16} height={16} aria-hidden="true" />
            </span>
          </Link>
        )}
        <div className="reference-blog-grid">
          {activeGroup.posts.map((post, index) => <BlogCard key={post.path} post={post} index={index} />)}
        </div>
      </section>
    </div>
  );
}
