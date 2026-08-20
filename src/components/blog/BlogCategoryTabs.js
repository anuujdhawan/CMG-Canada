"use client";

import { useRef, useState } from "react";
import BlogCard from "./BlogCard";

export default function BlogCategoryTabs({ groups }) {
  const [activeSlug, setActiveSlug] = useState(groups[0]?.slug || "");
  const tabRefs = useRef([]);
  const activeGroup = groups.find((group) => group.slug === activeSlug) || groups[0];

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
      <div className="reference-blog-tabs" role="tablist" aria-label="Blog categories">
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
        <div className="reference-blog-grid">
          {activeGroup.posts.map((post, index) => <BlogCard key={post.path} post={post} index={index} />)}
        </div>
      </section>
    </div>
  );
}
