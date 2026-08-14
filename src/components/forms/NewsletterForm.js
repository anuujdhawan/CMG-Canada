"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitForm } from "@/lib/form-client";
import { cn } from "@/lib/utils";

export default function NewsletterForm({ variant = "footer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setError("");
    const result = await submitForm({ type: "newsletter", email: trimmed });
    if (result.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setError(result.error || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-success">
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        Thanks — you&apos;re subscribed to our updates.
      </p>
    );
  }

  const dark = variant === "footer";
  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "h-10 w-full rounded-brand-md border px-3.5 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/30",
            dark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/50"
              : "border-line bg-white text-ink placeholder:text-muted"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-brand-md px-4 text-sm font-semibold transition-colors disabled:opacity-60",
            dark
              ? "bg-accent text-white hover:bg-accent-dark"
              : "bg-primary text-white hover:bg-primary-dark"
          )}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Send className="h-3.5 w-3.5" aria-hidden />
          )}
          Subscribe
        </button>
      </div>
      {error && (
        <p role="alert" className={cn("mt-2 text-xs font-medium", dark ? "text-red-300" : "text-error")}>
          {error}
        </p>
      )}
    </form>
  );
}
