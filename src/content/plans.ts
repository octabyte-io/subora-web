/**
 * Subora plans, mirrored from `subora/app/domain/fee/tier.ts` (`TIER_TERMS`).
 * Change them there first. Every plan has every feature and no subscription
 * limit; plans differ only in how the merchant pays.
 */
export type PlanKey = "free" | "growth" | "pro";

export type Plan = {
  key: PlanKey;
  name: string;
  /** Per 30 days, in USD. */
  monthlyUsd: number;
  /** Transaction fee as a fraction of billable subscription sales. */
  feeRate: number;
  pitch: string;
};

export const PLANS: Plan[] = [
  { key: "free", name: "Free", monthlyUsd: 0, feeRate: 0.02, pitch: "Start with zero monthly cost." },
  {
    key: "growth",
    name: "Growth",
    monthlyUsd: 49,
    feeRate: 0.005,
    pitch: "Lower your transaction fees as your store grows.",
  },
  { key: "pro", name: "Pro", monthlyUsd: 99, feeRate: 0, pitch: "Predictable pricing for high-volume stores." },
];

/** The app's own sentence about currency (`USD_SENTENCE` in tier.ts). */
export const USD_SENTENCE =
  "Prices are in USD. If Shopify bills you in another currency, it converts them at its own rate, so your bill may differ a little.";

/** "2%", "0.5%", "0%". */
export function feeLabel(plan: Plan) {
  return `${+(plan.feeRate * 100).toFixed(2)}%`;
}

/** What a plan costs for 30 days at a given monthly subscription revenue. */
export function planCost(plan: Plan, revenue: number) {
  return plan.monthlyUsd + plan.feeRate * revenue;
}

/** The cheapest plan at a revenue. Ties go to the plan with the lower monthly fee. */
export function cheapestPlan(revenue: number) {
  return PLANS.reduce((best, plan) => (planCost(plan, revenue) < planCost(best, revenue) - 1e-9 ? plan : best));
}

/** Free → Growth at $49 / 1.5% ≈ $3,267; Growth → Pro at $50 / 0.5% = $10,000. */
export const BREAK_EVEN = {
  growth: 49 / (0.02 - 0.005),
  pro: (99 - 49) / 0.005,
};

/** The generic comparison the site may make. Never name the app. */
export const TYPICAL_APP = { monthlyUsd: 99, feeRate: 0.01, perOrderUsd: 0.19, label: "$99 + 1% + 19¢" };
