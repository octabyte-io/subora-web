"use client";

import { Lock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ALL_PORTAL_ACTIONS, PortalSubscriptionPage, type PortalAction } from "./features-2-portal";

/**
 * "What customers can do", the switches on Subora's Customer portal settings
 * page (labels from `subora/app/domain/portal/labels.ts`), driving a live
 * copy of the portal beside them: turn one off and its button leaves the
 * customer's page. Real switches, so it works from the keyboard.
 */

const SWITCHES: { action: PortalAction; label: string }[] = [
  { action: "skip", label: "Skip a delivery" },
  { action: "pause", label: "Pause a subscription" },
  { action: "reschedule", label: "Move a delivery earlier" },
  { action: "quantity", label: "Change the quantity" },
  { action: "frequency", label: "Change how often" },
  { action: "variant-change", label: "Change the variant" },
  { action: "address", label: "Change the shipping address" },
];

const ALWAYS_ON = ["Cancel a subscription", "Replace the payment card"];

export function PortalSwitchesDemo({ className }: { className?: string }) {
  const [allowed, setAllowed] = useState<PortalAction[]>([...ALL_PORTAL_ACTIONS]);
  const [said, setSaid] = useState("");

  function toggle(action: PortalAction, label: string) {
    const next = !allowed.includes(action);
    setAllowed((list) => (next ? [...list, action] : list.filter((a) => a !== action)));
    setSaid(next ? `${label} is on. Customers see it again.` : `${label} is off. Customers no longer see it.`);
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12",
        className,
      )}
    >
      <div className="rounded-[1.25rem] bg-paper p-5 shadow-[0_1px_0_rgb(43_48_56/0.04),0_28px_56px_-32px_rgb(28_32_38/0.45)] ring-1 ring-line sm:p-6">
        <h3 className="text-[1.125rem] font-semibold tracking-[-0.01em]">What customers can do</h3>
        <p className="mt-1 text-small text-muted">
          Choose what customers can change on their own subscriptions in the portal.
        </p>
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {SWITCHES.map(({ action, label }) => {
            const on = allowed.includes(action);
            return (
              <li key={action}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggle(action, label)}
                  className="flex min-h-12 w-full items-center justify-between gap-4 rounded-md py-2.5 text-left"
                >
                  <span className="font-medium">{label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative h-6 w-10 shrink-0 rounded-full transition-colors",
                      on ? "bg-slate" : "bg-[#8A919C]",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 size-5 rounded-full bg-paper shadow-sm transition-transform",
                        on && "translate-x-4",
                      )}
                    />
                  </span>
                </button>
              </li>
            );
          })}
          {ALWAYS_ON.map((label) => (
            <li key={label} className="flex min-h-12 items-center justify-between gap-4 py-2.5">
              <span className="font-medium">{label}</span>
              <span className="flex shrink-0 items-center gap-1.5 text-small text-muted">
                <Lock aria-hidden="true" className="size-3.5" />
                Always on
              </span>
            </li>
          ))}
        </ul>
        <p aria-live="polite" className="mt-4 min-h-[1.55em] text-small font-medium">
          {said}
        </p>
      </div>

      <PortalSubscriptionPage allowed={allowed} compact className="lg:sticky lg:top-28" />
    </div>
  );
}
