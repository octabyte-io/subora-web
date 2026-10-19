import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, discounted } from "@/content/demo-stores";
import { ANALYTICS_TABS, AdminFrame } from "./admin";
import { StoreFrame } from "./frame";

/**
 * Retention mocks for /features/retention/. The reason-to-offer table is
 * `OFFERS_FOR_REASON` in `subora/app/domain/portal/retention-offers.ts`; the
 * customer's words are the portal locale's (`cancelSteps`, `offers`,
 * `discountOffer`). The store is Mira Skin: a $28.80 serum, monthly, with a
 * Retention discount of 15% off the next 2 orders, asked on Oct 19.
 */

const skin = STORES.skincare;
const PRICE = discounted(skin.product.price, skin.product.save);
const DISCOUNTED = Math.round(PRICE * 85) / 100;

export type ReasonKey =
  | "too-expensive"
  | "too-much-product"
  | "dont-use-it-enough"
  | "delivery-too-frequent"
  | "product-issue"
  | "different-product"
  | "other";

export type OfferKey = "discount" | "skip-next-order" | "change-frequency" | "pause-30-days" | "pause-60-days" | "swap";

/** The seven reasons, in the portal's fixed order, Other last. */
export const REASONS: { key: ReasonKey; label: string }[] = [
  { key: "too-expensive", label: "Too expensive" },
  { key: "too-much-product", label: "Too much product" },
  { key: "dont-use-it-enough", label: "Don't use it enough" },
  { key: "delivery-too-frequent", label: "Delivery too frequent" },
  { key: "product-issue", label: "Product issue" },
  { key: "different-product", label: "I want a different product" },
  { key: "other", label: "Other" },
];

/** Subora's fixed table: each reason's offers, in the order they are shown. */
export const OFFERS_FOR_REASON: Record<ReasonKey, OfferKey[]> = {
  "too-expensive": ["discount"],
  "too-much-product": ["skip-next-order", "change-frequency", "pause-30-days"],
  "dont-use-it-enough": ["pause-30-days", "pause-60-days", "change-frequency"],
  "delivery-too-frequent": ["change-frequency", "skip-next-order"],
  "product-issue": ["swap"],
  "different-product": ["swap"],
  other: [],
};

/** Each offer's name on the merchant's switch and the Retention page (`RETENTION_OFFER_LABELS`). */
export const OFFER_LABELS: Record<OfferKey, string> = {
  discount: "Discount",
  "skip-next-order": "Skip next order",
  "change-frequency": "Change frequency",
  "pause-30-days": "Pause for 30 days",
  "pause-60-days": "Pause for 60 days",
  swap: "Swap",
};

/** Each offer's card as Mira Skin's customer reads it. */
const OFFER_CARDS: Record<OfferKey, { title: string; body: string; button: string }> = {
  discount: {
    title: "Get 15% off your next 2 orders",
    body: "Stay subscribed and pay 15% less for each of your next 2 orders. One press adds the discount to your subscription.",
    button: "Get 15% off",
  },
  "skip-next-order": {
    title: "Skip your next delivery",
    body: "You will not get the delivery on November 12, and you will not be charged for it. Your next delivery will be on December 12.",
    button: "Skip next delivery",
  },
  "change-frequency": {
    title: "Get it less often",
    body: "Change how often your order comes. You will see the new price and the next date before anything changes.",
    button: "Change how often",
  },
  "pause-30-days": {
    title: "Pause for 30 days",
    body: "No deliveries and no charges until November 18. Then it starts again by itself, and you are charged on November 18.",
    button: "Pause for 30 days",
  },
  "pause-60-days": {
    title: "Pause for 60 days",
    body: "No deliveries and no charges until December 18. Then it starts again by itself, and you are charged on December 18.",
    button: "Pause for 60 days",
  },
  swap: {
    title: "Swap to another product",
    body: "Choose a different product for your subscription. You will see the new price before anything changes.",
    button: "Choose a product",
  },
};

/** The store's primary button, in its own accent. */
function StoreButton({ children, quiet }: { children: string; quiet?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-lg px-3 text-[0.75rem] font-semibold",
        quiet && "border border-current/25",
      )}
      style={quiet ? undefined : { backgroundColor: skin.theme.accent, color: skin.theme.accentInk }}
    >
      {children}
    </span>
  );
}

