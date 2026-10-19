import { cn } from "@/lib/utils";
import { BREAK_EVEN, PLANS, cheapestPlan, planCost, type PlanKey } from "@/content/plans";

/**
 * What each Subora plan costs as monthly subscription revenue grows, drawn
 * on the server. The lines live in a stretched 100×100 SVG with
 * non-scaling strokes; every label, dot and tick is HTML placed by
 * percentage, so text stays readable at any width. An amber band follows
 * the cheapest plan, and a table under it carries the same numbers.
 */
const X_MAX = 15_000;
const Y_MAX = 300;

const x = (revenue: number) => (revenue / X_MAX) * 100;
const y = (cost: number) => 100 - (cost / Y_MAX) * 100;

/** Line styles, so the three plans differ in more than colour. */
const STROKE: Record<PlanKey, { dash?: string; className: string }> = {
  free: { className: "stroke-slate" },
  growth: { dash: "7 5", className: "stroke-slate" },
  pro: { dash: "1 5", className: "stroke-slate" },
};

const Y_TICKS = [0, 100, 200, 300];
const X_TICKS = [0, 5_000, 10_000, 15_000];
const TABLE_REVENUES = [1_000, 2_000, 3_000, 4_000, 5_000, 10_000, 15_000];

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });

const shortUsd = (n: number) => (n === 0 ? "$0" : n >= 1000 ? `$${n / 1000}k` : `$${n}`);

const BREAKS = [
  { revenue: BREAK_EVEN.growth, label: "about $3,270" },
  { revenue: BREAK_EVEN.pro, label: "$10,000" },
];

/** The lower edge of the three lines: the cheapest plan at every revenue. */
const ENVELOPE = [0, BREAK_EVEN.growth, BREAK_EVEN.pro, X_MAX]
  .map((r) => `${x(r)},${y(planCost(cheapestPlan(r), r))}`)
  .join(" ");

/** Where each plan is cheapest along the revenue axis. */
const RANGES = [
  { plan: "Free", from: 0, to: BREAK_EVEN.growth },
  { plan: "Growth", from: BREAK_EVEN.growth, to: BREAK_EVEN.pro },
  { plan: "Pro", from: BREAK_EVEN.pro, to: X_MAX },
];

