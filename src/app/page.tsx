import Link from "next/link";
import { Band, Container, CtaLink, InstallLink, Money, SectionHeading } from "@/components/site/primitives";
import { Mark } from "@/components/site/logo";
import { PickerMock, CollectionMock, CartOfferMock } from "@/components/mocks/storefront";
import { PortalMock } from "@/components/mocks/portal";
import { CancelFlowMock } from "@/components/mocks/cancel-flow";
import { EmailMock } from "@/components/mocks/email";
import { AnalyticsMock, RetentionTableMock, RetryLadderMock } from "@/components/mocks/admin";
import { TheLoop } from "@/components/sections/the-loop";
import { PlanCalculator } from "@/components/sections/plan-calculator";
import { FaqList } from "@/components/sections/faq-list";
import { FeatureSplit } from "@/components/sections/feature-split";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pages } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { FAQ } from "@/content/faq";
import { PLANS, TYPICAL_APP, feeLabel } from "@/content/plans";
import { STORES, discounted } from "@/content/demo-stores";
import { cn } from "@/lib/utils";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.home);

const coffee = STORES.coffee;
const coffeePrice = discounted(coffee.product.price, coffee.product.save);

/** Ember Hill Roasters' Activity this morning. Only the recovered payment is money won back. */
const ACTIVITY = [
  { what: "Renewal charged", who: "Maya Torres", amount: coffeePrice },
  { what: "Delivery skipped", who: "Jonah Lee, in the Customer portal" },
  {
    what: "Payment recovered",
    who: "Priya Shah, after one retry",
    amount: coffeePrice,
    win: true,
  },
  {
    what: "Retention offer accepted",
    who: "Alex Kim, 15% off the next 2 orders",
  },
];

const NO_GATES = [
  {
    title: "Every feature on Free.",
    body: "Retention offers, payment retries, the Customer portal, analytics and exports. Nothing is held back for a higher plan.",
  },
  {
    title: "No subscription limit.",
    body: "No cap on subscribers or on revenue, on any plan. Growing never forces you onto a different plan.",
  },
  {
    title: "A plan with no transaction fee.",
    body: `Pro is $99 a month with a 0% fee and no cents per order. Typical subscription apps charge ${TYPICAL_APP.label}.`,
  },
];

const PLAN_KINDS = [
  {
    name: "Subscribe & Save",
    example: "15% off, every 4 weeks",
    body: "An ongoing subscription at a percentage off, an amount off, a fixed price or no discount. Offer several delivery frequencies on one plan.",
  },
  {
    name: "Prepaid",
    example: "Pay for 6 bags, get one every 4 weeks",
    body: "One payment covers several deliveries. When they have all shipped, the plan renews or ends, as you set it.",
  },
  {
    name: "Trial",
    example: "First order free, then $28.80 each",
    body: "The first orders are free or discounted, then one price. A trial is counted in orders, not days.",
  },
  {
    name: "Fixed-length",
    example: "12 monthly boxes, then it ends",
    body: "Ends by itself after a set number of paid orders, and the customer gets an email saying the subscription is complete.",
  },
];

const SETUP = [
  {
    title: "Install Subora",
    body: "From the Shopify App Store. You start on Free, with every feature.",
  },
  {
    title: "Create a subscription plan",
    body: "Choose the products, how often they ship, and the discount.",
  },
  {
    title: "Add the Picker to your product page",
    body: "The setup guide opens your theme editor with the block in place. Press Save.",
  },
  {
    title: "Add the Subscriptions page to customer accounts",
    body: "So customers can skip, pause, swap or cancel without writing to you.",
  },
  {
    title: "Place a test order",
    body: "Subscribe on your own store and watch it appear in Subora.",
  },
];

const COMING = ["Build-a-Box and bundles", "Klaviyo and Shopify Flow", "Importing subscriptions from other apps"];

