"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Field, TextInput, SelectInput, TextArea, CheckboxField } from "./fields";
import { FormShell, FieldGrid } from "./FormShell";
import FormSuccessCard from "./FormSuccessCard";
import FormSubmitButton from "./FormSubmitButton";
import FormErrorBanner from "./FormErrorBanner";
import { useFormSubmit } from "@/hooks/useFormSubmit";

const initial = { fullName: "", email: "", topic: "", message: "", consent: false };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const { status, serverError, run } = useFormSubmit("contact");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.topic) e.topic = "Please choose a topic.";
    if (form.message.trim().length < 10) e.message = "Please add a little more detail (at least 10 characters).";
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
      <FormSuccessCard title="Message sent">
        Thanks, {form.fullName.split(" ")[0] || "there"}. We&apos;ve received your message and will reply to{" "}
        <strong className="text-ink">{form.email}</strong> within one business day.
      </FormSuccessCard>
    );
  }

  return (
    <FormShell as="form" onSubmit={onSubmit} noValidate>
      <FieldGrid>
        <Field label="Full name" htmlFor="contact-name" required error={errors.fullName}>
          <TextInput id="contact-name" autoComplete="name" value={form.fullName} onChange={set("fullName")} error={errors.fullName} />
        </Field>
        <Field label="Email" htmlFor="contact-email" required error={errors.email}>
          <TextInput id="contact-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Topic" htmlFor="contact-topic" required error={errors.topic}>
            <SelectInput id="contact-topic" value={form.topic} onChange={set("topic")} error={errors.topic}>
              <option value="">Select…</option>
              <option>Immigration program question</option>
              <option>Book a consultation</option>
              <option>Urgent / refusal case</option>
              <option>Employer / LMIA services</option>
              <option>Payment or invoice</option>
              <option>Something else</option>
            </SelectInput>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Message" htmlFor="contact-message" required error={errors.message}>
            <TextArea id="contact-message" rows={5} value={form.message} onChange={set("message")} error={errors.message} placeholder="Tell us about your situation…" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <CheckboxField
            htmlFor="contact-consent"
            checked={form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
            error={errors.consent}
            label="I agree to be contacted about my enquiry by email or phone."
          />
        </div>
      </FieldGrid>

      <FormErrorBanner message={serverError} />

      <FormSubmitButton loading={status === "loading"} icon={Send}>
        Send message
      </FormSubmitButton>
    </FormShell>
  );
}
