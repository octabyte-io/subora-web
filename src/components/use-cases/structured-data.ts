import type { Metadata } from "next";
import { pages, type PageEntry } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { ids, pageMetadata } from "@/lib/seo";
import { POSTS, postPath, type Post } from "@/content/use-cases";

/**
 * Metadata and schema.org nodes for the use-case pages. A post is an Article
 * inside a WebPage whose breadcrumb runs Subora, Use cases, the post; the
 * index is a CollectionPage listing the posts.
 */

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

/** The site-wide metadata, with Open Graph saying this page is an article and when it was written. */
export function postMetadata(entry: PageEntry, post: Post): Metadata {
  const base = pageMetadata(entry);
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.lastModified,
      authors: [siteConfig.company],
    },
  };
}

function breadcrumb(trail: PageEntry[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: absolute("/") },
      ...trail.map((page, i) => ({ "@type": "ListItem", position: i + 2, name: page.title, item: absolute(page.path) })),
    ],
  };
}

export function postJsonLd(entry: PageEntry, post: Post) {
  const url = absolute(entry.path);
  return [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: entry.title,
      description: entry.description,
      inLanguage: "en",
      isPartOf: { "@id": ids.website },
      breadcrumb: breadcrumb([pages.useCases, entry]),
    },
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.published,
      dateModified: post.lastModified,
      inLanguage: "en",
      mainEntityOfPage: { "@id": url },
      isPartOf: { "@id": ids.website },
      author: { "@id": ids.organization },
      publisher: { "@id": ids.organization },
    },
  ];
}

export function indexJsonLd() {
  const url = absolute(pages.useCases.path);
  return {
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: pages.useCases.title,
    description: pages.useCases.description,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    breadcrumb: breadcrumb([pages.useCases]),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: POSTS.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absolute(postPath(post.slug)),
        name: post.title,
      })),
    },
  };
}
