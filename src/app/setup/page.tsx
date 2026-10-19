import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Band, Container, CtaLink, InstallLink, SectionHeading } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { SettingList } from "@/components/sections/setting-list";
import { SetupGuideMock } from "@/components/mocks/setup-guide";
import { AccountEditorMock, PlanFormMock, TestOrderMock, ThemeEditorMock } from "@/components/mocks/setup-steps";
import { pages } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.setup);

type Step = {
  id: string;
  title: string;
  /** Plain text for the HowTo structured data. */
  text: string;
  body: ReactNode;
  /** Smaller notes under the body: optional extras and the guide line it ticks. */
  notes?: ReactNode[];
  mock: ReactNode;
};

/** The five steps, in the in-app Setup guide's order and words (`subora/app/domain/setup-guide`). */
const STEPS: Step[] = [
  {
    id: "install",
    title: "Install Subora",
    text: "Install Subora from the Shopify App Store. You start on Free, with every feature, and the Setup guide opens on Subora’s Home.",
    body: (
      <p>
        Install from the Shopify App Store and approve the permissions Shopify shows you. You start on Free, with every
        feature and no limit on subscriptions. Subora opens on its Home page, where the Setup guide lists what is left
        to do and ticks each line off as it finds it on your store.
      </p>
    ),
    notes: [
      "Two lines are ticked before you do anything: customer emails and Retry rules are on by default.",
    ],
    mock: (
      <SetupGuideMock
        next="plan"
        label="Subora’s Setup guide just after installing: 2 of 6 done, with Create a plan as the next step."
      />
    ),
  },
  {
    id: "plan",
    title: "Create a subscription plan",
    text: "Choose a kind of subscription plan, then its products, how often they ship and the discount. Set Status to Active and save to put it on your store.",
    body: (
      <p>
        Pick the kind of plan: Subscribe & Save, Prepaid, Trial or Fixed-length. Then choose the products, how often
        they ship, and the discount. Set Status to Active and save, and the plan is turned on for its products. A
        draft stays off your store until you do.
      </p>
    ),
    notes: [
      "Ticks “Subscription plan created” and “Product selected”.",
      <>
        Every kind of plan is explained on{" "}
        <Link href="/features/subscription-plans/" className="link">
          subscription plans
        </Link>
        .
      </>,
    ],
    mock: (
      <PlanFormMock label="Subora’s new plan form: Subscribe & Save on three coffees, every 2, 4 or 6 weeks, 15% off, Status Active." />
    ),
  },
  {
    id: "picker",
    title: "Add the Picker to your product page",
    text: "Press “Add the subscription picker to your product page” in the Setup guide. The theme editor opens with the Subscription picker block in place; press Save. On an older theme, turn on the picker embed instead.",
    body: (
      <p>
        Press “Add the subscription picker to your product page” in the Setup guide. Your theme editor opens on the
        product template with the Subscription picker block already added. Move it next to Add to cart if you like,
        and press Save. Nothing is pasted into your theme’s code.
      </p>
    ),
    notes: [
      "Using an older theme? Turn on the picker embed instead, from the same row of the guide.",
      "Optional: show a subscription offer in the cart. The Cart offer turns a one-time item into a subscription, on Dawn and Horizon themes.",
    ],
    mock: (
      <ThemeEditorMock label="Shopify’s theme editor on the product template, with Subora’s Subscription picker block added under the variant picker." />
    ),
  },
  {
    id: "portal",
    title: "Add the Subscriptions page to customer accounts",
    text: "Press “Add the Subscriptions page” in the Setup guide. Shopify’s customer account editor opens on Subora; add the page to Accounts and save.",
    body: (
      <p>
        Press “Add the Subscriptions page”. Shopify’s customer account editor opens on Subora’s page; add it to
        Accounts and save. Customers can now skip, pause, swap or cancel from their account, in your store’s look,
        without writing to you.
      </p>
    ),
    notes: [
      "Optional: add “Manage subscription” to order pages, so customers reach it from an order too.",
      "The page is built on Shopify’s current customer accounts. A store still on the legacy ones switches first, in Shopify’s settings.",
    ],
    mock: (
      <AccountEditorMock label="Shopify’s customer account editor with Subora’s Subscriptions page and Manage subscription action, and Fernlee’s Subscriptions page beside them." />
    ),
  },
  {
    id: "test",
    title: "Place a test order",
    text: "Subscribe to your own product on your store and check out. The subscription appears in Subora’s Subscriptions list.",
    body: (
      <p>
        Open one of the plan’s products on your store, choose Subscribe and check out. The order is a normal Shopify
        order, and the subscription appears in Subora’s Subscriptions list with its next billing date. Then open your
        customer account and try the Subscriptions page from the customer’s side.
      </p>
    ),
    notes: [
      "This step is not a line in the guide. Once the other lines tick, the guide shrinks to “Setup complete” and stays on Home until you hide it.",
    ],
    mock: (
      <TestOrderMock label="Subora’s Subscriptions list with the test subscription: Active, House Espresso, next billing November 16, $15.30, under Setup complete." />
    ),
  },
];

