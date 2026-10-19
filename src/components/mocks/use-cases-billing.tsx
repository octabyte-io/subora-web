import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STORES } from "@/content/demo-stores";
import { PLANS, planCost } from "@/content/plans";
import { FERNLEE_MONTH } from "@/content/use-cases/arithmetic";
import { AdminFrame } from "./admin";

/**
 * Two Subora settings and notices, for the use-case posts: the Payment
 * retries form (words from `subora/app/routes/app.payment-retries/fields.ts`,
 * defaults from `DEFAULT_RETRY_RULES`) and the Upgrade prompt on Home (words
 * from `upgradePromptWords` in `subora/app/domain/fee/upgrade-prompt.ts`).
 */

function Field({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <p className="text-[0.75rem] leading-5">{label}</p>
      <p className="mt-1 flex items-center gap-2">
        <span className="inline-flex h-8 w-16 items-center rounded-lg bg-paper px-2.5 font-semibold tnum ring-1 ring-slate/25">
          {value}
        </span>
        {unit ? <span className="text-[0.75rem] text-muted">{unit}</span> : null}
      </p>
    </div>
  );
}

function Section({ title, body, children }: { title: string; body?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-paper p-3.5 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line sm:p-4">
      <p className="text-[0.8125rem] font-semibold">{title}</p>
      {body ? <p className="mt-1 text-[0.75rem] leading-5 text-muted">{body}</p> : null}
      <div className="mt-3">{children}</div>
    </div>
  );
}

const END_RESULTS = ["Pause the subscription", "Cancel the subscription", "Skip the order", "Wait for a new card"];

/** Fernlee's Payment retries page, on the defaults every store starts with. */
export function RetryRulesMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title="Payment retries" store={STORES.pet.name} className={className} label={label}>
      <Section
        title="Retries"
        body="When a renewal payment fails, Subora tries to take it again. Each try is a retry."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Number of retries" value="3" />
          <Field label="Retry 1: days after the failed payment" value="1" />
          <Field label="Retry 2: days after retry 1" value="3" />
          <Field label="Retry 3: days after retry 2" value="5" />
        </div>
      </Section>
      <Section title="Recovery period" body="How long Subora keeps trying, counted from when the payment failed.">
        <Field label="Maximum recovery period" value="14" unit="days" />
        <p className="mt-3 text-[0.75rem] leading-5">When the retries run out</p>
        <ul className="mt-1.5 space-y-1 text-[0.8125rem]">
          {END_RESULTS.map((result) => {
            const on = result === "Wait for a new card";
            return (
              <li key={result} className={cn("flex items-center gap-2", on && "font-semibold")}>
                <span className="grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] border-slate">
                  {on ? <span className="size-2 rounded-full bg-slate" /> : null}
                </span>
                {result}
              </li>
            );
          })}
        </ul>
      </Section>
    </AdminFrame>
  );
}

const whole = (amount: number) => `$${Math.round(amount).toLocaleString("en-US")}`;

/**
 * The Upgrade prompt for Fernlee on Growth: 400 renewals at $48.60 in the
 * last 30 days. The saving is money staying with the merchant, so the banner
 * is the amber tint, with slate text.
 */
export function UpgradePromptMock({ className, label }: { className?: string; label?: string }) {
  const sales = FERNLEE_MONTH.renewals * FERNLEE_MONTH.price;
  const [, growth, pro] = PLANS;
  const growthCost = planCost(growth, sales);
  const proCost = planCost(pro, sales);
  return (
    <AdminFrame title="Home" store={STORES.pet.name} className={className} label={label}>
      <div className="rounded-xl bg-amber-tint p-4 text-slate ring-1 ring-amber/40">
        <p className="flex items-start gap-2 font-semibold">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber" />
          Pro would cost you about {whole(growthCost - proCost)} less each month.
        </p>
        <p className="mt-2 pl-4 text-[0.8125rem] leading-5">
          In the last 30 days, the sales that count toward Subora’s fees came to about {whole(sales)}. On Growth,
          that cost you about {whole(growthCost)}. On Pro, it would have cost about{" "}
          {`${whole(proCost)} (${whole(pro.monthlyUsd)} monthly)`}.
        </p>
        <p className="mt-2 pl-4 text-[0.75rem] leading-5 text-slate/75">
          Estimate based on your last 30 days. Future months may differ.
        </p>
        <span className="mt-3 ml-4 inline-flex h-8 items-center rounded-lg bg-paper px-3 text-[0.8125rem] font-semibold ring-1 ring-slate/25">
          Compare plans
        </span>
      </div>
    </AdminFrame>
  );
}