export default function HomePage() {
  const homeFaq = FAQ.flatMap((group) => group.items).filter((item) => item.home);

  return (
    <>
      <JsonLd data={webPageJsonLd(pages.home)} />

      {/* Hero */}
      <section className="pt-12 pb-20 sm:pt-20 sm:pb-28">
        <Container>
          {/* Three short sentences, one per line: the whole offer, read like a ledger. */}
          <h1 className="text-d1 font-semibold tracking-[-0.04em] [&>span]:block">
            <span>Every feature.</span> <span>Unlimited subscriptions.</span>{" "}
            <span className="text-muted">Choose how you pay.</span>
          </h1>
          <div className="mt-10 grid grid-cols-1 items-start gap-x-16 gap-y-10 lg:mt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="lg:pt-2">
              <p className="max-w-[34rem] text-lead text-muted">
                Sell subscriptions on your Shopify store, let customers manage their own, and get failed payments back.
                Every plan has every feature, so the only thing you choose is the bill.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <InstallLink />
                <CtaLink href="/pricing/" variant="secondary">
                  See pricing
                </CtaLink>
              </div>
              <dl className="mt-12 grid max-w-[34rem] grid-cols-3 border-y border-line">
                {PLANS.map((plan, i) => (
                  <div key={plan.key} className={cn("py-4", i > 0 && "border-l border-line pl-3 sm:pl-5")}>
                    <dt className="text-small text-muted">{plan.name}</dt>
                    <dd className="mt-1 text-[1rem] font-semibold whitespace-nowrap tnum sm:text-[1.25rem]">
                      ${plan.monthlyUsd} <span className="font-medium text-muted">+</span> {feeLabel(plan)}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-small text-muted">Monthly price + transaction fee on subscription sales.</p>
            </div>

            {/* The customer's side: the store's own product page. */}
            <PickerMock
              store="coffee"
              className="lg:row-span-2"
              label={`${coffee.name}’s product page with Subora’s Picker: one time, or Subscribe and save ${coffee.product.save}% every 4 weeks.`}
            />

            {/* The merchant's side: what that page leads to, in Subora's Activity. */}
            <div
              role="img"
              aria-label="Subora’s Activity this morning: a renewal charged, a delivery skipped, a failed payment recovered after one retry, and a retention offer accepted."
              className="max-w-[34rem] rounded-2xl bg-slate p-4 text-paper shadow-[0_24px_48px_-24px_rgb(28_32_38/0.6)] sm:p-5"
            >
              <p className="flex items-center gap-2 text-small font-semibold text-white/70">
                <Mark tone="white" className="size-5" />
                Activity, this morning
              </p>
              <ul className="mt-2 divide-y divide-white/10 text-small">
                {ACTIVITY.map((a) => (
                  <li key={a.what} className="flex items-baseline justify-between gap-3 py-2">
                    <span className="min-w-0">
                      <span className={cn("font-semibold", a.win && "text-amber")}>{a.what}</span>
                      <span className="block truncate text-white/60">{a.who}</span>
                    </span>
                    {a.amount ? (
                      <Money amount={a.amount} className={cn("font-semibold", a.win && "text-amber")} />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* No gates */}
      <Band tone="paper">
        <SectionHeading
          title="The only difference between plans is the bill."
          continuation="Not features, and not how many subscribers you’re allowed."
        />
        <div className="mt-14 grid grid-cols-1 border-t border-line md:grid-cols-3">
          {NO_GATES.map((g, i) => (
            <div
              key={g.title}
              className={cn("py-8 md:pr-8", i > 0 && "border-t border-line md:border-t-0 md:border-l md:pl-8")}
            >
              <h3 className="text-d3 font-semibold tracking-[-0.02em]">{g.title}</h3>
              <p className="mt-3 text-muted">{g.body}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Four kinds of subscription plan */}
      <Band tone="frost">
        <SectionHeading
          title="Four ways to sell a subscription."
          intro="Build each subscription plan from the products you already sell, then show it on their product pages."
        />
        <div className="mt-14 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {PLAN_KINDS.map((k) => (
            <div key={k.name} className="border-t-2 border-slate py-6">
              <h3 className="text-d3 font-semibold tracking-[-0.02em]">{k.name}</h3>
              <p className="mt-3 inline-block rounded-md bg-paper px-2.5 py-1 text-small font-semibold ring-1 ring-line">
                {k.example}
              </p>
              <p className="mt-4 text-muted">{k.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-muted">
          Any plan can add free shipping on every order, the first, or the first few, and a second price from a later
          order, such as 10% off the first 2 orders, then 15%.{" "}
          <Link href="/features/subscription-plans/" className="link text-slate">
            More on subscription plans
          </Link>
        </p>
      </Band>

      {/* The Loop */}
      <Band tone="slate" id="how-it-works" aria-labelledby="loop-title" className="pb-8 sm:pb-12">
        <SectionHeading
          id="loop-title"
          title="One subscription, cycle after cycle."
          continuation="What Subora does between one delivery and the next."
          intro={`Follow one bag of ${coffee.product.title} from ${coffee.name} through a month. The left ring is your shop, the right is your customer, and they meet again at every renewal.`}
        />
        <TheLoop />
      </Band>

      <FeatureSplit
        tone="paper"
        title="Subscription options on the product page you already have."
        intro="The Picker sits next to your Add to cart button, in your theme’s fonts. It says the charge recurs and links to your subscription policy, so customers know what they are signing up to."
        points={[
          "Collection badges show “Save 15%” or “Free trial” before anyone opens the product.",
          "On Dawn and Horizon themes, the Cart offer turns a one-time item in the cart into a subscription.",
          "The Picker speaks English, German, Spanish, French, Italian, Japanese, Dutch and Brazilian Portuguese.",
        ]}
        href="/features/storefront/"
        linkLabel="More on the storefront"
        mock={
          <div className="grid gap-5">
            <CollectionMock label="A collection page with Subora’s badges: Save 15% on two coffees, and Free trial on the third." />
            <CartOfferMock
              className="sm:ml-auto sm:w-[85%]"
              label="A cart with Subora’s Cart offer: Subscribe and save 15% on a one-time item."
            />
          </div>
        }
      />

      <FeatureSplit
        tone="frost"
        flip
        title="Customers change their own subscriptions,"
        continuation="inside your store’s account."
        intro="The Customer portal is a page in your store’s customer account, in your look. Customers sort things out themselves instead of writing to you."
        points={[
          "Skip a delivery, or get the next one sooner.",
          "Pause and resume, change quantity, frequency or size, and swap to another product from your Swap list.",
          "Update the shipping address. Cards are updated through Shopify’s own secure flow.",
          "Turn off any action you don’t want to offer, except Cancel.",
        ]}
        href="/features/customer-portal/"
        linkLabel="More on the Customer portal"
        mock={
          <PortalMock
            store="pet"
            label="Fernlee’s customer account, showing a subscription’s next delivery with buttons to skip, get it sooner, pause or swap."
          />
        }
      />

      <FeatureSplit
        tone="paper"
        title="A reason, then an offer that fits it."
        continuation="Before anyone cancels."
        intro="Customers who start to cancel are asked why. Each reason comes with a Retention offer that answers it: too much product gets “less often”, too expensive gets a discount, if you switch it on."
        points={[
          "Offers: a discount on the next orders, skip the next delivery, change frequency, pause for 30 or 60 days, or swap.",
          "Switch each offer on or off. Subora matches offers to reasons for you.",
          "See attempts, saved subscribers, Save rate and Revenue retained, by reason.",
        ]}
        href="/features/retention/"
        linkLabel="More on retention"
        mock={
          <div className="grid gap-5">
            <CancelFlowMock
              store="skincare"
              label="Mira Skin’s cancellation flow: the reason Too much product, then the offers skip the next delivery, get it less often, or pause for 30 days."
            />
            <RetentionTableMock
              className="sm:ml-auto sm:w-[88%]"
              label="Subora’s retention table: attempts, saved and Save rate for each cancellation reason, and Revenue retained."
            />
          </div>
        }
      />

      <FeatureSplit
        tone="frost"
        flip
        title="When a card fails, Subora keeps trying,"
        continuation="and tells the customer how to fix it."
        intro="You set the Retry rules once: how many retries, the gap before each, how long to keep going, and what happens if they all fail."
        points={[
          "Emails in your store’s name when a payment fails, before the last try, and when it goes through.",
          "A new card is tried straight away. A “Retry now” button is there when you want it.",
          "A sold-out product is treated as a store problem, not as the customer’s card failing.",
        ]}
        href="/features/failed-payments/"
        linkLabel="More on failed payments"
        mock={
          <div className="grid gap-5">
            <RetryLadderMock label="A failed payment for Fernlee, retried after 1 day and recovered after the customer added a new card." />
            <EmailMock
              store="pet"
              kind="payment-failed"
              className="sm:ml-auto sm:w-[85%]"
              label="Fernlee’s email: Your payment did not go through, with a button to update the card."
            />
          </div>
        }
      />

      {/* Analytics */}
      <Band tone="slate">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading
              title="Know what keeps subscribers."
              continuation="And what you won back."
              intro="Active subscribers, MRR, subscription revenue, churn, failed and recovered payments, and lifetime value, from the first renewal."
            />
            <ul className="mt-8 space-y-3 border-l-2 border-white/15 pl-5 text-white/85">
              <li>Subscribers, Revenue, Churn, Retention and Failed payments, each with a CSV export.</li>
              <li>An Activity log of who changed what: the customer, you, Subora or Shopify.</li>
            </ul>
            <Link href="/features/analytics/" className="link mt-8 inline-block">
              More on analytics
            </Link>
          </div>
          <AnalyticsMock
            tone="dark"
            label="Subora’s analytics for Mira Skin: MRR, active subscribers, churn rate and recovered revenue, with an MRR chart."
          />
        </div>
      </Band>

      {/* Pricing teaser */}
      <Band tone="frost" id="pricing" aria-labelledby="calc-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="calc-title"
              title="Which plan is cheapest for me?"
              intro="Slide to your monthly subscription revenue. Below about $3,270, Free costs least. Growth is cheapest up to $10,000, and Pro above that."
            />
            <p className="mt-8 text-muted">
              Every plan includes every Subora feature and unlimited subscriptions. No trials, because Free already has
              everything.
            </p>
            <CtaLink href="/pricing/" variant="secondary" className="mt-8">
              See pricing
            </CtaLink>
          </div>
          <PlanCalculator />
        </div>
      </Band>

      {/* Setup */}
      <Band tone="paper" aria-labelledby="setup-title">
        <SectionHeading
          id="setup-title"
          title="Selling subscriptions in five steps."
          continuation="No code."
          intro="Subora’s Setup guide walks you through creating a plan, placing the Picker and adding the Subscriptions page, and ticks each off when it’s done. The test order is yours to check. Customer emails and Retry rules are on by default."
        />
        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {SETUP.map((s, i) => (
            <li key={s.title} className="border-t border-line pt-6">
              <span aria-hidden="true" className="text-d3 font-semibold text-muted tnum">
                {i + 1}
              </span>
              <h3 className="mt-3 text-[1.125rem] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/setup/" className="link mt-10 inline-block">
          The setup steps in detail
        </Link>
      </Band>

      {/* Switching, and what's next */}
      <Band tone="frost">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-d3 font-semibold tracking-[-0.02em]">Moving from another subscription app?</h2>
            <p className="mt-4 text-muted measure">
              Moving is not automatic yet, so our team does it with you. We’ll set up matching subscription plans and
              work out the best way to bring your subscribers across, before you switch anything off.
            </p>
            <p className="mt-5">
              <a href={`mailto:${siteConfig.supportEmail}?subject=Moving%20to%20Subora`} className="link">
                Write to {siteConfig.supportEmail}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-d3 font-semibold tracking-[-0.02em]">Coming soon</h2>
            <p className="mt-4 text-muted measure">On our roadmap, and not in Subora today:</p>
            <ul className="mt-4 space-y-2">
              {COMING.map((c) => (
                <li key={c} className="flex items-center gap-3">
                  <span aria-hidden="true" className="size-2 rounded-full ring-2 ring-muted" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      {/* FAQ */}
      <Band tone="paper" aria-labelledby="faq-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <SectionHeading id="faq-title" title="Questions merchants ask first." />
            <Link href="/faq/" className="link mt-6 inline-block">
              All questions
            </Link>
          </div>
          <FaqList items={homeFaq} />
        </div>
      </Band>

      <ClosingCta />
    </>
  );
}
