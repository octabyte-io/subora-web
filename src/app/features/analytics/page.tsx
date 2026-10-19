import { Band, CtaLink, InstallLink, SectionHeading } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { RelatedFeatures } from "@/components/sections/related-features";
import { UseCaseLinks } from "@/components/use-cases/use-case-links";
import { SettingList, type Setting } from "@/components/sections/setting-list";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureSplit } from "@/components/sections/feature-split";
import { PortalMock } from "@/components/mocks/portal";
import {
  ActivityLogMock,
  ChurnTabMock,
  HomeDashboardMock,
  SubscriptionListMock,
} from "@/components/mocks/features-3-analytics";
import { pages } from "@/config/pages";
import { faqGroup } from "@/content/faq";
import { cn } from "@/lib/utils";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.analytics);

/** The Analytics tabs and their figures, as `subora/app/routes/app.analytics.*` label them. */
const TABS = [
  {
    name: "Subscribers",
    figures: "Active subscribers, new and canceled subscribers, and subscriber growth.",
    csv: true,
  },
  {
    name: "Revenue",
    figures:
      "MRR and its growth, subscription revenue and its growth, average order value, average subscription value and projected recurring revenue, split by product, plan and frequency.",
    csv: true,
  },
  {
    name: "Churn",
    figures:
      "Churn rate, voluntary and involuntary churn, completed subscriptions, average subscription lifetime and customer lifetime value.",
    csv: true,
  },
  {
    name: "Retention",
    figures: "Cancel attempts, saved, Save rate and Revenue retained, by cancellation reason and by offer.",
    csv: true,
  },
  {
    name: "Failed payments",
    figures:
      "Failed payments, retries, recovered, recovery rate, recovered revenue and unrecoverable revenue.",
    csv: true,
  },
  {
    name: "Activity",
    figures: "Every change to every subscription, and who made it.",
    csv: false,
  },
];

/** Definitions, shortened from `subora/CONTEXT.md` and `domain/analytics/figure-definitions.ts`. */
const DEFINITIONS: Setting[] = [
  {
    name: "MRR",
    detail:
      "What your active subscriptions that aren’t paused bring in each month at today’s prices, before discounts, tax and shipping. A $60 prepaid plan every 6 months adds $10.",
    value: "Kept day by day, so past MRR never changes when your prices do.",
  },
  {
    name: "Subscription revenue",
    detail:
      "What customers actually paid for subscription lines, after discounts, without tax, shipping or one-time items. A retry that goes through on the 6th counts on the 6th.",
  },
  {
    name: "Projected recurring revenue",
    detail:
      "The charges your subscriptions are scheduled to make in the next 30 days, each at the price it will have. A schedule you can check, not a forecast.",
  },
  {
    name: "Churn rate",
    detail:
      "Subscriptions canceled or ended on a failed payment, divided by those active at the start of the period or new in it. Canceled is voluntary churn, a failed payment involuntary.",
    value: "A subscription that ran to its planned end is Completed, not churn.",
  },
  {
    name: "Lifetime value",
    detail:
      "All the subscription revenue your store has been paid, divided by the customers who paid it. All time, never a prediction.",
  },
];

/** The seven kinds of trouble (`domain/subscription/labels.ts` TROUBLE_LABELS, CONTEXT "Trouble"). */
const PAYMENT_TROUBLE: Setting[] = [
  {
    name: "Payment failed",
    detail: "Shopify declined the charge and your Retry rules are running. The customer must update their card.",
  },
  {
    name: "Could not be ordered",
    detail: "A store problem, such as a sold-out product. Restock, then press Retry now.",
  },
  {
    name: "Payment not confirmed",
    detail:
      "Shopify hasn’t answered a charge within 24 hours, usually because the customer’s bank asked them to confirm it.",
  },
  {
    name: "Price not updated",
    detail:
      "The subscription’s next price isn’t on it in Shopify yet, so Subora holds the charge rather than take the old price. It keeps trying by itself.",
  },
  {
    name: "Not resumed",
    detail: "A pause ended a day ago and Shopify hasn’t resumed the subscription. Subora keeps asking, or you resume it.",
  },
];

const EMAIL_TROUBLE: Setting[] = [
  {
    name: "Cannot be reached",
    detail:
      "Email to the customer is being refused. If the address is wrong, correcting it in Shopify starts emails again by itself.",
  },
  {
    name: "Asked for no email",
    detail: "The customer reported a Subora email as spam, so Subora won’t email them again. Reach them another way.",
  },
];

