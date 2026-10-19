import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, discounted } from "@/content/demo-stores";
import { AdminFrame, ANALYTICS_TABS } from "./admin";
import { Badge, Panel, Stat } from "./features-3-payments";

/**
 * Mocks for /features/analytics/, all for Mira Skin and consistent with the
 * home page's AnalyticsMock: MRR $14,860, 512 active subscribers, churn 3%
 * (16 of 524 ended), $1,238.40 recovered (43 payments at $28.80).
 * Labels follow `subora/app/routes/app._index` (Home), `app.analytics.*`,
 * `app.subscriptions._index` and `domain/audit/activity.ts`.
 */

const mira = STORES.skincare;
const MIRA_PRICE = discounted(mira.product.price, mira.product.save);

/** Thirty days of subscription revenue, a plain line, no claims. */
const DAILY = [
  410, 520, 380, 610, 470, 440, 560, 490, 530, 420, 600, 510, 470, 580, 450, 520, 640, 480, 500, 560, 430, 610, 540,
  470, 590, 520, 480, 650, 530, 560,
];

function RevenueLine() {
  const W = 600;
  const H = 120;
  const max = 800;
  const x = (i: number) => (i / (DAILY.length - 1)) * W;
  const y = (v: number) => H - (v / max) * H;
  const d = DAILY.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  return (
    <div>
      <div className="relative h-24">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full">
          <line x1="0" x2={W} y1={H} y2={H} stroke="rgb(43 48 56 / 0.25)" vectorEffect="non-scaling-stroke" />
          <path d={d} fill="none" stroke="#2B3038" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="mt-1.5 flex justify-between text-[0.625rem] text-muted">
        <span>Sep 20</span>
        <span>Oct 4</span>
        <span>Oct 19</span>
      </div>
    </div>
  );
}

/**
 * App Home, where Subora opens: the four headline cards against the 30 days
 * before, the Subscription revenue line, and the Payments and Cancellations cards.
 */
export function HomeDashboardMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title="Home" store={mira.name} className={className} label={label}>
      <span className="inline-flex h-7 items-center rounded-lg bg-paper px-2.5 text-[0.75rem] font-semibold ring-1 ring-line">
        Last 30 days
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
        <Stat name="Active subscriptions" value="531" note="of which paused: 19" />
        <Stat name="MRR" value={<Money amount={14860} />} note="+4.6% on the period before" />
        <Stat name="Recovered revenue" value={<Money amount={MIRA_PRICE * 43} />} note="+12% on the period before" good />
        <Stat name="Churn rate" value="3%" note="3.4% the period before" />
      </div>
      <Panel title="Subscription revenue">
        <RevenueLine />
      </Panel>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
        <Panel title="Payments" className="text-[0.75rem]">
          <p>61 failed, 43 recovered in this period.</p>
          <p className="mt-1.5 font-semibold underline underline-offset-2">View failed payments</p>
        </Panel>
        <Panel title="Cancellations" className="text-[0.75rem] max-sm:hidden">
          <p>Reasons and offer results are on the Retention page.</p>
          <p className="mt-1.5 font-semibold underline underline-offset-2">View retention</p>
        </Panel>
      </div>
    </AdminFrame>
  );
}

