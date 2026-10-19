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
    lastUpdated: "20 October 2026" as string | null,
  },
} as const;

export type NavItem = { href: string; label: string; blurb: string };

/** The six feature pages, in the order a subscription meets them. */
export const featureNav: NavItem[] = [
  {
    href: "/features/subscription-plans/",
    label: "Subscription plans",
    blurb: "Subscribe & Save, Prepaid, Trial and Fixed-length, from the products you sell.",
  },
  {
    href: "/features/storefront/",
    label: "Storefront",
    blurb: "The Picker on your product page, Collection badges and a Cart offer.",
  },
  {
    href: "/features/customer-portal/",
    label: "Customer portal",
    blurb: "Customers skip, pause, swap and cancel inside your store’s account.",
  },
  {
    href: "/features/retention/",
    label: "Retention",
    blurb: "A Retention offer for each cancellation reason, and your Save rate.",
  },
  {
    href: "/features/failed-payments/",
    label: "Failed payments",
    blurb: "Retry rules, emails in your store’s name, and what was recovered.",
  },
  {
    href: "/features/analytics/",
    label: "Analytics",
    blurb: "MRR, churn and subscribers, the Activity log, bulk actions and exports.",
  },
];

export const mainNav: { href: string; label: string }[] = [
  { href: "/pricing/", label: "Pricing" },
  { href: "/use-cases/", label: "Use cases" },
  { href: "/setup/", label: "Setup" },
  { href: "/faq/", label: "FAQ" },
];
