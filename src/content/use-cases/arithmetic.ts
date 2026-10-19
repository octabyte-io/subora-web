/**
 * The worked examples' sums, done in code from `plans.ts` and `demo-stores.ts`
 * so a post's figures can't drift from the plans or the mocks. Every figure
 * here is an example, never a result.
 */
import { STORES, discounted } from "@/content/demo-stores";
import { PLANS, TYPICAL_APP, planCost, type PlanKey } from "@/content/plans";

/** "$15.30", "$19,440.00". Ledgers always show cents. */
export const usd = (amount: number) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

/** "$49", "$3,267", "$15.30": whole dollars when there are no cents, for prose. */
export const usdShort = (amount: number) => {
  const cents = Math.round(amount * 100) % 100 !== 0;
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
};

/** "−$2.70": a minus sign, not a hyphen. */
export const minus = (amount: number) => `−${usd(amount)}`;

export const cents = (amount: number) => Math.round(amount * 100) / 100;

export const planByKey = (key: PlanKey) => PLANS.find((plan) => plan.key === key)!;

/** What one Subora plan costs for 30 days at a monthly subscription revenue. */
export const subora = (key: PlanKey, revenue: number) => cents(planCost(planByKey(key), revenue));

/** A typical $99 + 1% + 19¢ app, which also charges per order. */
export const typical = (revenue: number, orders: number) =>
  cents(TYPICAL_APP.monthlyUsd + TYPICAL_APP.feeRate * revenue + TYPICAL_APP.perOrderUsd * orders);

/** Deliveries a year on an every-N-weeks frequency: 52 / 4 = 13. */
export const perYear = (weeks: number) => Math.floor(52 / weeks);

/** Fernlee's example month, used by the fee post and its Upgrade prompt mock: 400 renewals of one bag. */
export const FERNLEE_MONTH = {
  renewals: 400,
  price: discounted(STORES.pet.product.price, STORES.pet.product.save),
};
