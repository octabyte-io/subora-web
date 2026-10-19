"use client";

import { useId, useState, type CSSProperties } from "react";
import { CreditCard, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The default Retry rules drawn to scale, for a slate band: 3 retries after
 * 1, 3 and 5 days (days 1, 4 and 9), a 14-day recovery period, then the end
 * result the visitor picks. Rules: `subora/app/domain/billing/retry-rules.ts`;
 * end words: `domain/subscription/run-banner.ts` and `notification/payment-card.ts`.
 *
 * A real sequence, so the retries carry their numbers. Below `xl` it reads
 * top to bottom; from `xl` up the same list is laid along a day axis.
 */

type EndKey = "paused" | "cancelled" | "skipped" | "pending_payment_update";

const END_RESULTS: { key: EndKey; label: string; does: string; email: string; tail: string }[] = [
  {
    key: "pending_payment_update",
    label: "Wait for a new card",
    does: "Subora waits for the customer to update their card until shortly before the next order, then skips this delivery.",
    email: "Your order is not placed yet",
    tail: "Waiting days: a new card can still pay for this order",
  },
  {
    key: "paused",
    label: "Pause the subscription",
    does: "Subora skips this delivery and pauses the subscription.",
    email: "Your subscription is paused",
    tail: "Paused until the customer starts it again",
  },
  {
    key: "cancelled",
    label: "Cancel the subscription",
    does: "Subora skips this delivery and cancels the subscription.",
    email: "Your subscription is canceled",
    tail: "Canceled: nothing more ships",
  },
  {
    key: "skipped",
    label: "Skip the order",
    does: "Subora skips this delivery. The next delivery is charged as usual.",
    email: "Your order is skipped",
    tail: "The next order is charged as usual",
  },
];

/** Days drawn: the 14-day period, then a week of what comes after it. */
const SPAN = 21;
const LAST_DAY = 14;

type Point = {
  day: number;
  title: string;
  note: string;
  kind: "failed" | "retry" | "email" | "end";
  retry?: number;
  /** Which side of the axis the words sit on, from `xl` up, so neighbours never collide. */
  side: "above" | "below";
};

const POINTS: Point[] = [
  { day: 0, title: "Payment fails", note: "Customer emailed", kind: "failed", side: "above" },
  { day: 1, title: "Retry 1", note: "1 day after the failure", kind: "retry", retry: 1, side: "below" },
  { day: 4, title: "Retry 2", note: "3 days after retry 1", kind: "retry", retry: 2, side: "above" },
  { day: 8, title: "Last try email", note: "A day before the last retry", kind: "email", side: "below" },
  { day: 9, title: "Retry 3, the last try", note: "5 days after retry 2", kind: "retry", retry: 3, side: "above" },
  { day: LAST_DAY, title: "Last day", note: "The 14-day recovery period ends", kind: "end", side: "below" },
];

const at = (day: number) => `${(day / SPAN) * 100}%`;

function Marker({ point }: { point: Point }) {
  if (point.kind === "retry") {
    return (
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-paper text-[0.8125rem] font-bold text-slate tnum">
        {point.retry}
      </span>
    );
  }
  if (point.kind === "email") {
    return (
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate ring-2 ring-white/50">
        <Mail aria-hidden="true" className="size-3.5 text-paper" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full",
        point.kind === "failed" ? "bg-slate ring-2 ring-paper" : "bg-white/15 ring-2 ring-paper",
      )}
    >
      <span className="size-2 rounded-full bg-paper" />
    </span>
  );
}

