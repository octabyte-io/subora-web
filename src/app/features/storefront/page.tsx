import { Band, CtaLink, InstallLink, SectionHeading } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { SettingList, type Setting } from "@/components/sections/setting-list";
import { FeatureSplit } from "@/components/sections/feature-split";
import { FaqSection } from "@/components/sections/faq-section";
import { RelatedFeatures } from "@/components/sections/related-features";
import { UseCaseLinks } from "@/components/use-cases/use-case-links";
import { ClosingCta } from "@/components/sections/closing-cta";
import {
  BadgeGridMock,
  CartChooserMock,
  FoldedPickerMock,
  ProductPickerMock,
  ThemeEditorMock,
} from "@/components/mocks/features-1-storefront";
import { pages } from "@/config/pages";
import { faqGroup } from "@/content/faq";
import { cn } from "@/lib/utils";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.storefront);

/** The Picker block's theme-editor settings (`blocks/picker.liquid`, `locales/en.default.schema.json`). */
const PICKER_SETTINGS: Setting[] = [
  {
    name: "Hide the theme’s own price",
    detail: "The Picker shows a price for every option, one-time included, so your theme’s price is hidden while it shows.",
    value: "Default: on.",
  },
  {
    name: "Heading",
    detail: "The line above the options. Leave it empty to use the standard words.",
    value: "Default: Purchase options.",
  },
  {
    name: "One-time option name",
    detail: "Leave it empty to use the standard words.",
    value: "Default: One time.",
  },
  {
    name: "One-time option note",
    detail: "The small line under the one-time option.",
    value: "Default: Delivered once.",
  },
  {
    name: "Selected when the page opens",
    detail:
      "One time, or the first subscription option in your plan’s order. Shopify’s subscription guidelines expect one time unless you decide otherwise.",
    value: "Default: One time.",
  },
  {
    name: "Show savings",
    detail: "Shows “Save N%” beside a subscription price. The crossed-out regular price stays either way.",
    value: "Default: on.",
  },
];

/** The words the Collection badge and the Cart offer share settings for (`common.*` in the schema locale). */
const TEXT_SETTINGS: Setting[] = [
  {
    name: "Show savings",
    detail: "Off shows the no-saving words in place of a percentage. Trial words still show.",
    value: "Default: on, for the badge and the Cart offer.",
  },
  {
    name: "Saving",
    detail: "When every subscription option saves the same.",
    value: "Badge: Save 15%. Cart offer: Subscribe & save 15%.",
  },
  {
    name: "Different savings",
    detail: "When the options save different amounts. The number is the largest.",
    value: "Badge: Save up to 15%. Cart offer: Subscribe & save up to 15%.",
  },
  {
    name: "Free trial",
    detail: "When a Trial plan’s first order is free.",
    value: "Badge: Free trial. Cart offer: Try it with a free trial.",
  },
  {
    name: "Trial with a lower first price",
    detail: "When a Trial plan’s first order is cheaper, not free.",
    value: "Badge: Trial offer. Cart offer: Start with a trial offer.",
  },
  {
    name: "No saving",
    detail: "When the product can be bought on subscription at no discount, or Show savings is off.",
    value: "Badge: Subscription available. Cart offer: Subscribe to this item.",
  },
  {
    name: "Button",
    detail: "The Cart offer’s button.",
    value: "Default: Subscribe.",
  },
  {
    name: "Error",
    detail: "Shown when an item could not be changed to a subscription.",
    value: "Default: We could not change this item. Refresh the cart and try again.",
  },
];

