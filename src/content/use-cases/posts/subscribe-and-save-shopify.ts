import { STORES, discounted } from "@/content/demo-stores";
import { minus, perYear, usd } from "../arithmetic";
import type { UseCasePost } from "../types";

const coffee = STORES.coffee.product;
const price = discounted(coffee.price, coffee.save);
const bags = perYear(4);

export const post: UseCasePost = {
  slug: "subscribe-and-save-shopify",
  title: "How to set up subscribe and save on Shopify",
  metaTitle: "Subscribe and save on Shopify: how to set it up",
  description:
    "How subscribe and save works on Shopify, what you need first, how big a discount to offer, and where shoppers should see it. With or without Subora.",
  cardHeadline: "How to set up subscribe and save on Shopify",
  summary:
    "What subscribe and save is on Shopify, what you need before you start, how to pick a discount your margin can carry, and where shoppers should see the offer.",
  group: "selling",
  cover: "picker-coffee",
  published: "2026-10-19",
  answer: [
    "Subscribe and save sells one product two ways: once at full price, or on a repeating delivery at a lower price. On Shopify, a subscription app adds the repeating option, Shopify’s own checkout takes the first payment, and the app charges each renewal after that.",
    "Start with a product customers already buy again, a discount you can afford on every order, and two or three delivery frequencies. Then put the offer where shoppers decide: next to Add to cart, on collection pages and in the cart.",
  ],
  sections: [
    {
      id: "what-you-need",
      heading: "What you need before you start",
      voice: "neutral",
      blocks: [
        {
          type: "list",
          items: [
            "**A subscription app.** Shopify sells subscriptions through apps: the app creates the subscription options on your products, and Shopify’s checkout sells them like any other order.",
            "**A payment provider that takes subscription payments.** Shopify only charges renewals through providers it supports for subscriptions, such as Shopify Payments. Check yours first.",
            "**A theme that can show the options.** Online Store 2.0 themes take app blocks on the product page, so an app can add the choice without code.",
            "**A subscription policy.** Write down how renewals, skipping and canceling work, and publish it with your store’s other policies, so customers can read it before they subscribe.",
          ],
        },
        "You don’t need Shopify Plus. Subscriptions run on Shopify’s own checkout on every Shopify plan.",
      ],
    },
    {
      id: "choosing-a-discount",
      heading: "How big a subscribe and save discount to offer",
      voice: "neutral",
      blocks: [
        "The discount comes off every order, not just the first, so price it against what you make on each delivery. Work it out over a year, because that’s how long you hope a subscriber stays.",
        {
          type: "sum",
          caption: `Example: Ember Hill Roasters’ ${coffee.title}, every 4 weeks for a year.`,
          rows: [
            { label: "One-time price", value: usd(coffee.price) },
            { label: `Subscribe and save, ${coffee.save}% off`, value: minus(coffee.price - price) },
            { label: "**Price per delivery**", value: usd(price) },
            { label: `Deliveries in a year, every 4 weeks`, value: `${bags}` },
            { label: "What the subscriber pays in a year", value: usd(price * bags) },
          ],
          total: { label: "Discount you give up in a year", value: usd((coffee.price - price) * bags) },
        },
        `So the question isn’t whether 15% sounds generous. It’s whether ${usd(price)}, less the cost of the bag and any shipping you pay, still leaves a margin you’re glad to repeat ${bags} times.`,
        "A percentage isn’t the only way to make the offer. You can take an amount off instead, offer free shipping on subscription orders, or start lower and raise the price from a later order.",
      ],
    },
    {
      id: "delivery-frequencies",
      heading: "How many delivery frequencies to offer",
      voice: "neutral",
      blocks: [
        "Offer two or three, set around how long one unit lasts: one a little sooner and one a little later than the middle. One frequency forces some customers to pile up stock or run out, and both of those end in a cancellation.",
        "Keep the price the same across frequencies, so the choice is only about how often. Then let subscribers change it later, along with skipping one delivery, without writing to you.",
      ],
    },
    {
      id: "where-to-show-it",
      heading: "Where shoppers should see the offer",
      voice: "neutral",
      blocks: [
        {
          type: "list",
          items: [
            "**On the product page, beside Add to cart.** Show both prices, the saving, and the frequencies. Say plainly that the charge repeats, and link your subscription policy.",
            "**On collection pages.** A short badge such as “Save 15%” tells shoppers there’s an offer before they open the product.",
            "**In the cart.** A shopper who added the one-time option can still switch to the subscription before they pay.",
          ],
        },
        {
          type: "aside",
          kind: "careful",
          text: "Rules on automatic renewals differ by country and, in the US, by state. Many ask for the terms to be clear before checkout and canceling to be easy. This isn’t legal advice; check the rules where you sell.",
        },
      ],
    },
    {
      id: "with-subora-plans",
      heading: "With Subora: one subscription plan, several frequencies",
      voice: "subora",
      blocks: [
        "In Subora you make a **Subscribe & Save** subscription plan: choose the products, the delivery frequencies (every so many days, weeks, months or years), and one price for all of them.",
        {
          type: "list",
          items: [
            "**The price**: a percentage off, an amount off, a fixed price, or no discount.",
            "**A second price from a later order**, if you want one: “10% off the first 2 orders, then 15%”.",
            "**Free shipping** on every order, on the first order, or on the first few.",
            "**Sell only as a subscription**, for a product you don’t sell one time.",
            "**Minimum orders**, the number of paid orders a customer reaches before they can cancel online. See [reducing churn](/use-cases/reduce-subscription-churn/).",
          ],
        },
        "Every Subora plan includes all of this, Free included. A different discount is a second subscription plan, such as a bigger one for [prepaid](/use-cases/prepaid-subscriptions-shopify/).",
      ],
    },
    {
      id: "with-subora-storefront",
      heading: "The Picker, Collection badges and the Cart offer",
      voice: "subora",
      blocks: [
        "The **Picker** is a theme app block. You add it to your product page in the theme editor and press Save; on an older theme you turn on its app embed. It shows the one-time price beside the subscription, the saving and the frequencies, says the charge recurs and links your subscription policy. It speaks English, German, Spanish, French, Italian, Japanese, Dutch and Brazilian Portuguese.",
        "**Collection badges** put “Save 15%”, “Free trial” or “Subscription available” on product cards wherever your theme lists products. The **Cart offer** sits under a one-time item in the cart and turns it into a subscription with one press, on Dawn and Horizon themes.",
      ],
      figure: {
        scene: "storefront-coffee",
        caption: "Example store. A Collection badge on each coffee, and the Cart offer under a one-time bag, next to a line that is already a subscription.",
      },
    },
    {
      id: "with-subora-after",
      heading: "After they subscribe",
      voice: "subora",
      blocks: [
        "Each renewal is an ordinary Shopify order, so you ship it the way you ship everything else, and Shopify’s order confirmation is the receipt. A few days before each one, Subora emails the subscriber in your store’s name.",
        "In the **Customer portal**, a page in your store’s customer account, subscribers skip a delivery, get the next one sooner, pause, change quantity, frequency or variant, swap to a product on your Swap list, change the address or cancel. Cards are updated through Shopify.",
      ],
      figure: {
        scene: "renewal-email-coffee",
        caption: "Example store. The renewal reminder comes from Ember Hill Roasters, with its color and name.",
      },
    },
  ],
  features: ["subscriptionPlans", "storefront", "customerPortal"],
  limits: [
    "One subscription plan has one price rule for all its frequencies. A different discount, such as a bigger one for every 2 weeks, needs a second plan.",
    "A plan can change its price once, from a later order. A ladder of several steps, such as 10%, then 15%, then 20%, isn’t in Subora yet.",
    "Free shipping is for the whole shipping cost or nothing. There’s no partial shipping discount.",
    "No Build-a-Box or bundles yet. Each subscription line is a product you already sell.",
    "The Customer portal is in English only for now, even though the Picker speaks eight languages.",
  ],
  related: ["coffee-subscription-shopify", "prepaid-subscriptions-shopify"],
};