export function RetryTimeline({ className }: { className?: string }) {
  const id = useId();
  const [end, setEnd] = useState<EndKey>("pending_payment_update");
  const chosen = END_RESULTS.find((r) => r.key === end) ?? END_RESULTS[0];
  const waiting = end === "pending_payment_update";

  return (
    <div className={cn("rounded-[1.5rem] bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-8", className)}>
      <fieldset>
        <legend className="font-semibold">When the retries run out</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {END_RESULTS.map((r) => (
            <label key={r.key} className="relative">
              <input
                type="radio"
                name={`${id}-end`}
                value={r.key}
                checked={end === r.key}
                onChange={() => setEnd(r.key)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex h-10 cursor-pointer items-center rounded-full px-4 text-small font-semibold ring-1 transition-colors",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber",
                  end === r.key
                    ? "bg-paper text-slate ring-paper"
                    : "text-paper ring-white/30 hover:ring-white/60",
                )}
              >
                {r.label}
                {r.key === "pending_payment_update" ? <span className="ml-1.5 font-medium opacity-70">(default)</span> : null}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* The ladder. Narrow: a list down the page. xl: the same list along a day axis. */}
      <div className="relative mt-10 xl:mt-12 xl:h-64">
        {/* The axis, its period and what follows it (xl only). */}
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 xl:block">
          <div className="relative h-1.5">
            <span className="absolute inset-y-0 left-0 rounded-full bg-white/35" style={{ width: at(LAST_DAY) }} />
            <span
              className={cn(
                "absolute inset-y-0 right-0 rounded-full transition-opacity duration-300",
                waiting
                  ? "bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.45)_0_6px,transparent_6px_11px)]"
                  : "bg-white/10",
              )}
              style={{ left: at(LAST_DAY + 0.3) }}
            />
          </div>
        </div>

        <ol className="relative space-y-5 border-l border-white/20 pl-6 xl:static xl:space-y-0 xl:border-0 xl:pl-0">
          {POINTS.map((p) => (
            <li
              key={p.title}
              className={cn(
                "relative xl:absolute xl:flex xl:w-40 xl:[left:var(--x)]",
                p.day === 0
                  ? "xl:-translate-x-3.5 xl:items-start xl:text-left"
                  : "xl:-translate-x-1/2 xl:items-center xl:text-center",
                p.side === "above" ? "xl:bottom-1/2 xl:flex-col-reverse" : "xl:top-1/2 xl:flex-col",
              )}
              style={{ "--x": at(p.day) } as CSSProperties}
            >
              <span
                className={cn(
                  "absolute top-0 -left-[2.375rem] xl:static",
                  p.side === "above" ? "xl:-mb-3.5" : "xl:-mt-3.5",
                )}
              >
                <Marker point={p} />
              </span>
              <span className={cn("block", p.side === "above" ? "xl:mb-3" : "xl:mt-3")}>
                {/* Below xl the day trails the title; on the axis it gets its own line, so a title never breaks around it. */}
                <span className="block font-semibold">
                  {p.title}
                  <span className="font-medium whitespace-nowrap text-white/60 xl:hidden"> · day {p.day}</span>
                </span>
                <span className="hidden text-small font-medium text-white/60 xl:block">Day {p.day}</span>
                <span className="block text-small text-white/70">{p.note}</span>
              </span>
            </li>
          ))}
          <li
            className="relative xl:absolute xl:bottom-1/2 xl:mb-[1.4rem] xl:w-48 xl:-translate-x-1/2 xl:text-center xl:[left:var(--x)]"
            style={{ "--x": at((LAST_DAY + SPAN) / 2) } as CSSProperties}
          >
            <span className="absolute top-1.5 -left-[1.9rem] size-3 rounded-full border-2 border-dashed border-white/60 xl:hidden" />
            <span className="block font-semibold">After the last day</span>
            <span className="block text-small text-white/70">{chosen.tail}</span>
          </li>
        </ol>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/15 pt-6 md:grid-cols-2 xl:mt-6">
        <p className="text-white/80" aria-live="polite">
          <span className="block font-semibold text-paper">On the last day</span>
          {chosen.does} The customer gets one email: “{chosen.email}”.
        </p>
        <p className="flex gap-3 text-white/80">
          <CreditCard aria-hidden="true" className="mt-1 size-5 shrink-0 text-amber" />
          <span>
            <span className="block font-semibold text-paper">A new card, any day until the end</span>
            Subora tries it straight away, outside your three retries. When any try goes through, the payment is{" "}
            <span className="font-semibold text-amber">recovered</span> and the customer hears it went through.
          </span>
        </p>
      </div>
    </div>
  );
}