/** The Churn tab's six figures, with its product and plan filters. */
export function ChurnTabMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame
      title="Churn"
      action="Export"
      tabs={ANALYTICS_TABS}
      activeTab="Churn"
      store={mira.name}
      className={className}
      label={label}
    >
      <div className="flex flex-wrap gap-1.5 text-[0.75rem] font-semibold">
        {["Last 30 days", "All products", "All plans"].map((f) => (
          <span key={f} className="inline-flex h-7 items-center rounded-lg bg-paper px-2.5 ring-1 ring-line">
            {f}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
        <Stat name="Churn rate" value="3%" note="16 of 524 ended" />
        <Stat name="Voluntary churn" value="12" note="Canceled" />
        <Stat name="Involuntary churn" value="4" note="Ended on a failed payment" />
        <Stat name="Completed" value="5" note="Ran to their planned end" />
        <Stat name="Average subscription lifetime" value="214 days" />
        <Stat name="Customer lifetime value" value={<Money amount={187.2} />} note="All time" />
      </div>
    </AdminFrame>
  );
}

type Row = {
  customer: string;
  status: string;
  trouble?: string;
  plan: string;
  next: string;
  selected?: boolean;
};

const ROWS: Row[] = [
  { customer: "Lena Fischer", status: "Active", trouble: "Payment failed", plan: "Every month", next: "Oct 22", selected: true },
  { customer: "Aisha Rahman", status: "Active", plan: "Every 2 months", next: "Nov 2", selected: true },
  { customer: "Grace Liu", status: "Active", trouble: "Cannot be reached", plan: "Every month", next: "Oct 27" },
  { customer: "Tom Becker", status: "Paused", plan: "Every month", next: "—", selected: true },
  { customer: "Omar Haddad", status: "Canceled", plan: "Every month", next: "—" },
];

/**
 * The Subscription list: its saved views, search, filters and Export, three
 * rows selected and the Bulk actions open on the five one-step changes.
 */
export function SubscriptionListMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title="Subscriptions" action="Export" store={mira.name} className={className} label={label}>
      <div className="flex gap-1 overflow-hidden text-[0.75rem] whitespace-nowrap">
        {["All", "Active", "Paused", "Canceled"].map((v, i) => (
          <span key={v} className={cn("rounded-lg px-2.5 py-1.5", i === 0 ? "bg-[#E3E3E3] font-semibold" : "text-muted")}>
            {v}
          </span>
        ))}
        <span className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-muted">
          Needs attention <Badge tone="trouble">3</Badge>
        </span>
      </div>

      <Panel className="p-0 sm:p-0">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2.5 sm:px-4">
          <Search aria-hidden="true" className="size-3.5 shrink-0 text-muted" />
          <span className="truncate text-[0.75rem] text-muted">Search by customer, email, product or subscription ID</span>
        </div>
        <div className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2 text-[0.6875rem] font-semibold sm:px-4">
          {["Status", "Plan", "Product", "Next billing date"].map((f) => (
            <span key={f} className="rounded-full px-2 py-0.5 ring-1 ring-line ring-inset">
              {f} +
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-b border-line bg-frost px-3 py-2 text-[0.6875rem] font-semibold sm:px-4">
          <span className="mr-1">3 selected</span>
          {["Pause", "Resume", "Cancel", "Skip", "Change date"].map((a) => (
            <span key={a} className="rounded-md bg-paper px-2 py-0.5 ring-1 ring-line">
              {a}
            </span>
          ))}
        </div>

        <table className="w-full text-left text-[0.75rem]">
          <thead className="text-muted">
            <tr className="border-b border-line">
              <th className="w-8 py-1.5 pl-3 sm:pl-4">
                <span className="sr-only">Selected</span>
              </th>
              <th className="py-1.5 font-medium">Customer</th>
              <th className="py-1.5 font-medium">Status</th>
              <th className="py-1.5 font-medium max-sm:hidden">Plan</th>
              <th className="py-1.5 pr-3 text-right font-medium sm:pr-4">Next billing</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.customer} className={cn("border-b border-line last:border-0", r.selected && "bg-[#F6F6F7]")}>
                <td className="py-2 pl-3 sm:pl-4">
                  <span
                    className={cn(
                      "grid size-3.5 place-items-center rounded-[4px] ring-1",
                      r.selected ? "bg-slate ring-slate" : "bg-paper ring-slate/40",
                    )}
                  >
                    {r.selected ? <span className="h-1 w-1.5 -translate-y-px rotate-[-45deg] border-b-2 border-l-2 border-paper" /> : null}
                  </span>
                </td>
                <td className="py-2 pr-2 font-semibold">{r.customer}</td>
                <td className="py-2 pr-2">
                  <span className="flex flex-wrap gap-1">
                    <Badge>{r.status}</Badge>
                    {r.trouble ? <Badge tone="trouble">{r.trouble}</Badge> : null}
                  </span>
                </td>
                <td className="py-2 pr-2 text-muted max-sm:hidden">{r.plan}</td>
                <td className="py-2 pr-3 text-right tnum sm:pr-4">{r.next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </AdminFrame>
  );
}

const ENTRIES = [
  { when: "Oct 19, 9:41 AM", who: "The customer", what: "Skip a delivery", sub: "Aisha Rahman", outcome: "Done" },
  { when: "Oct 19, 9:02 AM", who: "Subora", what: "Resume", sub: "Nina Park", outcome: "Done" },
  { when: "Oct 18, 4:15 PM", who: "A staff member", what: "Pause", sub: "Tom Becker", outcome: "Done" },
  { when: "Oct 18, 11:20 AM", who: "Shopify", what: "Cancel the subscription", sub: "Omar Haddad", outcome: "Done" },
  { when: "Oct 17, 7:48 PM", who: "The customer", what: "Swap the product", sub: "Grace Liu", outcome: "Blocked by settings" },
];

/** The Activity tab: who changed what, newest first, with its four filters. */
export function ActivityLogMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame
      title="Activity"
      tabs={ANALYTICS_TABS}
      activeTab="Activity"
      store={mira.name}
      className={className}
      label={label}
    >
      <div className="flex flex-wrap gap-1.5 text-[0.6875rem] font-semibold">
        {["Who", "What", "Outcome", "Date range"].map((f) => (
          <span key={f} className="rounded-full bg-paper px-2 py-0.5 ring-1 ring-line">
            {f} +
          </span>
        ))}
        <span className="ml-auto font-medium text-muted">Newest first</span>
      </div>
      <Panel className="p-0 sm:p-0">
        <ul className="divide-y divide-line text-[0.75rem]">
          {ENTRIES.map((e) => (
            <li key={e.when} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-0.5 px-3 py-2.5 sm:px-4">
              <p className="min-w-0">
                <span className="font-semibold">{e.what}</span>
                <span className="text-muted"> · {e.sub}</span>
              </p>
              <span className="row-span-2 self-center">
                <Badge tone={e.outcome === "Done" ? "plain" : "trouble"}>{e.outcome}</Badge>
              </span>
              <p className="text-muted">
                {e.who} · <span className="tnum">{e.when}</span>
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </AdminFrame>
  );
}
