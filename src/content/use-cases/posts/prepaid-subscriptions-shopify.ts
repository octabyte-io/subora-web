import { STORES, discounted } from "@/content/demo-stores";
import { minus, usd } from "../arithmetic";
import type { UseCasePost } from "../types";

const serum = STORES.skincare.product;
const each = discounted(serum.price, serum.save);
const deliveries = 6;

export const post: UseCasePost = {
  slug: "prepaid-subscriptions-shopify",
  title: "Prepaid subscriptions on Shopify: pay once, ship every month",
  metaTitle: "Prepaid subscriptions on Shopify",
  description:
    "How prepaid subscriptions work on Shopify: one payment, several deliveries, what customers can change, and what happens at renewal or cancel.",
  cardHeadline: "Prepaid subscriptions: pay once, ship every month",
  summary:
    "A customer pays once for several deliveries. How that works on Shopify, when it beats paying per delivery, what to tell customers, and what changes once the money is taken.",
  group: "selling",
  cover: "prepaid-picker",
  published: "2026-10-19",
  answer: [
    "A prepaid subscription takes one payment for several deliveries: pay for six months, get a delivery every month. When the paid deliveries are done, it either takes the next payment for another set or ends.",
    "It suits gifts, products people use steadily, and stores that want the money up front. Because those deliveries are already paid for, they can’t be skipped or moved, so say so before the customer buys.",
  ],
  sections: [
    {
      id: "how-prepaid-works",
      heading: "How a prepaid subscription works on Shopify",
      voice: "neutral",
      blocks: [
        "The payment makes one Shopify order. Shopify keeps the deliveries it paid for on that order, each scheduled for its own date, and each one opens for you to ship when its date comes. You fulfil them like any other order.",
        "Nothing is charged between those deliveries. The next payment, if there is one, falls when the paid deliveries run out: on six monthly deliveries, six months after the first.",
      ],
    },
    {
      id: "prepaid-or-pay-per-delivery",
      heading: "Prepaid or pay per delivery?",
      voice: "neutral",
      blocks: [
        {
          type: "table",
          caption: "How a prepaid subscription differs from one that pays per delivery",
          head: ["", "Pay per delivery", "Prepaid"],
          rows: [
            ["When the customer pays", "Before each delivery", "Once, for several deliveries"],
            ["Skip or move a delivery", "Yes", "Not one that’s already paid for"],
            ["A card that fails", "Can hold up any delivery", "Matters only at the next payment"],
            ["Canceling", "No more deliveries or charges", "Paid deliveries still ship; no more charges"],
            ["Good for", "Everyday reorders", "Gifts, routines, cash up front"],
          ],
        },
        "You can offer both on the same product and let the customer choose.",
      ],
    },
    {
      id: "pricing-prepaid",
      heading: "Pricing a prepaid plan",
      voice: "neutral",
      blocks: [
        "Show the price per delivery and the total due today side by side. Customers compare the first with what they’d pay one at a time, and the second is what leaves their account.",
        {
          type: "sum",
          caption: `Example: Mira Skin’s ${serum.title}, ${deliveries} monthly deliveries paid at once.`,
          rows: [
            { label: "One-time price", value: usd(serum.price) },
            { label: `Prepaid, ${serum.save}% off each`, value: minus(serum.price - each) },
            { label: "Price per delivery", value: usd(each) },
            { label: "Deliveries paid for", value: `× ${deliveries}` },
          ],
          total: { label: "Due today", value: usd(each * deliveries) },
        },
        "Because you hold the money up front, you can afford a bigger discount on prepaid than on paying per delivery. Weigh that against refunds: decide now what you’ll do if someone asks for money back on deliveries that haven’t shipped.",
      ],
    },
    {
      id: "tell-customers",
      heading: "What to tell customers before they buy",
      voice: "neutral",
      blocks: [
        {
          type: "list",
          items: [
            "How much is charged today, and for how many deliveries.",
            "How often the deliveries come.",
            "Whether it renews with another payment when they run out, or ends.",
            "That paid deliveries can’t be skipped or moved.",
            "What happens if they cancel: whether paid deliveries still ship, and whether anything is refunded.",
          ],
        },
        "Put the same terms in your subscription policy, and link it from the product page.",
      ],
    },
    {
      id: "with-subora-prepaid-plan",
      heading: "With Subora: a Prepaid subscription plan",
      voice: "subora",
      blocks: [
        "Make a subscription plan and choose **Prepaid**. Set the **Deliveries per payment**, from 2 to 52, the delivery frequencies, and the **Price per delivery**: a percentage off, an amount off, a fixed price or no discount. Then choose what happens **after the last paid delivery**: the plan renews, or the subscription ends.",
        "The Picker shows the prepaid option beside one time and your other plans, with the price of each delivery, the total due today and one sentence of terms, such as “Pay once for 6 months of deliveries. Renews every 6 months.”",
        "A Prepaid plan can also have free shipping on every order, the first, or the first few. Like every Subora feature, Prepaid is on every Subora plan, Free included.",
      ],
    },
    {
      id: "with-subora-after-checkout",
      heading: "What the customer can change once it’s paid",
      voice: "subora",
      blocks: [
        "In the Customer portal, a prepaid subscription says how many deliveries were paid and when, and that they can’t be skipped or moved. The customer can:",
        {
          type: "list",
          items: [
            "**Change the shipping address.** Deliveries already paid for keep the old one; the portal tells them to contact you to change those.",
            "**Pause.** The next payment isn’t taken while it’s paused. Deliveries already paid for still ship.",
            "**Cancel.** They aren’t charged again. Deliveries already paid for still ship, and nothing is refunded automatically.",
          ],
        },
        "Quantity, frequency, variant and Swap aren’t offered on a prepaid subscription, and a prepaid subscription that ends after its one payment offers only Cancel. If they start to cancel, the only Retention offer they can see is the discount, if you’ve turned it on.",
      ],
      figure: {
        scene: "prepaid-portal",
        caption: "Example store. A prepaid subscription in the Customer portal: no Skip or Change date, and the paid period named.",
      },
    },
    {
      id: "with-subora-renew-or-end",
      heading: "When the paid deliveries run out",
      voice: "subora",
      blocks: [
        "**On a plan that renews**, Subora takes the next payment for the next set of deliveries. If the card fails, it’s retried on your [Retry rules](/use-cases/failed-payment-recovery-shopify/), like any renewal.",
        "**On a plan that ends**, Subora ends the subscription on the day the next payment would have been due, and the customer gets an email saying it’s complete. It counts as completed in your analytics, not as churn.",
      ],
    },
  ],
  features: ["subscriptionPlans", "customerPortal", "storefront"],
  limits: [
    "Deliveries already paid for can’t be skipped or moved from Subora, by the customer or by you. Shopify doesn’t allow it on a prepaid subscription.",
    "Canceling or pausing reaches the next payment, never the one already taken. Subora doesn’t refund unshipped deliveries; if your policy does, refund them from the order in Shopify.",
    "No Minimum orders on prepaid plans: the period is already paid for.",
    "No gift features. The subscription belongs to the customer who bought it, even when it ships to someone else.",
  ],
  related: ["subscribe-and-save-shopify", "coffee-subscription-shopify"],
};
