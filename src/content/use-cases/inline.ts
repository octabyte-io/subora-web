/**
 * The inline markup of a use-case post: `**bold**` and `[label](href)`,
 * nothing else. An href is a site path with a trailing slash (`/pricing/`),
 * or a full `https://` address. Pure, so the post checks, llms.txt and
 * structured data can read it without React; `components/use-cases/inline`
 * renders it.
 */
export const INLINE_TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** The text with the markup stripped, for metadata, JSON-LD and llms.txt. */
export const plainInline = (text: string) =>
  text.replace(INLINE_TOKEN, (_whole, bold: string | undefined, label: string | undefined) => bold ?? label ?? "");

/** Every href in the text, so a post's links can be checked when the site builds. */
export const linksIn = (text: string) =>
  [...text.matchAll(INLINE_TOKEN)].flatMap((match) => (match[3] ? [match[3]] : []));
