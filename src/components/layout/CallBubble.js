import { Phone } from "lucide-react";
import { site } from "@/config/site";

const phoneHref = site.phoneHref;

/** Sitewide direct-call bubble. It stays hidden until a real phone number is configured. */
export default function CallBubble() {
  if (!phoneHref?.startsWith("tel:")) return null;

  return (
    <a
      href={phoneHref}
      aria-label={`Call ${site.name}`}
      title={`Call ${site.name}`}
      className="cmg-call-bubble"
    >
      <Phone className="cmg-call-bubble-icon" aria-hidden="true" />
      <span className="sr-only">Call {site.name}</span>
    </a>
  );
}
