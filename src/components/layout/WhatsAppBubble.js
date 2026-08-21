"use client";

import { site } from "@/config/site";

const whatsappHref = site.whatsappUrl;

/** Sitewide WhatsApp handoff bubble. URL is driven by NEXT_PUBLIC_WHATSAPP_URL in .env — hidden until a number/URL is configured. */
export default function WhatsAppBubble() {
  if (!whatsappHref) return null;
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="cmg-whatsapp-bubble"
    >
      <span className="cmg-whatsapp-bubble-icon" aria-hidden="true">
        <img
          className="cmg-whatsapp-bubble-svg"
          src="/images/whatsapp-red.svg"
          alt=""
          width={256}
          height={256}
          draggable={false}
        />
      </span>
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
