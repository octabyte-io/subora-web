/**
 * Every indexable page, in one place.
 *
 * Feeds each page's `<head>` (see `pageMetadata`), its structured data and
 * the sitemap, so a page's title and summary only have to be written once.
 */
import { siteConfig } from "@/config/site";

export type PageEntry = {
  path: string;
  /** Short name, used in the title tag and breadcrumbs. */
  title: string;
  description: string;
  /** The day the page last changed, as YYYY-MM-DD, for the sitemap. Only set it from a real date. */
  lastModified?: string;
};

export const pages = {
  home: {
    path: "/",
    title: "Subora: subscriptions for Shopify, every feature on every plan",
    description: siteConfig.description,
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy policy",
    description:
      "What data Subora collects, why, where it is processed, how long it is kept and how to have it removed.",
  },
  dpa: {
    path: "/dpa/",
    title: "Data protection agreement",
    description: "The data protection agreement between OctaByte and merchants who install Subora.",
  },
} satisfies Record<string, PageEntry>;

export type PageKey = keyof typeof pages;
