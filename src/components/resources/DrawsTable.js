/**
 * Draw records — DEMO placeholder data.
 * Replace with live/verified IRCC & provincial data (or an API) before launch.
 */
const draws = [
  { date: "2026-07-30", program: "Express Entry — All programs", type: "General", invitations: 3750, cutOff: 516 },
  { date: "2026-07-22", program: "Express Entry — French-language", type: "Category", invitations: 1200, cutOff: 430 },
  { date: "2026-07-15", program: "Express Entry — Healthcare occupations", type: "Category", invitations: 1850, cutOff: 452 },
  { date: "2026-07-08", program: "Express Entry — All programs", type: "General", invitations: 3600, cutOff: 524 },
  { date: "2026-06-30", program: "Express Entry — STEM occupations", type: "Category", invitations: 1400, cutOff: 461 },
  { date: "2026-06-24", program: "Ontario PNP — Human Capital Priorities", type: "PNP", invitations: 2200, cutOff: 465 },
  { date: "2026-06-17", program: "Express Entry — Trade occupations", type: "Category", invitations: 950, cutOff: 433 },
  { date: "2026-06-10", program: "British Columbia PNP — Skilled Worker", type: "PNP", invitations: 1300, cutOff: 113 },
];

function formatDate(iso) {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function DrawsTable() {
  return (
    <div className="overflow-hidden rounded-brand-2xl border border-line bg-white shadow-card">
      <div className="border-b border-line bg-surface px-6 py-4">
        <p className="text-sm font-bold text-primary">Recent draw activity</p>
        <p className="text-xs text-muted">Demo data — illustrative only</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th scope="col" className="px-6 py-3 font-bold">Date</th>
              <th scope="col" className="px-6 py-3 font-bold">Program</th>
              <th scope="col" className="px-6 py-3 font-bold">Type</th>
              <th scope="col" className="px-6 py-3 text-right font-bold">Invitations</th>
              <th scope="col" className="px-6 py-3 text-right font-bold">Cut-off</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {draws.map((draw) => (
              <tr key={draw.date + draw.program} className="transition-colors hover:bg-surface/60">
                <td className="px-6 py-4 font-medium text-ink">{formatDate(draw.date)}</td>
                <td className="px-6 py-4 text-ink">{draw.program}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      draw.type === "General" ? "bg-surface-alt text-primary" : "bg-accent-soft text-accent-dark"
                    }`}
                  >
                    {draw.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-ink">{draw.invitations.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-extrabold text-primary">{draw.cutOff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
