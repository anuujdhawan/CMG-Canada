"use client";

import { useEffect } from "react";

function animateCount(element, reduced) {
  if (element.dataset.counted === "true") return;

  element.dataset.counted = "true";
  const target = Number(element.dataset.count || 0);
  const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
  if (!textNode || !Number.isFinite(target)) return;

  const update = (value) => {
    textNode.nodeValue = String(Math.round(value));
  };

  if (reduced) {
    update(target);
    return;
  }

  const startedAt = performance.now();
  const duration = 1100;
  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    update(target * eased);
    if (progress < 1) window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
}

export default function TemplateMotion() {
  useEffect(() => {
    const roots = [...document.querySelectorAll(".cmg-template-home")];
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const revealElements = roots.flatMap((root) => [...root.querySelectorAll(".reveal:not(.in)")]);
    const countElements = roots.flatMap((root) => [...root.querySelectorAll("[data-count]")]);
    const cleanups = [];

    if (reduced || !window.IntersectionObserver) {
      revealElements.forEach((element) => element.classList.add("in"));
      countElements.forEach((element) => animateCount(element, true));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }),
        { threshold: 0.12, rootMargin: "0px 0px -45px" }
      );
      revealElements.forEach((element) => revealObserver.observe(element));
      cleanups.push(() => revealObserver.disconnect());

      const countObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target, false);
          countObserver.unobserve(entry.target);
        }),
        { threshold: 0.7 }
      );
      countElements.forEach((element) => countObserver.observe(element));
      cleanups.push(() => countObserver.disconnect());
    }

    roots.forEach((root) => {
      const hero = root.querySelector(".hero");
      if (!hero) return;

      const onMove = (event) => {
        const bounds = hero.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;
        root.style.setProperty("--px", `${x}px`);
        root.style.setProperty("--py", `${y}px`);
      };
      const onLeave = () => {
        root.style.setProperty("--px", "0px");
        root.style.setProperty("--py", "0px");
      };

      hero.addEventListener("pointermove", onMove, { passive: true });
      hero.addEventListener("pointerleave", onLeave, { passive: true });
      cleanups.push(() => {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
