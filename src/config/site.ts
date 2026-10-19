/**
 * Everything about the site that changes at launch lives here.
 *
 * - `url`: the public domain, used for canonical URLs, the sitemap and Open Graph.
 * - `installUrl`: swap for the Shopify App Store listing once it is live.
 * - `legal`: fill these in and every legal page updates. `null` renders a
 *   visible placeholder so an unfinished page cannot pass for a finished one.
 */
export const siteConfig = {
  name: "Subora",
  company: "OctaByte",
  url: "https://subora.octabyte.io",
  installUrl: "https://apps.shopify.com/search?q=subora",
  supportEmail: "support@octabyte.io",
  description:
    "Subora lets Shopify stores sell subscriptions, lets customers manage their own, retries failed payments and shows what keeps subscribers. Every feature and unlimited subscriptions on every plan.",
  legal: {
    legalName: "OctaByte" as string | null,
    lastUpdated: null as string | null,
    /** Where the production server runs, e.g. "Germany (Nuremberg)". Not stated in the Subora repo. */
    hostingLocation: null as string | null,
    /** Sentry's data region for the octabyte-io org, e.g. "United States". */
    sentryLocation: null as string | null,
    /** The breach notice the team commits to, e.g. "48 hours". No incident policy exists yet. */
    breachNotice: null as string | null,
    /** The name of the terms the DPA hangs from, e.g. "Subora terms of service", once they exist. */
    termsOfService: null as string | null,
  },
} as const;
