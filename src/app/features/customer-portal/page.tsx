import { Band, CtaLink, InstallLink, SectionHeading } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { SettingList, Explainer, type Setting } from "@/components/sections/setting-list";
import { FaqSection } from "@/components/sections/faq-section";
import { RelatedFeatures } from "@/components/sections/related-features";
import { UseCaseLinks } from "@/components/use-cases/use-case-links";
import { ClosingCta } from "@/components/sections/closing-cta";
import {
  AdminSubscriptionMock,
  CancelHoldMock,
  PortalPreviewMock,
  PortalSubscriptionPage,
  SkippedEmailMock,
  SwapListMock,
} from "@/components/mocks/features-2-portal";
import { PortalSwitchesDemo } from "@/components/mocks/features-2-portal-switches";
import { pages } from "@/config/pages";
import { faqGroup } from "@/content/faq";
import { cn } from "@/lib/utils";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.customerPortal);

/** What a customer can do, grouped by what it changes. Words follow the portal's own. */
const CUSTOMER_ACTIONS = [
  {
    title: "Deliveries",
    items: [
      "See every upcoming delivery and past order.",
      "Skip a delivery, and bring it back later.",
      "Get a delivery sooner. To wait longer, skip it.",
    ],
  },
  {
    title: "The subscription",
    items: [
      "Pause, and resume whenever they’re ready.",
      "Cancel, after a reason and an offer that fits it.",
      "Change how often it comes, from the frequencies of their plan.",
    ],
  },
  {
    title: "What’s in the box",
    items: [
      "Change the quantity.",
      "Change the option, such as a 3 kg bag instead of 6 kg.",
      "Swap to another product from your Swap list.",
    ],
  },
  {
    title: "Where and how",
    items: [
      "Change the shipping address for the next orders.",
      "Update their card through Shopify’s own secure flow.",
    ],
  },
];

/** The emails a portal change sends, by their names on Subora's Notifications page. */
const EMAILS = [
  "Delivery skipped",
  "Delivery back on",
  "Delivery date changed",
  "Subscription paused",
  "Subscription resumed",
  "Subscription canceled",
  "Quantity changed",
  "Frequency changed",
  "Product changed",
  "Delivery address changed",
];

/** The Customer portal settings page, top to bottom, with each default. */
const SETTINGS: Setting[] = [
  {
    name: "Show the portal to your customers",
    detail:
      "A one-time step. Subora opens Shopify’s checkout and accounts editor, where you add the Subscriptions page and the Manage subscription button on orders, then save.",
    value: "Optional: add the page to your customer account menu too.",
  },
  {
    name: "Skip a delivery",
    detail: "Customers can skip an upcoming delivery. A delivery they already skipped can always be brought back.",
    value: "On by default",
  },
  {
    name: "Pause a subscription",
    detail: "Customers can pause their subscription. A paused subscription can always be resumed.",
    value: "On by default",
  },
  {
    name: "Move a delivery earlier",
    detail: "Customers can get one delivery sooner, up to its original date.",
    value: "On by default",
  },
  {
    name: "Change the quantity",
    detail: "Customers can change how many of an item they receive.",
    value: "On by default",
  },
  {
    name: "Change how often",
    detail:
      "Customers can pick another frequency of the plan they bought. They then pay the plan’s price of today.",
    value: "On by default",
  },
  {
    name: "Change the variant",
    detail: "Customers can move to another variant of the same product, such as size M to size L.",
    value: "On by default",
  },
  {
    name: "Change the shipping address",
    detail: "Customers can change where their deliveries are shipped.",
    value: "On by default",
  },
  {
    name: "Cancel a subscription",
    detail: "Shopify’s App Store requires that customers can cancel.",
    value: "Always on",
  },
  {
    name: "Replace the payment card",
    detail: "Shopify’s App Store requires that customers can replace their card. Shopify handles it.",
    value: "Always on",
  },
  {
    name: "Products customers can swap to",
    detail:
      "Your Swap list. A customer can swap to a product on it if their subscription plan also sells it.",
    value: "Empty by default, so there is no Swap until you choose products.",
  },
  {
    name: "Minimum orders",
    detail:
      "Set on a Subscribe & Save or Trial subscription plan: how many paid orders come before the portal offers Cancel.",
    value: "None by default. From 2 to 52.",
  },
];

