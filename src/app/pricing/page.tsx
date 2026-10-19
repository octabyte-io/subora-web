import Link from "next/link";
import { Band, Container, CtaLink, InstallLink, Money, SectionHeading } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { PlanCalculator } from "@/components/sections/plan-calculator";
import { PricingChart } from "@/components/sections/pricing-chart";
import { Explainer } from "@/components/sections/setting-list";
import { FaqSection } from "@/components/sections/faq-section";
import { ClosingCta } from "@/components/sections/closing-cta";
import { UpgradePromptMock } from "@/components/mocks/pricing-upgrade-prompt";
import { pages } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { faqGroup } from "@/content/faq";
import { BREAK_EVEN, PLANS, TYPICAL_APP, USD_SENTENCE, cheapestPlan, feeLabel, planCost } from "@/content/plans";
import { cn } from "@/lib/utils";
import { JsonLd, ids, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.pricing);

/** Where each plan is the cheapest, in monthly subscription revenue. */
const CHEAPEST_WHEN = {
  free: "below about $3,270",
  growth: "from about $3,270 to $10,000",
  pro: "above $10,000",
} as const;

/** The average order the typical app's 19¢ per order is worked out on. */
const AVERAGE_ORDER = 40;
const COMPARE_AT = [2_000, 5_000, 20_000];

function typicalCost(revenue: number) {
  const orders = revenue / AVERAGE_ORDER;
  const percent = TYPICAL_APP.feeRate * revenue;
  const perOrder = TYPICAL_APP.perOrderUsd * orders;
  return { orders, percent, perOrder, total: TYPICAL_APP.monthlyUsd + percent + perOrder };
}

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });

type Included = { title: string; href?: string; items: string[] };

/** Everything in Release 1, grouped the way the feature pages are. The same on every plan. */
const INCLUDED: Included[] = [
  {
    title: "Subscription plans",
    href: "/features/subscription-plans/",
    items: [
      "Subscribe & Save, Prepaid, Trial and Fixed-length plans",
      "Several delivery frequencies on one plan",
      "A percentage off, an amount off or a fixed price",
      "A second price from a later order",
      "Free shipping on every order, the first, or the first few",
      "Trials counted in orders, not days",
      "Subscription-only products",
      "A minimum number of orders before a customer can cancel",
    ],
  },
  {
    title: "Storefront",
    href: "/features/storefront/",
    items: [
      "The Picker on your product page, with no code",
      "The Picker in English, German, Spanish, French, Italian, Japanese, Dutch and Brazilian Portuguese",
      "Collection badges such as “Save 15%”",
      "The Cart offer, to turn a one-time item into a subscription (Dawn and Horizon themes)",
    ],
  },
  {
    title: "Customer portal",
    href: "/features/customer-portal/",
    items: [
      "A Subscriptions page in your store’s customer account",
      "Skip a delivery, or get the next one sooner",
      "Pause and resume",
      "Change quantity, frequency or variant",
      "Swap to another product from your Swap list",
      "Update the shipping address; cards are updated through Shopify",
      "Turn off any action except Cancel",
    ],
  },
  {
    title: "Retention",
    href: "/features/retention/",
    items: [
      "Cancellation reasons, each with a Retention offer that fits it",
      "Offers: a discount, skip, change frequency, pause for 30 or 60 days, or swap",
      "Attempts, saved subscribers, Save rate and Revenue retained, by reason",
    ],
  },
  {
    title: "Failed payments",
    href: "/features/failed-payments/",
    items: [
      "Retry rules: how many retries, the gap before each, and for how long",
      "What happens when retries run out: pause, cancel, skip or wait for a new card",
      "Emails when a payment fails, before the last try and when it’s recovered",
      "An instant retry on a new card, and a Retry now button",
      "Failed, recovered and recovery rate",
    ],
  },
  {
    title: "Analytics and managing subscriptions",
    href: "/features/analytics/",
    items: [
      "MRR, active subscribers, subscription revenue, churn and lifetime value",
      "Subscribers, Revenue, Churn, Retention and Failed payments, each with a CSV export",
      "Search, filter and export your subscriptions",
      "Change any subscription for a customer",
      "Bulk actions: pause, resume, cancel, skip and reschedule",
      "An Activity log of who changed what",
    ],
  },
  {
    title: "Customer emails",
    items: [
      "An email for each change to a subscription, in your store’s name",
      "Your logo and brand color",
      "Switch off any email except the one confirming a new subscription",
    ],
  },
  {
    title: "Setup and billing",
    href: "/setup/",
    items: [
      "A Setup guide that ticks off each setup step as it’s done",
      "A Billing page with a statement for each 30-day bill, and a CSV export",
      "The Upgrade prompt, when another Subora plan would cost less",
    ],
  },
];

