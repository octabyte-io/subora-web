"use client";

import { useId, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { PLANS, cheapestPlan, feeLabel, planCost } from "@/content/plans";

/**
 * "Which plan is cheapest for me?" One slider of monthly subscription
 * revenue; each plan's cost for 30 days, with the cheapest one filled amber.
 * The slider runs on a cubic scale so small stores get fine steps.
 */
const MAX = 100_000;
const STEPS = 1000;

function revenueAt(step: number) {
  const raw = MAX * (step / STEPS) ** 3;
  const unit = raw < 5_000 ? 50 : raw < 20_000 ? 100 : 500;
  return Math.round(raw / unit) * unit;
}

function stepFor(revenue: number) {
  return Math.round(STEPS * Math.cbrt(revenue / MAX));
}

const usd = (n: number, cents = false) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });

export function PlanCalculator({ initialRevenue = 5_000, className }: { initialRevenue?: number; className?: string }) {
  const id = useId();
  const [step, setStep] = useState(stepFor(initialRevenue));
  const revenue = revenueAt(step);
  const best = cheapestPlan(revenue);

  return (
    <div className={cn("rounded-[1.5rem] bg-paper p-5 ring-1 ring-line sm:p-8", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <label htmlFor={id} className="font-semibold">
          Your monthly subscription revenue
        </label>
        <output htmlFor={id} className="text-d2 font-semibold tracking-[-0.03em] tnum" aria-live="polite">
          {usd(revenue)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={STEPS}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        aria-valuetext={`${usd(revenue)} a month`}
        className="range mt-5 w-full"
        style={{ "--fill": `${(step / STEPS) * 100}%` } as CSSProperties}
      />
      <div aria-hidden="true" className="mt-2 flex justify-between text-small text-muted tnum">
        <span>$0</span>
        <span>$100,000</span>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PLANS.map((plan) => {
          const cheapest = plan.key === best.key;
          const cost = planCost(plan, revenue);
          return (
            <li
              key={plan.key}
              className={cn(
                "relative rounded-2xl px-5 py-4 ring-1 transition-colors",
                cheapest ? "bg-amber-tint ring-2 ring-amber" : "ring-line",
              )}
            >
              <p className="flex items-center justify-between gap-3">
                <span className="font-semibold">{plan.name}</span>
                {cheapest ? (
                  <span className="rounded-full bg-amber px-2.5 py-0.5 text-small font-semibold text-slate">
                    Cheapest
                  </span>
                ) : null}
              </p>
              <p className="mt-2 text-d3 font-semibold tracking-[-0.02em] tnum">
                {usd(cost, cost % 1 !== 0)}
                <span className="text-small font-medium text-muted"> a month</span>
              </p>
              <p className="mt-1 text-small text-muted tnum">
                ${plan.monthlyUsd} + {feeLabel(plan)} of {usd(revenue)}
              </p>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-small text-muted measure">
        An estimate. The fee counts the subscription lines of each order after discounts, without tax, shipping or
        tips. Subora keeps comparing your last 30 days of fees and tells you when another Subora plan would cost
        less, cheaper ones included.
      </p>
    </div>
  );
}
