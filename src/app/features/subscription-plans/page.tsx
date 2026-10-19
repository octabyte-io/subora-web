import { Band, CtaLink, InstallLink, SectionHeading } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { SettingList, type Setting } from "@/components/sections/setting-list";
import { FeatureSplit } from "@/components/sections/feature-split";
import { FaqSection } from "@/components/sections/faq-section";
import { RelatedFeatures } from "@/components/sections/related-features";
import { UseCaseLinks } from "@/components/use-cases/use-case-links";
import { ClosingCta } from "@/components/sections/closing-cta";
import { LaterPriceLadder, PlanEditMock, PlanFormMock } from "@/components/mocks/features-1-plans";
import { PickerList, StoreSurface, type PickerRowData } from "@/components/mocks/features-1-picker";
import { pages } from "@/config/pages";
import { faqGroup } from "@/content/faq";
import { STORES, discounted, type StoreKey } from "@/content/demo-stores";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.subscriptionPlans);

const coffee = STORES.coffee.product;
const pet = STORES.pet.product;
const skin = STORES.skincare.product;

/** One-time row as the Picker draws it for a product. */
const oneTime = (price: number): PickerRowData => ({ label: "One time", note: "Delivered once", price });

type Kind = {
  name: string;
  body: string;
  /** The kind's own fields on the plan form, with their ranges. */
  form: string[];
  store: StoreKey;
  row: PickerRowData;
  oneTimePrice: number;
};

/**
 * The four Plan kinds (`subora/app/domain/plan/labels.ts` PLAN_KIND_CARDS), each with the row a
 * customer sees for it in the Picker. Row notes are the plan's buyer sentence (`plan-words.ts`).
 */
const KINDS: Kind[] = [
  {
    name: "Subscribe & Save",
    body: "The customer pays for each delivery until they cancel. Called Ongoing in Subora’s plan form.",
    form: [
      "Price: a percentage off, an amount off, a fixed price or no discount.",
      "Change the price after some orders, if you want a second price.",
      "Minimum orders, if customers should reach a number of paid orders before they can cancel.",
    ],
    store: "coffee",
    oneTimePrice: coffee.price,
    row: {
      label: "Every 4 weeks",
      note: "Cancel any time",
      price: discounted(coffee.price, coffee.save),
      was: coffee.price,
      tag: `Save ${coffee.save}%`,
      selected: true,
    },
  },
  {
    name: "Prepaid",
    body: "One payment covers several deliveries. After the last paid delivery the plan charges again for the next set, or ends.",
    form: [
      "Deliveries per payment, from 2 to 52.",
      "Price per delivery, with the total paid up front shown under it.",
      "After the last paid delivery: Renew, or End.",
    ],
    store: "pet",
    oneTimePrice: pet.price,
    row: {
      label: "Every 4 weeks",
      note: "Pay once for 24 weeks of deliveries. Renews every 24 weeks",
      price: discounted(pet.price, pet.save),
      today: discounted(pet.price, pet.save) * 6,
      was: pet.price,
      tag: `Save ${pet.save}%`,
      selected: true,
    },
  },
  {
    name: "Trial",
    body: "The first orders are free or cheaper, then one price for good. A trial is counted in orders, never days, and the customer’s card is saved at checkout even when the first order is $0.",
    form: [
      "Trial length, from 1 to 52 orders.",
      "Trial price: free, a percentage off, an amount off or a fixed price.",
      "Price after the trial: full price or a discount, kept for every later order.",
      "Minimum orders, as on Subscribe & Save.",
    ],
    store: "skincare",
    oneTimePrice: skin.price,
    row: {
      label: "Every month",
      note: "Free trial: first order free",
      price: 0,
      then: discounted(skin.price, skin.save),
      was: skin.price,
      tag: "Free trial",
      selected: true,
    },
  },
  {
    name: "Fixed-length",
    body: "The customer pays for each delivery, and the subscription ends by itself after a set number of paid orders. They get an email saying it is complete.",
    form: [
      "Number of paid orders, from 2 to 52.",
      "Price, and a second price from a later order if you want one.",
    ],
    store: "coffee",
    oneTimePrice: coffee.price,
    row: {
      label: "Every month",
      note: "Ends by itself after 12 deliveries",
      price: discounted(coffee.price, 10),
      was: coffee.price,
      tag: "Save 10%",
      selected: true,
    },
  },
];

