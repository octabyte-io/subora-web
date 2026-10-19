import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { Mark } from "@/components/site/logo";
import { STORES, discounted } from "@/content/demo-stores";
import { MockShell } from "./frame";

/**
 * Mocks of Subora's admin screens. Labels follow `subora/app/routes/app.analytics*`;
 * figures are an invented store's and kept consistent with each other.
 */

/** Analytics' tab strip, in the app's order (`app.analytics/address.ts`). */
export const ANALYTICS_TABS = ["Subscribers", "Revenue", "Churn", "Retention", "Failed payments", "Activity"];

/**
 * A merchant-admin page: a grey ground, a slim app bar with the Subora mark,
 * the page title with an optional header action, and an optional tab strip.
 */
export function AdminFrame({
  title,
  action,
  tabs,
  activeTab,
  store,
  className,
  label,
  children,
}: {
  title: string;
  /** A secondary header action, such as "Export". */
  action?: string;
  tabs?: string[];
  activeTab?: string;
  /** The store name on the right of the app bar. */
  store?: string;
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <MockShell label={label} className={cn("bg-[#F1F1F1] text-[0.875rem]", className)}>
      <div className="flex h-10 items-center gap-1.5 border-b border-line bg-paper px-3 sm:px-4">
        <Mark className="-ml-1 size-6" />
        <span className="text-[0.8125rem] font-semibold">Subora</span>
        {store ? <span className="ml-auto truncate text-[0.75rem] text-muted">{store}</span> : null}
      </div>

      <div className="px-3 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-5">
        <div className="flex items-center gap-3">
          <p className="text-[1.0625rem] font-bold tracking-[-0.01em]">{title}</p>
          {action ? (
            <span className="ml-auto inline-flex h-7 items-center rounded-lg bg-paper px-3 text-[0.75rem] font-semibold shadow-[0_1px_0_rgb(43_48_56/0.12)] ring-1 ring-line">
              {action}
            </span>
          ) : null}
        </div>

        {tabs ? (
          <div className="mt-3 flex gap-1 overflow-hidden text-[0.75rem] whitespace-nowrap">
            {tabs.map((tab) => (
              <span
                key={tab}
                className={cn(
                  "rounded-lg px-2.5 py-1.5",
                  tab === activeTab ? "bg-[#E3E3E3] font-semibold" : "text-muted",
                )}
              >
                {tab}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-3 space-y-3">{children}</div>
      </div>
    </MockShell>
  );
}

/** A white admin card. */
function Card({ title, className, children }: { title?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl bg-paper p-3.5 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line sm:p-4", className)}>
      {title ? <p className="mb-2.5 text-[0.8125rem] font-semibold">{title}</p> : null}
      {children}
    </div>
  );
}

/**
 * One figure. `good` marks money moving the merchant's way: an amber-tint
 * fill with an amber dot, the text staying slate.
 */
function Figure({
  name,
  value,
  note,
  good = false,
  className,
}: {
  name: string;
  value: ReactNode;
  note?: string;
  good?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 rounded-xl p-3 ring-1", good ? "bg-amber-tint ring-amber/40" : "bg-paper ring-line", className)}>
      <p className={cn("flex items-center gap-1.5 text-[0.75rem] leading-4", good ? "text-slate" : "text-muted")}>
        {good ? <span className="size-1.5 shrink-0 rounded-full bg-amber" /> : null}
        {name}
      </p>
      <p className="mt-1 text-[1.25rem] leading-tight font-bold tracking-[-0.02em] tnum sm:text-[1.375rem]">{value}</p>
      {note ? <p className="mt-0.5 truncate text-[0.6875rem] text-muted">{note}</p> : null}
    </div>
  );
}

/** Mira Skin's MRR at the end of each of the last twelve months. */
const MRR_HISTORY = [
  ["Nov", 9420],
  ["Dec", 9810],
  ["Jan", 10150],
  ["Feb", 10480],
  ["Mar", 10990],
  ["Apr", 11420],
  ["May", 11880],
  ["Jun", 12310],
  ["Jul", 12920],
  ["Aug", 13540],
  ["Sep", 14210],
  ["Oct", 14860],
] as const;

/** A plain line over a faint area, from 0 to $16k, with $5k gridlines. */
function MrrChart() {
  const W = 600;
  const H = 180;
  const max = 16000;
  const x = (i: number) => (i / (MRR_HISTORY.length - 1)) * W;
  const y = (v: number) => H - (v / max) * H;
  const line = MRR_HISTORY.map(([, v], i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const last = MRR_HISTORY.length - 1;

  return (
    <div>
      <div className="relative h-32 sm:h-40">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          {[5000, 10000, 15000].map((v) => (
            <line key={v} x1="0" x2={W} y1={y(v)} y2={y(v)} stroke="rgb(43 48 56 / 0.1)" vectorEffect="non-scaling-stroke" />
          ))}
          <line x1="0" x2={W} y1={H} y2={H} stroke="rgb(43 48 56 / 0.25)" vectorEffect="non-scaling-stroke" />
          <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="rgb(43 48 56 / 0.06)" />
          <path d={line} fill="none" stroke="#2B3038" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        {[5, 10, 15].map((k) => (
          <span
            key={k}
            className="absolute left-0 -translate-y-full pb-0.5 text-[0.625rem] text-muted tnum"
            style={{ top: `${100 - (k * 1000 * 100) / max}%` }}
          >
            ${k}k
          </span>
        ))}
        <span
          className="absolute right-0 size-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate ring-2 ring-paper"
          style={{ top: `${(y(MRR_HISTORY[last][1]) / H) * 100}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[0.625rem] text-muted">
        {MRR_HISTORY.map(([m], i) => (
          <span key={m} className={cn(i % 2 === 1 && "max-sm:invisible")}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Mira Skin's Analytics, Revenue tab: four figures (the recovered one in
 * amber) and the MRR line for the last twelve months. 512 subscribers on a
 * $28.80 serum, a few on the two-month plan, make the $14,860.
 * `tone="dark"` deepens the edge for a slate band; the screen stays light.
 */
export function AnalyticsMock({
  className,
  label,
  tone = "light",
}: {
  className?: string;
  label?: string;
  tone?: "light" | "dark";
}) {
  return (
    <AdminFrame
      title="Revenue"
      action="Export"
      tabs={ANALYTICS_TABS}
      activeTab="Revenue"
      store={STORES.skincare.name}
      label={label}
      className={cn(tone === "dark" && "shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] ring-white/10", className)}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
        <Figure name="MRR" value={<Money amount={14860} />} note="+$650 this month" />
        <Figure name="Active subscribers" value="512" note="+21 this month" />
        <Figure name="Churn rate" value="3%" note="16 of 524 ended" />
        <Figure name="Recovered revenue" value={<Money amount={1238.4} />} note="Last 30 days" good />
      </div>
      <Card title="Monthly recurring revenue (MRR)">
        <MrrChart />
      </Card>
    </AdminFrame>
  );
}

/** Mira Skin's cancel attempts over the last 30 days, by reason. */
const REASONS = [
  ["Too expensive", 38, 17],
  ["Too much product", 26, 15],
  ["Don't use it enough", 19, 6],
  ["Delivery too frequent", 14, 10],
  ["Product issue", 7, 1],
  ["Other", 8, 2],
] as const;

const pct = (part: number, whole: number) => `${Math.round((part / whole) * 100)}%`;

/**
 * Analytics, Retention tab: the top figures and the By reason table with a
 * total. On phones the Saved column goes and Save rate carries the story.
 * Revenue retained is 51 saves renewing at about $28.80 for one to two months.
 */
export function RetentionTableMock({ className, label }: { className?: string; label?: string }) {
  const attempts = REASONS.reduce((n, [, a]) => n + a, 0);
  const saved = REASONS.reduce((n, [, , s]) => n + s, 0);

  return (
    <AdminFrame
      title="Retention"
      action="Export"
      store={STORES.skincare.name}
      label={label}
      className={className}
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        <Figure name="Cancel attempts" value={attempts} />
        <Figure name="Saved" value={saved} />
        <Figure name="Save rate" value={pct(saved, attempts)} />
      </div>
      <Figure
        name="Revenue retained"
        value={<Money amount={2246.4} />}
        note="Renewals paid by saved subscribers, last 30 days"
        good
      />
      <Card title="By reason" className="px-0 pb-1 sm:px-0">
        <table className="w-full text-left text-[0.8125rem] tnum">
          <thead className="text-[0.75rem] text-muted">
            <tr className="border-b border-line">
              <th className="py-2 pl-3.5 font-medium sm:pl-4">Reason</th>
              <th className="px-2 py-2 text-right font-medium">Attempts</th>
              <th className="px-2 py-2 text-right font-medium max-sm:hidden">Saved</th>
              <th className="py-2 pr-3.5 pl-2 text-right font-medium sm:pr-4">Save rate</th>
            </tr>
          </thead>
          <tbody>
            {REASONS.map(([reason, a, s]) => (
              <tr key={reason} className="border-b border-line">
                <td className="py-2 pl-3.5 sm:pl-4">{reason}</td>
                <td className="px-2 py-2 text-right">{a}</td>
                <td className="px-2 py-2 text-right max-sm:hidden">{s}</td>
                <td className="py-2 pr-3.5 pl-2 text-right sm:pr-4">{pct(s, a)}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="py-2 pl-3.5 sm:pl-4">Total</td>
              <td className="px-2 py-2 text-right">{attempts}</td>
              <td className="px-2 py-2 text-right max-sm:hidden">{saved}</td>
              <td className="py-2 pr-3.5 pl-2 text-right sm:pr-4">{pct(saved, attempts)}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </AdminFrame>
  );
}

type Step = {
  day: string;
  title: string;
  detail: string;
  state: "failed" | "recovered" | "skipped" | "event";
  /** The step's marker: the retry's number, or none for a plain dot. */
  mark?: number;
};

const SAM_PRICE = discounted(STORES.pet.product.price, STORES.pet.product.save);

/** One failed payment on Fernlee's default Retry rules, paid by the new card the customer added. */
const STEPS: Step[] = [
  { day: "Day 0 · Oct 6", title: "Payment failed", detail: "Email sent: Your payment did not go through", state: "failed" },
  { day: "Day 1 · Oct 7", title: "Retry 1", mark: 1, detail: "Failed. Next retry in 3 days", state: "failed" },
  { day: "Day 4 · Oct 10", title: "New card", detail: "Card updated by customer, tried at once", state: "event" },
  { day: "Day 4 · Oct 10", title: "Recovered", detail: "Order placed. Email sent: Your payment went through", state: "recovered" },
  { day: "Day 4 · Oct 10", title: "Retry 2", mark: 2, detail: "Not needed", state: "skipped" },
  { day: "Day 9 · Oct 15", title: "Retry 3", mark: 3, detail: "Not needed", state: "skipped" },
];

/**
 * Failed payments for one subscription, as a numbered ladder: the default
 * rules, recovered when the customer added a new card. Above it, the tab's own figures:
 * 29 of 42 recovered at Fernlee's $48.60 is $1,409.40.
 */
export function RetryLadderMock({ className, label }: { className?: string; label?: string }) {
  const s = STORES.pet;
  return (
    <AdminFrame title="Failed payments" store={s.name} label={label} className={className}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
        <Figure name="Failed payments" value="42" />
        <Figure name="Recovered" value="29" />
        <Figure name="Recovery rate" value="69%" />
        <Figure name="Recovered revenue" value={<Money amount={1409.4} />} good />
      </div>

      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <p className="text-[0.8125rem] font-semibold">{s.customer}</p>
          <p className="text-[0.75rem] text-muted">
            {s.product.title.split(" Adult")[0]} · <Money amount={SAM_PRICE} />
          </p>
        </div>

        <ol className="mt-3.5">
          {STEPS.map((step, i) => (
            <li key={step.title} className={cn("relative flex gap-3", i < STEPS.length - 1 && "pb-3.5")}>
              {i < STEPS.length - 1 ? <span className="absolute top-6 bottom-0 left-[0.6875rem] w-px bg-line" /> : null}
              {step.state === "recovered" ? (
                <span className="relative size-[1.375rem] shrink-0 rounded-full bg-amber ring-4 ring-amber-tint" />
              ) : (
                <span
                  className={cn(
                    "relative grid size-[1.375rem] shrink-0 place-items-center rounded-full text-[0.6875rem] font-bold tnum",
                    step.state === "failed" && "bg-slate text-paper",
                    step.state === "event" && "bg-paper ring-1 ring-slate/40",
                    step.state === "skipped" && "bg-frost text-muted ring-1 ring-line",
                  )}
                >
                  {step.mark}
                </span>
              )}
              <div className={cn("min-w-0 pt-px", step.state === "skipped" && "text-muted")}>
                <p className="text-[0.8125rem] leading-5">
                  {step.state === "recovered" ? (
                    <span className="-ml-1 rounded-md bg-amber-tint px-1.5 py-0.5 font-semibold">
                      Recovered · <Money amount={SAM_PRICE} />
                    </span>
                  ) : (
                    <span className="font-semibold">{step.title}</span>
                  )}
                  <span className="text-muted tnum"> · {step.day}</span>
                </p>
                <p className="text-[0.75rem] leading-5 text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <p className="px-0.5 text-[0.75rem] leading-5 text-muted">
        Retry rules: 3 retries · after 1, 3 and 5 days · up to 14 days · then wait for a new card
      </p>
    </AdminFrame>
  );
}
