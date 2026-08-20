"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HERO_SLIDES } from "@/lib/heroSlides";

const AUTOPLAY_MS = 6200;

export default function HeroCarousel({ slides = HERO_SLIDES, className, showControls = true }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeSlide = slides[activeIndex] || slides[0];
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides || paused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [hasMultipleSlides, paused, slides.length]);

  const goTo = (index) => setActiveIndex((index + slides.length) % slides.length);

  return (
    <div
      className={cn("cmg-hero-carousel", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Canadian locations and opportunities"
    >
      <div className="cmg-hero-carousel__slides">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={cn("cmg-hero-carousel__slide", index === activeIndex && "is-active")}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="cmg-hero-carousel__image"
            />
          </div>
        ))}
      </div>

      <div className="cmg-hero-carousel__wash" aria-hidden />

      {hasMultipleSlides && showControls && (
        <div className="cmg-hero-carousel__controls">
          <span className="cmg-hero-carousel__caption" aria-live="polite">
            {activeSlide?.label}
          </span>
          <div className="cmg-hero-carousel__buttons">
            <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous hero image">
              <ArrowLeft aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              aria-label={paused ? "Play hero carousel" : "Pause hero carousel"}
              aria-pressed={paused}
            >
              {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
            </button>
            <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next hero image">
              <ArrowRight aria-hidden />
            </button>
          </div>
          <div className="cmg-hero-carousel__dots" role="tablist" aria-label="Choose hero image">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show hero image ${index + 1}`}
                onClick={() => goTo(index)}
                className={cn(index === activeIndex && "is-active")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
