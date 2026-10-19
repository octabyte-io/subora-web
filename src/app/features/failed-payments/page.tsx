import Link from "next/link";
import { Band, CtaLink, InstallLink, SectionHeading } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { RelatedFeatures } from "@/components/sections/related-features";
import { UseCaseLinks } from "@/components/use-cases/use-case-links";
import { Explainer, SettingList, type Setting } from "@/components/sections/setting-list";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureSplit } from "@/components/sections/feature-split";
import { EmailMock } from "@/components/mocks/email";
import {
  LastTryEmailMock,
  NewCardNoteMock,
  PortalPaymentMock,
  RecoveryNumbersMock,
  StoreProblemMock,
  SubscriptionRunMock,
} from "@/components/mocks/features-3-payments";
import { RetryTimeline } from "@/components/mocks/features-3-retry-timeline";
import { pages } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { faqGroup } from "@/content/faq";
import { cn } from "@/lib/utils";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.failedPayments);

/** Settings > Payment retries, in the app's words (`app.payment-retries/fields.ts`, `retry-rules.ts`). */
const RETRY_RULES: Setting[] = [
  {
    name: "Number of retries",
    detail: "When a renewal payment fails, Subora tries to take it again. Each try is a retry.",
    value: "Default: 3. From 1 to 6.",
  },
  {
    name: "Days before each retry",
    detail: "Retry 1 counts from the failed payment, and each later retry from the one before it.",
    value: "Default: 1, 3 and 5 days. Each from 1 to 14.",
  },
  {
    name: "Maximum recovery period",
    detail:
      "How long Subora keeps trying, counted from when the payment failed. Every retry must fall inside it, and the days after the last retry give the customer time to update their card.",
    value: "Default: 14 days. At most 30.",
  },
  {
    name: "When the retries run out",
    detail: "Pause the subscription, cancel the subscription, skip the order, or wait for a new card.",
    value: "Default: Wait for a new card.",
  },
];

/** The four payment switches on the Notifications page (`domain/notification/labels.ts`). */
const PAYMENT_EMAILS: Setting[] = [
  {
    name: "Payment failed",
    detail: "Sent when a renewal payment fails, with when Subora tries again and a button to update the card.",
    value: "For a card problem. Never for a store problem or a Retry now.",
  },
  {
    name: "Last try for a payment",
    detail: "Sent one day before the last try of a failed payment, with a button to update the card.",
    value: "For a card problem.",
  },
  {
    name: "Payment went through",
    detail: "Sent when a failed payment goes through on a later try, to a customer who was told it failed.",
  },
  {
    name: "Payment not taken",
    detail: "Sent when Subora stops trying a failed payment, saying what happened to the subscription.",
  },
];

/** Email branding on the Notifications page (`labels.ts`, CONTEXT "Email branding"). */
const BRANDING: Setting[] = [
  {
    name: "Brand color",
    detail:
      "The band at the top of every email and the button. Subora switches the text on it to black when the color is pale.",
    value: "Default: Subora’s slate, #2B3038.",
  },
  {
    name: "Wordmark",
    detail: "The words on the band. Fill it in if your shop’s name is long enough to wrap onto two lines.",
    value: "Default: your shop’s name.",
  },
  {
    name: "Logo address",
    detail:
      "An https:// address of an image you already host. Subora never opens it, so the preview is where to check it.",
  },
];

/** Failure kind (`domain/billing/failure-kind.ts`, `run-banner.ts` WHO_CAN_FIX). */
const FAILURE_KINDS = [
  {
    name: "Card problem",
    examples: "A declined, expired or revoked card.",
    body: "The customer’s to fix. Subora emails them, retries on your Retry rules, and the banner says: “The customer must update their card.”",
  },
  {
    name: "Store problem",
    examples: "A sold-out product, or a payment gateway left in test mode.",
    body: "Yours to fix, so the customer is not emailed and it stays out of your Recovery numbers. The banner says: “Restock the product, then press Retry now.”",
  },
  {
    name: "Passing problem",
    examples: "A short fault at the bank or at Shopify.",
    body: "Nobody’s to fix. Waiting usually does it, so Subora retries by itself and emails the customer only if the retries run out.",
  },
];

