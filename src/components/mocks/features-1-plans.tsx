import type { ReactNode } from "react";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, discounted } from "@/content/demo-stores";
import { AdminFrame } from "./admin";

/**
 * Subora's plan form (`subora/app/routes/app.plans.new/*`), in its own labels and defaults, for
 * the Subscription plans page. Figures follow the demo stores: Ember Hill's House Espresso at 15%
 * off ($15.30), Mira Skin's serum at 10% off the first 2 orders, then 15%.
 */

/** A white section card of the admin form, titled as the form titles it. */
function FormCard({ title, className, children }: { title?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl bg-paper p-3.5 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line sm:p-4", className)}>
      {title ? <p className="mb-2.5 text-[0.8125rem] font-semibold">{title}</p> : null}
      {children}
    </div>
  );
}

/** A Polaris-style field: label above, a bordered box below. */
function Field({ label, value, className }: { label: string; value: ReactNode; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-[0.75rem] text-muted">{label}</p>
      <p className="mt-1 flex min-h-8 items-center rounded-lg py-1 bg-paper px-2.5 text-[0.8125rem] ring-1 ring-[#8A8A8A]/60">
        {value}
      </p>
    </div>
  );
}

function Box({ on, label }: { on?: boolean; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[0.8125rem]">
      <span
        className={cn(
          "grid size-4 shrink-0 place-items-center rounded-[0.3rem] ring-1",
          on ? "bg-slate text-paper ring-slate" : "bg-paper ring-[#8A8A8A]/70",
        )}
      >
        {on ? <Check className="size-3" strokeWidth={3} /> : null}
      </span>
      {label}
    </span>
  );
}

function AdminButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-7 w-fit items-center rounded-lg bg-paper px-3 text-[0.75rem] font-semibold shadow-[0_1px_0_rgb(43_48_56/0.12)] ring-1 ring-line">
      {children}
    </span>
  );
}

const TOGGLES = [
  { label: "Every week", on: false },
  { label: "Every 2 weeks", on: true },
  { label: "Every month", on: false },
  { label: "Every 2 months", on: false },
  { label: "Every 3 months", on: false },
];

/** Ember Hill's Ongoing plan: one price, three frequencies, and the In short summary beside it. */
export function PlanFormMock({ className, label }: { className?: string; label?: string }) {
  const { price, save } = STORES.coffee.product;
  return (
    <AdminFrame title="Espresso subscription" store={STORES.coffee.name} className={className} label={label}>
      <FormCard title="Price">
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-2.5">
          <Field label="Price" value="Percentage off" />
          <Field label="Percent off" value={<span className="tnum">{save} %</span>} />
        </div>
        <div className="mt-3">
          <AdminButton>Change the price after some orders</AdminButton>
        </div>
      </FormCard>

      <FormCard title="Deliveries">
        <p className="text-[0.75rem] text-muted">Tick every frequency a buyer may choose. They all share this plan’s price.</p>
        <div className="mt-2.5 grid grid-cols-1 gap-x-4 gap-y-2 min-[420px]:grid-cols-2">
          {TOGGLES.map((t) => (
            <Box key={t.label} on={t.on} label={t.label} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <Field label="Other: every" value={<span className="tnum">4</span>} />
          <Field label="Unit" value="weeks" />
          <Field label="Other: every" value={<span className="tnum">6</span>} />
          <Field label="Unit" value="weeks" />
        </div>
      </FormCard>

      <FormCard title="In short">
        <ul className="list-disc space-y-1 pl-4 text-[0.8125rem]">
          <li>
            Buyers pay <Money amount={discounted(price, save)} /> ({save}% off) for every order.
          </li>
          <li>Buyers choose every 2 weeks, every 4 weeks or every 6 weeks.</li>
          <li>The subscription goes on until the buyer cancels.</li>
        </ul>
      </FormCard>
    </AdminFrame>
  );
}

/** Mira Skin's plan, edited: the subscriber note, the later price, and the Activity entry it leaves. */
export function PlanEditMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title="Serum subscription" store={STORES.skincare.name} className={className} label={label}>
      <div className="rounded-xl bg-[#EAF4FF] p-3.5 text-[0.8125rem] ring-1 ring-[#0094D5]/30">
        <p className="flex items-center gap-2 font-semibold">
          <Info className="size-4 shrink-0" />
          This plan has subscribers
        </p>
        <p className="mt-1.5">64 subscribers keep their current price and frequency. Your changes apply to new buyers.</p>
        <p className="mt-1.5">
          One exception: a subscriber who changes frequency in the customer portal moves onto this plan’s current price
          rule.
        </p>
      </div>

      <FormCard title="Price">
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-2.5">
          <Field label="Price at first" value="Percentage off" />
          <Field label="Percent off" value={<span className="tnum">10 %</span>} />
        </div>
        <div className="mt-2.5 grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,1fr)] gap-2.5">
          <Field label="From order" value={<span className="tnum">3</span>} />
          <Field label="Then" value="Percentage off" />
          <Field label="Percent off" value={<span className="tnum">15 %</span>} />
        </div>
      </FormCard>

      <FormCard title="Activity">
        <p className="text-[0.8125rem] font-semibold">Plan: Edit</p>
        <p className="mt-1 text-[0.8125rem] text-muted">
          Price: 10% off every order → 10% off orders 1 to 2, then 15% off
        </p>
      </FormCard>
    </AdminFrame>
  );
}

/**
 * "10% off the first 2 orders, then 15%", order by order, on Mira Skin's $32 serum. A plain figure
 * in the site's own style rather than a screen: orders are a real sequence, so they are numbered.
 */
export function LaterPriceLadder({ className, label }: { className?: string; label?: string }) {
  const { price } = STORES.skincare.product;
  const orders = [1, 2, 3, 4, 5, 6].map((n) => ({ n, amount: discounted(price, n <= 2 ? 10 : 15), later: n > 2 }));
  return (
    <figure role="img" aria-label={label} className={cn("select-none", className)}>
      <div aria-hidden="true" className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-6">
        {orders.map((o) => (
          <div key={o.n} className={cn("px-3 py-4 sm:px-4", o.later ? "bg-paper" : "bg-frost")}>
            <p className="text-small text-muted">Order {o.n}</p>
            <Money amount={o.amount} className="mt-1 block text-[1.25rem] font-semibold tracking-[-0.02em]" />
            <p className="mt-0.5 text-small text-muted">{o.later ? "15% off" : "10% off"}</p>
          </div>
        ))}
      </div>
      <figcaption aria-hidden="true" className="mt-3 text-small text-muted">
        {STORES.skincare.name}’s {STORES.skincare.product.title}, <Money amount={price} /> without a subscription.
      </figcaption>
    </figure>
  );
}