/** The Picker's own words in each language it ships with (`extensions/subora-picker/locales/*.json`). */
const LANGUAGES = [
  { name: "English", lang: "en", heading: "Purchase options", oneTime: "One time", save: "Save 15%", note: "Cancel any time" },
  { name: "German", lang: "de", heading: "Kaufoptionen", oneTime: "Einmalkauf", save: "15 % sparen", note: "Jederzeit kündbar" },
  {
    name: "Spanish",
    lang: "es",
    heading: "Opciones de compra",
    oneTime: "Compra única",
    save: "Ahorra un 15 %",
    note: "Cancela cuando quieras",
  },
  {
    name: "French",
    lang: "fr",
    heading: "Options d’achat",
    oneTime: "Achat unique",
    save: "Économisez 15 %",
    note: "Annulable à tout moment",
  },
  {
    name: "Italian",
    lang: "it",
    heading: "Opzioni di acquisto",
    oneTime: "Acquisto singolo",
    save: "Risparmia il 15%",
    note: "Annulla quando vuoi",
  },
  { name: "Japanese", lang: "ja", heading: "購入方法", oneTime: "1回のみ購入", save: "15%オフ", note: "いつでも解約できます" },
  { name: "Dutch", lang: "nl", heading: "Aankoopopties", oneTime: "Eenmalig", save: "Bespaar 15%", note: "Altijd opzegbaar" },
  {
    name: "Portuguese (Brazil)",
    lang: "pt-BR",
    heading: "Opções de compra",
    oneTime: "Compra única",
    save: "Economize 15%",
    note: "Cancele quando quiser",
  },
];

/** What the Picker does by itself, beyond its settings (`assets/subora-picker.js`, CONTEXT "Picker"). */
const PICKER_BEHAVIOUR = [
  "It follows the variant the customer chooses, with that variant’s prices.",
  "Each frequency gets its own row. A plan with more than 4 folds them into one Subscribe row with a dropdown.",
  "A product sold only as a subscription has no one-time row, and the Picker opens on the subscription.",
  "A Prepaid option shows its price per delivery and what is paid today. A Trial shows “Free trial” or “Trial offer”.",
  "While a subscription is chosen, it says the charge recurs and links to your subscription policy.",
];

