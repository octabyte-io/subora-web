import { STORES, discounted } from "@/content/demo-stores";
import { PLANS, cheapestPlan } from "@/content/plans";
import { cents, perYear, subora, usd, usdShort } from "../arithmetic";
import type { UseCasePost } from "../types";

const coffee = STORES.coffee.product;
const bag = discounted(coffee.price, coffee.save);
const grams = 340;

/** How much a day one bag covers, at each of Ember Hill's frequencies. */
const dailyUse = (weeks: number) => Math.round(grams / (weeks * 7));

/** Ember Hill's example: 250 subscribers on every 4 weeks, 13 bags a year each. */
const subscribers = 250;
const monthly = cents((subscribers * perYear(4) * bag) / 12);
const cheapest = cheapestPlan(monthly);

export const post: UseCasePost = {
  slug: "coffee-subscription-shopify",
  title: "How to sell coffee subscriptions on Shopify",
  description:
    "Set up a coffee subscription on Shopify: frequencies that match a bag, grind as a variant, a discount a roaster can afford, swaps, skips and prepaid gifts.",
  summary:
    "Which coffees to put on subscription, how often to ship a bag, grind as a variant, pricing a roaster can carry, and letting subscribers skip, swap and change it themselves.",
  group: "selling",
  cover: "collection-coffee",
  published: "2026-10-19",
  answer: [
    "Put the coffees people already reorder on subscription, ship on a frequency that matches how long a bag lasts, and let subscribers change it themselves: skip a bag when they’re away, get the next one sooner when they run out, switch roast or grind.",
    `Ember Hill Roasters, one of the example stores on this site, sells ${coffee.title} at ${usd(coffee.price)} a bag, or ${usd(bag)} every 2, 4 or 6 weeks. This page uses it for its worked examples.`,
  ],
  sections: [
    {
      id: "which-coffees",
      heading: "Which coffees to put on subscription",
      voice: "neutral",
      blocks: [
        "Start with the coffee customers already buy again and again: the house blend, the espresso, the decaf. These are the bags people want to stop thinking about.",
        "Rotating single origins are harder to subscribe to, because the product itself changes. Keep them as one-time buys, or as something subscribers can swap to for a delivery or two.",
      ],
    },
    {
      id: "how-often",
      heading: "How often to ship a bag of coffee",
      voice: "neutral",
      blocks: [
        `Work back from the bag. A ${grams} g bag lasts as long as the customer’s daily dose lets it:`,
        {
          type: "table",
          caption: `How much coffee a day one ${grams} g bag covers`,
          head: ["Delivery", `Coffee a day from one ${grams} g bag`],
          rows: coffee.frequencies.map((f) => {
            const weeks = Number(f.match(/\d+/)?.[0]);
            return [f, `About ${dailyUse(weeks)} g`];
          }),
        },
        "A cup of filter coffee or a double espresso uses very roughly 15 to 20 g, so every 2 weeks suits about a cup a day, every 4 weeks a cup every other day, and every 6 weeks a cup every two or three days. Say it in cups on the product page; shoppers don’t count grams.",
        "Offer two or three frequencies, and let subscribers change theirs. Whoever picked wrong will otherwise either run out or watch bags pile up, and both end in a cancellation.",
      ],
    },
    {
      id: "grind-as-a-variant",
      heading: "Make grind a variant, not a separate product",
      voice: "neutral",
      blocks: [
        "Whole bean, espresso grind, filter, cafetière: set these up as variants of one product. A subscriber who buys a new grinder can then change grind on their next bag without canceling and starting again.",
      ],
    },
    {
      id: "freshness",
      heading: "Roast dates and renewals",
      voice: "neutral",
      blocks: [
        "Each renewal arrives as a new order on its renewal day, the same as a one-time order. If you roast to order, roast from those orders; if you roast on fixed days, ship renewals on the next roast day and say so on the product page.",
        "A reminder a few days before each renewal lets subscribers skip a bag they don’t need yet. A bag that goes stale in the cupboard is a reason to cancel.",
      ],
    },
    {
      id: "pricing",
      heading: "Pricing a coffee subscription",
      voice: "neutral",
      blocks: [
        "The subscribe and save discount comes off every bag, all year, so set it against your margin on a bag, not on a single sale.",
        {
          type: "sum",
          caption: `Example: one Ember Hill subscriber on every 4 weeks, for a year.`,
          rows: [
            { label: `${perYear(4)} bags at the one-time price`, value: usd(coffee.price * perYear(4)) },
            { label: `${perYear(4)} bags at ${usd(bag)}, ${coffee.save}% off`, value: usd(bag * perYear(4)) },
          ],
          total: { label: "Discount given over the year", value: usd((coffee.price - bag) * perYear(4)) },
        },
        "Free shipping on subscription bags is another way to make the offer, instead of a bigger discount.",
      ],
    },
    {
      id: "with-subora-set-up",
      heading: "With Subora: one plan for your everyday coffees",
      voice: "subora",
      blocks: [
        `Make a Subscribe & Save subscription plan with ${coffee.title} and Ridge Blend, every 2, 4 and 6 weeks, at ${coffee.save}% off. Add the **Picker** to your product page in the theme editor, and **Collection badges** show “Save ${coffee.save}%” on those bags in your coffee collection.`,
        "For decaf, a **Trial** plan can make the first bag free and the rest one price. Trials in Subora count orders, not days. Its badge reads “Free trial”.",
        `Two more settings help: the plan’s free shipping can be on every order, the first, or the first few, and **Minimum orders** can hold back canceling online for the first few bags if your first-bag offer is generous.`,
      ],
      figure: {
        scene: "picker-coffee",
        caption: "Example store. The Picker on House Espresso, with the 4-week frequency chosen.",
      },
    },
    {
      id: "with-subora-portal",
      heading: "Subscribers change it themselves",
      voice: "subora",
      blocks: [
        "In the Customer portal in your store’s account, a subscriber can skip a bag, get the next one sooner, pause, change how often it comes, change the grind if it’s a variant, change the quantity, or swap to another coffee on your **Swap list**.",
        "If they still start to cancel, Subora asks why. Too much coffee brings up a skip, less often or a pause; too expensive brings up the discount, if you’ve turned it on. More in [reducing churn](/use-cases/reduce-subscription-churn/).",
      ],
      figure: {
        scene: "portal-coffee",
        caption: "Example store. A House Espresso subscription in the customer account, one delivery skipped.",
      },
    },
    {
      id: "with-subora-gifts",
      heading: "Coffee as a gift: a prepaid plan that ends",
      voice: "subora",
      blocks: [
        `A **Prepaid** plan with 6 deliveries every 4 weeks set to **End after the last paid delivery** sells half a year of coffee in one payment: ${usd(bag * 6)} today at ${usd(bag)} a bag. The buyer can send it to someone else’s address at checkout, and there’s no second payment. See [prepaid subscriptions](/use-cases/prepaid-subscriptions-shopify/).`,
      ],
    },
    {
      id: "with-subora-which-plan",
      heading: "Which Subora plan a roaster pays for",
      voice: "subora",
      blocks: [
        `Every plan has every feature, so the choice is only the bill. At ${subscribers} subscribers on every 4 weeks, Ember Hill takes about ${usdShort(Math.round(monthly))} a month in subscription revenue.`,
        {
          type: "table",
          caption: `What each Subora plan costs Ember Hill at about ${usdShort(Math.round(monthly))} a month`,
          head: ["Plan", "Cost for 30 days"],
          rows: PLANS.map((plan) => [plan.name, usd(subora(plan.key, monthly))]),
          highlight: [[PLANS.indexOf(cheapest), 1]],
        },
        `${cheapest.name} is the cheapest here, not Pro. If Ember Hill sat on Free, Subora’s Upgrade prompt would point to Growth, because the saving is over $10 a month. [See pricing](/pricing/).`,
      ],
    },
  ],
  features: ["subscriptionPlans", "storefront", "customerPortal", "retention"],
  limits: [
    "No Build-a-Box or mix-and-match bundles yet, so a “three different coffees each month” box isn’t possible in Subora today.",
    "Each subscription renews on its own date. Subora doesn’t gather renewals onto a shared roast day.",
    "Customers can’t add a one-off extra bag to a renewal from the portal, or ask for a delivery right now. They can get the next one sooner.",
    "No gift messages or separate gift recipients: a prepaid gift belongs to the buyer.",
  ],
  related: ["subscribe-and-save-shopify", "prepaid-subscriptions-shopify"],
};
