import { X } from "lucide-react";
import { STORES } from "@/content/demo-stores";
import { PLANS, planCost } from "@/content/plans";
import { AdminFrame } from "./admin";

/**
 * Subora's Upgrade prompt on the admin's Home page, for Ember Hill Roasters
 * on Free. Words follow `subora/app/domain/fee/upgrade-prompt.ts`
 * (`upgradePromptWords`) and the button `app.upgrade-prompt/route.server.ts`.
 */
const SALES = 5_000;
const [free, growth] = PLANS;
const freeCost = planCost(free, SALES);
const growthCost = planCost(growth, SALES);
const growthFees = growth.feeRate * SALES;

const whole = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export function UpgradePromptMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title="Home" store={STORES.coffee.name} className={className} label={label}>
      <div className="rounded-xl bg-[#EAF4FF] p-3.5 ring-1 ring-[#A8CDF5] sm:p-4">
        <div className="flex items-start gap-3">
          <p className="font-semibold">
            {growth.name} would cost you about {whole(freeCost - growthCost)} less each month.
          </p>
          <X aria-hidden="true" className="ml-auto size-4 shrink-0 text-muted" />
        </div>
        <p className="mt-2">
          In the last 30 days, the sales that count toward Subora’s fees came to about {whole(SALES)}. On {free.name},
          that cost you about {whole(freeCost)} in transaction fees. On {growth.name}, it would have cost about{" "}
          {whole(growthCost)} ({whole(growth.monthlyUsd)} monthly + {whole(growthFees)} in fees).
        </p>
        <p className="mt-2 text-muted">Estimate based on your last 30 days. Future months may differ.</p>
        <span className="mt-3 inline-flex h-7 items-center rounded-lg bg-paper px-3 text-[0.75rem] font-semibold shadow-[0_1px_0_rgb(43_48_56/0.12)] ring-1 ring-line">
          Compare plans
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { name: "Active subscriptions", value: "327" },
          { name: "Subscription revenue", value: "$5,003" },
        ].map((tile) => (
          <div key={tile.name} className="rounded-xl bg-paper p-3 ring-1 ring-line">
            <p className="truncate text-[0.75rem] text-muted">{tile.name}</p>
            <p className="mt-1 text-[1.125rem] font-bold tnum">{tile.value}</p>
          </div>
        ))}
      </div>
    </AdminFrame>
  );
}
