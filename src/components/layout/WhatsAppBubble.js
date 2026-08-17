"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { site } from "@/config/site";

const phoneDigits = site.phone.replace(/[^0-9]/g, "");
const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL || `https://wa.me/${phoneDigits}`;
const whatsappColor = process.env.NEXT_PUBLIC_WHATSAPP_BUBBLE_COLOR || "var(--brand-primary)";

/** Sitewide WhatsApp handoff bubble. The URL and brand color are env-configurable. */
export default function WhatsAppBubble() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="cmg-whatsapp-bubble"
      style={{ backgroundColor: whatsappColor }}
    >
      <span className="cmg-whatsapp-bubble-icon" aria-hidden="true">
        <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
        <PhoneCall className="cmg-whatsapp-bubble-phone h-3.5 w-3.5" strokeWidth={2.8} />
      </span>
      <span className="sr-only">Chat with us on WhatsApp</span>
    </a>
  );
}
