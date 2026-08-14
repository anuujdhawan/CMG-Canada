"use client";

import { useState } from "react";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

/** Demo payment form — no real payments are processed in the prototype. */
export default function PaymentForm() {
  const [reference, setReference] = useState("");

  return (
    <>
      <form className="mt-8" onSubmit={(e) => e.preventDefault()} aria-label="Invoice payment">
        <label htmlFor="payment-ref" className="mb-1.5 block text-sm font-semibold text-primary">
          Invoice / payment reference
        </label>
        <input
          id="payment-ref"
          type="text"
          placeholder="e.g. CI-2026-001234"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="h-11 w-full rounded-brand-md border border-line bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-secondary focus:ring-2 focus:ring-secondary/30"
        />
        <button
          type="submit"
          disabled
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-brand-lg bg-primary px-6 py-3 text-[15px] font-semibold text-white opacity-70 sm:w-auto"
        >
          <Lock className="h-4 w-4" aria-hidden />
          Continue to payment (demo)
        </button>
        <p className="mt-3 text-xs text-muted">
          Payment integration is a placeholder. Wire this button to your payment provider (e.g. Stripe) using the keys in{" "}
          <code className="rounded bg-surface px-1 py-0.5">.env</code>.
        </p>
      </form>

      <div className="mt-8 flex items-center justify-center gap-6 border-t border-line pt-6 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-success" aria-hidden /> Secured checkout
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-4 w-4 text-success" aria-hidden /> Encrypted
        </span>
      </div>
    </>
  );
}