const REQUIREMENTS = [
  {
    name: "Any Shopify plan",
    detail: "Shopify Plus is not needed. Subora runs on Shopify’s own subscriptions and checkout.",
  },
  {
    name: "An Online Store 2.0 theme",
    detail: "For the Subscription picker block. On an older theme, the Picker’s app embed does the same job.",
  },
  {
    name: "Shopify’s current customer accounts",
    detail: "The Subscriptions page lives there. The legacy (classic) customer accounts can’t show it.",
  },
  {
    name: "A payment provider that takes subscriptions",
    detail: "Shopify only charges renewals through providers it supports for subscriptions, such as Shopify Payments.",
  },
];

const howToJsonLd = {
  "@type": "HowTo",
  name: "How to set up Subora on a Shopify store",
  description: pages.setup.description,
  tool: REQUIREMENTS.map((r) => ({ "@type": "HowToTool", name: r.name })),
  step: STEPS.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.text,
    url: new URL(`${pages.setup.path}#${step.id}`, siteConfig.url).toString(),
  })),
};

export default function SetupPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd(pages.setup), howToJsonLd]} />

      <PageHero
        title="Selling subscriptions in five steps."
        continuation="No code."
        intro="Subora’s Setup guide walks you through each line inside the app, opens the right Shopify editor for you, and ticks each line off when it sees the change on your store."
        aside={
          <SetupGuideMock
            next="portal"
            label="Subora’s Setup guide, 5 of 6 done: the next line is Add the Subscriptions page to customer accounts."
          />
        }
      >
        <InstallLink />
        <CtaLink href="#requirements" variant="secondary">
          What you need
        </CtaLink>
      </PageHero>

      {/* The steps: one numbered thread down the page, text beside each step's screen. */}
      <section aria-labelledby="steps-title" className="bg-paper py-20 sm:py-28">
        <Container>
          <h2 id="steps-title" className="sr-only">
            The five steps
          </h2>
          <ol>
            {STEPS.map((step, i) => (
              <li
                key={step.id}
                id={step.id}
                className="relative grid scroll-mt-24 grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-8"
              >
                {/* The thread between numbers; it stops at the last step. */}
                {i < STEPS.length - 1 ? (
                  <span aria-hidden="true" className="absolute top-12 bottom-0 left-5 w-px bg-line sm:left-6" />
                ) : null}
                <span
                  aria-hidden="true"
                  className="relative grid size-10 place-items-center rounded-full bg-slate text-[1.125rem] font-bold text-paper tnum sm:size-12 sm:text-[1.25rem]"
                >
                  {i + 1}
                </span>
                <div
                  className={cn(
                    "grid grid-cols-1 items-start gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
                    i < STEPS.length - 1 && "pb-20 sm:pb-24",
                  )}
                >
                  <div className="lg:pt-1.5">
                    <h3 className="text-d3 font-semibold tracking-[-0.02em]">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <div className="mt-4 text-muted measure">{step.body}</div>
                    {step.notes?.length ? (
                      <ul className="mt-6 space-y-2.5 border-l-2 border-line pl-4 text-small text-muted">
                        {step.notes.map((note, n) => (
                          <li key={n}>{note}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div className="relative min-w-0 max-sm:-ml-14 max-sm:w-[calc(100%+3.5rem)]">{step.mock}</div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* What is already on: the guide's two default lines. */}
      <Band tone="frost" aria-labelledby="defaults-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading
            id="defaults-title"
            title="Already on when you install."
            intro="Two lines of the Setup guide are ticked from the start. Review them whenever you like; nothing has to change before your first subscriber."
          />
          <SettingList
            settings={[
              {
                name: "Notifications configured",
                detail:
                  "Customer emails go out in your store’s name: a new subscription, a renewal coming up, skips, pauses and payment problems. Switch any of them off, except the one confirming a new subscription.",
                value: "On by default.",
              },
              {
                name: "Payment recovery configured",
                detail: (
                  <>
                    When a renewal fails, Subora retries it and emails the customer. If they add a new card, it retries
                    straight away.{" "}
                    <Link href="/features/failed-payments/" className="link text-slate">
                      More on failed payments
                    </Link>
                  </>
                ),
                value: "On by default. A failed payment is retried 3 times, after 1, 3 and 5 days.",
              },
            ]}
          />
        </div>
      </Band>

      {/* Requirements */}
      <Band tone="paper" id="requirements" aria-labelledby="requirements-title" className="scroll-mt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="requirements-title"
              title="What you need."
              continuation="Check these before you start."
            />
            <p className="mt-6 text-muted measure">
              Moving from another subscription app? Our team plans the move with you by hand. Write to{" "}
              <a href={`mailto:${siteConfig.supportEmail}?subject=Moving%20to%20Subora`} className="link text-slate">
                {siteConfig.supportEmail}
              </a>{" "}
              before you switch anything off.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {REQUIREMENTS.map((r) => (
              <li key={r.name} className="flex gap-4 py-5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-frost ring-1 ring-line"
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="mt-1 text-muted">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <ClosingCta
        title="Install, then follow the guide."
        continuation="Every feature is on from the start."
        secondary={{ href: "/faq/", label: "Read the FAQ" }}
      />
    </>
  );
}