/**
 * The portal's step after a reason: "We can help" and the reason's offers,
 * or, for Other, straight to the cancel confirmation.
 */
export function OffersPanel({ reason, className }: { reason: ReasonKey; className?: string }) {
  const offers = OFFERS_FOR_REASON[reason];

  if (offers.length === 0) {
    return (
      <div className={cn("rounded-xl border border-current/15 bg-white/70 p-4 text-[0.8125rem]", className)}>
        <p className="text-[1rem] font-bold tracking-[-0.01em]">Cancel your subscription?</p>
        <p className="mt-1.5 text-current/75">
          No more deliveries will be sent and you will not be charged again. You cannot undo this here: to start again,
          subscribe again in the store.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <StoreButton>Cancel subscription</StoreButton>
          <StoreButton quiet>Keep subscription</StoreButton>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-current/15 bg-white/70 p-4 text-[0.8125rem]", className)}>
      <p className="text-[1rem] font-bold tracking-[-0.01em]">We can help</p>
      <p className="mt-1 text-current/70">Instead of canceling, you can:</p>
      <ul className="mt-3 space-y-2.5">
        {offers.map((offer) => {
          const card = OFFER_CARDS[offer];
          return (
            <li key={offer} className="rounded-lg border border-current/20 p-3">
              <p className="font-semibold">{card.title}</p>
              <p className="mt-1 leading-5 text-current/75">{card.body}</p>
              <div className="mt-2.5">
                <StoreButton quiet>{card.button}</StoreButton>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-center text-current/70 underline underline-offset-2">No thanks, cancel</p>
    </div>
  );
}

/**
 * The hero: Mira Skin's cancel steps for "Too expensive". The reason, the
 * Discount offer, and the done step, the one amber-tint panel, since that is
 * a subscriber the store keeps.
 */
export function CancelToDiscountMock({ className, label }: { className?: string; label?: string }) {
  return (
    <StoreFrame store="skincare" nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="@container">
        <div className="grid gap-3 p-4 text-[0.8125rem] @lg:grid-cols-2 @lg:p-5">
          <div className="rounded-xl border border-current/15 bg-white/60 p-4">
            <p className="text-[1rem] font-bold tracking-[-0.01em]">Before you cancel</p>
            <p className="mt-1 text-current/70">Why do you want to cancel? This helps the store. You can skip it.</p>
            <ul className="mt-3 space-y-1.5">
              {REASONS.map(({ key, label: reason }) => {
                const on = key === "too-expensive";
                return (
                  <li key={key} className={cn("flex items-center gap-2.5 px-1 py-0.5", on && "font-semibold")}>
                    <span className="grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] border-current">
                      {on ? <span className="size-2 rounded-full bg-current" /> : null}
                    </span>
                    {reason}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-3">
              <StoreButton>Continue</StoreButton>
              <span className="text-current/70 underline underline-offset-2">Skip this question</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-current/15 bg-white/60 p-4">
              <p className="text-[1rem] font-bold tracking-[-0.01em]">We can help</p>
              <p className="mt-1 text-current/70">Instead of canceling, you can:</p>
              <div className="mt-3 rounded-lg border border-current/20 p-3">
                <p className="font-semibold">{OFFER_CARDS.discount.title}</p>
                <p className="mt-1 leading-5 text-current/75">{OFFER_CARDS.discount.body}</p>
                <div className="mt-2.5">
                  <StoreButton>{OFFER_CARDS.discount.button}</StoreButton>
                </div>
              </div>
              <p className="mt-3 text-center text-current/70 underline underline-offset-2">No thanks, cancel</p>
            </div>
            <div className="rounded-xl bg-amber-tint p-4 text-slate">
              <p className="flex items-center gap-2 text-[1rem] font-bold tracking-[-0.01em]">
                <Check className="size-4 shrink-0" strokeWidth={2.75} />
                You got 15% off
              </p>
              <p className="mt-1 pl-6 leading-5">
                Your next order will cost <Money amount={DISCOUNTED} className="font-semibold" />. Your subscription
                stays active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}

/**
 * Mira Skin's last 30 days, consistent with the home page's retention table:
 * 112 attempts, 51 saved (42 with an offer, 9 kept without one), and
 * $2,246.40 retained. A Kept save has no offer, so the By offer rows add up to
 * less than the top figure, as on the real page.
 */
const BY_OFFER: { offer: OfferKey; shown: number; accepted: number; retained: number }[] = [
  { offer: "discount", shown: 38, accepted: 14, retained: 777.6 },
  { offer: "skip-next-order", shown: 40, accepted: 9, retained: 403.2 },
  { offer: "change-frequency", shown: 59, accepted: 9, retained: 432 },
  { offer: "pause-30-days", shown: 45, accepted: 6, retained: 172.8 },
  { offer: "pause-60-days", shown: 19, accepted: 3, retained: 28.8 },
  { offer: "swap", shown: 7, accepted: 1, retained: 28.8 },
];

const pct = (part: number, whole: number) => `${Math.round((part / whole) * 100)}%`;

function Figure({ name, value, note, good }: { name: string; value: ReactNode; note?: string; good?: boolean }) {
  return (
    <div className={cn("min-w-0 rounded-xl p-3 ring-1", good ? "bg-amber-tint ring-amber/40" : "bg-paper ring-line")}>
      <p className={cn("flex items-center gap-1.5 text-[0.75rem] leading-4", good ? "text-slate" : "text-muted")}>
        {good ? <span className="size-1.5 shrink-0 rounded-full bg-amber" /> : null}
        {name}
      </p>
      <p className="mt-1 text-[1.25rem] leading-tight font-bold tracking-[-0.02em] tnum">{value}</p>
      {note ? <p className="mt-0.5 text-[0.6875rem] leading-4 text-muted">{note}</p> : null}
    </div>
  );
}

/** Analytics, Retention tab: the five figures, then the By offer table. */
export function RetentionByOfferMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame
      title="Retention"
      action="Export"
      tabs={ANALYTICS_TABS}
      activeTab="Retention"
      store={skin.name}
      label={label}
      className={cn("shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] ring-white/10", className)}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
        <Figure name="Cancel attempts" value="112" note="Last 30 days" />
        <Figure name="Canceled" value="61" />
        <Figure name="Saved" value="51" note="Offer accepted: 42 · Kept: 9" />
        <Figure name="Save rate" value="46%" />
      </div>
      <Figure
        name="Revenue retained"
        value={<Money amount={2246.4} />}
        note="Before tax and shipping"
        good
      />
      <div className="rounded-xl bg-paper pb-1 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line">
        <p className="px-3.5 pt-3.5 text-[0.8125rem] font-semibold sm:px-4">By offer</p>
        <table className="mt-2 w-full text-left text-[0.8125rem] tnum">
          <thead className="text-[0.75rem] text-muted">
            <tr className="border-b border-line">
              <th className="py-2 pl-3.5 font-medium sm:pl-4">Offer</th>
              <th className="px-2 py-2 text-right font-medium">Shown</th>
              <th className="px-2 py-2 text-right font-medium max-sm:hidden">Accepted</th>
              <th className="px-2 py-2 text-right font-medium">
                <span className="max-sm:hidden">Acceptance rate</span>
                <span className="sm:hidden">Rate</span>
              </th>
              <th className="py-2 pr-3.5 pl-2 text-right font-medium sm:pr-4">
                <span className="max-sm:hidden">Revenue retained</span>
                <span className="sm:hidden">Retained</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {BY_OFFER.map((row) => (
              <tr key={row.offer} className="border-b border-line last:border-0">
                <td className="py-2 pl-3.5 sm:pl-4">{OFFER_LABELS[row.offer]}</td>
                <td className="px-2 py-2 text-right">{row.shown}</td>
                <td className="px-2 py-2 text-right max-sm:hidden">{row.accepted}</td>
                <td className="px-2 py-2 text-right">{pct(row.accepted, row.shown)}</td>
                <td className="py-2 pr-3.5 pl-2 text-right sm:pr-4">
                  <Money amount={row.retained} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminFrame>
  );
}
