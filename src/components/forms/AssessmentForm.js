"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { Field, TextInput, SelectInput, TextArea, CheckboxField } from "./fields";
import { FormShell, FieldGrid } from "./FormShell";
import FormSuccessCard from "./FormSuccessCard";
import FormSubmitButton from "./FormSubmitButton";
import FormErrorBanner from "./FormErrorBanner";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { site } from "@/config/site";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  currentStatus: "",
  goal: "",
  message: "",
  consent: false,
};

export default function AssessmentForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const { status, serverError, run } = useFormSubmit("assessment");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setCheck = (e) => setForm((f) => ({ ...f, consent: e.target.checked }));

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.country.trim()) e.country = "Please enter your country of residence.";
    if (!form.currentStatus) e.currentStatus = "Please select your current status.";
    if (!form.goal) e.goal = "Please select your main goal.";
    if (!form.consent) e.consent = "Please confirm you agree to be contacted.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    await run(form);
  }

  if (status === "success") {
    return (
      <FormSuccessCard title="Assessment received">
        Thank you, {form.fullName.split(" ")[0] || "friend"}. A consultant will review your profile and reply to{" "}
        <strong className="text-ink">{form.email}</strong> within two business days with your written assessment.
        <p className="mt-6 text-sm text-muted">
          In the meantime, try the{" "}
          <Link href="/tools/crs-calculator" className="font-semibold text-secondary underline underline-offset-2 hover:text-primary">
            CRS calculator
          </Link>
          .
        </p>
      </FormSuccessCard>
    );
  }

  return (
    <FormShell>
      <FieldGrid>
        <Field label="Full name" htmlFor="assessment-name" required error={errors.fullName}>
          <TextInput id="assessment-name" autoComplete="name" value={form.fullName} onChange={set("fullName")} error={errors.fullName} />
        </Field>

        <Field label="Email" htmlFor="assessment-email" required error={errors.email}>
          <TextInput id="assessment-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        </Field>

        <Field label="Phone (optional)" htmlFor="assessment-phone" hint="Include country code">
          <TextInput id="assessment-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
        </Field>

        <Field label="Country of residence" htmlFor="assessment-country" required error={errors.country}>
          <TextInput id="assessment-country" autoComplete="country-name" value={form.country} onChange={set("country")} error={errors.country} />
        </Field>

        <Field label="Current status" htmlFor="assessment-status" required error={errors.currentStatus}>
          <SelectInput id="assessment-status" value={form.currentStatus} onChange={set("currentStatus")} error={errors.currentStatus}>
            <option value="">Select…</option>
            <option>Living outside Canada</option>
            <option>Working in Canada</option>
            <option>Studying in Canada</option>
            <option>Visitor in Canada</option>
            <option>Previously refused</option>
          </SelectInput>
        </Field>

        <Field label="Main goal" htmlFor="assessment-goal" required error={errors.goal}>
          <SelectInput id="assessment-goal" value={form.goal} onChange={set("goal")} error={errors.goal}>
            <option value="">Select…</option>
            <option>Permanent residence (economic)</option>
            <option>Study permit</option>
            <option>Work permit</option>
            <option>Sponsor family</option>
            <option>Visitor visa / eTA / Super Visa</option>
            <option>Respond to a refusal or appeal</option>
            <option>Hire foreign talent (employer)</option>
          </SelectInput>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Tell us about your situation (optional)" htmlFor="assessment-message" hint="Education, work experience, timelines, or anything else that helps us assess you.">
            <TextArea id="assessment-message" rows={4} value={form.message} onChange={set("message")} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <CheckboxField
            htmlFor="assessment-consent"
            checked={form.consent}
            onChange={setCheck}
            error={errors.consent}
            label={`I agree that ${site.name} may contact me about my assessment by email or phone.`}
          />
        </div>
      </FieldGrid>

      <FormErrorBanner message={serverError} />

      <FormSubmitButton loading={status === "loading"} variant="accent" icon={Send}>
        Submit my free assessment
      </FormSubmitButton>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Free, no obligation. Your information is used only to prepare your assessment.
      </p>
    </FormShell>
  );
}
