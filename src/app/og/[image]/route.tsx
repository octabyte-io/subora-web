import { pages } from "@/config/pages";
import { ogImage, ogImageName, type OgPage } from "@/lib/og-image";
import { postEntries } from "@/lib/llms";

/**
 * One share card per page, exported as `/og/<page>.png`. A route handler
 * rather than `opengraph-image.tsx` because a static export writes those
 * without a file extension, and GitHub Pages then serves them untyped.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

const entries: OgPage[] = [...Object.values(pages), ...postEntries()];

const names = entries.map(ogImageName);
const repeated = names.filter((name, i) => names.indexOf(name) !== i);
if (repeated.length) {
  throw new Error(`Two pages share a share-card name: ${repeated.join(", ")}. Give one an ogName.`);
}

export function generateStaticParams() {
  return entries.map((page) => ({ image: ogImageName(page) }));
}

export async function GET(_request: Request, ctx: { params: Promise<{ image: string }> }) {
  const { image } = await ctx.params;
  const page = entries.find((entry) => ogImageName(entry) === image);
  if (!page) return new Response("Not found", { status: 404 });
  return ogImage(page);
}
