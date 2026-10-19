import type { MetadataRoute } from "next";
import { pages, type PageEntry } from "@/config/pages";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: PageEntry[] = Object.values(pages);
  return entries.map((page) => ({
    url: new URL(page.path, siteConfig.url).toString(),
    ...(page.lastModified ? { lastModified: page.lastModified } : {}),
    changeFrequency: "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));
}