/** The settings every kind shares, as the plan form labels them (`app.plans.new/*`, `start.ts`). */
const SETTINGS: Setting[] = [
  {
    name: "Plan name",
    detail: "Only you see this, in your plans list.",
  },
  {
    name: "Products",
    detail: "The products and variants the plan sells. Add them from your Shopify catalog.",
  },
  {
    name: "Sell only as a subscription",
    detail:
      "A box on each product. The product can then only be bought on a subscription plan, everywhere, and the Picker shows no one-time option. It is Shopify’s own product setting, so Subora reads it from Shopify instead of keeping a copy.",
    value: "Default: as the product already is in Shopify.",
  },
  {
    name: "Price",
    detail: "Percentage off, Amount off, Fixed price or No discount. Amounts are in your store’s currency.",
    value: "Default: 10% off.",
  },
  {
    name: "Change the price after some orders",
    detail:
      "One second price, from an order you choose. On Subscribe & Save and Fixed-length plans. A Trial has its own trial price and price after the trial instead.",
    value: "From order 2 to 52. Opens at 5% off from order 3.",
  },
  {
    name: "Deliveries",
    detail:
      "Tick every frequency a customer may choose: every week, 2 weeks, month, 2 months or 3 months. Add any other as every so many days, weeks, months or years. They all share the plan’s price.",
    value: "Default: every month.",
  },
  {
    name: "Free shipping",
    detail:
      "On every order, on the first order, or on the first few orders. Subora adds it as a discount on your Discounts page, and it works with your other product and order discounts.",
    value: "Default: no free shipping. The first few orders: 1 to 52, starting at 3.",
  },
  {
    name: "Minimum orders",
    detail:
      "How many paid orders a customer reaches before the Customer portal lets them cancel. They see the condition up front, and can still skip and pause. You can cancel for them at any time. On Subscribe & Save and Trial plans only.",
    value: "Off by default. From 2 to 52, starting at 3.",
  },
  {
    name: "Status",
    detail: "Draft keeps the plan off your store. Active puts it on your store when you save.",
  },
];

const STORE_PAGE: Record<StoreKey, string> = {
  coffee: `${STORES.coffee.name}’s product page`,
  pet: `${STORES.pet.name}’s product page`,
  skincare: `${STORES.skincare.name}’s product page`,
};

