"use client";

import { useState } from "react";
import { Calculator, Info, RefreshCw, Sparkles, TrendingUp } from "lucide-react";
import {
  ToolCard,
  ToolHeader,
  ToolField,
  ToolSelect,
  ToolInput,
  ToolCheckboxCard,
  ToolResultCard,
  ToolStat,
  ToolResetButton,
} from "./ui/ToolPrimitives";

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
  { value: "other", label: "Other qualifying offer", points: 50 },
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
  age: 30, hasSpouse: false, education: "bachelor", language: "clb7", secondLanguage: "none",
  canadianExperience: "1", foreignExperience: "3", spouseEducation: "bachelor", spouseLanguage: "none",
  spouseExperience: "none", provincialNomination: false, jobOffer: "none", canadianEducation: "none", french: "none", sibling: false,
};

export default function CrsCalculator() {
  const [form, setForm] = useState(initialState);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setBool = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.checked }));
  const handleAgeChange = (e) => {
    const { value } = e.target;
    if (value === "") {
      setForm((f) => ({ ...f, age: "" }));
      return;
    }

    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) {
      setForm((f) => ({ ...f, age: numericValue }));
    }
  };
  const handleAgeBlur = () => setForm((f) => {
    const rawValue = String(f.age).trim();
    if (rawValue === "") return { ...f, age: 30 };

    const numericValue = Number(rawValue);
    return { ...f, age: Number.isFinite(numericValue) ? clamp(numericValue) : 30 };
  });
  const reset = () => setForm(initialState);
  const score = computeScore(form);
  const breakdown = computeBreakdown(form);
  const level = score >= 1000 ? "Elite" : score >= 480 ? "Competitive" : score >= 440 ? "Potential" : "Developing";

  return (
    <ToolCard className="crs-calculator">
      <ToolHeader
        icon={Calculator}
        kicker="Free · Instant · No sign-up"
        title="CRS Score Estimator"
        subtitle="Close estimate based on the official IRCC grid — a planning snapshot before you submit."
        action={<ToolResetButton onClick={reset}><RefreshCw className="h-3.5 w-3.5" /> Reset</ToolResetButton>}
      />

      <div className="tool-card__body">
        {/* Intro band */}
        <div className="tool-notice mb-6 flex items-center gap-2 text-xs font-semibold">
          <Sparkles className="tool-accent h-3.5 w-3.5" />
          <span>Tip: add spouse, language or Canadian education to see live score movement.</span>
        </div>

        <div className="crs-calculator__form-grid grid gap-6 sm:grid-cols-2">
          <div className="crs-calculator__column">
            <div className="crs-calculator__column-heading">
              <span className="crs-calculator__column-index">01</span>
              <span>
                <strong>Core profile</strong>
                <small>Your main CRS factors</small>
              </span>
            </div>
            <ToolField label="Age" htmlFor="crs-age">
              <ToolInput id="crs-age" type="number" inputMode="numeric" step={1} min={18} max={50} value={form.age} onChange={handleAgeChange} onBlur={handleAgeBlur} />
            </ToolField>
            <ToolField label="Education">
              <ToolSelect value={form.education} onChange={set("education")}>
                {EDUCATION.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </ToolSelect>
            </ToolField>
            <ToolField label="First official language">
              <ToolSelect value={form.language} onChange={set("language")}>
                {LANGUAGE.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </ToolSelect>
            </ToolField>
            <ToolField label="Second official language (optional)">
              <ToolSelect value={form.secondLanguage} onChange={set("secondLanguage")}>
                {SECOND_LANGUAGE.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </ToolSelect>
            </ToolField>
            <ToolField label="Canadian work experience">
              <ToolSelect value={form.canadianExperience} onChange={set("canadianExperience")}>
                {CANADIAN_EXPERIENCE.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </ToolSelect>
            </ToolField>
            <ToolField label="Foreign work experience">
              <ToolSelect value={form.foreignExperience} onChange={set("foreignExperience")}>
                {FOREIGN_EXPERIENCE.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </ToolSelect>
            </ToolField>
          </div>

          <div className="crs-calculator__column">
            <div className="crs-calculator__column-heading">
              <span className="crs-calculator__column-index">02</span>
              <span>
                <strong>Additional factors</strong>
                <small>Bonus points and family factors</small>
              </span>
            </div>
            <ToolCheckboxCard className="crs-calculator__toggle crs-calculator__toggle--spouse" label="Applying with a spouse / partner" hint="Toggle to include spouse factors" checked={form.hasSpouse} onChange={setBool("hasSpouse")} />
            {form.hasSpouse && (
              <div className="tool-group grid gap-4 p-3">
                <ToolField label="Spouse education">
                  <ToolSelect value={form.spouseEducation} onChange={set("spouseEducation")}>
                    {SPOUSE_EDUCATION.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </ToolSelect>
                </ToolField>
                <ToolField label="Spouse language (CLB)">
                  <ToolSelect value={form.spouseLanguage} onChange={set("spouseLanguage")}>
                    {SPOUSE_LANGUAGE.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </ToolSelect>
                </ToolField>
                <ToolField label="Spouse Canadian work experience">
                  <ToolSelect value={form.spouseExperience} onChange={set("spouseExperience")}>
                    {SPOUSE_EXPERIENCE.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </ToolSelect>
                </ToolField>
              </div>
            )}
            <ToolField label="Provincial nomination (adds 600 points)">
              <ToolSelect value={form.provincialNomination ? "yes" : "no"} onChange={(e) => setForm((f) => ({ ...f, provincialNomination: e.target.value === "yes" }))}>
                <option value="no">No</option>
                <option value="yes">Yes — nominated</option>
              </ToolSelect>
            </ToolField>
            <ToolField label="Qualifying job offer">
              <ToolSelect value={form.jobOffer} onChange={set("jobOffer")}>
                {JOB_OFFER.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </ToolSelect>
            </ToolField>
            <ToolField label="Canadian education">
              <ToolSelect value={form.canadianEducation} onChange={set("canadianEducation")}>
                {CANADIAN_EDUCATION.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </ToolSelect>
            </ToolField>
            <ToolField label="French ability">
              <ToolSelect value={form.french} onChange={set("french")}>
                {FRENCH.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </ToolSelect>
            </ToolField>
            <ToolCheckboxCard className="crs-calculator__toggle crs-calculator__toggle--sibling" label="Sibling living in Canada (citizen/PR)" checked={form.sibling} onChange={setBool("sibling")} />
          </div>
        </div>

        {/* Result */}
        <ToolResultCard className="mt-7">
          <div className="tool-result__layout flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="tool-result__summary min-w-0">
              <p className="tool-result__label flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><TrendingUp className="h-3.5 w-3.5" /> Estimated CRS — {level}</p>
              <div
                className="tool-result__score-gauge mt-3"
                style={{ "--score-progress": `${Math.min(100, Math.round((score / 1200) * 100))}%` }}
                aria-label={`Estimated CRS score ${score} out of 1200`}
              >
                <div className="tool-result__score-gauge-content">
                  <strong className="tool-result__score">{score}</strong>
                  <span>/ 1200 CRS</span>
                </div>
              </div>
              <p className="tool-result__copy mt-2 max-w-md text-sm leading-relaxed">
                {score >= 1000 ? "With a provincial nomination or senior-management offer, you're effectively guaranteed an invitation." : score >= 480 ? "Competitive — you'd likely receive an invitation in recent draws." : score >= 440 ? "Potentially competitive depending on recent cut-offs." : "Below recent cut-offs — provincial streams or score improvements could change that."}
              </p>
            </div>
            <div className="w-full max-w-xs space-y-2">
              {breakdown.map((row) => <ToolStat key={row.label} label={row.label} value={`+${row.points}`} />)}
              {breakdown.length === 0 && <p className="tool-result__empty rounded-xl px-3.5 py-3 text-sm">Adjust inputs to see scoring.</p>}
            </div>
          </div>
        </ToolResultCard>

        <p className="tool-muted mt-4 flex items-start gap-2 text-xs leading-relaxed">
          <Info className="tool-accent mt-0.5 h-4 w-4 shrink-0" />
          Simplified CRS grid (one CLB across all abilities, skill-transferability approximated). Official score is set by IRCC at submission — use this as a planning estimate.
        </p>
      </div>
    </ToolCard>
  );
}

function clamp(n) { if (Number.isNaN(n)) return 30; return Math.min(50, Math.max(18, n)); }
function computeScore(form) { return computeBreakdown(form).reduce((s, r) => s + r.points, 0); }
function computeBreakdown(form) {
  const spouse = form.hasSpouse;
  const agePoints = (spouse ? AGE_POINTS_WITH_SPOUSE : AGE_POINTS_NO_SPOUSE)[form.age] || 0;
  const edu = EDUCATION.find((o) => o.value === form.education);
  const lang = LANGUAGE.find((o) => o.value === form.language);
  const secondLang = SECOND_LANGUAGE.find((o) => o.value === form.secondLanguage);
  const canExp = CANADIAN_EXPERIENCE.find((o) => o.value === form.canadianExperience);
  const foreignYears = (FOREIGN_EXPERIENCE.find((o) => o.value === form.foreignExperience) || {}).years || 0;
  let transferability = 0;
  const clb9plus = form.language === "clb9" || form.language === "clb10";
  const postSecondary = form.education !== "none" && form.education !== "hs";
  const canYears = Number(form.canadianExperience) || 0;
  if (postSecondary && clb9plus) transferability += 50; else if (postSecondary) transferability += 25;
  if (postSecondary && canYears >= 2) transferability += 50; else if (postSecondary && canYears >= 1) transferability += 25;
  if (clb9plus && foreignYears >= 3) transferability += 50; else if (foreignYears >= 3) transferability += 25;
  if (canYears >= 2 && foreignYears >= 3) transferability += 50; else if (canYears >= 1 && foreignYears >= 3) transferability += 25;
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