const COMING = "Build-a-Box and bundles, Klaviyo and Shopify Flow, and importing subscriptions from other apps";

/** Subora as a product with its three plans as offers, for search engines. */
const appJsonLd = {
  "@type": "SoftwareApplication",
  "@id": ids.app,
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Shopify",
  description: siteConfig.description,
  publisher: { "@id": ids.organization },
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: `${siteConfig.name} ${plan.name}`,
    description: `$${plan.monthlyUsd} per 30 days plus a ${feeLabel(plan)} transaction fee on subscription sales. Every feature and unlimited subscriptions.`,
    price: plan.monthlyUsd,
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: plan.monthlyUsd,
      priceCurrency: "USD",
      billingDuration: 30,
      unitCode: "DAY",
    },
    url: new URL(pages.pricing.path, siteConfig.url).toString(),
  })),
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd(pages.pricing), appJsonLd]} />

      <PageHero
        title="Three ways to pay for the same Subora."
        continuation="Every feature and unlimited subscriptions on each."
        intro={
          <p>
            Free, Growth and Pro differ only in how you pay: a monthly fee, a transaction fee, or both. There are no
            trials, because Free already has everything, and no subscription limits on any plan.
          </p>
        }
        className="pb-14 sm:pb-16"
      >
        <InstallLink />
        <CtaLink href="#calculator" variant="secondary">
          Which plan is cheapest?
        </CtaLink>
      </PageHero>

      {/* The three plans, read across like a ledger. */}
      <section aria-labelledby="plans-title" className="pb-20 sm:pb-28">
        <Container>
          <h2 id="plans-title" className="sr-only">
            Subora plans
          </h2>
          <ul className="grid grid-cols-1 border-t-2 border-slate md:grid-cols-3">
            {PLANS.map((plan, i) => (
              <li
                key={plan.key}
                className={cn(
                  "flex flex-col py-8 md:pr-8",
                  i > 0 && "border-t border-line md:border-t-0 md:border-l md:pl-8",
                )}
              >
                <h3 className="text-d3 font-semibold tracking-[-0.02em]">{plan.name}</h3>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-3 md:max-lg:flex-col md:max-lg:items-start">
                  <span className="text-d1 font-semibold tracking-[-0.04em] tnum">${plan.monthlyUsd}</span>
                  <span className="text-muted">every 30 days</span>
                </p>
                {/* Stacked from md, so one column wrapping never knocks the three out of line. */}
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3 md:flex-col md:items-start">
                  <span className="text-d2 font-semibold tracking-[-0.03em] tnum">+ {feeLabel(plan)}</span>
                  <span className="text-muted">of subscription sales</span>
                </p>
                <p className="mt-6 text-lead">{plan.pitch}</p>
                <div className="mt-auto pt-8">
                  <p className="border-t border-line pt-4 text-small text-muted">
                    Cheapest when your subscription revenue is{" "}
                    <span className="font-semibold text-slate">{CHEAPEST_WHEN[plan.key]}</span> a month.
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 items-baseline gap-x-12 gap-y-3 border-y border-line py-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <p className="text-d3 font-semibold tracking-[-0.02em]">
              Every plan includes every Subora feature and unlimited subscriptions.
            </p>
            <p className="text-muted">
              No feature is held back for a higher plan, and no plan caps subscribers or revenue.{" "}
              <Link href="#included" className="link text-slate">
                See what’s included
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* Calculator and chart */}
      <Band tone="paper" id="calculator" aria-labelledby="calc-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <SectionHeading
            id="calc-title"
            title="Which plan is cheapest for me?"
            intro="Slide to your monthly subscription revenue to see what each plan would cost for 30 days. It’s an estimate: the fee counts the subscription lines of each order, not your whole store’s sales."
          />
          <PlanCalculator />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-line pt-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <h3 className="text-d3 font-semibold tracking-[-0.02em]">Where the lines cross.</h3>
            <p className="mt-4 text-muted measure">
              Free costs nothing until you sell, then 2% of every subscription sale. Growth’s $49 pays for itself once
              2% would cost more than $49 + 0.5%, at about {usd(Math.round(BREAK_EVEN.growth / 10) * 10)} a month. Pro’s
              extra $50 pays for itself at {usd(BREAK_EVEN.pro)}, where 0.5% comes to $50.
            </p>
            <p className="mt-4 text-muted measure">
              Above {usd(BREAK_EVEN.pro)}, Pro stays at $99 however much you sell.
            </p>
          </div>
          <PricingChart />
        </div>
      </Band>

      {/* Against a typical app */}
      <Band tone="frost" aria-labelledby="typical-title">
        <SectionHeading
          id="typical-title"
          title="Against a typical subscription app."
          continuation="Many charge $99 a month, 1% and 19¢ an order."
          intro={`The 1% is on subscription sales and the 19¢ on every order. To count orders, we assume an average order of $${AVERAGE_ORDER}. Subora has no per-order charge on any plan.`}
        />
        {/* Phones: one card per revenue, so "You keep" is never scrolled off to the side. */}
        <ul className="mt-10 space-y-4 sm:hidden">
          {COMPARE_AT.map((revenue) => {
            const typical = typicalCost(revenue);
            const plan = cheapestPlan(revenue);
            const ours = planCost(plan, revenue);
            return (
              <li key={revenue} className="rounded-2xl bg-paper p-5 ring-1 ring-line">
                <p>
                  <span className="block text-d3 font-semibold tracking-[-0.02em] tnum">{usd(revenue)} a month</span>
                  <span className="mt-1 block text-small text-muted tnum">
                    {typical.orders} orders at ${AVERAGE_ORDER}
                  </span>
                </p>
                <dl className="mt-4 divide-y divide-line border-t border-line text-small">
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt>
                      <span className="font-semibold">Typical app</span>
                      <span className="block text-muted tnum">
                        $99 + {usd(typical.percent)} + {usd(typical.perOrder)}
                      </span>
                    </dt>
                    <dd>
                      <Money amount={typical.total} className="text-[1.125rem] font-semibold" />
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt>
                      <span className="font-semibold">Subora, cheapest plan</span>
                      <span className="block text-muted tnum">
                        {plan.name}, ${plan.monthlyUsd} + {feeLabel(plan)}
                      </span>
                    </dt>
                    <dd>
                      <Money amount={ours} className="text-[1.125rem] font-semibold" />
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-3">
                    <dt className="font-semibold">You keep, a month</dt>
                    <dd className="rounded-md bg-amber px-2.5 py-1 text-[1.125rem] font-semibold text-slate">
                      <Money amount={typical.total - ours} />
                    </dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>
        <div
          className="mt-12 relative hidden overflow-x-auto sm:block"
          role="region"
          aria-labelledby="typical-title"
          tabIndex={0}
        >
          <table className="w-full min-w-[38rem] border-collapse text-left tnum">
            <caption className="sr-only">
              Monthly cost of a typical subscription app at {TYPICAL_APP.label} compared with Subora’s cheapest plan,
              assuming a ${AVERAGE_ORDER} average order
            </caption>
            <thead>
              <tr className="border-b-2 border-slate text-small">
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Subscription revenue a month
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Typical app, {TYPICAL_APP.label}
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Subora, cheapest plan
                </th>
                <th scope="col" className="py-3 font-semibold">
                  You keep
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_AT.map((revenue) => {
                const typical = typicalCost(revenue);
                const plan = cheapestPlan(revenue);
                const ours = planCost(plan, revenue);
                return (
                  <tr key={revenue} className="border-b border-line align-top">
                    <th scope="row" className="py-5 pr-4">
                      <span className="text-d3 font-semibold tracking-[-0.02em]">{usd(revenue)}</span>
                      <span className="mt-1 block text-small font-normal text-muted">
                        {typical.orders} orders at ${AVERAGE_ORDER}
                      </span>
                    </th>
                    <td className="py-5 pr-4">
                      <Money amount={typical.total} className="text-[1.25rem] font-semibold" />
                      <span className="mt-1 block text-small text-muted">
                        $99 + {usd(typical.percent)} + {usd(typical.perOrder)}
                      </span>
                    </td>
                    <td className="py-5 pr-4">
                      <Money amount={ours} className="text-[1.25rem] font-semibold" />
                      <span className="mt-1 block text-small text-muted">
                        {plan.name}, ${plan.monthlyUsd} + {feeLabel(plan)}
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="inline-block rounded-md bg-amber px-2.5 py-1 text-[1.25rem] font-semibold text-slate">
                        <Money amount={typical.total - ours} />
                      </span>
                      <span className="mt-1 block text-small text-muted">a month</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-small text-muted">
          A general pattern, not any one app’s price list. Apps change their prices, so check the one you use. Larger
          orders mean fewer orders for the same revenue, and a smaller per-order charge.
        </p>
      </Band>

      {/* The fine print */}
      <Band tone="paper" aria-labelledby="terms-title">
        <SectionHeading
          id="terms-title"
          title="What the fee counts,"
          continuation="and how you’re billed."
          intro="The same terms on every plan. Pro’s fee is 0%, so on Pro only the monthly price applies."
        />
        <div className="mt-14 space-y-12">
          <Explainer title="What counts">
            <p>
              The subscription lines of each paid order, at checkout and on every renewal. They are counted after
              discounts, and without tax, shipping or tips. One-time products in the same order are not counted.
            </p>
          </Explainer>
          <Explainer title="Refunds and chargebacks">
            <p>
              When a customer’s money goes back to them, by a refund or a chargeback, the fee on it is credited back to
              you.
            </p>
          </Explainer>
          <Explainer title="Who pays">
            <p>
              You do. The fee is charged to you through your Shopify bill, never to your customers.
            </p>
          </Explainer>
          <Explainer title="How you’re billed">
            <p>
              Through Shopify, every 30 days, in USD: the monthly price and the transaction fees on one bill. Subora’s
              Billing page shows a statement for each 30-day bill, with a CSV export.
            </p>
            <p>{USD_SENTENCE}</p>
          </Explainer>
          <Explainer title="Changing your Subora plan">
            <p>
              On Shopify’s own plan page for Subora, up or down, at any time. The change takes effect as soon as you
              approve it. A store that hasn’t approved a plan counts as Free.
            </p>
          </Explainer>
        </div>

        <div className="mt-20 grid grid-cols-1 items-center gap-12 border-t border-line pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h3 className="text-d3 font-semibold tracking-[-0.02em]">
              No cap on the fee.{" "}
              <span className="text-muted">Subora tells you when another plan would cost less.</span>
            </h3>
            <div className="mt-5 space-y-4 text-muted measure">
              <p>
                The Upgrade prompt compares what your last 30 days of sales cost on your plan with what they would have
                cost on the others. When one would save you $10 a month or more, it says so on Subora’s Home and
                Billing pages, with the figures.
              </p>
              <p>
                It points down as readily as up: a Pro store whose sales fell is told when Free or Growth would cost
                less. In your first 30 days it starts after day 14, scaling what it has seen to 30 days. It is always
                an estimate, because future months may differ.
              </p>
            </div>
          </div>
          <UpgradePromptMock label="Subora’s Home page for Ember Hill Roasters, on Free: Growth would cost you about $26 less each month. On Free, the last 30 days cost about $100 in transaction fees; on Growth they would have cost about $74, $49 monthly plus $25 in fees." />
        </div>
      </Band>

      {/* What's included */}
      <Band tone="frost" id="included" aria-labelledby="included-title">
        <SectionHeading
          id="included-title"
          title="What’s included."
          continuation="On Free, Growth and Pro alike."
          intro="Everything Subora does today. Underlined headings link to more detail."
        />
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map((group) => (
            <div key={group.title} className="border-t-2 border-slate pt-5">
              <h3 className="text-[1.125rem] font-semibold tracking-[-0.01em]">
                {group.href ? (
                  <Link
                    href={group.href}
                    className="underline decoration-amber decoration-2 underline-offset-4 hover:decoration-current"
                  >
                    {group.title}
                  </Link>
                ) : (
                  group.title
                )}
              </h3>
              <ul className="mt-4 space-y-2.5 text-small text-muted">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-slate/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-4 border-t border-line pt-8 md:grid-cols-2">
          <p className="text-muted">
            <span className="font-semibold text-slate">Coming soon:</span> {COMING}. On our roadmap, and not in Subora
            today.
          </p>
          <p className="text-muted">
            <span className="font-semibold text-slate">Moving from another subscription app?</span> Our team does it
            with you, by hand.{" "}
            <a href={`mailto:${siteConfig.supportEmail}?subject=Moving%20to%20Subora`} className="link text-slate">
              Write to {siteConfig.supportEmail}
            </a>
          </p>
        </div>
      </Band>

      <FaqSection items={faqGroup("pricing").items} title="Questions about pricing." />

      <ClosingCta secondary={{ href: "/setup/", label: "See the setup steps" }} />
    </>
  );
}
