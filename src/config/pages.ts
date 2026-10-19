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
  /** The heading on the share card, when it should read differently from the title. */
  headline?: string;
  /** The small line above the share card's heading, in place of the title. */
  eyebrow?: string;
  /** The share card's file name, for a page whose last path segment isn't unique on the site. */
  ogName?: string;
  /** The day the page last changed, as YYYY-MM-DD, for the sitemap. Only set it from a real date. */
  lastModified?: string;
};

export const pages = {
  home: {
    path: "/",
    title: "Subora: subscriptions for Shopify, every feature on every plan",
    headline: "Every feature. Unlimited subscriptions. Choose how you pay.",
    description: siteConfig.description,
  },
  subscriptionPlans: {
    path: "/features/subscription-plans/",
    title: "Subscription plans",
    headline: "Subscribe & Save, Prepaid, Trial and Fixed-length plans",
    description:
      "Build Subscribe & Save, Prepaid, Trial and Fixed-length subscription plans on Shopify, with several delivery frequencies, a later price, free shipping and subscription-only products.",
  },
  storefront: {
    path: "/features/storefront/",
    title: "Storefront: Picker, badges and Cart offer",
    headline: "Subscription options on the product page you already have",
    description:
      "Add Subora’s Picker to your Shopify product page with no code, show Collection badges like “Save 15%” on product cards, and turn one-time cart items into subscriptions on Dawn and Horizon.",
  },
  customerPortal: {
    path: "/features/customer-portal/",
    title: "Customer portal",
    headline: "Customers change their own subscriptions, in your store’s account",
    description:
      "A Customer portal inside your Shopify store’s customer account. Customers skip, pause, swap, change frequency or quantity, get a delivery sooner and cancel on their own.",
  },
  retention: {
    path: "/features/retention/",
    title: "Retention offers",
    headline: "A reason, then an offer that fits it",
    description:
      "Ask customers why they’re canceling and show a Retention offer that fits: a discount, a skip, less often, a pause or a swap. See Save rate and Revenue retained by reason.",
  },
  failedPayments: {
    path: "/features/failed-payments/",
    title: "Failed payments",
    headline: "When a card fails, Subora keeps trying",
    description:
      "Recover failed subscription payments on Shopify with Retry rules you set, emails in your store’s name, an instant retry on a new card, and recovery numbers you can trust.",
  },
  analytics: {
    path: "/features/analytics/",
    title: "Subscription analytics",
    headline: "Know what keeps subscribers, and what you won back",
    description:
      "MRR, active subscribers, churn, subscription revenue, recovered payments and lifetime value, with CSV exports, an Activity log of every change and bulk actions.",
  },
  pricing: {
    path: "/pricing/",
    title: "Pricing",
    headline: "Free $0 + 2%. Growth $49 + 0.5%. Pro $99 + 0%.",
    description:
      "Every Subora plan includes every feature and unlimited subscriptions. Free is $0 + 2%, Growth $49 + 0.5% and Pro $99 + 0%, billed through Shopify. See which is cheapest for you.",
  },
  setup: {
    path: "/setup/",
    title: "Setup guide",
    headline: "Selling subscriptions in five steps, with no code",
    description:
      "Set up Subora in five steps: install, create a subscription plan, add the Picker to your product page, add the Subscriptions page to customer accounts and place a test order.",
  },
  useCases: {
    path: "/use-cases/",
    title: "Use cases",
    headline: "Practical answers for selling subscriptions on Shopify",
    description:
      "How to run subscribe and save, prepaid subscriptions, churn reduction and failed payment recovery on Shopify, with or without Subora.",
  },
  faq: {
    path: "/faq/",
    title: "Questions and answers",
    headline: "Questions merchants ask about Subora",
    description:
      "Answers about Subora’s setup, pricing, subscription plans, the Customer portal, retention, failed payments and analytics.",
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy policy",
    description:
      "What data Subora collects, why, where it is processed, how long it is kept and how to have it removed.",
    lastModified: "2026-10-20",
  },
  dpa: {
    path: "/dpa/",
    title: "Data protection agreement",
    description: "The data protection agreement between OctaByte and merchants who install Subora.",
    lastModified: "2026-10-20",
  },
} satisfies Record<string, PageEntry>;

export type PageKey = keyof typeof pages;
