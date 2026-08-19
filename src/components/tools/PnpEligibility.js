"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, MapPin, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/config/site";
import { currentPagePath } from "@/config/pageRoutes";

/**
 * PNP eligibility check — DEMO questionnaire.
 * Simplified logic that maps answers to likely stream categories.
 */

const QUESTIONS = [
  {
    key: "status",
    label: "What is your current immigration status?",
    options: [
      { value: "outside", label: "Living outside Canada" },
      { value: "worker", label: "Working in Canada on a permit" },
      { value: "student", label: "Studying in Canada" },
      { value: "visitor", label: "Visiting Canada" },
    ],
  },
  {
    key: "experience",
    label: "How many years of skilled work experience do you have?",
    options: [
      { value: "0", label: "Less than 1 year" },
      { value: "1", label: "1–2 years" },
      { value: "3", label: "3+ years" },
    ],
  },
  {
    key: "language",
    label: "Your best language level (CLB)",
    options: [
      { value: "low", label: "Below CLB 6" },
      { value: "mid", label: "CLB 6–7" },
      { value: "high", label: "CLB 8 or higher" },
    ],
  },
  {
    key: "education",
    label: "Highest level of education",
    options: [
      { value: "hs", label: "High school or less" },
      { value: "diploma", label: "College diploma or trade certificate" },
      { value: "degree", label: "Bachelor's degree or higher" },
    ],
  },
  {
    key: "jobOffer",
    label: "Do you have a job offer from a Canadian employer?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "connection",
    label: "Do you have a connection to a specific province?",
    options: [
      { value: "job", label: "Job offer or employer there" },
      { value: "study", label: "Graduated from a school there" },
      { value: "work", label: "Worked there before" },
      { value: "family", label: "Family member there" },
      { value: "none", label: "No particular connection" },
    ],
  },
];

const selectCls =
  "h-11 w-full rounded-brand-md border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/30";

export default function PnpEligibility() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = QUESTIONS[step];
  const answered = answers[question.key] != null;

  function choose(value) {
    setAnswers((a) => ({ ...a, [question.key]: value }));
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  }

  if (showResult) {
    return <Result answers={answers} onRestart={restart} />;
  }

  return (
    <div className="rounded-brand-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-surface-alt text-primary">
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-bold text-primary">PNP eligibility check</h2>
            <p className="text-xs text-muted">6 quick questions · demo logic</p>
          </div>
        </div>
        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-1.5 rounded-brand-md px-3 py-2 text-xs font-semibold text-muted transition-colors hover:bg-surface hover:text-primary"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden />
          Restart
        </button>
      </div>

      {/* Progress */}
      <div className="mt-6" aria-label="Progress">
        <div className="flex items-center justify-between text-xs font-semibold text-muted">
          <span>Question {step + 1} of {QUESTIONS.length}</span>
          <span>{Math.round((step / QUESTIONS.length) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-alt">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-primary">{question.label}</h3>
        <div className="mt-5 grid gap-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => choose(option.value)}
              className="group flex items-center justify-between rounded-brand-xl border border-line bg-white px-5 py-4 text-left transition-all hover:border-secondary/50 hover:bg-surface"
            >
              <span className="text-[15px] font-semibold text-ink group-hover:text-primary">
                {option.label}
              </span>
              <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
            </button>
          ))}
        </div>
      </div>

      {answered && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (step < QUESTIONS.length - 1) setStep(step + 1);
              else setShowResult(true);
            }}
            className="text-sm font-bold text-secondary underline-offset-4 hover:underline"
          >
            Skip to result →
          </button>
        </div>
      )}
    </div>
  );
}

function Result({ answers, onRestart }) {
  const findings = analyze(answers);
  const likelyCount = findings.filter((f) => f.level === "likely").length;

  return (
    <div className="rounded-brand-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-success/10 text-success">
          <CheckCircle2 className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-bold text-primary">Your PNP overview</h2>
          <p className="text-xs text-muted">Based on your answers · demo assessment</p>
        </div>
      </div>

      <div className="mt-6 rounded-brand-xl bg-surface p-5">
        <p className="text-sm leading-relaxed text-muted">
          Based on your profile, you look like a candidate for{" "}
          <strong className="font-semibold text-primary">{likelyCount > 0 ? "provincial nomination streams" : "improving your core profile first"}</strong>.
          Below is a rough read on common stream categories.
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {findings.map((f) => (
          <li key={f.label} className="flex items-start gap-3 rounded-brand-xl border border-line px-4 py-3.5">
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                f.level === "likely" ? "bg-success" : f.level === "possible" ? "bg-warning" : "bg-muted/40"
              }`}
              aria-hidden
            />
            <div>
              <p className="text-sm font-bold text-primary">{f.label}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{f.note}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-brand-xl bg-primary p-6 text-white">
        <h3 className="text-base font-bold">Turn this into a real strategy</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Provinces have specific streams, occupations and intake rounds. A free assessment gets you a written shortlist of the streams that actually fit.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href={currentPagePath("/tools/free-assessment")} variant="light">Free assessment</Button>
          <Button href={site.ctas.primary.href} variant="lightOutline">{site.ctas.primary.label}</Button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button type="button" onClick={onRestart} className="text-sm font-bold text-secondary underline-offset-4 hover:underline">
          Restart the check
        </button>
      </div>
    </div>
  );
}

function analyze(a) {
  const findings = [];
  const exp = Number(a.experience) || 0;
  const outside = a.status === "outside";
  const inCanada = a.status === "worker" || a.status === "student";
  const strongLang = a.language === "high";
  const degree = a.education === "degree";
  const offer = a.jobOffer === "yes";
  const connection = a.connection !== "none";

  findings.push({
    label: "Employer-driven streams",
    level: offer ? "likely" : "possible",
    note: offer
      ? "With a job offer, employer-driven provincial streams are a strong fit."
      : "Without a job offer, check employer-driven streams once you secure one.",
  });

  findings.push({
    label: "Express Entry-linked (enhanced) PNP",
    level: degree && strongLang && exp >= 1 ? "likely" : "possible",
    note: degree && strongLang && exp >= 1
      ? "Your education and language could support an enhanced nomination worth 600 CRS points."
      : "Consider raising language scores or gaining experience before targeting enhanced streams.",
  });

  findings.push({
    label: "Graduate / student streams",
    level: a.status === "student" ? "likely" : "unlikely",
    note: a.status === "student"
      ? "As a student, graduate streams in provinces like Ontario, BC and Alberta may apply."
      : "Graduate streams generally require study in the province.",
  });

  findings.push({
    label: "Base (non-Express Entry) PNP streams",
    level: outside && exp >= 3 && offer ? "likely" : "possible",
    note: outside && exp >= 3 && offer
      ? "Work-experience + offer combinations fit several base streams."
      : "Base streams often need strong provincial connection or an offer.",
  });

  findings.push({
    label: "Regional / rural community streams",
    level: connection && exp >= 1 ? "possible" : "unlikely",
    note: "Community-based programs value genuine connection to the region.",
  });

  return findings;
}
