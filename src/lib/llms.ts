/**
 * `/llms.txt` and `/llms-full.txt` (https://llmstxt.org): the site in plain
 * Markdown for AI assistants, built from the same content the pages render,
 * so the files stay in step with the site.
 */
import { pages, type PageEntry } from "@/config/pages";
import { featureNav, siteConfig } from "@/config/site";
import { FAQ } from "@/content/faq";
import { BREAK_EVEN, feeLabel, PLANS, USD_SENTENCE, type Plan } from "@/content/plans";
import { POSTS, useCaseEntries } from "@/content/use-cases";

/** The use-case posts as page entries, for the sitemap, share cards and these files. */
export function postEntries(): PageEntry[] {
  return useCaseEntries;
}

const url = (path: string) => new URL(path, siteConfig.url).toString();
const link = (page: PageEntry) => `- [${page.title}](${url(page.path)}): ${page.description}`;

const planLine = (plan: Plan) => `${plan.name} ($${plan.monthlyUsd} a month + ${feeLabel(plan)} transaction fee)`;
/** Rounded to the nearest $10, as the site says "about $3,270". */
const dollars = (value: number) => `$${(Math.round(value / 10) * 10).toLocaleString("en-US")}`;

const FEATURE_PAGES = [
  pages.subscriptionPlans,
  pages.storefront,
  pages.customerPortal,
  pages.retention,
  pages.failedPayments,
  pages.analytics,
];

function header() {
  return `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is a Shopify subscriptions app made by ${siteConfig.company}. Key facts:

- Plans: ${PLANS.map(planLine).join(", ")}. Every Subora plan includes every feature and unlimited subscriptions; plans differ only in how the merchant pays.
- No Subora plan has a free trial, because Free already has every feature. There is no cap on the transaction fee; instead Subora compares the last 30 days of fees with the other plans and says when one would be cheaper.
- Billed through the merchant's Shopify bill every 30 days, in USD. The Subora plan can be changed at any time on Shopify's plan page, and the change takes effect straight away.
- Works on any Shopify plan; Shopify Plus is not required. Subscription payments need a payment provider Shopify supports for subscriptions, such as Shopify Payments.
- Subscription plans: Subscribe & Save, Prepaid, Trial (counted in orders, not days) and Fixed-length.
- The Picker is a theme app block for any Online Store 2.0 theme, added in the theme editor with no code; older themes use its app embed.
- The Customer portal is a Subscriptions page in the store's customer account (Shopify's current customer accounts).
- Moving subscribers from another subscription app is not automatic yet; the team plans the move with the merchant by hand.
- Install: ${siteConfig.installUrl}
- Support: ${siteConfig.supportEmail}`;
}

export function llmsTxt() {
  return `${header()}

## Features

${FEATURE_PAGES.map(link).join("\n")}

## Plans and setup

${[pages.pricing, pages.setup, pages.faq].map(link).join("\n")}

## Use cases

${[link(pages.useCases), ...postLinks()].join("\n")}

## Legal

${[pages.privacy, pages.dpa].map(link).join("\n")}

## Optional

- [Full product reference](${url("/llms-full.txt")}): every plan, feature and answer on this site in one file.
`;
}

export function llmsFullTxt() {
  const plans = PLANS.map(
    (plan) => `### ${plan.name}: $${plan.monthlyUsd} a month + ${feeLabel(plan)}

${plan.pitch}`,
  ).join("\n\n");

  const features = featureNav.map((item) => `- ${item.label}: ${item.blurb} ${url(item.href)}`).join("\n");

  const faq = FAQ.map(
    (group) => `### ${group.title}

${group.items.map((item) => `**${item.q}**\n\n${item.a.join("\n\n")}`).join("\n\n")}`,
  ).join("\n\n");

  return `${header()}

## Pages

${[...Object.values(pages), ...postEntries()].map(link).join("\n")}

## Plans

Every Subora plan includes every feature and unlimited subscriptions. Plans differ only in the monthly fee and the transaction fee. The monthly fee covers 30 days. ${USD_SENTENCE}

${plans}

### Which plan is cheapest

Measured by monthly subscription revenue: below about ${dollars(BREAK_EVEN.growth)}, Free costs least; from about ${dollars(BREAK_EVEN.growth)} to ${dollars(BREAK_EVEN.pro)}, Growth; above ${dollars(BREAK_EVEN.pro)}, Pro.

## Features

${features}

## Questions and answers

${faq}
${
  POSTS.length
    ? `
## Use cases

${postLinks().join("\n")}
`
    : ""
}`;
}

function postLinks() {
  return postEntries().map(link);
}
