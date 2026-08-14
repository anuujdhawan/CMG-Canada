import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/* ════════════════════════════════════════════════════════════════════
   Shared markdown machinery for scraped-content pages:
   inline renderer, block parser, block renderer, brand rebranding and
   source-URL localization. Used by ContentPage and HeroBand.
   ════════════════════════════════════════════════════════════════════ */

const SITE_HOSTS = ["visamastercanada.com", "www.visamastercanada.com", "commonwealthmigration.ca", "www.commonwealthmigration.ca"];

/**
 * Brand substitution — the scraped source content is written for the source
 * firm (VMC); this maps every brand reference to the Commonwealth Migration
 * trading name while keeping the unique, keyword-optimized copy intact.
 */
const BRAND_REPLACEMENTS = [
  ["VMC Immigration Services", "Commonwealth Migration Canada"],
  ["Visa Master Canada", "Commonwealth Migration Canada"],
  ["Visa Master Can", "Commonwealth Migration"],
  ["Visa Master", "Commonwealth Migration"],
  ["visamastercanada.com", "commonwealthmigration.ca"],
  ["info@visamastercanada.com", "info@commonwealthmigration.ca"],
  ["VMC's", "Commonwealth Migration's"],
  ["VMC", "Commonwealth Migration"],
];

export function rebrand(text) {
  if (!text) return text;
  let out = String(text);
  for (const [from, to] of BRAND_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  return out;
}

/** Convert a source-site URL to a local relative URL when possible. */
export function localizeUrl(url) {
  try {
    const u = new URL(url, site.url || "https://visamastercanada.com");
    if (SITE_HOSTS.includes(u.hostname)) {
      return `${u.pathname}${u.search}${u.hash}`;
    }
  } catch {
    /* keep as-is */
  }
  return url;
}

function SmartLink({ href, children }) {
  const local = localizeUrl(href);
  const external = local !== href || /^https?:\/\//.test(local);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2 hover:text-accent-dark transition-colors">
        {children}
      </a>
    );
  }
  return (
    <Link href={local} className="font-medium text-primary underline underline-offset-2 hover:text-accent-dark transition-colors">
      {children}
    </Link>
  );
}

export function renderInline(text) {
  const nodes = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m;
  let key = 0;
  text = rebrand(text);
  while ((m = regex.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("*")) {
      nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    } else if (tok.startsWith("`")) {
      nodes.push(
        <code key={key++} className="rounded bg-surface px-1.5 py-0.5 text-[0.85em] font-semibold text-accent-dark">
          {tok.slice(1, -1)}
        </code>
      );
    } else {
      const mm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      nodes.push(
        <SmartLink key={key++} href={mm?.[2] || ""}>
          {mm?.[1] || tok}
        </SmartLink>
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/* ════════════════════════════════════════════════════════════════════
   Block parser — plain markdown → block objects
   ════════════════════════════════════════════════════════════════════ */

export function parseBlocks(md) {
  const lines = md.split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      i++;
      continue;
    }

    // Heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      blocks.push({ type: "heading", level: h[1].length, text: h[2] });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^-{3,}$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Decorative divider "---- label ----"
    const sep = line.match(/^-{2,}\s*(.+?)\s*-{2,}$/);
    if (sep && sep[1]) {
      blocks.push({ type: "divider", text: sep[1] });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const linesQ = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        linesQ.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: linesQ.join(" ").trim() });
      continue;
    }

    // Table
    if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i]
          .trim()
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((c) => c.trim());
        rows.push(cells);
        i++;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        const item = t.match(/^[-*]\s+(.*)$/);
        if (item) {
          items.push(item[1]);
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        const item = t.match(/^\d+[.)]\s+(.*)$/);
        if (item) {
          items.push(item[1]);
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    // Paragraph — collect until a blank line or another block start
    const para = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t) break;
      if (
        /^(#{1,6})\s/.test(t) ||
        /^-{3,}$/.test(t) ||
        t.startsWith(">") ||
        t.startsWith("|") ||
        /^[-*]\s+/.test(t) ||
        /^\d+[.)]\s+/.test(t)
      ) {
        break;
      }
      para.push(t);
      i++;
    }
    blocks.push({ type: "paragraph", text: para.join(" ") });
  }

  return blocks;
}

