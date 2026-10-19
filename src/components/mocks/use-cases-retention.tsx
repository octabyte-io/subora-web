import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, discounted } from "@/content/demo-stores";
import { StoreFrame } from "./frame";
import { ProductArt } from "./product-art";

/**
 * The portal's cancel steps on Mira Skin, with the offers Subora really pairs
 * with each reason (`OFFERS_FOR_REASON` in
 * `subora/app/domain/portal/retention-offers.ts`), in the portal locale's
 * words (`cancelSteps`, `offers`, `discountOffer`, `cancelHold`).
 */

const REASONS = [
  "Too expensive",
  "Too much product",
  "Don't use it enough",
  "Delivery too frequent",
  "Product issue",
  "I want a different product",
  "Other",
] as const;

export type OfferReason = "Too expensive" | "Too much product";

/** The example discount the merchant set: 15% off the next 2 orders. */
export const EXAMPLE_DISCOUNT = { percent: 15, orders: 2 };

function Offer({ title, body, good }: { title: string; body?: string; good?: boolean }) {
  return (
    <li className={cn("rounded-lg px-3 py-2.5", good ? "bg-amber-tint text-slate" : "border border-current/20")}>
      <span className="flex items-center gap-2 font-semibold">
        {good ? <Check className="size-4 shrink-0" strokeWidth={2.5} /> : null}
        {title}
      </span>
      {body ? <span className={cn("mt-0.5 block", good ? "pl-6" : "text-current/70")}>{body}</span> : null}
    </li>
  );
}

function OffersFor({ reason }: { reason: OfferReason }) {
  const { percent, orders } = EXAMPLE_DISCOUNT;
  if (reason === "Too expensive") {
    return (
      <Offer
        good
        title={`Get ${percent}% off your next ${orders} orders`}
        body={`Stay subscribed and pay ${percent}% less for each of your next ${orders} orders. One press adds the discount to your subscription.`}
      />
    );
  }
  return (
    <>
      <Offer
        title="Skip your next delivery"
        body="You will not get the delivery on November 12, and you will not be charged for it. Your next delivery will be on December 12."
      />
      <Offer title="Get it less often" />
      <Offer title="Pause for 30 days" />
    </>
  );
}

export function CancelOffersMock({
  reason,
  className,
  label,
}: {
  reason: OfferReason;
  className?: string;
  label?: string;
}) {
  const s = STORES.skincare;
  return (
    <StoreFrame store="skincare" nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="@container">
        <div className="grid gap-3 p-4 text-[0.8125rem] @lg:grid-cols-2 @lg:p-5">
          <div className="rounded-xl border border-current/15 bg-white/60 p-4">
            <p className="text-[1rem] font-bold tracking-[-0.01em]">Before you cancel</p>
            <p className="mt-1 text-current/70">Why do you want to cancel? This helps the store. You can skip it.</p>
            <ul className="mt-3 space-y-1.5">
              {REASONS.map((r) => {
                const on = r === reason;
                return (
                  <li key={r} className={cn("flex items-center gap-2.5 px-1 py-0.5", on && "font-semibold")}>
                    <span className="grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] border-current">
                      {on ? <span className="size-2 rounded-full bg-current" /> : null}
                    </span>
                    {r}
                  </li>
                );
              })}
            </ul>
            <div
              className="mt-4 flex h-10 items-center justify-center rounded-lg font-semibold"
              style={{ backgroundColor: s.theme.accent, color: s.theme.accentInk }}
            >
              Continue
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-current/15 bg-white/60 p-4">
            <p className="text-[1rem] font-bold tracking-[-0.01em]">We can help</p>
            <p className="mt-1 text-current/70">Instead of canceling, you can:</p>
            <ul className="mt-3 space-y-2">
              <OffersFor reason={reason} />
            </ul>
            <p className="mt-auto pt-4 text-center text-current/70 underline underline-offset-2">No thanks, cancel</p>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}

/**
 * A subscription on a plan with Minimum orders: Skip and Pause are there,
 * and the cancel link is replaced by the condition, said before anyone asks.
 */
export function MinimumOrdersMock({ className, label }: { className?: string; label?: string }) {
  const { title, variant, price, save } = STORES.skincare.product;
  return (
    <StoreFrame store="skincare" nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="p-5 text-[0.875rem]">
        <p className="text-[0.8125rem] text-current/70 underline underline-offset-2">Subscriptions</p>
        <div className="mt-3 flex items-center gap-3">
          <ProductArt store="skincare" className="w-14 shrink-0 rounded-lg" />
          <div className="min-w-0">
            <p className="text-[1rem] leading-snug font-bold tracking-[-0.01em]">{title}</p>
            <p className="text-[0.75rem] text-current/70">{variant}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-current/15 bg-white/60 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div>
              <p className="text-[0.75rem] text-current/70">Your next delivery</p>
              <p className="text-[1.0625rem] font-bold">Thursday, November 12</p>
            </div>
            <Money amount={discounted(price, save)} className="text-[1.0625rem] font-semibold" />
          </div>
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-[0.8125rem] font-semibold">
            {["Skip this delivery", "Pause subscription"].map((action) => (
              <span
                key={action}
                className="flex min-h-9 items-center justify-center rounded-lg border border-current/25 px-2 py-1.5 text-center leading-tight"
              >
                {action}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 rounded-lg border border-current/15 px-3 py-2.5 text-[0.8125rem]">
          You can cancel after 3 orders. You have had 1 so far.
        </p>
      </div>
    </StoreFrame>
  );
}
