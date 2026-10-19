import type { Metadata } from "next";
import type { PageEntry } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { ogImageName, ogSize } from "@/lib/og-image";

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

/** A page's share card, rendered by `app/og/[image]/route.tsx`. */
const ogCard = (page: PageEntry) => ({
  url: `/og/${ogImageName(page)}`,
  width: ogSize.width,
  height: ogSize.height,
  alt: page.headline ?? page.title,
});

/** Title, description, canonical, Open Graph and share card for one page. */
export function pageMetadata(page: PageEntry): Metadata {
  const isHome = page.path === "/";
  return {
    title: isHome ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: page.path },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url: page.path,
      images: [ogCard(page)],
    },
    twitter: { card: "summary_large_image", images: [ogCard(page)] },
  };
}

/* Structured data. Every node has a stable `@id` so pages can point at the
   organisation and site instead of repeating them. */

export const ids = {
  organization: absolute("/#organization"),
  website: absolute("/#website"),
  app: absolute("/#app"),
};

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": ids.organization,
  name: siteConfig.company,
  logo: absolute("/brand/subora-mark-512.png"),
  email: siteConfig.supportEmail,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: siteConfig.supportEmail,
    availableLanguage: "English",
  },
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": ids.website,
  name: siteConfig.name,
  url: absolute("/"),
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": ids.organization },
};

/** The page itself, with its breadcrumb trail back to the home page. */
export function webPageJsonLd(page: PageEntry, type: string = "WebPage") {
  const url = absolute(page.path);
  const isHome = page.path === "/";
  return {
    "@type": type,
    "@id": url,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    ...(isHome
      ? {}
      : {
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: siteConfig.name, item: absolute("/") },
              { "@type": "ListItem", position: 2, name: page.title, item: url },
            ],
          },
        }),
  };
}

/** Renders one or more schema.org nodes as a single JSON-LD graph. */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = {
    "@context": "https://schema.org",
    "@graph": Array.isArray(data) ? data : [data],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}
