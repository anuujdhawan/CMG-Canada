"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

const VIDEO_CARDS = [
  {
    id: "study-milestone",
    src: "/images/videoCarousel/ChatGPT Image Aug 22, 2026, 03_22_19 PM.png",
    alt: "CMG client celebrating an immigration milestone with the Commonwealth Migration team",
  },
  {
    id: "family-milestone",
    src: "/images/videoCarousel/ChatGPT Image Aug 22, 2026, 03_42_56 PM (1).png",
    alt: "CMG clients celebrating a successful immigration milestone with their family",
  },
  {
    id: "visa-milestone",
    src: "/images/videoCarousel/ChatGPT Image Aug 22, 2026, 03_42_57 PM (2).png",
    alt: "CMG client holding travel documents after an immigration milestone",
  },
  {
    id: "pathway-milestone",
    src: "/images/videoCarousel/ChatGPT Image Aug 22, 2026, 03_42_57 PM (3).png",
    alt: "CMG client celebrating a pathway milestone with the Commonwealth Migration team",
  },
];

export default function LiveSuccessVideos() {
  const channelUrl = site.social.youtube;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % VIDEO_CARDS.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + VIDEO_CARDS.length) % VIDEO_CARDS.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % VIDEO_CARDS.length);
  const visibleCards = VIDEO_CARDS.map((_, offset) => VIDEO_CARDS[(activeIndex + offset) % VIDEO_CARDS.length]);

  return (
    <section className="section dark live-success-videos" aria-labelledby="live-success-videos-title">
      <div className="section-inner">
        <header className="section-head live-success-videos__head reveal">
          <div>
            <p className="eyebrow">Client success gallery</p>
            <h2 id="live-success-videos-title">Real people. Real milestones. A clearer journey.</h2>
          </div>
          <p>Explore moments from the Commonwealth Migration community, then visit our YouTube channel for the latest pathway conversations and client stories.</p>
        </header>

        <div
          className="live-success-videos__carousel reveal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <button type="button" className="live-success-videos__arrow live-success-videos__arrow--previous" onClick={showPrevious} aria-label="Show previous client success story">
            <ArrowLeft size={20} aria-hidden="true" />
          </button>

          <div className="live-success-videos__viewport" aria-live="polite">
            <div key={activeIndex} className="live-success-videos__track">
              {visibleCards.map((card, index) => (
                <a
                  key={`${card.id}-${activeIndex}`}
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`live-success-videos__card${index === 0 ? " is-active" : ""}`}
                  aria-label={`${card.alt}. Open Commonwealth Migration on YouTube.`}
                >
                  <Image src={card.src} alt={card.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                  <span className="live-success-videos__card-wash" aria-hidden="true" />
                  <span className="live-success-videos__card-play" aria-hidden="true"><Play size={17} fill="currentColor" /></span>
                  <span className="live-success-videos__card-label">Watch on YouTube <ArrowUpRight size={14} aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </div>

          <button type="button" className="live-success-videos__arrow live-success-videos__arrow--next" onClick={showNext} aria-label="Show next client success story">
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="live-success-videos__dots" role="tablist" aria-label="Client success stories">
          {VIDEO_CARDS.map((card, index) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Show client success story ${index + 1}`}
              className={activeIndex === index ? "is-active" : ""}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="live-success-videos__channel-link">
          Visit the full video library <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
