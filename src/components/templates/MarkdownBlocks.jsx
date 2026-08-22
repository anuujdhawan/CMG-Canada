import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { pathForLegacyPath } from "@/lib/sitePages";
import PathwayCard from "@/components/cards/PathwayCard";
import ContentHeading from "@/components/ui/ContentHeading";

/* ════════════════════════════════════════════════════════════════════
   Shared markdown machinery for approved Markdown content pages:
   inline renderer, block parser, block renderer, brand rebranding and
   source-URL localization. Used by ContentPage and the shared hero.
   ════════════════════════════════════════════════════════════════════ */

const SITE_HOSTS = ["commonwealthmigration.ca", "www.commonwealthmigration.ca"];

export function rebrand(text) {
  return text ? String(text) : text;
}

/** Convert a source-site URL to a local relative URL when possible. */
export function localizeUrl(url) {
  try {
    const u = new URL(url, site.url || "https://commonwealthmigration.ca");
    if (SITE_HOSTS.includes(u.hostname)) {
      return `${pathForLegacyPath(u.pathname)}${u.search}${u.hash}`;
    }
  } catch {
    /* keep as-is */
  }
  if (typeof url === "string" && url.startsWith("/")) return pathForLegacyPath(url);
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

const REFUSAL_CARD_DESTINATIONS = [
  [/visitor visa|trv/i, "/immigration/visitor-visa"],
  [/study permit/i, "/immigration/study-permit"],
  [/work permit/i, "/immigration/work-permit"],
  [/spousal sponsorship/i, "/immigration/spousal-sponsorship"],
  [/express entry|\bpr\b/i, "/immigration/express-entry"],
  [/super visa/i, "/immigration/super-visa"],
  [/pgwp/i, "/immigration/pgwp"],
  [/lmia/i, "/immigration/lmia"],
];

function refusalCardHref(title) {
  const destination = REFUSAL_CARD_DESTINATIONS.find(([pattern]) => pattern.test(title))?.[1] || null;
  return destination ? pathForLegacyPath(destination) : null;
}

function renderTable(rows) {
  const hasSeparator = rows.length > 1 && rows[1].every((c) => /^:?-{2,}:?$/.test(c));
  const header = hasSeparator ? rows[0] : null;
  const body = hasSeparator ? rows.slice(2) : rows;
  const colCount = Math.max(...rows.map((r) => r.length));
  const isStackedTabs = !header && colCount === 1 && body.length >= 4;

  if (isStackedTabs) {
    const hasStackedHeader = /application type/i.test(body[0]?.[0] || "");
    const label = hasStackedHeader ? body[0]?.[0] : "Refusal type";
    const descriptionLabel = hasStackedHeader ? body[1]?.[0] : "Common concern";
    const cardRows = hasStackedHeader ? body.slice(2) : body;
    const cards = [];

    for (let i = 0; i < cardRows.length; i += 2) {
      const title = cardRows[i]?.[0];
      if (!title) continue;
      cards.push({ title, description: cardRows[i + 1]?.[0] || "", href: refusalCardHref(title) });
    }

    return (
      <div className="content-table-cards my-8" role="list" aria-label={`${label} and ${descriptionLabel}`}>
        <div className="content-table-cards__intro">
          <div>
            <p className="eyebrow text-accent-dark">Case patterns at a glance</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              The reason on the letter is only the starting point. The right response connects the concern to stronger evidence.
            </p>
          </div>
          <div className="content-table-cards__labels" aria-hidden>
            <span>{label}</span>
            <span>{descriptionLabel}</span>
          </div>
        </div>

        <div className="content-table-cards__grid">
          {cards.map((card, index) => (
            <PathwayCard
              key={`${card.title}-${index}`}
              role="listitem"
              href={card.href}
              ariaLabel={card.title}
              label={renderInline(card.title)}
              eyebrow={label}
              description={renderInline(card.description)}
              index={index}
              actionLabel={card.href ? "Explore the guide" : null}
              className="pathway-card--case"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-7 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
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
            <tr
              key={i}
              className={cn(
                "border-t border-line transition-colors hover:bg-surface/60",
                i % 2 === 1 && "bg-surface/40"
              )}
            >
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
      return (
        <ContentHeading level={block.level} className={dark ? "text-white" : undefined}>
          {renderInline(block.text)}
        </ContentHeading>
      );
    case "paragraph":
      if (lead && !dark) {
        return (
              <p className="mt-6 rounded-xl border-l-4 border-primary bg-surface px-5 py-4 text-[17px] leading-relaxed text-navy/95 shadow-card">
            {renderInline(block.text)}
          </p>
        );
      }
      return (
        <p className={dark ? "mt-4 text-[15.5px] leading-relaxed text-white/85" : "mt-4 text-[15.5px] leading-[1.8] text-ink/90"}>
          {renderInline(block.text)}
        </p>
      );
    case "list":
      const itemColor = dark ? "text-white/85" : "text-ink/90";
      if (block.ordered) {
        return (
          <ol className={`content-list-panel mt-5 list-decimal space-y-2.5 p-5 pl-8 text-[15px] leading-relaxed ${itemColor} marker:font-bold ${dark ? "marker:text-accent-soft" : "marker:text-primary"}`}>
            {block.items.map((item, i) => (
              <li key={i} className="pl-1">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className={`content-list-panel mt-5 space-y-3 p-5 text-[15px] leading-relaxed ${itemColor}`}>
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
              : "my-7 rounded-r-2xl border-l-4 border-primary bg-surface px-5 py-5 text-[15px] italic leading-relaxed text-navy shadow-card"
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
      return <hr className={dark ? "my-8 border-white/20" : "premium-divider my-10"} />;
  }
}
