"use client";

import { useState } from "react";
import { CalendarCheck, Send } from "lucide-react";
import { Field, TextInput, SelectInput, TextArea, CheckboxField } from "./fields";
import { FormShell, FieldGrid } from "./FormShell";
import FormSuccessCard from "./FormSuccessCard";
import FormSubmitButton from "./FormSubmitButton";
import FormErrorBanner from "./FormErrorBanner";
import { useFormSubmit } from "@/hooks/useFormSubmit";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  interest: "",
  mode: "",
  preferredDate: "",
  deadline: "",
  message: "",
  consent: false,
};

export default function ConsultationForm({ variant = "standard" }) {
  const urgent = variant === "urgent";
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const { status, serverError, run } = useFormSubmit(urgent ? "urgent-consultation" : "consultation");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.country.trim()) e.country = "Please enter your country of residence.";
    if (!urgent && !form.interest) e.interest = "Please tell us what you need help with.";
    if (!form.mode) e.mode = "Please choose a consultation mode.";
    if (!form.preferredDate) e.preferredDate = "Please pick a preferred date.";
    if (urgent && !form.deadline) e.deadline = "Please tell us your deadline — it matters for urgent cases.";
    if (urgent && form.message.trim().length < 10) e.message = "Please briefly describe the urgent situation.";
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
      <FormSuccessCard title="Consultation requested" tone={urgent ? "urgent" : "success"} className="consultation-form-success">
        {urgent
          ? `Your urgent request is in. Our team will contact ${form.email} within one business day to confirm your consultation.`
          : `Thanks, ${form.fullName.split(" ")[0] || "there"}. We'll confirm your consultation at ${form.email} within one business day.`}
      </FormSuccessCard>
    );
  }

  return (
    <FormShell as="form" onSubmit={onSubmit} noValidate className="consultation-form-shell">
      <div className="consultation-form-intro">
        <span className="consultation-form-intro-mark" aria-hidden="true">
          <CalendarCheck className="h-6 w-6" />
        </span>
        <div>
          <p className="consultation-form-kicker">Personalised guidance</p>
          <h3 className="consultation-form-title">
            {urgent ? "Tell us what needs attention." : "Tell us what you need help with."}
          </h3>
          <p className="consultation-form-description">
            Share a few details and our regulated team will follow up with the right next step.
          </p>
        </div>
      </div>

      <div className="consultation-form-section-label">
        <span>01</span>
        Your details
      </div>

      <FieldGrid className="consultation-form-fields">
        <Field label="Full name" htmlFor="consult-name" required error={errors.fullName}>
          <TextInput id="consult-name" autoComplete="name" value={form.fullName} onChange={set("fullName")} error={errors.fullName} />
        </Field>
        <Field label="Email" htmlFor="consult-email" required error={errors.email}>
          <TextInput id="consult-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        </Field>
        <Field label="Phone (optional)" htmlFor="consult-phone" hint="Include country code">
          <TextInput id="consult-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
        </Field>
        <Field label="Country of residence" htmlFor="consult-country" required error={errors.country}>
          <TextInput id="consult-country" autoComplete="country-name" value={form.country} onChange={set("country")} error={errors.country} />
        </Field>
        <Field label="What do you need help with?" htmlFor="consult-interest" required={!urgent} error={errors.interest}>
          <SelectInput id="consult-interest" value={form.interest} onChange={set("interest")} error={errors.interest}>
            <option value="">Select…</option>
            <option>Express Entry / economic PR</option>
            <option>Provincial nomination (PNP)</option>
            <option>Study permit / PGWP</option>
            <option>Work permit / LMIA</option>
            <option>Family sponsorship</option>
            <option>Visitor visa / Super Visa</option>
            <option>Refusal or appeal</option>
            <option>Employer / recruitment</option>
            <option>Not sure yet</option>
          </SelectInput>
        </Field>
        <Field label="Consultation mode" htmlFor="consult-mode" required error={errors.mode}>
          <SelectInput id="consult-mode" value={form.mode} onChange={set("mode")} error={errors.mode}>
            <option value="">Select…</option>
            <option>Video call</option>
            <option>Phone call</option>
            <option>In-office visit</option>
          </SelectInput>
        </Field>
        <Field label="Preferred date" htmlFor="consult-date" required error={errors.preferredDate}>
          <TextInput id="consult-date" type="date" value={form.preferredDate} onChange={set("preferredDate")} error={errors.preferredDate} />
        </Field>
        {urgent && (
          <Field label="Your deadline" htmlFor="consult-deadline" required error={errors.deadline} hint="e.g. PFL response due in 21 days">
            <TextInput id="consult-deadline" value={form.deadline} onChange={set("deadline")} error={errors.deadline} placeholder="e.g. Response due 2026-08-30" />
          </Field>
        )}
        <div className="sm:col-span-2">
          <Field
            label={urgent ? "Briefly describe the urgent situation" : "Anything we should know (optional)"}
            htmlFor="consult-message"
            required={urgent}
            error={errors.message}
          >
            <TextArea id="consult-message" rows={4} value={form.message} onChange={set("message")} error={errors.message} />
          </Field>
        </div>
        <div className="consultation-form-consent sm:col-span-2">
          <CheckboxField
            htmlFor="consult-consent"
            checked={form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
            error={errors.consent}
            label="I agree to be contacted about my consultation by email or phone."
          />
        </div>
      </FieldGrid>

      <FormErrorBanner message={serverError} />

      <div className="consultation-form-submit-row">
        <div>
          <p className="consultation-form-submit-title">Ready when you are</p>
          <p className="consultation-form-submit-note">No payment is taken. We confirm availability before anything is booked.</p>
        </div>
        <FormSubmitButton
          loading={status === "loading"}
          variant={urgent ? "accent" : "primary"}
          icon={Send}
          className="consultation-form-submit"
        >
          {urgent ? "Request urgent consultation" : "Request consultation"}
        </FormSubmitButton>
      </div>
    </FormShell>
  );
}
