import { STORES, discounted } from "@/content/demo-stores";
import { usd } from "../arithmetic";
import type { UseCasePost } from "../types";

const serum = discounted(STORES.skincare.product.price, STORES.skincare.product.save);

/** Mira Skin's last 30 days, as `RetentionTableMock` shows them. */
const attempts = 112;
const saved = 51;
const retained = 2246.4;

export const post: UseCasePost = {
  slug: "reduce-subscription-churn",
  title: "How to reduce subscription churn on Shopify",
  description:
    "Why Shopify subscribers cancel and what to do about it: ask why, offer a skip, pause or discount first, keep canceling easy, and measure what you save.",
  summary:
    "Ask why customers cancel, offer the smaller change that fixes their reason, make skipping and pausing easy before they ask, and count what the offers really keep.",
  group: "keeping",
  cover: "cancel-too-expensive",
  published: "2026-10-19",
  answer: [
    "Customers cancel for reasons like too much product, deliveries too often, the price, or wanting something else. Each of those has a smaller fix than canceling: skip a delivery, get it less often, pause, swap, or a discount on the next orders.",
    "So ask for the reason when they cancel, offer the fix that matches it, and let them go if they still want to. Keep canceling easy; a cancel button that’s hard to find tends to come back as a complaint or a chargeback.",
  ],
  sections: [
    {
      id: "two-kinds-of-churn",
      heading: "Two kinds of churn: canceled, and failed payments",
      voice: "neutral",
      blocks: [
        "Some subscribers decide to leave. Others never decide anything: their card fails and the subscription stops. The second kind needs a different fix, retrying the payment and telling the customer, and it’s covered in [failed payment recovery](/use-cases/failed-payment-recovery-shopify/).",
        "This page is about the first kind: a customer who opens their account and starts to cancel.",
      ],
    },
    {
      id: "ask-why",
      heading: "Ask why, at the moment they cancel",
      voice: "neutral",
      blocks: [
        "Ask one question with a short list of reasons, and let the customer skip it. A survey after they’ve gone gets fewer answers and comes too late to change anything.",
        "Keep the list to reasons you can act on, plus “Other” with room for their own words. Read the Other answers every month: they tell you which reason is missing.",
      ],
    },
    {
      id: "offer-what-fits",
      heading: "Offer the change that fits the reason",
      voice: "neutral",
      blocks: [
        "A discount is the obvious offer, and the wrong one for most reasons. Someone with three unopened bags doesn’t need a cheaper fourth.",
        {
          type: "table",
          caption: "Cancellation reasons and the offers that answer them",
          head: ["The reason", "What answers it"],
          rows: [
            ["Too expensive", "A discount on the next few orders"],
            ["Too much product", "Skip the next delivery, get it less often, or pause"],
            ["Don’t use it enough", "Pause for a month or two, or get it less often"],
            ["Delivery too frequent", "Get it less often, or skip the next delivery"],
            ["Product issue", "Swap to another product, and look into the problem"],
            ["Want a different product", "Swap to another product"],
            ["Other", "Nothing automatic. Read what they wrote"],
          ],
        },
        "Show the offers once, with a plain way to say no thanks and carry on canceling.",
      ],
    },
    {
      id: "before-they-cancel",
      heading: "Make the smaller changes easy before anyone cancels",
      voice: "neutral",
      blocks: [
        {
          type: "list",
          items: [
            "**Let subscribers skip, pause and change frequency themselves**, from their account, without writing to you.",
            "**Remind them before each renewal**, so they can skip one they don’t need instead of canceling after a charge they didn’t expect.",
            "**Let them get the next delivery sooner** when they run out early. Running out is a reason to leave, too.",
          ],
        },
      ],
    },
    {
      id: "minimum-orders",
      heading: "Should you ask for a minimum number of orders?",
      voice: "neutral",
      blocks: [
        "A minimum, say three orders before canceling online, protects a generous first-order discount from people who take it and leave. It also annoys customers who didn’t notice it.",
        "If you use one, say it on the product page and in your subscription policy, keep skipping and pausing open while it applies, and show the customer how many orders are left.",
      ],
    },
    {
      id: "measure-what-you-save",
      heading: "Measure what you save",
      voice: "neutral",
      blocks: [
        "Count attempts, not customers: every time someone starts to cancel is one attempt. An attempt is saved when they accept an offer, or leave without canceling. **Save rate** is saved attempts over all attempts.",
        "A saved subscription that cancels a week later wasn’t worth much. So also count the money: what saved subscriptions actually paid on their renewals after the save.",
      ],
    },
    {
      id: "with-subora-reasons",
      heading: "With Subora: a Cancellation reason, then a Retention offer",
      voice: "subora",
      blocks: [
        "When a customer presses Cancel in the Customer portal, Subora asks why, with seven fixed reasons: Too expensive, Too much product, Don’t use it enough, Delivery too frequent, Product issue, I want a different product, and Other. They can skip the question. You can turn off any reason except Other.",
        "Subora then shows the **Retention offers** that go with that reason, all at once, in the pairing from the table above. You switch each offer on or off: a discount on the next orders, skip the next delivery, change frequency, pause for 30 days, pause for 60 days, and swap.",
        "An offer only appears when the customer could make that change right now. If you’ve turned off pausing in the portal, the pauses don’t appear either.",
      ],
      figure: {
        scene: "cancel-too-much-product",
        caption: "Example store. Too much product brings up three offers; none of them is a discount.",
      },
    },
    {
      id: "with-subora-discount",
      heading: "The discount offer",
      voice: "subora",
      blocks: [
        "The discount is the only offer that costs you money, so it starts switched off. Turn it on and set a whole percentage, from 1 to 100, for the next 1 to 12 orders, and the title Shopify prints on the order.",
        "A customer can accept it once in 365 days. It isn’t offered while one of their payments has failed, and it ends by itself after the orders you set.",
      ],
    },
    {
      id: "with-subora-minimum-orders",
      heading: "Minimum orders",
      voice: "subora",
      blocks: [
        "On a Subscribe & Save or Trial plan, set **Minimum orders**, from 2 to 52. The portal tells the customer the condition before they ask, and keeps Skip and Pause open. You can still cancel for them from Subora.",
      ],
      figure: {
        scene: "minimum-orders",
        caption: "Example store. A subscription on a plan with 3 Minimum orders, after its first order.",
      },
    },
    {
      id: "with-subora-retention-numbers",
      heading: "Save rate and Revenue retained, by reason",
      voice: "subora",
      blocks: [
        "Subora’s **Retention** page counts cancel attempts, canceled, saved and Save rate, by reason and by offer, and **Revenue retained**: what saved subscriptions paid on their renewals after the save. Each tab exports to CSV.",
        {
          type: "sum",
          caption: "Example: Mira Skin’s last 30 days, as in the screen shown here.",
          rows: [
            { label: "Cancel attempts", value: `${attempts}` },
            { label: "Saved", value: `${saved}` },
            { label: "Save rate", value: `${Math.round((saved / attempts) * 100)}%` },
            {
              label: `Renewals paid by saved subscribers, at ${usd(serum)}`,
              value: `${Math.round(retained / serum)}`,
            },
          ],
          total: { label: "Revenue retained", value: usd(retained), good: true },
        },
      ],
      figure: {
        scene: "retention-table",
        caption: "Example store. Subora’s Retention page, last 30 days.",
      },
    },
  ],
  features: ["retention", "customerPortal", "analytics"],
  limits: [
    "The seven reasons are fixed. You can turn them off, but not write your own; Other takes the customer’s own words.",
    "Subora decides which offers go with each reason. Custom cancellation flows aren’t in Subora yet.",
    "Other, and a skipped question, get no offers: the customer goes straight to the confirmation.",
    "A prepaid subscription is only ever shown the discount. Skips, pauses, swaps and frequency changes aren’t offered as Retention offers on one.",
    "The Customer portal and its cancel steps are in English only for now.",
  ],
  related: ["failed-payment-recovery-shopify", "subscribe-and-save-shopify"],
};
