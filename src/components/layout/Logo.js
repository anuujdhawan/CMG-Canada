import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * CMG brand logo lockup.
 * variant "dark" — full-color wordmark for light backgrounds
 * variant "light" — white wordmark for dark backgrounds
 */
export default function Logo({ variant = "dark", className, href = "/" }) {
  const light = variant === "light";
  return (
    <Link href={href} aria-label={`${site.name} — home`} className={cn("group flex shrink-0 items-center", className)}>
      <Image
        src={light ? site.logos.white : site.logos.large}
        alt={site.name}
        width={1912}
        height={1140}
        priority
        className="h-9 w-auto object-contain transition-opacity group-hover:opacity-90 sm:h-10"
      />
    </Link>
  );
}