/* ════════════════════════════════════════════════════════════════════
   Block renderer — block objects → React elements
   ════════════════════════════════════════════════════════════════════ */

function headingClass(level, dark = false) {
  const color = dark ? "text-white" : "text-primary";
  const subColor = dark ? "text-white" : "text-navy";
  switch (level) {
    case 2:
      return `mt-12 mb-4 text-2xl sm:text-[1.65rem] font-bold ${color} border-l-4 ${dark ? "border-white/50" : "border-primary"} pl-4 leading-snug`;
    case 3:
      return `mt-9 mb-3 text-xl font-bold ${subColor} leading-snug`;
    case 4:
      return `mt-7 mb-2 text-lg font-bold ${subColor} leading-snug`;
    default:
      return `mt-6 mb-2 text-base font-bold ${subColor} leading-snug`;
  }
}

function renderTable(rows) {
  const hasSeparator = rows.length > 1 && rows[1].every((c) => /^:?-{2,}:?$/.test(c));
  const header = hasSeparator ? rows[0] : null;
  const body = hasSeparator ? rows.slice(2) : rows;
  const colCount = Math.max(...rows.map((r) => r.length));

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-line shadow-sm">
      <table className="w-full min-w-[480px] border-collapse text-left text-[14.5px]">
        {header && (
          <thead>
            <tr className="bg-surface">
              {header.map((cell, j) => (
                <th key={j} className="px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-primary">
                  {renderInline(cell)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {body.map((row, i) => (
            <tr key={i} className={cn("border-t border-line", i % 2 === 1 && "bg-surface/50")}>
              {Array.from({ length: colCount }).map((_, j) => (
                <td key={j} className="px-4 py-3 align-top text-muted">
                  {renderInline(row[j] || "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Block({ block, dark = false, lead = false }) {
  switch (block.type) {
    case "heading":
      const Tag = `h${Math.min(Math.max(block.level, 2), 6)}`;
      return <Tag className={headingClass(block.level, dark)}>{renderInline(block.text)}</Tag>;
    case "paragraph":
      if (lead && !dark) {
        return (
          <p className="mt-6 text-[17px] leading-relaxed text-navy/95">
            {renderInline(block.text)}
          </p>
        );
      }
      return (
        <p className={dark ? "mt-4 text-[15.5px] leading-relaxed text-white/85" : "mt-4 text-[15.5px] leading-relaxed text-ink/90"}>
          {renderInline(block.text)}
        </p>
      );
    case "list":
      const itemColor = dark ? "text-white/85" : "text-ink/90";
      if (block.ordered) {
        return (
          <ol className={`mt-4 list-decimal space-y-2 pl-6 text-[15px] leading-relaxed ${itemColor} marker:font-bold ${dark ? "marker:text-accent-soft" : "marker:text-primary"}`}>
            {block.items.map((item, i) => (
              <li key={i} className="pl-1">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className={`mt-4 space-y-2.5 text-[15px] leading-relaxed ${itemColor}`}>
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-6">
              <span aria-hidden className={`absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full ${dark ? "bg-accent-soft" : "bg-accent"}`} />
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    case "table":
      return renderTable(block.rows);
    case "quote":
      return (
        <blockquote
          className={
            dark
              ? "my-6 rounded-r-xl border-l-4 border-accent-soft bg-white/10 px-5 py-4 text-[15px] italic leading-relaxed text-white/90"
              : "my-6 rounded-r-xl border-l-4 border-primary bg-surface px-5 py-4 text-[15px] italic leading-relaxed text-navy"
          }
        >
          {renderInline(block.text)}
        </blockquote>
      );
    case "divider":
      return (
        <div className="my-8 flex items-center gap-4" role="presentation">
          <span className={`h-px flex-1 ${dark ? "bg-white/25" : "bg-line"}`} />
          <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dark ? "text-white/60" : "text-muted"}`}>{block.text}</span>
          <span className={`h-px flex-1 ${dark ? "bg-white/25" : "bg-line"}`} />
        </div>
      );
    case "hr":
    default:
      return <hr className={dark ? "my-8 border-white/20" : "my-8 border-line"} />;
  }
}
