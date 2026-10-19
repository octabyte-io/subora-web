import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STORES, type StoreKey } from "@/content/demo-stores";
import { StoreFrame } from "./frame";

/**
 * The portal's cancel steps in a demo store's customer account: the optional
 * reason, then the offers Subora pairs with it (`OFFERS_FOR_REASON` in
 * `subora/app/domain/portal/retention-offers.ts`). Too much product gets
 * skip, less often and a 30-day pause; the discount only follows Too
 * expensive. The accepted offer is the one amber-tint card, since it is the
 * subscription the store keeps.
 */

const REASONS = [
  "Too expensive",
  "Too much product",
  "Don't use it enough",
  "Delivery too frequent",
  "Product issue",
  "I want a different product",
  "Other",
];

/** Too much product's offers, in Subora's order. The customer takes the skip. */
const OFFERS = ["Skip your next delivery", "Get it less often", "Pause for 30 days"];
const ACCEPTED = OFFERS[0];

export function CancelFlowMock({
  store = "skincare",
  className,
  label,
}: {
  store?: StoreKey;
  className?: string;
  label?: string;
}) {
  const s = STORES[store];
  return (
    <StoreFrame store={store} nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="@container">
        <div className="grid gap-3 p-4 text-[0.8125rem] @lg:grid-cols-2 @lg:p-5">
          <div className="rounded-xl border border-current/15 bg-white/60 p-4">
            <p className="text-[1rem] font-bold tracking-[-0.01em]">Before you cancel</p>
            <p className="mt-1 text-current/70">Why do you want to cancel? This helps the store. You can skip it.</p>
            <ul className="mt-3 space-y-1.5">
              {REASONS.map((reason) => {
                const on = reason === "Too much product";
                return (
                  <li key={reason} className={cn("flex items-center gap-2.5 rounded-md px-1 py-0.5", on && "font-semibold")}>
                    <span className="grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] border-current">
                      {on ? <span className="size-2 rounded-full bg-current" /> : null}
                    </span>
                    {reason}
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
            <ul className="mt-3 space-y-2 font-semibold">
              {OFFERS.map((offer) =>
                offer === ACCEPTED ? (
                  <li key={offer} className="rounded-lg bg-amber-tint px-3 py-2.5 text-slate">
                    <span className="flex items-center gap-2">
                      <Check className="size-4 shrink-0" strokeWidth={2.5} />
                      {offer}
                    </span>
                    <span className="mt-0.5 block pl-6 font-normal">Your subscription stays active.</span>
                  </li>
                ) : (
                  <li key={offer} className="rounded-lg border border-current/20 px-3 py-2.5">
                    {offer}
                  </li>
                ),
              )}
            </ul>
            <p className="mt-auto pt-4 text-center text-current/70 underline underline-offset-2">No thanks, cancel</p>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}
