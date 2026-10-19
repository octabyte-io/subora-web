"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { StoreFrame } from "./frame";
import { OFFERS_FOR_REASON, OFFER_LABELS, OffersPanel, REASONS, type ReasonKey } from "./features-2-retention";

/**
 * Pick a Cancellation reason and see the step Mira Skin's customer gets next:
 * the reason's Retention offers in Subora's order, or, for Other, the cancel
 * confirmation. Native radios, so it works from the keyboard and reads well.
 */
export function ReasonPickerDemo({ className }: { className?: string }) {
  const [reason, setReason] = useState<ReasonKey>("too-much-product");
  const name = useId();
  const offers = OFFERS_FOR_REASON[reason];
  const label = REASONS.find((r) => r.key === reason)?.label;

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12",
        className,
      )}
    >
      <fieldset>
        <legend className="text-[1.125rem] font-semibold tracking-[-0.01em]">Why do you want to cancel?</legend>
        <p className="mt-1 text-small text-muted">Pick a reason as a customer would.</p>
        <div className="mt-4 divide-y divide-line border-y border-line">
          {REASONS.map((r) => (
            <label key={r.key} className="flex min-h-12 cursor-pointer items-center gap-3 py-2.5">
              <input
                type="radio"
                name={name}
                value={r.key}
                checked={reason === r.key}
                onChange={() => setReason(r.key)}
                className="size-4.5 shrink-0 accent-slate"
              />
              <span className={cn(reason === r.key && "font-semibold")}>{r.label}</span>
            </label>
          ))}
        </div>
        <p aria-live="polite" className="mt-4 text-small text-muted">
          {offers.length
            ? `${label}: ${offers.map((o) => OFFER_LABELS[o]).join(", ")}.`
            : `${label}: no offer. The customer goes straight to the cancel confirmation, with their own words if they add some.`}
        </p>
      </fieldset>

      <StoreFrame store="skincare" nav={["Orders", "Subscriptions", "Profile"]}>
        <div className="p-4 sm:p-5">
          <OffersPanel reason={reason} />
        </div>
      </StoreFrame>
    </div>
  );
}
