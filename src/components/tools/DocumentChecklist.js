"use client";

import { useState } from "react";
import { ClipboardCheck, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Document checklist — DEMO interactive checklist grouped by application type.
 */

const CHECKLISTS = {
  "express-entry": {
    label: "Express Entry (PR)",
    groups: [
      {
        title: "Identity & status",
        items: ["Valid passport (all applicants)", "Recent photographs", "Marriage certificate / proof of relationship"],
      },
      {
        title: "Work & education",
        items: ["Reference letters for each role (duties + hours)", "Education diplomas & transcripts", "Educational Credential Assessment (ECA)"],
      },
      {
        title: "Language & medical",
        items: ["IELTS / CELPIP / TCF results", "Medical examination report", "Police certificates (all countries lived in 6+ months since 18)"],
      },
      {
        title: "Finances & settlement",
        items: ["Proof of settlement funds (6 months of statements)", "Provincial nomination letter (if applicable)", "Job offer letter + LMIA (if applicable)"],
      },
    ],
  },
  "study-permit": {
    label: "Study Permit",
    groups: [
      {
        title: "Admission",
        items: ["Letter of acceptance from a DLI", "Proof of tuition payment or fee deposit", "Valid passport and photographs"],
      },
      {
        title: "Finances",
        items: ["Proof of funds for tuition + living costs", "Bank statements (4 months)", "Sponsor letter and sponsor's financial evidence (if applicable)"],
      },
      {
        title: "Intent & background",
        items: ["Study plan / statement of purpose", "Proof of ties to home country", "Police certificate (if required)", "Medical examination (if required)"],
      },
    ],
  },
  "work-permit": {
    label: "Work Permit",
    groups: [
      {
        title: "Job & employer",
        items: ["Job offer letter", "Positive LMIA (or exemption evidence)", "Employer documents (business registration, T2 summary)"],
      },
      {
        title: "Applicant documents",
        items: ["Valid passport and photographs", "Proof of qualifications / credentials", "Resume / CV"],
      },
      {
        title: "Background",
        items: ["Medical examination (if required by role)", "Police certificate (if required)", "Proof of funds for family (if applicable)"],
      },
    ],
  },
  sponsorship: {
    label: "Spousal Sponsorship",
    groups: [
      {
        title: "Sponsor documents",
        items: ["Sponsor's proof of Canadian status (citizenship / PR card)", "Sponsor's income documents (3 years)", "Proof the sponsor isn't on social assistance (if applicable)"],
      },
      {
        title: "Relationship evidence",
        items: ["Marriage certificate / cohabitation proof", "Photos spanning the relationship", "Communication records (calls, messages)", "Joint financial evidence (leases, accounts, insurance)"],
      },
      {
        title: "Applicant documents",
        items: ["Valid passport and photographs", "Police certificates", "Medical examination report", "Birth certificates of children (if applicable)"],
      },
    ],
  },
};

const selectCls =
  "h-11 w-full rounded-brand-md border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/30";

export default function DocumentChecklist() {
  const [type, setType] = useState("express-entry");
  const [checked, setChecked] = useState({});

  const checklist = CHECKLISTS[type];
  const allItems = checklist.groups.flatMap((g) => g.items);
  const done = allItems.filter((item) => checked[`${type}:${item}`]).length;
  const pct = allItems.length ? Math.round((done / allItems.length) * 100) : 0;

  function toggle(item) {
    const key = `${type}:${item}`;
    setChecked((c) => ({ ...c, [key]: !c[key] }));
  }

  function reset() {
    setChecked({});
  }

  return (
    <div className="rounded-brand-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-surface-alt text-primary">
            <ClipboardCheck className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-bold text-primary">Document checklist</h2>
            <p className="text-xs text-muted">Demo checklist · verify current IRCC requirements</p>
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

      {/* Type selector */}
      <label htmlFor="checklist-type" className="mb-1.5 mt-6 block text-sm font-semibold text-primary">
        Application type
      </label>
      <select id="checklist-type" value={type} onChange={(e) => { setType(e.target.value); setChecked({}); }} className={selectCls}>
        {Object.entries(CHECKLISTS).map(([key, cl]) => (
          <option key={key} value={key}>{cl.label}</option>
        ))}
      </select>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold text-muted">
          <span>{done} of {allItems.length} documents ready</span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-alt" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-success transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Groups */}
      <div className="mt-7 space-y-7">
        {checklist.groups.map((group) => (
          <fieldset key={group.title}>
            <legend className="text-sm font-bold text-primary">{group.title}</legend>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => {
                const key = `${type}:${item}`;
                const isChecked = !!checked[key];
                return (
                  <li key={item}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-brand-lg border px-4 py-3 transition-colors",
                        isChecked ? "border-success/30 bg-success/5" : "border-line bg-white hover:bg-surface"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(item)}
                        className="mt-0.5 h-4 w-4 accent-[var(--brand-success)]"
                      />
                      <span className={cn("text-sm leading-relaxed", isChecked ? "text-success line-through decoration-success/50" : "text-ink")}>
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>

      {pct === 100 && (
        <div className="mt-8 rounded-brand-xl bg-success/10 p-5 text-center">
          <p className="text-sm font-bold text-success">All documents marked as ready 🎉</p>
          <p className="mt-1 text-xs text-muted">
            A consultant will still review every document for consistency before submission.
          </p>
        </div>
      )}
    </div>
  );
}