export function PricingChart({ className }: { className?: string }) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div aria-hidden="true" className="pt-3 pr-16 pb-9 pl-12 sm:pr-20">
        <div className="relative h-64 sm:h-80">
          {/* Cost gridlines and their labels. */}
          {Y_TICKS.map((tick) => (
            <div
              key={tick}
              className={cn("absolute inset-x-0 border-t", tick === 0 ? "border-slate/40" : "border-line")}
              style={{ top: `${y(tick)}%` }}
            >
              <span className="absolute right-full mr-2.5 -translate-y-1/2 text-small text-muted tnum">
                ${tick}
              </span>
            </div>
          ))}

          {/* Revenue ticks. */}
          {X_TICKS.map((tick) => (
            <span
              key={tick}
              className={cn(
                "absolute top-full mt-2.5 text-small text-muted tnum",
                tick === 0 ? "" : tick === X_MAX ? "-translate-x-full" : "-translate-x-1/2",
              )}
              style={{ left: `${x(tick)}%` }}
            >
              {shortUsd(tick)}
            </span>
          ))}

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
            fill="none"
          >
            <polyline
              points={ENVELOPE}
              className="stroke-amber"
              strokeOpacity={0.6}
              strokeWidth={10}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {BREAKS.map((b) => (
              <line
                key={b.label}
                x1={x(b.revenue)}
                x2={x(b.revenue)}
                y1={y(planCost(cheapestPlan(b.revenue), b.revenue))}
                y2={100}
                className="stroke-slate/50"
                strokeWidth={1}
                strokeDasharray="2 3"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {PLANS.map((plan) => (
              <line
                key={plan.key}
                x1={0}
                y1={y(planCost(plan, 0))}
                x2={100}
                y2={y(planCost(plan, X_MAX))}
                className={STROKE[plan.key].className}
                strokeWidth={2}
                strokeDasharray={STROKE[plan.key].dash}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* Direct labels at the right-hand end of each line, instead of a legend. */}
          {PLANS.map((plan) => (
            <span
              key={plan.key}
              className="absolute left-full ml-2.5 -translate-y-1/2 text-[0.8125rem] leading-tight font-semibold"
              style={{ top: `${y(planCost(plan, X_MAX))}%` }}
            >
              {plan.name}
            </span>
          ))}

          {/* The two break-even points. */}
          {BREAKS.map((b) => {
            const top = y(planCost(cheapestPlan(b.revenue), b.revenue));
            return (
              <div key={b.label} className="absolute" style={{ left: `${x(b.revenue)}%`, top: `${top}%` }}>
                <span className="absolute size-3 -translate-1/2 rounded-full bg-paper ring-[2.5px] ring-slate" />
                <span className="absolute top-2.5 left-2 rounded bg-paper/90 px-1 text-small font-semibold whitespace-nowrap tnum">
                  {b.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Which plan is cheapest along the same axis. */}
      <div aria-hidden="true" className="pr-16 pl-12 sm:pr-20">
        <div className="flex overflow-hidden rounded-md text-small font-semibold">
          {RANGES.map((r, i) => (
            <span
              key={r.plan}
              className={cn(
                "truncate bg-amber-tint px-1.5 py-1.5 text-[0.8125rem] text-slate sm:px-2 sm:text-[length:inherit]",
                i > 0 && "border-l-2 border-paper",
              )}
              style={{ width: `${x(r.to) - x(r.from)}%` }}
            >
              {r.plan}
            </span>
          ))}
        </div>
        <p className="mt-2 text-small text-muted">Cheapest plan, by monthly subscription revenue</p>
      </div>

      <figcaption className="mt-6 text-small text-muted measure">
        What each Subora plan costs for 30 days as monthly subscription revenue grows. Free starts at $0 and rises
        fastest; Growth starts at $49; Pro stays at $99. Growth becomes cheaper than Free at about $3,270, and Pro
        becomes cheaper than Growth at $10,000. The amber band follows the cheapest plan.
      </figcaption>

      <details className="group mt-4">
        <summary className="link inline-block cursor-pointer list-none text-small [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Show the numbers as a table</span>
          <span className="hidden group-open:inline">Hide the table</span>
        </summary>
        <div className="mt-4 relative overflow-x-auto">
          <table className="w-full min-w-[22rem] border-collapse text-left text-small tnum">
            <caption className="sr-only">Cost of each Subora plan for 30 days, by monthly subscription revenue</caption>
            <thead>
              <tr className="border-b-2 border-slate">
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Revenue a month
                </th>
                {PLANS.map((plan) => (
                  <th key={plan.key} scope="col" className="py-2 pl-4 text-right font-semibold">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_REVENUES.map((revenue) => {
                // Ties (Growth and Pro at $10,000) are both the cheapest.
                const least = Math.min(...PLANS.map((plan) => planCost(plan, revenue)));
                const isLeast = (plan: (typeof PLANS)[number]) => planCost(plan, revenue) - least < 1e-9;
                return (
                  <tr key={revenue} className="border-b border-line">
                    <th scope="row" className="py-2 pr-4 font-medium">
                      {usd(revenue)}
                    </th>
                    {PLANS.map((plan) => (
                      <td
                        key={plan.key}
                        className={cn("py-2 pl-4 text-right", isLeast(plan) ? "font-bold" : "text-muted")}
                      >
                        {usd(planCost(plan, revenue))}
                        {isLeast(plan) ? <span className="sr-only"> (cheapest)</span> : null}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-3 text-small text-muted">The cheapest plan at each revenue is in bold.</p>
        </div>
      </details>
    </figure>
  );
}
