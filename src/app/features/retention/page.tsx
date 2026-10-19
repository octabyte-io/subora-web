import { Band, CtaLink, InstallLink, SectionHeading } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { SettingList, type Setting } from "@/components/sections/setting-list";
import { FaqSection } from "@/components/sections/faq-section";
import { RelatedFeatures } from "@/components/sections/related-features";
import { UseCaseLinks } from "@/components/use-cases/use-case-links";
import { ClosingCta } from "@/components/sections/closing-cta";
import {
  CancelToDiscountMock,
  OFFERS_FOR_REASON,
  OFFER_LABELS,
  REASONS,
  RetentionByOfferMock,
} from "@/components/mocks/features-2-retention";
import { ReasonPickerDemo } from "@/components/mocks/features-2-reason-picker";
import { pages } from "@/config/pages";
import { faqGroup } from "@/content/faq";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.retention);

/** The six Retention offers: what accepting one does, and when Subora holds it back. */
const OFFERS = [
  {
    name: "Discount on the next orders",
    does: "A percentage off the customer’s next orders, added in one press. Shopify counts the orders and stops the discount after the last one, and a skipped delivery uses none.",
    withheld:
      "Once in 365 days per customer, and not while a payment is being retried, a charge is going through or a change is being saved.",
  },
  {
    name: "Skip next order",
    does: "Skips the next delivery. The card names its date and the date of the one after, and the subscription stays active.",
    withheld:
      "Not on a Prepaid subscription, not when you have turned off Skip, and not once the next delivery can no longer be changed.",
  },
  {
    name: "Change frequency",
    does: "“Get it less often.” The customer picks another frequency of their plan and sees the new price and the next date before anything changes.",
    withheld: "Not when the plan has one frequency, on a Prepaid subscription, or when you have turned off Change how often.",
  },
  {
    name: "Pause for 30 days, or for 60 days",
    does: "No deliveries and no charges until the day the card names. Then the subscription starts again by itself, and the payment is taken that day.",
    withheld: "Not on a Prepaid subscription, and not when you have turned off Pause.",
  },
  {
    name: "Swap",
    does: "Moves the subscription to another product on your Swap list that the plan sells. The customer sees the new price before anything changes.",
    withheld: "Not when your Swap list has nothing to swap to, or on a Prepaid subscription.",
  },
];

/** The Customer portal settings page's two cancel groups, with each default. */
const SETTINGS: Setting[] = [
  {
    name: "Ask why before a cancel",
    detail:
      "The portal first asks why, from a short list, and customers can skip the question. When it is off, customers see one dialog that asks them to confirm the cancel.",
    value: "On by default",
  },
  {
    name: "Reasons customers can pick",
    detail:
      "Turn off a reason that does not fit your products. Other is always shown, so every customer has a reason that fits, and takes their own words.",
    value: "All seven on by default",
  },
  {
    name: "Discount on the next orders",
    detail:
      "Offered to customers who say it is too expensive. It costs you money, so it stays off until you turn it on.",
    value: "Off by default",
  },
  {
    name: "Discount (%)",
    detail: "How much comes off each of those orders.",
    value: "Default: 10%. From 1 to 100.",
  },
  {
    name: "Number of orders",
    detail: "How many orders the discount lasts. Shopify counts them and stops the discount after the last one.",
    value: "Default: 1. From 1 to 12.",
  },
  {
    name: "Title on the order",
    detail:
      "Shopify shows it on the order and its email. Changing the discount later does not change one a customer already has.",
    value: "Default: “Thank you for staying”",
  },
  {
    name: "Skip next order, Change frequency, Pause for 30 days, Pause for 60 days, Swap",
    detail:
      "One switch each. An offer whose action you turned off for customers shows “Turned off for your store”, with a link to turn the action back on.",
    value: "On by default",
  },
];

/** What each number on the Retention page counts, in the app's own definitions. */
const NUMBERS = [
  {
    name: "Cancel attempts",
    body: "Each time a customer starts to cancel and gets past the reason step, by picking a reason or skipping the question. Going back to pick another reason is the same attempt; trying again another day is a new one.",
  },
  {
    name: "Canceled and Saved",
    body: "Every attempt ends one of three ways: Canceled, Offer accepted, or Kept, when the customer left without canceling. Offer accepted and Kept together are Saved.",
  },
  {
    name: "Save rate",
    body: "Cancel attempts where the customer kept the subscription, with an offer or without one, divided by all cancel attempts. Both count attempts, never customers.",
  },
  {
    name: "Shown, Accepted, Acceptance rate",
    body: "For each offer: how many attempts it was shown in, how many took it, and the share that did.",
  },
  {
    name: "Revenue retained",
    body: "What saved subscriptions paid on their renewals after the save, before tax and shipping. Each payment counts once, for its latest save, in the period it was paid.",
  },
];

