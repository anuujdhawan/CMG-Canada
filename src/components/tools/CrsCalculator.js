"use client";

import { useState } from "react";
import { Calculator, Info, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CRS score calculator — DEMO implementation of the core Comprehensive
 * Ranking System grid. Language is simplified to a single CLB level for
 * all abilities. Results are estimates, not official.
 */

const AGE_POINTS_WITH_SPOUSE = { 18: 100, 19: 100, 20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 100, 30: 100, 31: 100, 32: 100, 33: 100, 34: 100, 35: 100, 36: 95, 37: 90, 38: 85, 39: 80, 40: 75, 41: 70, 42: 65, 43: 60, 44: 55, 45: 50, 46: 45, 47: 40, 48: 35, 49: 30, 50: 25 };
const AGE_POINTS_NO_SPOUSE = { 18: 110, 19: 110, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110, 27: 110, 28: 110, 29: 110, 30: 110, 31: 110, 32: 110, 33: 110, 34: 110, 35: 110, 36: 105, 37: 100, 38: 95, 39: 90, 40: 85, 41: 80, 42: 75, 43: 70, 44: 65, 45: 60, 46: 55, 47: 50, 48: 45, 49: 40, 50: 35 };

const EDUCATION = [
  { value: "none", label: "Less than high school", single: 0, withSpouse: 0 },
  { value: "hs", label: "High school", single: 30, withSpouse: 28 },
  { value: "one-year", label: "One-year post-secondary", single: 90, withSpouse: 84 },
  { value: "two-year", label: "Two-year program", single: 98, withSpouse: 91 },
  { value: "bachelor", label: "Bachelor's degree", single: 120, withSpouse: 112 },
  { value: "two-plus", label: "Two or more (one 3+ year)", single: 128, withSpouse: 119 },
  { value: "master", label: "Master's degree", single: 135, withSpouse: 126 },
  { value: "phd", label: "PhD", single: 150, withSpouse: 140 },
];

const LANGUAGE = [
  { value: "none", label: "Below CLB 4", single: 0, withSpouse: 0 },
  { value: "clb4", label: "CLB 4", single: 24, withSpouse: 24 },
  { value: "clb5", label: "CLB 5", single: 24, withSpouse: 24 },
  { value: "clb6", label: "CLB 6", single: 36, withSpouse: 32 },
  { value: "clb7", label: "CLB 7", single: 68, withSpouse: 64 },
  { value: "clb8", label: "CLB 8", single: 92, withSpouse: 88 },
  { value: "clb9", label: "CLB 9", single: 124, withSpouse: 116 },
  { value: "clb10", label: "CLB 10+", single: 136, withSpouse: 128 },
];

const SECOND_LANGUAGE = [
  { value: "none", label: "No second language", single: 0, withSpouse: 0 },
  { value: "clb5", label: "CLB 5–6", single: 4, withSpouse: 4 },
  { value: "clb7", label: "CLB 7–8", single: 12, withSpouse: 12 },
  { value: "clb9", label: "CLB 9+", single: 24, withSpouse: 22 },
];

const CANADIAN_EXPERIENCE = [
  { value: "none", label: "None", single: 0, withSpouse: 0 },
  { value: "1", label: "1 year", single: 40, withSpouse: 35 },
  { value: "2", label: "2 years", single: 53, withSpouse: 46 },
  { value: "3", label: "3 years", single: 64, withSpouse: 56 },
  { value: "4", label: "4 years", single: 72, withSpouse: 63 },
  { value: "5", label: "5+ years", single: 80, withSpouse: 70 },
];

const FOREIGN_EXPERIENCE = [
  { value: "none", label: "None", years: 0 },
  { value: "1", label: "1–2 years", years: 1 },
  { value: "3", label: "3+ years", years: 3 },
];

const SPOUSE_EDUCATION = [
  { value: "none", label: "No post-secondary", points: 0 },
  { value: "one-year", label: "One-year program", points: 6 },
  { value: "two-year", label: "Two-year program", points: 7 },
  { value: "bachelor", label: "Bachelor's degree", points: 8 },
  { value: "two-plus", label: "Two or more credentials", points: 9 },
  { value: "master", label: "Master's or PhD", points: 10 },
];

const SPOUSE_LANGUAGE = [
  { value: "none", label: "Below CLB 4", points: 0 },
  { value: "clb4", label: "CLB 4–5", points: 4 },
  { value: "clb6", label: "CLB 6–7", points: 12 },
  { value: "clb8", label: "CLB 8–9", points: 20 },
  { value: "clb10", label: "CLB 10+", points: 20 },
];

const SPOUSE_EXPERIENCE = [
  { value: "none", label: "None", points: 0 },
  { value: "1", label: "1–2 years in Canada", points: 5 },
  { value: "3", label: "3–4 years in Canada", points: 7 },
  { value: "5", label: "5+ years in Canada", points: 10 },
];

const JOB_OFFER = [
  { value: "none", label: "No qualifying job offer", points: 0 },
  { value: "nocc0", label: "NOC 00 (senior management)", points: 200 },
  { value: "other", label: "Other qualifying offer (LMIA-backed or exempt)", points: 50 },
];

const CANADIAN_EDUCATION = [
  { value: "none", label: "None", points: 0 },
  { value: "1", label: "One- or two-year credential", points: 15 },
  { value: "3", label: "Three or more years", points: 30 },
];

const FRENCH = [
  { value: "none", label: "No French", points: 0 },
  { value: "partial", label: "CLB 7+ French + CLB 4–5 English", points: 25 },
  { value: "strong", label: "CLB 7+ in both French and English", points: 50 },
];

const initialState = {
  age: 30,
  hasSpouse: false,
  education: "bachelor",
  language: "clb7",
  secondLanguage: "none",
  canadianExperience: "1",
  foreignExperience: "3",
  spouseEducation: "bachelor",
  spouseLanguage: "none",
  spouseExperience: "none",
  provincialNomination: false,
  jobOffer: "none",
  canadianEducation: "none",
  french: "none",
  sibling: false,
};

const selectCls =
  "h-11 w-full rounded-brand-md border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/30";

const labelCls = "mb-1.5 block text-sm font-semibold text-primary";

export default function CrsCalculator() {
  const [form, setForm] = useState(initialState);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setBool = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.checked }));
  const reset = () => setForm(initialState);

  const score = computeScore(form);
  const breakdown = computeBreakdown(form);

  return (
    <div className="rounded-brand-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-surface-alt text-primary">
            <Calculator className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-bold text-primary">CRS score estimator</h2>
            <p className="text-xs text-muted">Demo calculation · official scores come from IRCC</p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-brand-md px-3 py-2 text-xs font-semibold text-muted transition-colors hover:bg-surface hover:text-primary"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden />
          Reset
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {/* Core */}
        <div className="space-y-4">
          <Field label="Age">
            <input
              type="number"
              min={18}
              max={50}
              value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: clamp(Number(e.target.value)) }))}
              className={selectCls}
            />
          </Field>

          <Field label="Education">
            <select value={form.education} onChange={set("education")} className={selectCls}>
              {EDUCATION.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <Field label="First official language (single CLB for all abilities)">
            <select value={form.language} onChange={set("language")} className={selectCls}>
              {LANGUAGE.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Second official language (optional)">
            <select value={form.secondLanguage} onChange={set("secondLanguage")} className={selectCls}>
              {SECOND_LANGUAGE.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Canadian work experience">
            <select value={form.canadianExperience} onChange={set("canadianExperience")} className={selectCls}>
              {CANADIAN_EXPERIENCE.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Foreign work experience">
            <select value={form.foreignExperience} onChange={set("foreignExperience")} className={selectCls}>
              {FOREIGN_EXPERIENCE.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Spouse + extras */}
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-between rounded-brand-md border border-line bg-surface px-4 py-3">
            <span className="text-sm font-semibold text-primary">Applying with a spouse / partner</span>
            <input type="checkbox" checked={form.hasSpouse} onChange={setBool("hasSpouse")} className="h-4 w-4 accent-[var(--brand-accent)]" />
          </label>

          {form.hasSpouse && (
            <>
              <Field label="Spouse education">
                <select value={form.spouseEducation} onChange={set("spouseEducation")} className={selectCls}>
                  {SPOUSE_EDUCATION.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Spouse language (CLB)">
                <select value={form.spouseLanguage} onChange={set("spouseLanguage")} className={selectCls}>
                  {SPOUSE_LANGUAGE.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Spouse Canadian work experience">
                <select value={form.spouseExperience} onChange={set("spouseExperience")} className={selectCls}>
                  {SPOUSE_EXPERIENCE.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
            </>
          )}

          <Field label="Provincial nomination (adds 600 points)">
            <select value={form.provincialNomination ? "yes" : "no"} onChange={(e) => setForm((f) => ({ ...f, provincialNomination: e.target.value === "yes" }))} className={selectCls}>
              <option value="no">No</option>
              <option value="yes">Yes — nominated</option>
            </select>
          </Field>

          <Field label="Qualifying job offer">
            <select value={form.jobOffer} onChange={set("jobOffer")} className={selectCls}>
              {JOB_OFFER.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Canadian education">
            <select value={form.canadianEducation} onChange={set("canadianEducation")} className={selectCls}>
              {CANADIAN_EDUCATION.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <Field label="French ability">
            <select value={form.french} onChange={set("french")} className={selectCls}>
              {FRENCH.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <label className="flex cursor-pointer items-center justify-between rounded-brand-md border border-line bg-surface px-4 py-3">
            <span className="text-sm font-semibold text-primary">Sibling living in Canada</span>
            <input type="checkbox" checked={form.sibling} onChange={setBool("sibling")} className="h-4 w-4 accent-[var(--brand-accent)]" />
          </label>
        </div>
      </div>

      {/* Result */}
      <div className={cn("mt-8 rounded-brand-2xl p-6 sm:p-8", score >= 1000 ? "bg-accent" : "bg-primary")}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">Estimated CRS score</p>
            <p className="mt-1 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">{score}</p>
            <p className="mt-2 max-w-md text-sm text-white/80">
              {score >= 1000
                ? "With a provincial nomination or senior-management offer, you're effectively guaranteed an invitation in the next draw."
                : score >= 480
                ? "A competitive score — you'd likely receive an invitation in recent draws."
                : score >= 440
                ? "Potentially competitive depending on recent draw cut-offs."
                : "Likely below recent draw cut-offs — provincial nomination or score improvements could change that."}
            </p>
          </div>
          <div className="w-full max-w-xs space-y-2">
            {breakdown.map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-brand-lg bg-white/10 px-3.5 py-2 text-sm">
                <span className="text-white/85">{row.label}</span>
                <span className="font-bold text-white">+{row.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
        This calculator uses a simplified version of the CRS grid (language is entered as one CLB across all abilities, and some skill-transferability combinations are approximated). Your official score is calculated by IRCC at profile submission — use this as a planning estimate.
      </p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function clamp(n) {
  if (Number.isNaN(n)) return 30;
  return Math.min(50, Math.max(18, n));
}

function computeScore(form) {
  const b = computeBreakdown(form);
  return b.reduce((sum, row) => sum + row.points, 0);
}

function computeBreakdown(form) {
  const spouse = form.hasSpouse;
  const agePoints = (spouse ? AGE_POINTS_WITH_SPOUSE : AGE_POINTS_NO_SPOUSE)[form.age] || 0;
  const edu = EDUCATION.find((o) => o.value === form.education);
  const lang = LANGUAGE.find((o) => o.value === form.language);
  const secondLang = SECOND_LANGUAGE.find((o) => o.value === form.secondLanguage);
  const canExp = CANADIAN_EXPERIENCE.find((o) => o.value === form.canadianExperience);
  const foreignYears = (FOREIGN_EXPERIENCE.find((o) => o.value === form.foreignExperience) || {}).years || 0;

  // Skill transferability (simplified)
  let transferability = 0;
  const clb9plus = form.language === "clb9" || form.language === "clb10";
  const postSecondary = form.education !== "none" && form.education !== "hs";
  const canYears = Number(form.canadianExperience) || 0;

  if (postSecondary && clb9plus) transferability += 50;
  else if (postSecondary) transferability += 25;

  if (postSecondary && canYears >= 2) transferability += 50;
  else if (postSecondary && canYears >= 1) transferability += 25;

  if (clb9plus && foreignYears >= 3) transferability += 50;
  else if (foreignYears >= 3) transferability += 25;

  if (canYears >= 2 && foreignYears >= 3) transferability += 50;
  else if (canYears >= 1 && foreignYears >= 3) transferability += 25;

  const rows = [
    { label: "Age", points: agePoints },
    { label: "Education", points: spouse ? edu.withSpouse : edu.single },
    { label: "Language (first)", points: spouse ? lang.withSpouse : lang.single },
    { label: "Language (second)", points: spouse ? secondLang.withSpouse : secondLang.single },
    { label: "Canadian experience", points: spouse ? canExp.withSpouse : canExp.single },
    { label: "Skill transferability", points: transferability },
  ];

  if (spouse) {
    const sEdu = SPOUSE_EDUCATION.find((o) => o.value === form.spouseEducation);
    const sLang = SPOUSE_LANGUAGE.find((o) => o.value === form.spouseLanguage);
    const sExp = SPOUSE_EXPERIENCE.find((o) => o.value === form.spouseExperience);
    rows.push({ label: "Spouse factors", points: sEdu.points + sLang.points + sExp.points });
  }

  const additional = [];
  if (form.provincialNomination) additional.push({ label: "Provincial nomination", points: 600 });
  const offer = JOB_OFFER.find((o) => o.value === form.jobOffer);
  if (offer.points > 0) additional.push({ label: "Job offer", points: offer.points });
  const canEdu = CANADIAN_EDUCATION.find((o) => o.value === form.canadianEducation);
  if (canEdu.points > 0) additional.push({ label: "Canadian education", points: canEdu.points });
  const french = FRENCH.find((o) => o.value === form.french);
  if (french.points > 0) additional.push({ label: "French ability", points: french.points });
  if (form.sibling) additional.push({ label: "Sibling in Canada", points: 15 });

  return [...rows, ...additional].filter((r) => r.points > 0);
}
