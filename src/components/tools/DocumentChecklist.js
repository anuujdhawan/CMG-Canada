"use client";

import { useState } from "react";
import { ClipboardCheck, RefreshCw, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { ToolCard, ToolHeader, ToolField, ToolSelect, ToolProgress, ToolResetButton, ToolResultCard } from "./ui/ToolPrimitives";

const CHECKLISTS = {
  "express-entry": {
    label: "Express Entry (PR)",
    groups: [
      { title: "Identity & status", items: ["Valid passport (all applicants)", "Recent photographs", "Marriage certificate / proof of relationship"] },
      { title: "Work & education", items: ["Reference letters for each role (duties + hours)", "Education diplomas & transcripts", "Educational Credential Assessment (ECA)"] },
      { title: "Language & medical", items: ["IELTS / CELPIP / TCF results", "Medical examination report", "Police certificates (all countries lived in 6+ months since 18)"] },
      { title: "Finances & settlement", items: ["Proof of settlement funds (6 months of statements)", "Provincial nomination letter (if applicable)", "Job offer letter + LMIA (if applicable)"] },
    ],
  },
  "study-permit": {
    label: "Study Permit",
    groups: [
      { title: "Admission", items: ["Letter of acceptance from a DLI", "Proof of tuition payment or fee deposit", "Valid passport and photographs"] },
      { title: "Finances", items: ["Proof of funds for tuition + living costs", "Bank statements (4 months)", "Sponsor letter and sponsor's financial evidence (if applicable)"] },
      { title: "Intent & background", items: ["Study plan / statement of purpose", "Proof of ties to home country", "Police certificate (if required)", "Medical examination (if required)"] },
    ],
  },
  "work-permit": {
    label: "Work Permit",
    groups: [
      { title: "Job & employer", items: ["Job offer letter", "Positive LMIA (or exemption evidence)", "Employer documents (business registration, T2 summary)"] },
      { title: "Applicant documents", items: ["Valid passport and photographs", "Proof of qualifications / credentials", "Resume / CV"] },
      { title: "Background", items: ["Medical examination (if required by role)", "Police certificate (if required)", "Proof of funds for family (if applicable)"] },
    ],
  },
  sponsorship: {
    label: "Spousal Sponsorship",
    groups: [
      { title: "Sponsor documents", items: ["Sponsor's proof of Canadian status (citizenship / PR card)", "Sponsor's income documents (3 years)", "Proof the sponsor isn't on social assistance (if applicable)"] },
      { title: "Relationship evidence", items: ["Marriage certificate / cohabitation proof", "Photos spanning the relationship", "Communication records (calls, messages)", "Joint financial evidence (leases, accounts, insurance)"] },
      { title: "Applicant documents", items: ["Valid passport and photographs", "Police certificates", "Medical examination report", "Birth certificates of children (if applicable)"] },
    ],
  },
};

export default function DocumentChecklist() {
  const [type, setType] = useState("express-entry");
  const [checked, setChecked] = useState({});
  const checklist = CHECKLISTS[type];
  const allItems = checklist.groups.flatMap((g) => g.items);
  const done = allItems.filter((item) => checked[`${type}:${item}`]).length;
  const pct = allItems.length ? Math.round((done / allItems.length) * 100) : 0;
  function toggle(item) { const key = `${type}:${item}`; setChecked((c) => ({ ...c, [key]: !c[key] })); }
  function reset() { setChecked({}); }

  return (
    <ToolCard>
      <ToolHeader icon={ClipboardCheck} kicker="Interactive · No upload needed" title="Document Checklist" subtitle="Track what to gather for the most common application types — with live progress as you go." action={<ToolResetButton onClick={reset}><RefreshCw className="h-3.5 w-3.5" /> Reset</ToolResetButton>} />
      <div className="tool-card__body">
        <ToolField label="Application type" htmlFor="checklist-type">
          <ToolSelect id="checklist-type" value={type} onChange={(e) => { setType(e.target.value); setChecked({}); }}>
            {Object.entries(CHECKLISTS).map(([key, cl]) => <option key={key} value={key}>{cl.label}</option>)}
          </ToolSelect>
        </ToolField>

        <div className="mt-6">
          <ToolProgress value={done} max={allItems.length} labelLeft={`${done} of ${allItems.length} ready`} labelRight={`${pct}%`} />
          <p className="tool-field__hint mt-2 flex items-center gap-1.5"><ShieldCheck className="tool-accent h-3.5 w-3.5" /> Verify current IRCC document guide before submission.</p>
        </div>

        <div className="mt-7 space-y-7">
          {checklist.groups.map((group) => (
            <fieldset key={group.title} className="tool-group">
              <legend className="tool-field__label px-1.5">{group.title}</legend>
              <ul className="mt-2 space-y-2">
                {group.items.map((item) => {
                  const key = `${type}:${item}`; const isChecked = !!checked[key];
                  return (
                    <li key={item}>
                      <label className={`tool-checkbox-card ${isChecked ? "is-complete" : ""}`}>
                        <input type="checkbox" checked={isChecked} onChange={() => toggle(item)} className="tool-checkbox" />
                        <span className={`tool-checkbox-card__item flex-1 text-sm leading-relaxed ${isChecked ? "is-complete" : ""}`}>{item}</span>
                        {isChecked && <CheckCircle2 className="tool-success h-4 w-4 shrink-0" />}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          ))}
        </div>

        {pct === 100 ? (
          <ToolResultCard variant="success" className="mt-7 text-center">
            <p className="flex items-center justify-center gap-2 text-base font-extrabold"><Sparkles className="h-5 w-5" /> All documents marked as ready!</p>
            <p className="tool-result__copy mt-1 text-sm">A licensed RCIC will still review every document for consistency before submission.</p>
          </ToolResultCard>
        ) : pct >= 60 ? (
          <div className="tool-notice mt-6 text-center">
            <p className="text-sm font-bold">Nice momentum — {pct}% there.</p>
            <p className="tool-field__hint mt-1">Keep marking items as you collect them; download or print this page anytime.</p>
          </div>
        ) : null}
      </div>
    </ToolCard>
  );
}