export default function RetentionPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.retention)} />

      <PageHero
        title="A reason, then an offer that fits it."
        continuation="Before anyone cancels."
        intro={
          <p>
            When a customer starts to cancel in the Customer portal, Subora asks why, then shows a Retention offer that
            answers the reason. The Retention page shows you which offers keep subscribers.
          </p>
        }
        aside={
          <CancelToDiscountMock label="Mira Skin’s cancel steps: the reason Too expensive, the offer Get 15% off your next 2 orders, and the result: You got 15% off, your next order will cost $24.48, your subscription stays active." />
        }
      >
        <InstallLink />
        <CtaLink href="/features/customer-portal/" variant="secondary">
          See the Customer portal
        </CtaLink>
      </PageHero>

      {/* The table */}
      <Band tone="paper" aria-labelledby="table-title">
        <SectionHeading
          id="table-title"
          title="Seven reasons, and the offers that go with each."
          continuation="Subora pairs them for you."
          intro="The reasons are fixed, so your numbers read the same month after month. You turn off the reasons and offers that don’t fit your store. Offers appear in this order."
        />
        <div className="mt-12 relative overflow-x-auto">
          <table className="w-full min-w-[20rem] text-left">
            <caption className="sr-only">Cancellation reasons and the Retention offers shown for each</caption>
            <thead>
              <tr className="border-b-2 border-slate text-small">
                <th scope="col" className="py-3 pr-6 font-semibold">
                  Cancellation reason
                </th>
                <th scope="col" className="py-3 font-semibold">
                  Retention offers shown
                </th>
              </tr>
            </thead>
            <tbody>
              {REASONS.map((r) => {
                const offers = OFFERS_FOR_REASON[r.key];
                return (
                  <tr key={r.key} className="border-b border-line align-top">
                    <th scope="row" className="py-4 pr-6 font-semibold sm:w-[18rem]">
                      {r.label}
                    </th>
                    <td className="py-3.5">
                      {offers.length ? (
                        <ol className="flex flex-wrap gap-2">
                          {offers.map((o) => (
                            <li key={o} className="rounded-md bg-frost px-2.5 py-1 text-small font-semibold ring-1 ring-line">
                              {OFFER_LABELS[o]}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="py-0.5 text-muted">
                          No offer. The customer can add their own words, then goes to the cancel confirmation.
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-muted">
          A customer who skips the question goes straight to the confirmation, and the attempt is recorded as No reason
          given. On the roadmap: cancel steps you design yourself.
        </p>
      </Band>

      {/* The customer's view */}
      <Band tone="frost" aria-labelledby="try-title">
        <SectionHeading
          id="try-title"
          title="What your customer sees next."
          continuation="Pick a reason."
          intro="Every offer is a card in your store’s customer account, in your look. A customer who takes one keeps their subscription, and “No thanks, cancel” is always there."
        />
        <ReasonPickerDemo className="mt-12" />
      </Band>

      {/* The offers and when they are withheld */}
      <Band tone="paper" aria-labelledby="offers-title">
        <SectionHeading
          id="offers-title"
          title="An offer only when it can happen."
          continuation="Subora checks before it asks."
          intro="Subora shows an offer only when the customer could take the same action on their subscription page right now. When all of a reason’s offers are off or held back, the customer goes straight on to cancel."
        />
        <dl className="mt-12 divide-y divide-line border-y border-line">
          {OFFERS.map((o) => (
            <div
              key={o.name}
              className="grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,1fr)]"
            >
              <dt className="text-[1.125rem] font-semibold tracking-[-0.01em]">{o.name}</dt>
              <dd className="text-muted">{o.does}</dd>
              <dd className="text-muted">
                <span className="font-semibold text-slate">Held back: </span>
                {o.withheld}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-3xl text-muted">
          No offer is shown on a Fixed-length subscription that has paid its last order. A discount a customer accepted
          stays theirs: it carries through a swap or a frequency change, and changing your offer later doesn’t touch it.
        </p>
      </Band>

      {/* Settings */}
      <Band tone="frost" aria-labelledby="settings-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="settings-title"
              title="The settings,"
              continuation="as Subora names them."
              intro="Under Cancellation flow and Offers before a cancel, on Subora’s Customer portal settings page."
            />
          </div>
          <SettingList settings={SETTINGS} />
        </div>
      </Band>

      {/* The merchant's numbers */}
      <Band tone="slate" aria-labelledby="numbers-title">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="numbers-title"
              title="See what each offer keeps."
              continuation="In money, not guesses."
              intro="The Retention tab in Subora’s analytics counts your cancel attempts by reason and by offer, for any date range, with a CSV export."
            />
            <dl className="mt-10 space-y-6">
              {NUMBERS.map((n) => (
                <div key={n.name} className="border-l-2 border-white/15 pl-5">
                  <dt className="font-semibold">{n.name}</dt>
                  <dd className="mt-1 text-white/75">{n.body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-white/75">
              Each subscription’s page in Subora lists its own cancel attempts, newest first, with the reason, the offers
              and the outcome, so you can read why before you get in touch.
            </p>
          </div>
          <RetentionByOfferMock label="Subora’s Retention tab for Mira Skin, last 30 days: 112 cancel attempts, 61 canceled, 51 saved, Save rate 46%, Revenue retained $2,246.40, and a By offer table with shown, accepted, acceptance rate and revenue retained for each offer." />
        </div>
      </Band>

      <FaqSection items={faqGroup("retention").items} title="Questions about retention." tone="paper" />

      <UseCaseLinks features={["retention"]} tone="frost" />

      <RelatedFeatures current={pages.retention.path} />

      <ClosingCta title="Ask why before they go." continuation="Retention offers are on every plan." />
    </>
  );
}
