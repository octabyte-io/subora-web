import { BREAK_EVEN, PLANS, TYPICAL_APP, USD_SENTENCE, cheapestPlan } from "@/content/plans";
import { FERNLEE_MONTH, subora, typical, usd, usdShort } from "../arithmetic";
import type { UseCasePost } from "../types";

const { renewals, price } = FERNLEE_MONTH;
const revenue = renewals * price;

const REVENUES = [2_000, 5_000, 20_000, 50_000];

/** One row per revenue: what each Subora plan costs, the cheapest marked. */
const rows = REVENUES.map((r) => [usdShort(r), ...PLANS.map((plan) => usdShort(subora(plan.key, r)))]);
const highlight = REVENUES.map((r, i): [number, number] => [i, PLANS.indexOf(cheapestPlan(r)) + 1]);

const typicalCost = typical(revenue, renewals);
const proCost = subora("pro", revenue);

export const post: UseCasePost = {
  slug: "subscription-app-without-transaction-fees",
  title: "A Shopify subscription app without transaction fees: when 0% pays off",
  metaTitle: "Shopify subscription app with no transaction fees",
  description:
    "When a flat-fee subscription app costs less than one that takes a cut of every renewal: the break-even sums, a worked example, and where Subora’s plans fit.",
  cardHeadline: "No transaction fees: when a flat-fee app pays off",
  summary:
    "A percentage grows with your sales and a flat fee doesn’t. How to find the revenue where one overtakes the other, what else to check, and where each Subora plan is cheapest.",
  group: "paying",
  cover: "upgrade-prompt",
  published: "2026-10-19",
  answer: [
    "A transaction fee grows with your subscription revenue; a flat monthly fee doesn’t. Below a certain revenue the percentage costs less, above it the flat fee does. Work out where that line falls for each app you compare, at your own revenue.",
    `Subora has both kinds. Free is $0 + 2%, Growth $49 + 0.5%, and Pro $99 + 0%, and all three have every feature. Pro is the cheapest from about ${usdShort(BREAK_EVEN.pro)} a month in subscription revenue. Below that, a plan with a fee costs less, and Subora will tell you so.`,
  ],
  sections: [
    {
      id: "what-an-app-costs",
      heading: "What a subscription app really costs",
      voice: "neutral",
      blocks: [
        "Add up every part of the price, at your revenue, for a typical month:",
        {
          type: "list",
          items: [
            "**The monthly fee.**",
            "**The percentage**, and what it’s taken from: the whole order, or only the subscription lines; before or after tax, shipping and discounts.",
            "**Any cents per order**, which add up quickly on low-priced, frequent deliveries.",
            "**The plan you’d really need.** If retention offers, failed payment emails or prepaid plans sit on a higher plan, price that plan, not the cheapest.",
            "**Caps**: a limit on subscribers or revenue that moves you up a plan as you grow.",
          ],
        },
        "Your payment provider’s processing fees are separate and apply whichever app you use, so leave them out of the comparison.",
      ],
    },
    {
      id: "break-even",
      heading: "Working out the break-even",
      voice: "neutral",
      blocks: [
        "Between two prices, divide the difference in monthly fees by the difference in percentages. That’s the monthly revenue where they cost the same; above it, the one with the lower percentage is cheaper.",
        {
          type: "sum",
          caption: "Example: the break-even points between Subora’s three plans.",
          rows: [
            { label: "Free to Growth: $49 ÷ (2% − 0.5%)", value: usd(BREAK_EVEN.growth) },
            { label: "Growth to Pro: $50 ÷ (0.5% − 0%)", value: usd(BREAK_EVEN.pro) },
          ],
        },
        "So at Subora, Free is cheapest below about $3,270 a month, Growth from there to $10,000, and Pro above. At round numbers:",
        {
          type: "table",
          caption: "What each Subora plan costs for 30 days at a monthly subscription revenue",
          head: ["Monthly subscription revenue", "Free", "Growth", "Pro"],
          rows,
          highlight,
        },
      ],
    },
    {
      id: "worked-example",
      heading: "A worked example against a typical app",
      voice: "neutral",
      blocks: [
        `Typical subscription apps charge $${TYPICAL_APP.monthlyUsd} a month, plus 1% and 19¢ per order. Take a pet food store with ${renewals} renewals in a month at ${usd(price)}: ${usd(revenue)} in subscription revenue.`,
        {
          type: "sum",
          caption: `Example: Fernlee, ${renewals} renewals at ${usd(price)} in one month.`,
          rows: [
            { label: `Typical app: $${TYPICAL_APP.monthlyUsd} a month`, value: usd(TYPICAL_APP.monthlyUsd) },
            { label: `+ 1% of ${usd(revenue)}`, value: usd(TYPICAL_APP.feeRate * revenue) },
            { label: `+ 19¢ × ${renewals} orders`, value: usd(TYPICAL_APP.perOrderUsd * renewals) },
            { label: "**Typical app, total**", value: usd(typicalCost) },
            { label: "Subora Pro: $99 + 0%", value: usd(proCost) },
          ],
          total: {
            label: `Difference each month (${usd((typicalCost - proCost) * 12)} a year)`,
            value: usd(typicalCost - proCost),
            good: true,
          },
        },
        `At the same store, Subora Free would cost ${usd(subora("free", revenue))} and Growth ${usd(subora("growth", revenue))}. At this size, Pro is the one to be on.`,
      ],
    },
    {
      id: "with-subora-plans",
      heading: "With Subora: three plans, the same app",
      voice: "subora",
      blocks: [
        "Every Subora plan has every feature and unlimited subscriptions. The plans differ only in how you pay, so moving between them never turns anything on or off.",
        {
          type: "list",
          items: [
            "**What the fee counts**: the subscription lines of each paid order, at checkout and on every renewal, after discounts, without tax, shipping or tips. One-time products in the same order don’t count.",
            "**Refunds and chargebacks** are credited back.",
            "**Billing** is through your Shopify bill every 30 days. The fee is charged to you, never to your customers.",
            "**Changing your Subora plan** happens on Shopify’s own plan page, takes effect straight away, and works in both directions.",
            "**No free trial** of Growth or Pro: Free already has everything, so you can set up and sell on it first.",
          ],
        },
        USD_SENTENCE,
        "Every plan, side by side, is on the [pricing page](/pricing/).",
      ],
      figure: {
        scene: "plan-calculator",
        caption: "Slide to your own monthly subscription revenue. An estimate.",
      },
    },
    {
      id: "with-subora-upgrade-prompt",
      heading: "Subora tells you when another plan costs less",
      voice: "subora",
      blocks: [
        "There’s no cap on the fee. Instead, from your 14th day, Subora compares what your last 30 days of sales cost on your plan with what they’d have cost on the others. When another plan would save you at least $10 a month, Home says so, and that includes telling a Pro store to move down.",
        `The notice at the top of this page is the example store on Growth: about ${usdShort(Math.round(subora("growth", revenue) - proCost))} a month more than Pro would cost. It’s always labelled an estimate.`,
      ],
    },
  ],
  features: ["subscriptionPlans", "retention", "failedPayments", "analytics"],
  limits: [
    "Free and Growth do take a transaction fee, and it has no ceiling. That’s deliberate: a cap below Pro’s price would make Pro pointless, so Subora tells you when Pro is cheaper instead.",
    "Pro’s 0% is Subora’s fee only. Your payment provider’s processing fees still apply on every plan.",
    "Subora can’t import subscriptions from another app automatically yet. If you’re moving, our team plans the move with you by hand.",
  ],
  related: ["coffee-subscription-shopify", "failed-payment-recovery-shopify"],
};