/** The six Recovery numbers, defined as the app's tooltips define them (`figure-definitions.ts`). */
const RECOVERY_NUMBERS: Setting[] = [
  {
    name: "Failed payments",
    detail: "Each failed renewal counts once, however many tries it took, in the period it first failed.",
  },
  { name: "Retries", detail: "The tries Subora made after the first failure." },
  { name: "Recovered", detail: "Failed payments that were paid later, by a retry or a new card." },
  {
    name: "Recovery rate",
    detail: "Recovered, divided by the failed payments whose retries have finished. One still being retried waits.",
  },
  {
    name: "Recovered revenue",
    detail: "Money from failed payments that were paid later, before tax and shipping.",
  },
  {
    name: "Unrecoverable revenue",
    detail: "Money from failed payments that closed without being paid, whatever closed them.",
  },
];

export default function FailedPaymentsPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.failedPayments)} />

      <PageHero
        title="When a card fails, Subora keeps trying."
        continuation="And tells your customer how to fix it."
        intro={
          <p>
            You set the Retry rules once. Subora retries the payment, emails the customer in your store’s name, tries a
            new card the moment it’s added, and shows you exactly what came back.
          </p>
        }
        aside={
          <SubscriptionRunMock label="Fernlee’s subscription for Sam Okafor in Subora: Payment failed, next retry Oct 10, 2026 (retry 2 of 3), the customer emailed on Oct 6, and a Retry now button." />
        }
      >
        <InstallLink />
        <CtaLink href="#retry-rules" variant="secondary">
          See the Retry rules
        </CtaLink>
      </PageHero>

      {/* The Retry rules, drawn to scale: the page's one interactive moment. */}
      <Band tone="slate" id="retry-rules" aria-labelledby="rules-title">
        <SectionHeading
          id="rules-title"
          title="Your Retry rules, day by day."
          continuation="These are the defaults."
          intro="Every store starts with three retries after 1, 3 and 5 days, inside a 14-day recovery period. Choose what happens if none of them works, and see what it means for the customer."
        />
        <RetryTimeline className="mt-12" />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <h3 className="text-d3 font-semibold tracking-[-0.02em]">Change them in Settings.</h3>
            <p className="mt-4 text-white/75">
              Payment retries is one set of rules for your store, the same on every subscription plan. Saving a change
              reaches payments that fail from then on. Payments that already failed keep the rules they started with.
            </p>
            <p className="mt-4 text-white/75">
              Subora’s dunning stays well inside Shopify’s own limits, and it won’t charge a card that has already
              failed 20 times in 35 days.
            </p>
          </div>
          <SettingList settings={RETRY_RULES} />
        </div>
      </Band>

      {/* The customer's view. */}
      <FeatureSplit
        tone="paper"
        title="What your customer sees."
        continuation="One clear fix."
        intro="A failed payment shows on the subscription in the Customer portal, with the next try and the last day. The fix is always the same button: Update your card, which opens Shopify’s own secure card form."
        points={[
          "A new card is tried straight away, outside your retries. No waiting for the next date on the ladder.",
          "If the new card fails as well, the customer is told: “Your new card did not work either.”",
          "Subora never stores card details. It reads the card brand and last digits from Shopify to show them.",
        ]}
        mock={
          <div className="grid gap-5">
            <PortalPaymentMock label="Fernlee’s Customer portal: Your payment did not go through. Your order is not placed yet. We will try the payment again on Oct 10, 2026. An Update your card button." />
            <NewCardNoteMock
              className="sm:ml-auto sm:w-[85%]"
              label="After a new card is added, the portal says: Thank you. We are trying your new card now."
            />
          </div>
        }
      />

      {/* Emails and branding. */}
      <Band tone="frost" aria-labelledby="emails-title">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="emails-title"
              title="Four payment emails,"
              continuation="each with its own switch."
              intro="They go out in your store’s name, and replies go to your store’s contact address. All four are on from the start. Turn off any of them on the Notifications page."
            />
            <SettingList settings={PAYMENT_EMAILS} className="mt-10" />
            <p className="mt-6 text-muted measure">
              A renewal that goes through first time is a normal Shopify order, so Shopify’s order confirmation is the
              receipt. Subora doesn’t send a second one.
            </p>
          </div>
          <div className="grid gap-5 lg:sticky lg:top-28">
            <LastTryEmailMock label="Mira Skin’s email: We try your payment one last time, on Oct 10, 2026, with an Update your card button in Mira Skin’s color." />
            <EmailMock
              store="pet"
              kind="payment-recovered"
              className="sm:ml-auto sm:w-[85%]"
              label="Fernlee’s email: Your payment went through, so your order is placed."
            />
          </div>
        </div>

        <Explainer title="In your store’s colors." className="mt-20">
          <p>
            Email branding is three fields. Each has a working default, so an email carries your store’s name even if
            you never open the page. Preview any email with your branding before you save it.
          </p>
          <SettingList settings={BRANDING} className="text-slate" />
        </Explainer>
      </Band>

      {/* The merchant's view. */}
      <Band tone="paper" aria-labelledby="kinds-title">
        <SectionHeading
          id="kinds-title"
          title="Not every failed payment is the card’s fault."
          continuation="Subora sorts them by who can fix it."
          intro="Shopify’s error code decides the Failure kind, so a sold-out product is never treated as a customer’s declined card."
        />
        <div className="mt-14 grid grid-cols-1 border-t border-line md:grid-cols-3">
          {FAILURE_KINDS.map((k, i) => (
            <div
              key={k.name}
              className={cn("py-8 md:pr-8", i > 0 && "border-t border-line md:border-t-0 md:border-l md:pl-8")}
            >
              <h3 className="text-d3 font-semibold tracking-[-0.02em]">{k.name}</h3>
              <p className="mt-3 font-medium">{k.examples}</p>
              <p className="mt-2 text-muted">{k.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <StoreProblemMock label="Ember Hill Roasters’ subscription for Jonah Lee: Could not be ordered, not enough stock. Restock the product, then press Retry now. The customer has not been emailed." />
          <div className="space-y-10">
            <div>
              <h3 className="text-d3 font-semibold tracking-[-0.02em]">Retry now</h3>
              <p className="mt-3 text-muted measure">
                On any subscription with a failed payment. It charges once, straight away, after you’ve restocked or
                spoken to the customer. It moves no date on the ladder and emails no customer, so pressing it never
                fills anyone’s inbox.
              </p>
            </div>
            <div>
              <h3 className="text-d3 font-semibold tracking-[-0.02em]">Needs attention</h3>
              <p className="mt-3 text-muted measure">
                Every subscription Subora has stopped charging is in the subscription list’s Needs attention view,
                with a badge that says why: Payment failed, Could not be ordered, or Payment not confirmed when
                Shopify hasn’t answered a charge. The badge goes away by itself once the payment is settled.
              </p>
              <Link href="/features/analytics/#needs-attention" className="link mt-4 inline-block">
                Everything Needs attention covers
              </Link>
            </div>
          </div>
        </div>
      </Band>

      {/* What came back. */}
      <FeatureSplit
        tone="frost"
        flip
        title="Recovery numbers you can check."
        intro="The Failed payments tab in Analytics counts what your Retry rules brought back, for any date range, and exports the payments behind it as a CSV."
        mock={
          <RecoveryNumbersMock label="Fernlee’s Failed payments tab for the last 30 days: 42 failed payments, 71 retries, 29 recovered, a 69% recovery rate, $1,409.40 recovered revenue and $631.80 unrecoverable." />
        }
        href="/features/analytics/"
        linkLabel="More on analytics"
      >
        <SettingList settings={RECOVERY_NUMBERS} className="mt-8" />
        <p className="mt-6 text-small text-muted">
          Money is the subscription lines before tax and shipping, in each currency you sell in. Store problems
          aren’t counted.
        </p>
      </FeatureSplit>

      <FaqSection items={faqGroup("payments").items} title="Questions about failed payments." />

      <UseCaseLinks features={["failedPayments"]} tone="frost" />

      <RelatedFeatures current={pages.failedPayments.path} />

      <ClosingCta
        title="Get failed payments back."
        continuation="On every plan, from the first renewal."
        intro={
          <>
            Retry rules and the payment emails are on as soon as you install, so there is nothing to set up. Questions
            first? Write to{" "}
            <a href={`mailto:${siteConfig.supportEmail}`} className="link text-slate">
              {siteConfig.supportEmail}
            </a>
            .
          </>
        }
      />
    </>
  );
}