export default function SubscriptionPlansPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.subscriptionPlans)} />

      <PageHero
        title="Subscription plans,"
        continuation="built from the products you already sell."
        intro="Choose Subscribe & Save, Prepaid, Trial or Fixed-length. Pick the products, how often they ship and the price. Subora sets the plan up in Shopify’s own subscriptions, and the Picker shows it on your product pages."
        aside={
          <PlanFormMock label="Subora’s plan form for Ember Hill Roasters: 15% off, every 2, 4 or 6 weeks. In short: buyers pay $15.30 for every order." />
        }
      >
        <InstallLink />
        <CtaLink href="/features/storefront/" variant="secondary">
          See the Picker
        </CtaLink>
      </PageHero>

      {/* The four kinds: what you set on the left, what the customer sees on the right. */}
      <Band tone="paper" aria-labelledby="kinds-title">
        <SectionHeading
          id="kinds-title"
          title="Four kinds of plan."
          continuation="What you set, and what your customer sees."
          intro="You choose the kind first, and the form then shows only what that kind needs. The kind stays fixed once the plan is saved."
        />
        <div className="mt-14 border-b border-line">
          {KINDS.map((kind) => (
            <div
              key={kind.name}
              className="grid grid-cols-1 gap-x-16 gap-y-8 border-t border-line py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-12"
            >
              <div>
                <h3 className="text-d3 font-semibold tracking-[-0.02em]">{kind.name}</h3>
                <p className="mt-3 text-muted measure">{kind.body}</p>
                <ul className="mt-5 space-y-2 border-l-2 border-line pl-5 text-small">
                  {kind.form.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                <p className="mb-2.5 text-small text-muted">On {STORE_PAGE[kind.store]}</p>
                <StoreSurface
                  store={kind.store}
                  className="p-4 sm:p-5"
                  label={`${STORE_PAGE[kind.store]}: the Picker with a one-time option and ${kind.row.label.toLowerCase()}, “${kind.row.note}”.`}
                >
                  <PickerList rows={[oneTime(kind.oneTimePrice), kind.row]} />
                </StoreSurface>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-muted">On the roadmap, and not in Subora today: Build-a-Box and bundles.</p>
      </Band>

      {/* Price rules */}
      <Band tone="frost" aria-labelledby="price-title">
        <SectionHeading
          id="price-title"
          title="One price, and one change later if you want it."
          intro="Set a percentage off, an amount off, a fixed price or no discount. Then, if you like, a second price from a later order: a smaller welcome discount that grows, or a big first order that settles down."
        />
        <LaterPriceLadder
          className="mt-12"
          label="Mira Skin’s serum at 10% off the first 2 orders, $28.80 each, then 15% off from order 3, $27.20 each."
        />
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="border-t border-line pt-6">
            <h3 className="text-[1.125rem] font-semibold">Several frequencies, one price</h3>
            <p className="mt-2 text-muted">
              Offer every 2, 4 and 6 weeks on one plan, and customers choose in the Picker. Frequencies run in days,
              weeks, months or years.
            </p>
          </div>
          <div className="border-t border-line pt-6">
            <h3 className="text-[1.125rem] font-semibold">Free shipping</h3>
            <p className="mt-2 text-muted">
              On every order, the first order or the first few. The Picker says so under the option, for example
              “Free shipping on your first 3 orders”.
            </p>
          </div>
          <div className="border-t border-line pt-6">
            <h3 className="text-[1.125rem] font-semibold">Subscription only</h3>
            <p className="mt-2 text-muted">
              Tick “Sell only as a subscription” on a product, and the Picker opens on the subscription with no
              one-time option.
            </p>
          </div>
        </div>
      </Band>

      {/* Every setting */}
      <Band tone="paper" aria-labelledby="settings-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <SectionHeading
            id="settings-title"
            title="The plan form,"
            continuation="setting by setting."
            intro="These are the settings every kind shares, under the names Subora’s admin gives them. Each kind adds its own, listed above."
          />
          <SettingList settings={SETTINGS} />
        </div>
      </Band>

      {/* The merchant's side: changing a plan that has subscribers. */}
      <FeatureSplit
        tone="frost"
        flip
        title="Change a plan,"
        continuation="and your subscribers keep what they signed up for."
        intro="Edits to a plan apply to new customers. People already subscribed keep their price and frequency, and Subora tells you so before you save."
        points={[
          "Beside the form, “What the buyer sees” and “In short” show the plan in your customer’s words as you type.",
          "Every edit is in the Activity log, with the price, frequencies or products before and after.",
          "Turning a plan off stops new sales and nothing else. A plan that has sold a subscription can be turned off but not deleted.",
        ]}
        mock={
          <PlanEditMock label="Mira Skin’s plan being edited to 10% off, then 15% from order 3. A note says 64 subscribers keep their current price and frequency, and Activity records the change." />
        }
      />

      <FaqSection items={faqGroup("plans").items} title="Questions about subscription plans." />

      <UseCaseLinks features={["subscriptionPlans"]} tone="frost" />

      <RelatedFeatures current={pages.subscriptionPlans.path} />

      <ClosingCta title="Make your first plan on Free." continuation="All four kinds are included." />
    </>
  );
}
