"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { nocOccupations, teerLevels } from "@/data/noc";
import { cn } from "@/lib/utils";

export default function NocFinder() {
  const [query, setQuery] = useState("");
  const [teer, setTeer] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return nocOccupations.filter((occ) => {
      if (teer !== "all" && occ.teer !== Number(teer)) return false;
      if (!q) return true;
      return (
        occ.title.toLowerCase().includes(q) ||
        occ.code.includes(q)
      );
    });
  }, [query, teer]);

  return (
    <div className="rounded-brand-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-surface-alt text-primary">
          <Search className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-bold text-primary">Occupation finder</h2>
          <p className="text-xs text-muted">Demo subset of NOC 2021 · illustrative only</p>
        </div>
      </div>

      {/* Search */}
      <label htmlFor="noc-search" className="sr-only">Search occupations</label>
      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id="noc-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by occupation or NOC code (e.g. engineer, 21232)"
          className="h-12 w-full rounded-brand-md border border-line bg-white pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-secondary focus:ring-2 focus:ring-secondary/30"
        />
      </div>

      {/* TEER filter */}
      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold text-primary">Filter by TEER</legend>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTeer("all")}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              teer === "all" ? "bg-primary text-white" : "bg-surface text-muted hover:text-primary"
            )}
          >
            All TEERs
          </button>
          {Object.entries(teerLevels).map(([level, info]) => (
            <button
              key={level}
              type="button"
              onClick={() => setTeer(level)}
              aria-pressed={teer === level}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                teer === level ? "bg-primary text-white" : "bg-surface text-muted hover:text-primary"
              )}
            >
              {info.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Results */}
      <div className="mt-6">
        <p className="text-xs font-semibold text-muted">
          {results.length} occupation{results.length === 1 ? "" : "s"} found
        </p>
        <ul className="mt-3 divide-y divide-line rounded-brand-xl border border-line">
          {results.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-muted">
              No occupations match. Try a different keyword or clear the TEER filter.
            </li>
          )}
          {results.map((occ) => (
            <li key={occ.code} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">{occ.title}</p>
                <p className="mt-0.5 text-xs text-muted">{teerLevels[occ.teer]?.note}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-brand-md bg-surface px-2.5 py-1 font-mono text-xs font-bold text-primary">
                  {occ.code}
                </span>
                <span className="rounded-brand-md bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent-dark">
                  {teerLevels[occ.teer]?.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