export default function StorefrontPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.storefront)} />

      <PageHero
        title="Subscription options"
        continuation="on the product page you already have."
        intro="Subora’s Picker sits next to your Add to cart button in your theme’s own fonts and colors. Collection badges point out subscriptions on product cards, and on Dawn and Horizon themes the Cart offer turns a one-time item into a subscription. All three are set up in Shopify’s theme editor, with no code."
        aside={
          <ProductPickerMock label="Fernlee’s product page with Subora’s Picker: one time for $54, or every 4, 6 or 8 weeks for $48.60, save 10%, with every 4 weeks chosen, and a line saying the charge recurs and a link to the subscription policy." />
        }
      >
        <InstallLink />
        <CtaLink href="/features/subscription-plans/" variant="secondary">
          See subscription plans
        </CtaLink>
      </PageHero>

      {/* The Picker: the merchant's settings beside what it does on its own. */}
      <Band tone="paper" aria-labelledby="picker-title">
        <SectionHeading
          id="picker-title"
          title="The Picker,"
          continuation="dressed by your theme."
          intro="It takes your theme’s font, color and corner rounding instead of bringing a look of its own. What you change is its words and what it starts on, from the theme editor."
        />
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="grid gap-5">
            <ThemeEditorMock label="Shopify’s theme editor with the Subscription picker block’s settings: Hide the theme’s own price and Show savings ticked, Selected when the page opens set to One time." />
            <p className="text-small text-muted">
              On an Online Store 2.0 theme, add the Subscription picker block to your product page. On an older theme,
              switch on the Picker (vintage themes) app embed instead. Subora’s setup guide opens the theme editor
              with the block in place, so placing it is one Save.
            </p>
          </div>
          <SettingList settings={PICKER_SETTINGS} />
        </div>

        <div className="mt-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <h3 className="text-d3 font-semibold tracking-[-0.02em]">What it does without being asked.</h3>
            <ul className="mt-6 space-y-3 border-l-2 border-line pl-5">
              {PICKER_BEHAVIOUR.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <FoldedPickerMock label="Mira Skin’s serum, sold only as a subscription: one Subscribe row with a dropdown set to Every month, $28.80, save 10%, and the recurring-charge line." />
            <p className="mt-3 text-small text-muted">A subscription-only product on a plan with five frequencies.</p>
          </div>
        </div>
      </Band>

      {/* Languages: the Picker's real words. */}
      <Band tone="frost" aria-labelledby="lang-title">
        <SectionHeading
          id="lang-title"
          title="Eight languages,"
          continuation="chosen by your store."
          intro="The Picker, the Collection badges and the Cart offer speak the language your store shows the customer. Here are the Picker’s own words in each."
        />
        <div
          role="region"
          aria-labelledby="lang-title"
          tabIndex={0}
          className="mt-12 relative overflow-x-auto rounded-2xl bg-paper ring-1 ring-line"
        >
          <table className="w-full min-w-[40rem] text-left text-small">
            <caption className="sr-only">The Picker’s heading, one-time option, saving and note in eight languages</caption>
            <thead className="text-muted">
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 font-medium">
                  Language
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Heading
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  One-time option
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Saving
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {LANGUAGES.map((l, i) => (
                <tr key={l.lang} className={cn(i > 0 && "border-t border-line")}>
                  <th scope="row" className="px-5 py-3 font-semibold whitespace-nowrap">
                    {l.name}
                  </th>
                  <td lang={l.lang} className="px-5 py-3">
                    {l.heading}
                  </td>
                  <td lang={l.lang} className="px-5 py-3">
                    {l.oneTime}
                  </td>
                  <td lang={l.lang} className="px-5 py-3 whitespace-nowrap">
                    {l.save}
                  </td>
                  <td lang={l.lang} className="px-5 py-3">
                    {l.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Band>

      <FeatureSplit
        tone="paper"
        title="Collection badges,"
        continuation="before anyone opens the product."
        intro="A short badge on each product card, wherever your theme lists products, tells customers they can subscribe. It never asks them to choose: that is the Picker’s job."
        points={[
          "A trial comes first: “Free trial” when the first order is free, else “Trial offer”.",
          "Then the saving: “Save 15%”, or “Save up to 15%” when the options save different amounts.",
          "Otherwise “Subscription available”. A sold-out product, or one with no Subora plan, gets no badge.",
          "On Dawn and themes with Dawn’s product cards, one app embed puts badges on every card. Other themes take the Subscription badge block in their product cards.",
        ]}
        mock={
          <BadgeGridMock label="Ember Hill Roasters’ coffee collection with Subora’s badges: Save 15%, Save up to 15%, Free trial, Trial offer and Subscription available, and a sold-out bag with no badge." />
        }
      />

      <FeatureSplit
        tone="frost"
        flip
        title="The Cart offer,"
        continuation="one last chance to subscribe."
        intro="Under each one-time item in the cart that has a subscription, the Cart offer shows the saving and a Subscribe button. One press turns the item into a subscription."
        points={[
          "When the item has several subscription options, a small chooser comes with it, because the frequency cannot be changed in the cart afterwards.",
          "It only goes one way, one-time to subscription. Items already on a subscription get no offer.",
          "One switch covers the cart page and the cart drawer, on Dawn and Horizon. On other themes it shows nothing yet.",
        ]}
        mock={
          <CartChooserMock label="Fernlee’s cart: a one-time bag of dry food with “Subscribe & save 10%”, a chooser set to Every 4 weeks for $48.60, and a Subscribe button. A second bag is already on a subscription every 4 weeks." />
        }
      />

      {/* The texts both share. */}
      <Band tone="paper" aria-labelledby="texts-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <SectionHeading
            id="texts-title"
            title="Your words,"
            continuation="or ours."
            intro="The badge and the Cart offer have the same settings in the theme editor. Leave a box empty to keep the standard words, and Subora fills in the saving it works out."
          />
          <SettingList settings={TEXT_SETTINGS} />
        </div>
      </Band>

      <FaqSection items={faqGroup("storefront").items} title="Questions about the storefront." tone="frost" />

      <UseCaseLinks features={["storefront"]} tone="paper" />

      <RelatedFeatures current={pages.storefront.path} tone="frost" />

      <ClosingCta title="Put subscriptions on your product pages." continuation="One Save in the theme editor." />
    </>
  );
}