export default function AnalyticsPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.analytics)} />

      <PageHero
        title="Know what keeps subscribers,"
        continuation="and what you won back."
        intro={
          <p>
            Subora opens on your numbers: active subscriptions, MRR, recovered revenue and churn rate, each against the
            period before. Six tabs go deeper, and every list exports to CSV.
          </p>
        }
        aside={
          <HomeDashboardMock label="Subora’s Home for Mira Skin, last 30 days: 531 active subscriptions, MRR $14,860, recovered revenue $1,238.40 and a 3% churn rate, with a subscription revenue chart." />
        }
      >
        <InstallLink />
        <CtaLink href="/pricing/" variant="secondary">
          See pricing
        </CtaLink>
      </PageHero>

      {/* The tabs. */}
      <Band tone="paper" aria-labelledby="tabs-title">
        <SectionHeading
          id="tabs-title"
          title="Six tabs, one date range."
          intro="Pick the last 7, 30, 90 or 365 days, or your own dates. Growth figures compare with the period before, and Subscribers, Revenue and Churn filter by product and subscription plan."
        />
        <dl className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {TABS.map((tab, i) => (
            <div
              key={tab.name}
              className={cn(
                "border-b border-line py-7 sm:pr-8",
                i % 2 === 1 && "sm:border-l sm:pl-8",
                "lg:border-l-0 lg:pl-0",
                i % 3 !== 0 && "lg:border-l lg:pl-8",
              )}
            >
              <dt className="text-d3 font-semibold tracking-[-0.02em]">{tab.name}</dt>
              <dd className="mt-3 text-muted">{tab.figures}</dd>
              {tab.csv ? <dd className="mt-3 text-small font-semibold">Export CSV</dd> : null}
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-3xl text-small text-muted">
          On the roadmap, and not in Subora today: cohort retention and revenue forecasting.
        </p>
      </Band>

      {/* Definitions, on the page's one dark band. */}
      <Band tone="slate" aria-labelledby="defs-title">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="defs-title"
              title="Numbers that mean one thing."
              continuation="Everywhere they appear."
              intro="Subora explains each of these on the figure itself, and counts it the same way on Home and in every tab."
            />
            <SettingList settings={DEFINITIONS} className="mt-10" />
          </div>
          <ChurnTabMock
            className="shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] ring-white/10 lg:sticky lg:top-28"
            label="Mira Skin’s Churn tab: a 3% churn rate, 16 of 524 ended, 12 voluntary, 4 involuntary, 5 completed, an average lifetime of 214 days and a customer lifetime value of $187.20."
          />
        </div>
      </Band>

      {/* The merchant's list. */}
      <FeatureSplit
        tone="frost"
        title="Every subscription, in one list."
        intro="Search by customer, email, product or subscription ID. Filter by status, subscription plan, product and next billing date, then export what you see as a CSV."
        points={[
          "Saved views for All, Active, Paused, Canceled and Needs attention.",
          "Open any subscription to change it for the customer, with the same actions they have in the Customer portal.",
        ]}
        mock={
          <SubscriptionListMock label="Mira Skin’s subscription list in Subora: a search box, filters, five subscriptions with three selected, and bulk actions Pause, Resume, Cancel, Skip and Change date." />
        }
      >
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="text-d3 font-semibold tracking-[-0.02em]">Bulk actions</h3>
          <p className="mt-3 text-muted">
            Select subscriptions, then Pause, Resume, Cancel, Skip or Change date for all of them at once. Change date
            brings deliveries earlier. Product and quantity changes stay one subscription at a time, because Shopify
            recalculates each one.
          </p>
          <p className="mt-3 text-muted">One bulk action runs at a time, and “See what happened” opens its Activity.</p>
        </div>
      </FeatureSplit>

      {/* Needs attention. */}
      <Band tone="paper" id="needs-attention" aria-labelledby="attention-title">
        <SectionHeading
          id="attention-title"
          title="Needs attention."
          continuation="Before a customer notices."
          intro="A subscription lands in the Needs attention view when Subora has stopped charging it, or can no longer email the customer. Its badge says why, and goes away by itself once it’s fixed."
        />
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <h3 className="text-d3 font-semibold tracking-[-0.02em]">Charging has stopped</h3>
            <SettingList settings={PAYMENT_TROUBLE} className="mt-6" />
          </div>
          <div>
            <h3 className="text-d3 font-semibold tracking-[-0.02em]">Emails have stopped</h3>
            <SettingList settings={EMAIL_TROUBLE} className="mt-6" />
            <p className="mt-6 text-muted">
              Kept apart on purpose: a broken address is yours to chase, a spam report is the customer’s choice.
            </p>
          </div>
        </div>
      </Band>

      {/* Activity: the customer's change, seen from both sides. */}
      <FeatureSplit
        tone="frost"
        flip
        title="Who changed what."
        continuation="The customer, you, Subora or Shopify."
        intro="Activity records every change to a subscription and who made it, newest first. Filter it by who, what, outcome and dates, or open one subscription to see its own."
        points={[
          "A skip in the Customer portal reads “The customer”. Staff are recorded by their Shopify staff number, never by name.",
          "A change that wasn’t made says why, such as Blocked by settings when your portal settings don’t offer it.",
        ]}
        mock={
          <div className="grid gap-5">
            <PortalMock
              store="skincare"
              className="sm:w-[85%]"
              label="Mira Skin’s Customer portal, where a customer can skip a delivery, get it sooner, pause or swap."
            />
            <ActivityLogMock
              className="sm:ml-auto sm:w-[92%]"
              label="Subora’s Activity for Mira Skin: a customer skipped a delivery, Subora resumed a subscription, a staff member paused one, Shopify canceled one, and a swap was blocked by settings."
            />
          </div>
        }
      />

      <FaqSection items={faqGroup("analytics").items} title="Questions about analytics." />

      <UseCaseLinks features={["analytics"]} tone="frost" />

      <RelatedFeatures current={pages.analytics.path} />

      <ClosingCta
        title="Your numbers from the first renewal."
        continuation="On every plan, with nothing to set up."
      />
    </>
  );
}
