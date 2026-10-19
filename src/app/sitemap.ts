import type { MetadataRoute } from "next";
import { pages, type PageEntry } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { postEntries } from "@/lib/llms";

export const dynamic = "force-static";

const posts = postEntries();

/** The hub changes whenever a post does, so it carries the newest post's date. */
const newestPost = posts
  .map((entry) => entry.lastModified)
  .filter(Boolean)
  .sort()
  .at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: PageEntry[] = [...Object.values(pages), ...posts];
  return entries.map((page) => {
    const lastModified = page.path === pages.useCases.path ? (newestPost ?? page.lastModified) : page.lastModified;
    return {
      url: new URL(page.path, siteConfig.url).toString(),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: page.path === "/" ? 1 : 0.7,
    };
  });
}