export default function CustomerPortalPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.customerPortal)} />

      <PageHero
        title="Customers change their own subscriptions,"
        continuation="in your store’s account."
        intro={
          <p>
            The Customer portal is a Subscriptions page inside your store’s customer account, in your store’s look.
            Customers skip, pause, swap and change things themselves, and you get fewer emails asking you to.
          </p>
        }
        aside={
          <PortalSubscriptionPage label="Fernlee’s Subscriptions page in its customer account: the next delivery on Thursday, November 5, a menu open with Skip this delivery and Change date, and buttons to change the product, quantity, frequency, address and card, pause or cancel." />
        }
      >
        <InstallLink />
        <CtaLink href="/setup/" variant="secondary">
          See the setup
        </CtaLink>
      </PageHero>

      {/* The customer's view */}
      <Band tone="paper" aria-labelledby="actions-title">
        <SectionHeading
          id="actions-title"
          title="Everything a subscriber usually writes to you about."
          continuation="Done in a few taps, without you."
          intro="Customers find the page under their account, or from the Manage subscription button on any subscription order. They see only their own subscriptions, and every change goes through Subora, which checks your settings first."
        />
        <div className="mt-14 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {CUSTOMER_ACTIONS.map((group) => (
            <div key={group.title} className="border-t-2 border-slate py-6">
              <h3 className="text-[1.125rem] font-semibold tracking-[-0.01em]">{group.title}</h3>
              <ul className="mt-3 space-y-2.5 text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h3 className="text-d3 font-semibold tracking-[-0.02em]">The new price, before anything changes.</h3>
            <p className="mt-4 text-muted measure">
              A change that moves the price, like a bigger quantity, another frequency or a swap, opens Check your
              change first. Shopify works out the new items, delivery and total, and the customer sees now beside
              after. Nothing changes until they press Confirm change.
            </p>
          </div>
          <PortalPreviewMock label="Fernlee’s Check your change: quantity 1 to 2, each delivery $48.60 to $97.20, with Confirm change and Keep as is." />
        </div>
      </Band>

      {/* Disallowed actions: the live demo */}
      <Band tone="frost" aria-labelledby="switches-title">
        <SectionHeading
          id="switches-title"
          title="Turn off what you don’t offer."
          continuation="It leaves the portal at once."
          intro="Every action starts on. Switch one off and customers no longer see it, and Subora refuses it if asked. Try it: the page on the right is what Sam sees."
        />
        <PortalSwitchesDemo className="mt-14" />
        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-8 text-muted md:grid-cols-3">
          <li>
            <span className="font-semibold text-slate">Cancel stays.</span> Shopify’s App Store requires that customers
            can cancel and replace their card, so neither has a switch.
          </li>
          <li>
            <span className="font-semibold text-slate">Undo stays.</span> Resume and bring back a skipped delivery always
            work, since they only put the customer back to being billed.
          </li>
          <li>
            <span className="font-semibold text-slate">It looks forward.</span> A delivery already skipped stays skipped.
            You can still make any change yourself from Subora.
          </li>
        </ul>
      </Band>

      {/* Swap list and Minimum orders */}
      <Band tone="paper" aria-labelledby="limits-title">
        <SectionHeading
          id="limits-title"
          title="You choose what they can swap to,"
          continuation="and when they can cancel."
        />
        <div className="mt-14 space-y-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Explainer title="The Swap list" className="md:grid-cols-1">
              <p>
                One list for your whole store of the products customers may swap to. A customer can swap to a product on
                it when their subscription plan also sells it, and sees the new price before anything changes.
              </p>
              <p>
                The list is the whole switch. While it is empty, customers cannot swap, so a new store offers no Swap until
                you choose products.
              </p>
            </Explainer>
            <SwapListMock label="Subora’s Swap list for Fernlee: Turkey & Rice and Grain-Free Lamb, with Choose products." />
          </div>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Explainer title="Minimum orders" className="md:grid-cols-1">
              <p>
                A Subscribe & Save or Trial plan can ask for a number of paid orders before the portal offers Cancel. The
                portal says so up front, so nobody finds out by trying.
              </p>
              <p>It holds back Cancel and nothing else: customers can still pause and skip, and you can still cancel.</p>
            </Explainer>
            <CancelHoldMock label="The foot of Fernlee’s subscription page: Pause subscription, and You can cancel after 3 orders. You have had 1 so far." />
          </div>
        </div>
      </Band>

      {/* The merchant's view */}
      <Band tone="slate" aria-labelledby="merchant-title">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="merchant-title"
              title="You can make the same changes,"
              continuation="from Subora."
              intro="Every subscription has a page in Subora with its upcoming deliveries, products, schedule and Activity."
            />
            <ul className="mt-8 space-y-3 border-l-2 border-white/15 pl-5 text-white/85">
              <li>Skip, bring back or move a delivery earlier, pause, resume or cancel.</li>
              <li>Change the quantity, frequency, variant or shipping address, or swap to any product the plan sells, Swap list or not.</li>
              <li>Actions you turned off for customers still work for you.</li>
              <li>Pause, resume, cancel, skip and move a delivery earlier across many subscriptions at once.</li>
              <li>The Activity log says who made each change: the customer, you, Subora or Shopify.</li>
            </ul>
          </div>
          <AdminSubscriptionMock
            className="shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] ring-white/10"
            label="Subora’s subscription page for Sam Okafor at Fernlee: Pause, upcoming deliveries with Skip, Change date and Bring it back, and a product menu with Change quantity, Change variant and Swap product."
          />
        </div>
      </Band>

      {/* Emails */}
      <Band tone="frost" aria-labelledby="emails-title">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="emails-title"
              title="Every change, confirmed by email."
              continuation="In your store’s name."
              intro="Whoever makes a change, the customer gets the same email saying what changed, with your logo and brand color and a button back to the portal."
            />
            <ul className="mt-8 grid grid-cols-1 gap-x-6 border-t border-line sm:grid-cols-2">
              {EMAILS.map((email, i) => (
                <li key={email} className={cn("border-b border-line py-2.5", i % 2 === 1 && "sm:pl-6 sm:border-l")}>
                  {email}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-muted">
              Each one has its own switch in Subora’s Notifications settings, and all start on.
            </p>
          </div>
          <SkippedEmailMock
            className="lg:mt-4"
            label="Fernlee’s email: Your delivery is skipped, for the delivery on Dec 3, 2026, with a Manage your subscription button."
          />
        </div>
      </Band>

      {/* Settings */}
      <Band tone="paper" aria-labelledby="settings-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="settings-title"
              title="The settings,"
              continuation="as Subora names them."
              intro="All on one Customer portal page in Subora, with one Save. The cancel steps live there too."
            />
            <p className="mt-6 text-muted measure">
              The portal runs on Shopify’s current customer accounts, not the legacy ones. Its words are in English.
            </p>
          </div>
          <SettingList settings={SETTINGS} />
        </div>
      </Band>

      <FaqSection items={faqGroup("portal").items} title="Questions about the Customer portal." tone="frost" />

      <UseCaseLinks features={["customerPortal"]} tone="paper" />

      <RelatedFeatures current={pages.customerPortal.path} tone="frost" />

      <ClosingCta
        title="Fewer emails about deliveries."
        continuation="The Customer portal is on every plan."
      />
    </>
  );
}
