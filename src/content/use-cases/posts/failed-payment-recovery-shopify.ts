import { STORES, discounted } from "@/content/demo-stores";
import { usd } from "../arithmetic";
import type { UseCasePost } from "../types";

const bag = discounted(STORES.pet.product.price, STORES.pet.product.save);

/** Fernlee's last 30 days, as `RetryLadderMock` shows them. */
const failed = 42;
const recovered = 29;

export const post: UseCasePost = {
  slug: "failed-payment-recovery-shopify",
  title: "Failed subscription payments on Shopify: how to get them back",
  metaTitle: "Failed payment recovery for Shopify subscriptions",
  description:
    "Why subscription renewals fail on Shopify, how to retry them and what dunning emails should say, and how Subora’s Retry rules and recovery numbers work.",
  cardHeadline: "Failed subscription payments: how to get them back",
  summary:
    "Why renewals fail, how far apart to retry them, what to tell the customer, what to do when the retries run out, and how to count what you recover.",
  group: "keeping",
  cover: "retry-ladder",
  published: "2026-10-19",
  answer: [
    "A renewal fails when the bank declines the saved card: it expired, was replaced, was short of funds, or the bank flagged the charge. Some of these clear up within days and some need a new card, so retry the payment a few times over several days, and tell the customer straight away how to update their card.",
    "Decide in advance what happens when the retries run out: pause the subscription, cancel it, skip that order, or wait a little longer for a new card. Then count how many failed payments you get back, so you know whether your schedule works.",
  ],
  sections: [
    {
      id: "why-renewals-fail",
      heading: "Why subscription renewals fail",
      voice: "neutral",
      blocks: [
        "A renewal is charged without the customer there, so they don’t see the decline. The common causes:",
        {
          type: "list",
          items: [
            "**The card expired or was replaced**, after a loss or a bank’s reissue. Only a new card fixes this.",
            "**Not enough money or credit on the day.** Often fixed by trying again a few days later.",
            "**The bank declined it as unusual**, or asked for a check the customer wasn’t there to complete.",
            "**Not the card at all.** A product that’s sold out can stop a renewal from becoming an order. That’s yours to fix, not the customer’s.",
          ],
        },
        "This is the quiet half of churn. Nobody chose to leave; the subscription just stops unless something tries again.",
      ],
    },
    {
      id: "retry-schedule",
      heading: "Set a retry schedule",
      voice: "neutral",
      blocks: [
        {
          type: "list",
          items: [
            "**Space retries over days, not hours.** A charge that failed for lack of funds this morning will most likely fail again this afternoon.",
            "**Retry a few times, then stop.** Charging the same declined card over and over doesn’t help, and payment providers limit how often a card can be retried.",
            "**Set a last day**, and stop before the next renewal comes due, so one failed order doesn’t hold up the next.",
            "**Retry at once when the customer adds a new card**, rather than waiting for the next date on the schedule.",
          ],
        },
      ],
    },
    {
      id: "dunning-emails",
      heading: "What failed payment emails should say",
      voice: "neutral",
      blocks: [
        "Dunning is the old word for chasing a payment. For a subscription, the emails should read as help, not a demand:",
        {
          type: "list",
          items: [
            "That the payment didn’t go through, so the order isn’t placed yet.",
            "When you’ll try again, and the last day you’ll try.",
            "One button to update the card.",
            "What happens if the payment still fails, in one plain sentence.",
            "How to reach you, by replying.",
          ],
        },
        "Send one when it fails, one shortly before the last try, and one when it goes through, so the customer knows it’s sorted.",
      ],
    },
    {
      id: "when-retries-run-out",
      heading: "When the retries run out",
      voice: "neutral",
      blocks: [
        {
          type: "table",
          caption: "What each end result means",
          head: ["End result", "What happens", "Good when"],
          rows: [
            ["Pause", "The subscription stops until the customer updates their card and resumes it.", "You want them back once the card is fixed"],
            ["Cancel", "The subscription ends. To come back, they subscribe again.", "You’d rather start clean"],
            ["Skip the order", "That order is skipped and the next renewal is charged as usual.", "Deliveries are frequent and one missed order is no loss"],
            [
              "Wait for a new card",
              "Retries stop, but a new card still pays for the order until the next renewal comes due.",
              "Customers tend to update their card late",
            ],
          ],
        },
      ],
    },
    {
      id: "measure-recovery",
      heading: "Count what you recover",
      voice: "neutral",
      blocks: [
        "Count by failed payment, not by try: a payment recovered on the third retry is one recovery. Your recovery rate is recovered over failed, counting only payments whose retries have finished. And count the money: recovered revenue, and what was lost.",
      ],
    },
    {
      id: "with-subora-retry-rules",
      heading: "With Subora: Retry rules",
      voice: "subora",
      blocks: [
        "Every store starts with three retries, after 1, 3 and 5 days, within 14 days, then **Wait for a new card**. You can change them once for the whole store:",
        {
          type: "list",
          items: [
            "**Number of retries**: 1 to 6.",
            "**The gap before each retry**: 1 to 14 days, counted from the try before.",
            "**Maximum recovery period**: up to 30 days from the failed payment. Every retry has to fit inside it.",
            "**When the retries run out**: pause the subscription, cancel it, skip the order, or wait for a new card.",
          ],
        },
        "Retries also stop when the next renewal comes due, and any end without a payment skips the failed order, so it’s never charged later. A change to the rules reaches payments that fail after you save it.",
      ],
      figure: {
        scene: "retry-rules",
        caption: "Example store. The Retry rules every store starts with.",
      },
    },
    {
      id: "with-subora-emails",
      heading: "Emails in your store’s name, and a fix in their account",
      voice: "subora",
      blocks: [
        "The customer gets an email from your store when the payment fails, shortly before the last try when their card is the problem, when it goes through, and when the retries end. Each says what happens next, and the ones that need a new card have an **Update your card** button.",
        "Their Customer portal says the same, with the next try and the last day. Customers update their card through Shopify, and Subora retries straight away when a new card arrives. You also get a **Retry now** button on the subscription, which doesn’t move the schedule or email anyone.",
      ],
      figure: {
        scene: "payment-failed-email",
        caption: "Example store. The email Fernlee’s customer gets when a renewal fails.",
      },
    },
    {
      id: "with-subora-store-problems",
      heading: "When it’s not the card",
      voice: "subora",
      blocks: [
        "Subora sorts each failure by who can fix it. A sold-out product is a store problem: there’s no last-try email asking the customer for a new card, and the subscription is flagged for you as **Could not be ordered**. A retry after you restock is the fix.",
        "Store problems aren’t counted in your recovery numbers, because no card failed.",
      ],
    },
    {
      id: "with-subora-recovery-numbers",
      heading: "Recovery numbers you can check",
      voice: "subora",
      blocks: [
        "Subora’s **Failed payments** page counts failed payments, retries, recovered, recovery rate, recovered revenue and unrecoverable revenue, by failed payment rather than by try, with a CSV export.",
        {
          type: "sum",
          caption: "Example: Fernlee’s last 30 days, as in the screen at the top of this page.",
          rows: [
            { label: "Failed payments", value: `${failed}` },
            { label: "Recovered", value: `${recovered}` },
            { label: "Recovery rate", value: `${Math.round((recovered / failed) * 100)}%` },
            { label: "Each recovered renewal", value: usd(bag) },
          ],
          total: { label: "Recovered revenue", value: usd(recovered * bag), good: true },
        },
      ],
    },
  ],
  features: ["failedPayments", "customerPortal", "analytics"],
  limits: [
    "One set of Retry rules for the whole store, not one per subscription plan.",
    "Subora doesn’t update cards itself. Customers do that through Shopify’s own secure flow, and Subora reacts to it.",
    "A customer who marked your store’s emails as spam, or whose address bounces, gets no payment emails. Subora flags those subscriptions so you can reach the customer another way.",
    "Customer emails are email only, and their words are Subora’s: you can set your logo and color, not rewrite them.",
  ],
  related: ["reduce-subscription-churn", "prepaid-subscriptions-shopify"],
};
