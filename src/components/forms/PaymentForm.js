"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import { FormShell } from "./FormShell";
import { Field, TextInput } from "./fields";
import FormSubmitButton from "./FormSubmitButton";
import FormErrorBanner from "./FormErrorBanner";

export default function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const value = Number(amount);
    if (!Number.isFinite(value) || value < 1) {
      setError("Enter a valid amount before continuing.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value, description }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <FormShell as="form" onSubmit={onSubmit} noValidate className="mx-auto max-w-md">
      <Field label="Amount (CAD)" htmlFor="pay-amount" required>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">
            $
          </span>
          <TextInput
            id="pay-amount"
            type="number"
            inputMode="decimal"
            min="1"
            step="0.01"
            placeholder="500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tool-input--prefixed"
            required
          />
        </div>
      </Field>

      <Field label="What's this for? (optional)" htmlFor="pay-description">
        <TextInput
          id="pay-description"
          type="text"
          placeholder="e.g. Consultation fee, Express Entry filing"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        />
      </Field>

      <FormErrorBanner message={error} />

      <FormSubmitButton loading={loading} icon={CreditCard}>
        Continue to Secure Checkout
      </FormSubmitButton>

      <p className="flex items-center gap-2 text-xs text-muted">
        <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
        We never see or store your card details.
      </p>
    </FormShell>
  );
}
