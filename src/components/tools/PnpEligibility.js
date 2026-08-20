"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, MapPin, RefreshCw, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/config/site";
import { currentPagePath } from "@/config/pageRoutes";
import { ToolCard, ToolHeader, ToolResetButton, ToolProgress, ToolOptionButton, ToolResultCard } from "./ui/ToolPrimitives";

const QUESTIONS = [
  { key: "status", label: "What is your current immigration status?", options: [{ value: "outside", label: "Living outside Canada" }, { value: "worker", label: "Working in Canada on a permit" }, { value: "student", label: "Studying in Canada" }, { value: "visitor", label: "Visiting Canada" }] },
  { key: "experience", label: "How many years of skilled work experience do you have?", options: [{ value: "0", label: "Less than 1 year" }, { value: "1", label: "1–2 years" }, { value: "3", label: "3+ years" }] },
  { key: "language", label: "Your best language level (CLB)", options: [{ value: "low", label: "Below CLB 6" }, { value: "mid", label: "CLB 6–7" }, { value: "high", label: "CLB 8 or higher" }] },
  { key: "education", label: "Highest level of education", options: [{ value: "hs", label: "High school or less" }, { value: "diploma", label: "College diploma or trade certificate" }, { value: "degree", label: "Bachelor's degree or higher" }] },
  { key: "jobOffer", label: "Do you have a job offer from a Canadian employer?", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
  { key: "connection", label: "Do you have a connection to a specific province?", options: [{ value: "job", label: "Job offer or employer there" }, { value: "study", label: "Graduated from a school there" }, { value: "work", label: "Worked there before" }, { value: "family", label: "Family member there" }, { value: "none", label: "No particular connection" }] },
];

export default function PnpEligibility() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const question = QUESTIONS[step];
  const answered = answers[question.key] != null;
  function choose(value) { setAnswers((a) => ({ ...a, [question.key]: value })); if (step < QUESTIONS.length - 1) setStep(step + 1); else setShowResult(true); }
  function restart() { setAnswers({}); setStep(0); setShowResult(false); }
  if (showResult) return <Result answers={answers} onRestart={restart} />;
  return (
    <ToolCard>
      <ToolHeader icon={MapPin} kicker="6 quick questions · 60 seconds" title="PNP Eligibility Check" subtitle="Map your profile to provincial nomination stream categories — private, instant, no email required." action={<ToolResetButton onClick={restart}><RefreshCw className="h-3.5 w-3.5" /> Restart</ToolResetButton>} />
      <div className="tool-card__body">
        <ToolProgress value={step} max={QUESTIONS.length} labelLeft={`Question ${step + 1} of ${QUESTIONS.length}`} labelRight={`${Math.round((step / QUESTIONS.length) * 100)}%`} />
        <div className="mt-7">
          <h3 className="tool-ink text-[1.15rem] font-extrabold leading-tight"><span className="tool-accent">{String(step + 1).padStart(2,"0")}.</span> {question.label}</h3>
          <div className="mt-5 grid gap-3">
            {question.options.map((option) => (
              <ToolOptionButton key={option.value} onClick={() => choose(option.value)}>
                <span>{option.label}</span>
                <ArrowRight className="tool-accent h-4 w-4 shrink-0" />
              </ToolOptionButton>
            ))}
          </div>
        </div>
        {answered && <div className="mt-6 flex justify-end"><button type="button" onClick={() => { if (step < QUESTIONS.length - 1) setStep(step + 1); else setShowResult(true); }} className="tool-accent text-sm font-bold hover:underline">Skip to result →</button></div>}
        <p className="tool-muted mt-6 flex items-center gap-2 text-xs"><Sparkles className="tool-accent h-3.5 w-3.5" /> Demo logic — provinces update streams frequently. Use this to prioritize research.</p>
      </div>
    </ToolCard>
  );
}

function Result({ answers, onRestart }) {
  const findings = analyze(answers);
  const likelyCount = findings.filter((f) => f.level === "likely").length;
  return (
    <ToolCard>
      <ToolHeader icon={CheckCircle2} kicker="Demo overview" title="Your PNP overview" subtitle="Based on your answers — rough read on stream categories worth researching next." action={<ToolResetButton onClick={onRestart}><RefreshCw className="h-3.5 w-3.5" /> Restart</ToolResetButton>} />
      <div className="tool-card__body">
        <div className="tool-notice">
          <p className="tool-field__hint">
            Based on your profile, you look like a candidate for <strong>{likelyCount > 0 ? "provincial nomination streams" : "improving your core profile first"}</strong>. Below is a rough read on common stream categories.
          </p>
        </div>
        <ul className="mt-6 space-y-3">
          {findings.map((f) => (
            <li key={f.label} className="tool-group flex items-start gap-3 px-4 py-3.5">
              <span className={`tool-level-dot tool-level-dot--${f.level} mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full`} />
              <div><p className="text-sm font-bold">{f.label}</p><p className="tool-field__hint mt-1">{f.note}</p></div>
            </li>
          ))}
        </ul>
        <ToolResultCard className="mt-7">
          <h3 className="text-base font-bold text-white">Turn this into a real strategy</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/85">Provinces have specific streams, NOCs and intake rounds. A free assessment gets you a written shortlist of the streams that actually fit.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href={currentPagePath("/tools/free-assessment")} variant="light">Free assessment</Button>
            <Button href={site.ctas.primary.href} variant="lightOutline">{site.ctas.primary.label}</Button>
          </div>
        </ToolResultCard>
        <div className="mt-6 text-center"><button type="button" onClick={onRestart} className="tool-accent text-sm font-bold hover:underline">Restart the check</button></div>
      </div>
    </ToolCard>
  );
}

function analyze(a) {
  const findings = []; const exp = Number(a.experience) || 0; const outside = a.status === "outside"; const strongLang = a.language === "high"; const degree = a.education === "degree"; const offer = a.jobOffer === "yes"; const connection = a.connection !== "none";
  findings.push({ label: "Employer-driven streams", level: offer ? "likely" : "possible", note: offer ? "With a job offer, employer-driven provincial streams are a strong fit." : "Without a job offer, check employer-driven streams once you secure one." });
  findings.push({ label: "Express Entry-linked (enhanced) PNP", level: degree && strongLang && exp >= 1 ? "likely" : "possible", note: degree && strongLang && exp >= 1 ? "Your education and language could support an enhanced nomination worth 600 CRS points." : "Consider raising language scores or gaining experience before targeting enhanced streams." });
  findings.push({ label: "Graduate / student streams", level: a.status === "student" ? "likely" : "unlikely", note: a.status === "student" ? "As a student, graduate streams in provinces like Ontario, BC and Alberta may apply." : "Graduate streams generally require study in the province." });
  findings.push({ label: "Base (non-Express Entry) PNP streams", level: outside && exp >= 3 && offer ? "likely" : "possible", note: outside && exp >= 3 && offer ? "Work-experience + offer combinations fit several base streams." : "Base streams often need strong provincial connection or an offer." });
  findings.push({ label: "Regional / rural community streams", level: connection && exp >= 1 ? "possible" : "unlikely", note: "Community-based programs value genuine connection to the region." });
  return findings;
}
