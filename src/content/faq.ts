/**
 * Every answer here is checked against the app (`../subora`), not the spec.
 * `/faq/` shows every group; a feature page shows its own with `faqGroup`;
 * `home: true` items also appear on the home page.
 */
export type Faq = { q: string; a: string[]; home?: boolean };

export type FaqGroupKey =
  | "start"
  | "pricing"
  | "plans"
  | "storefront"
  | "portal"
  | "retention"
  | "payments"
  | "analytics";

export type FaqGroup = { key: FaqGroupKey; title: string; items: Faq[] };

export const FAQ: FaqGroup[] = [
  {
    key: "start",
    title: "Getting started",
    items: [
      {
        q: "Do I need Shopify Plus?",
        home: true,
        a: [
          "No. Subora runs on Shopify’s own subscriptions and checkout, so it works on any Shopify plan, and we test it on a Basic store. Shopify only takes subscription payments through payment providers it supports for subscriptions, such as Shopify Payments, so check yours before you start.",
        ],
      },
      {
        q: "Does it work with my theme?",
        home: true,
        a: [
          "Yes. The Picker is a theme app block, so on any Online Store 2.0 theme you add it to your product page in the theme editor and press Save. No code. On an older theme, you turn on the Picker’s app embed instead.",
        ],
      },
      {
        q: "Where do customers manage their subscriptions?",
        a: [
          "In your store’s customer account, on a Subscriptions page that carries your store’s look, not Subora’s. You can also add a “Manage subscription” button to their order pages. You add both in Shopify’s customer account editor.",
          "The page is built on Shopify’s current customer accounts. If your store still uses the legacy (classic) customer accounts, switch to the current ones in your Shopify settings first.",
        ],
      },
      {
        q: "How long does setup take?",
        a: [
          "Five steps, and none of them need code: install, create a subscription plan, add the Picker to your product page, add the Subscriptions page to customer accounts, and place a test order. Subora’s Setup guide walks you through creating a plan, placing the Picker and adding the Subscriptions page, and ticks each off when it’s done. The test order is yours to check. Customer emails and Retry rules are on from the start.",
        ],
      },
      {
        q: "Can I move my subscribers from another subscription app?",
        home: true,
        a: [
          "Moving from another app is not automatic in Subora yet. Write to us and our team will plan the move with you by hand: setting up matching subscription plans, and working out the best way to bring your subscribers across.",
        ],
      },
    ],
  },
  {
    key: "pricing",
    title: "Pricing and billing",
    items: [
      {
        q: "What does the transaction fee apply to?",
        home: true,
        a: [
          "The subscription lines of each paid order, at checkout and on every renewal, after discounts and without tax, shipping or tips. One-time products in the same order are not counted.",
          "Refunds and chargebacks are credited back. The fee is charged to you through your Shopify bill, never to your customers.",
        ],
      },
      {
        q: "Is there a cap on the fee?",
        home: true,
        a: [
          "No. Instead, Subora compares your last 30 days of fees with what the other Subora plans would have cost, and tells you when one would be cheaper. That includes telling you to move down to a cheaper one.",
        ],
      },
      {
        q: "Is there a free trial of Growth or Pro?",
        home: true,
        a: [
          "No, because there is nothing to unlock. Free has every feature and no subscription limit, so you can set everything up and sell on Free, then change your Subora plan when the numbers say so.",
        ],
      },
      {
        q: "How do I change my Subora plan?",
        a: [
          "On Shopify’s own plan page for Subora. The change takes effect straight away, and you can move up or down at any time. A store that has not approved a plan counts as Free.",
        ],
      },
      {
        q: "How am I billed?",
        a: [
          "Through your Shopify bill, every 30 days, in USD. The monthly fee and the transaction fees appear there, and Subora’s Billing page shows a statement for each 30-day bill, with a CSV export.",
          "Prices are in USD. If Shopify bills you in another currency, it converts them at its own rate, so your bill may differ a little.",
        ],
      },
    ],
  },
  {
    key: "plans",
    title: "Subscription plans",
    items: [
      {
        q: "What kinds of subscription plan can I sell?",
        a: [
          "Four: Subscribe & Save, an ongoing subscription; Prepaid, where one payment covers several deliveries; Trial, where the first orders are free or discounted; and Fixed-length, which ends after a set number of paid orders.",
        ],
      },
      {
        q: "Can I offer a free trial?",
        a: [
          "Yes, counted in orders rather than days. The first order, or the first few, are free or discounted, and later orders are one price.",
        ],
      },
      {
        q: "Can I sell a product only as a subscription?",
        a: [
          "Yes. Tick “Sell only as a subscription” next to the product in the subscription plan form, and the product can only be bought on a subscription plan. The Picker then shows no one-time option for it.",
        ],
      },
      {
        q: "Can I stop customers canceling straight after their first order?",
        a: [
          "Yes. On a Subscribe & Save or Trial plan you can set Minimum orders: how many paid orders a customer reaches before the Customer portal lets them cancel. The portal tells them the condition up front, and skipping and pausing still work.",
        ],
      },
    ],
  },
  {
    key: "storefront",
    title: "Storefront",
    items: [
      {
        q: "What languages does the Picker speak?",
        a: [
          "English, German, Spanish, French, Italian, Japanese, Dutch and Brazilian Portuguese. It follows the language your store shows the customer.",
        ],
      },
      {
        q: "Does the Picker tell customers the charge recurs?",
        a: [
          "Yes. While a subscription option is chosen, the Picker says under it that the charge recurs, with a link to your store’s subscription policy when you have one.",
        ],
      },
      {
        q: "Can customers subscribe from the cart?",
        a: [
          "Yes, if you turn on the Cart offer. It sits under a one-time item in the cart and turns it into a subscription, on the cart page and in the cart drawer. It only goes that way: one-time to subscription.",
          "The Cart offer works on Shopify’s Dawn and Horizon themes. On other themes it shows nothing, and the Picker on the product page still works as usual.",
        ],
      },
    ],
  },
  {
    key: "portal",
    title: "Customer portal",
    items: [
      {
        q: "Can customers cancel online?",
        a: [
          "Always. You can turn off any other customer action, but not Cancel. Before they cancel, customers are asked why, and see the Retention offers you’ve switched on for their reason. They can skip both.",
        ],
      },
      {
        q: "Can customers change their delivery date?",
        a: [
          "They can get the next delivery sooner, or skip it. Subora moves a delivery earlier, never later, so a customer who wants to wait skips that delivery instead.",
        ],
      },
      {
        q: "How do customers update their card?",
        a: [
          "Through Shopify’s own secure card update. Subora never sees or keeps card numbers. When a payment has failed and the customer adds a new card, Subora retries straight away.",
        ],
      },
      {
        q: "Can I make changes for a customer?",
        a: [
          "Yes. From Subora you can make the same changes a customer can, on any subscription, including ones you have turned off in the portal. Pause, resume, cancel, skip and reschedule also work as bulk actions across many subscriptions at once.",
        ],
      },
    ],
  },
  {
    key: "retention",
    title: "Retention",
    items: [
      {
        q: "Which Retention offers can I show?",
        a: [
          "A discount on the next orders, skip the next delivery, change how often it comes, pause for 30 or 60 days, or swap to another product. Subora matches the offers to each cancellation reason, and you switch each offer on or off.",
        ],
      },
      {
        q: "Can I write my own cancellation reasons?",
        a: [
          "No. There are seven fixed reasons, and you can turn off any of them except Other, which lets the customer write their own words.",
        ],
      },
      {
        q: "How is the Save rate counted?",
        a: [
          "Saved attempts divided by all cancel attempts. An attempt is saved when the customer accepts an offer, or leaves without canceling. Both numbers count attempts, not customers.",
        ],
      },
    ],
  },
  {
    key: "payments",
    title: "Failed payments and emails",
    items: [
      {
        q: "What happens when a card fails?",
        a: [
          "Subora retries the payment on your Retry rules. By default that is three retries after 1, 3 and 5 days, within 14 days. The customer gets an email when it fails, before the last try, and when it goes through. If they add a new card, Subora retries straight away.",
          "If the retries run out, Subora does what you chose: pause the subscription, cancel it, skip the order, or wait for a new card.",
        ],
      },
      {
        q: "Will customers get two receipts?",
        a: [
          "No. Each renewal is a normal Shopify order, so Shopify’s order confirmation is the receipt. Subora’s own emails cover the subscription itself: reminders, skips, pauses and payment problems.",
        ],
      },
      {
        q: "Can I turn off Subora’s emails?",
        a: [
          "Each kind of email has its own switch, so you can turn off the renewal reminder if you already send one and keep the rest. The email confirming a new subscription always goes, because the Shopify App Store requires it.",
        ],
      },
    ],
  },
  {
    key: "analytics",
    title: "Analytics and data",
    items: [
      {
        q: "Can I export my data?",
        a: [
          "Yes. The subscription list and each analytics tab (Subscribers, Revenue, Churn, Retention and Failed payments) export to CSV.",
        ],
      },
      {
        q: "Can I see who changed a subscription?",
        a: [
          "Yes. The Activity log records each change and who made it: the customer, you, Subora or Shopify.",
        ],
      },
      {
        q: "Does Subora store card details?",
        a: [
          "No. Payments run through Shopify. Subora shows the card brand and last digits on a subscription by reading them from Shopify, and does not keep them. The privacy policy lists what Subora does keep.",
        ],
      },
    ],
  },
];

/** One group, for the FAQ section on its feature page. */
export function faqGroup(key: FaqGroupKey) {
  const group = FAQ.find((g) => g.key === key);
  if (!group) throw new Error(`No FAQ group "${key}"`);
  return group;
}
