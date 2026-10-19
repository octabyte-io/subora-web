import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { INLINE_TOKEN } from "@/content/use-cases/inline";

/** Renders a post's inline markup: `**bold**` and `[label](href)`, nothing else. */
export function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_TOKEN)) {
    const [whole, bold, label, href] = match;
    if (match.index > last) nodes.push(<Fragment key={last}>{text.slice(last, match.index)}</Fragment>);
    if (bold !== undefined) {
      nodes.push(
        <strong key={match.index} className="font-semibold text-slate">
          {bold}
        </strong>,
      );
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link key={match.index} href={href} className="link text-slate">
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a key={match.index} href={href} className="link text-slate">
          {label}
        </a>,
      );
    }
    last = match.index + whole.length;
  }
  if (last < text.length) nodes.push(<Fragment key={last}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}
