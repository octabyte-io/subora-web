import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import { Placeholder } from "@/components/site/primitives";
import { siteConfig } from "@/config/site";

/**
 * A deliberately small Markdown renderer for the two legal documents in
 * `src/content/legal`. It runs at build time and handles only what those files
 * use: `##`/`###` headings, paragraphs, `-` and `1.` lists, pipe tables,
 * **bold**, _italic_, `code`, [links](url) and {{PLACEHOLDER}} tokens.
 */

const PLACEHOLDERS: Record<string, { value: string | null; label: string }> = {
  OCTABYTE_LEGAL_NAME: { value: siteConfig.legal.legalName, label: "OctaByte legal name" },
  LAST_UPDATED: { value: siteConfig.legal.lastUpdated, label: "Date set on publication" },
  HOSTING_LOCATION: { value: siteConfig.legal.hostingLocation, label: "Hetzner data-centre location" },
  SENTRY_LOCATION: { value: siteConfig.legal.sentryLocation, label: "Sentry data region" },
  BREACH_NOTICE: { value: siteConfig.legal.breachNotice, label: "Breach notice window, e.g. 48 hours" },
  TERMS_OF_SERVICE: { value: siteConfig.legal.termsOfService, label: "Subora terms of service, not yet written" },
};

export const hasOpenPlaceholders = Object.values(PLACEHOLDERS).some((p) => !p.value);

export type LegalHeading = { id: string; text: string };

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function inline(text: string, keyPrefix = ""): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\)|\{\{[A-Z_]+\}\})/g;
  const parts = text.split(pattern).filter((part) => part !== "");
  return parts.map((part, i) => {
    const key = `${keyPrefix}${i}`;
    if (part.startsWith("**")) return <strong key={key}>{inline(part.slice(2, -2), key)}</strong>;
    if (part.startsWith("_") && part.endsWith("_") && part.length > 2)
      return <em key={key}>{inline(part.slice(1, -1), key)}</em>;
    if (part.startsWith("`"))
      return (
        <code key={key} className="rounded-sm bg-frost px-1.5 py-0.5 text-[0.9em] ring-1 ring-line">
          {part.slice(1, -1)}
        </code>
      );
    if (part.startsWith("{{")) {
      const token = PLACEHOLDERS[part.slice(2, -2)];
      return token ? <Placeholder key={key} value={token.value} label={token.label} /> : part;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className = "link";
      return href.startsWith("/") ? (
        <Link key={key} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={key} href={href} className={className}>
          {label}
        </a>
      );
    }
    return part;
  });
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

export function renderLegal(file: "privacy" | "dpa"): { body: ReactNode; headings: LegalHeading[] } {
  const source = readFileSync(path.join(process.cwd(), "src/content/legal", `${file}.md`), "utf8");
  const lines = source.split("\n");
  const out: ReactNode[] = [];
  const headings: LegalHeading[] = [];
  let i = 0;

  const isBlockStart = (line: string) =>
    line.startsWith("#") || line.startsWith("|") || /^- /.test(line) || /^\d+\. /.test(line);

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }

    const heading = line.match(/^(#{2,3}) (.*)$/);
    if (heading) {
      const text = heading[2];
      const id = slug(text);
      if (heading[1] === "##") {
        headings.push({ id, text });
        out.push(
          <h2 key={i} id={id} className="mt-14 scroll-mt-24 border-t border-line pt-8 text-d3 font-semibold tracking-[-0.02em]">
            {inline(text)}
          </h2>,
        );
      } else {
        out.push(
          <h3 key={i} id={id} className="mt-8 scroll-mt-24 text-[1.1875rem] font-semibold">
            {inline(text)}
          </h3>,
        );
      }
      i++;
      continue;
    }

    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[\s|:-]+\|$/.test(lines[i].trim())) rows.push(cells(lines[i]));
        i++;
      }
      const [head, ...body] = rows;
      const headless = head.every((cell) => cell === "");
      out.push(
        <div key={`t${i}`} className="mt-6 relative overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-[0.9375rem]">
            {headless ? null : (
              <thead className="text-muted">
                <tr className="border-b-2 border-slate">
                  {head.map((cell, c) => (
                    <th key={c} scope="col" className="py-2.5 pr-4 font-medium">
                      {inline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row, r) => (
                <tr key={r} className="border-b border-line align-top">
                  {row.map((cell, c) => (
                    <td key={c} className="py-3 pr-4">
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const bullet = /^- /.test(line);
    const numbered = /^\d+\. /.test(line);
    if (bullet || numbered) {
      const items: string[] = [];
      while (i < lines.length && (bullet ? /^- /.test(lines[i]) : /^\d+\. /.test(lines[i]))) {
        let item = lines[i].replace(/^(- |\d+\. )/, "");
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i])) {
          item += " " + lines[i].trim();
          i++;
        }
        items.push(item);
      }
      const Tag = numbered ? "ol" : "ul";
      out.push(
        <Tag
          key={`l${i}`}
          className={`mt-4 space-y-2.5 pl-6 ${numbered ? "list-decimal" : "list-disc"} marker:text-muted`}
        >
          {items.map((item, n) => (
            <li key={n} className="pl-1">
              {inline(item)}
            </li>
          ))}
        </Tag>,
      );
      continue;
    }

    const para: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    out.push(
      <p key={`p${i}`} className="mt-4">
        {inline(para.join(" "))}
      </p>,
    );
  }

  return { body: out, headings };
}
