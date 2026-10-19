import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STORES } from "@/content/demo-stores";
import { AdminFrame } from "./admin";

/**
 * The Setup guide card on Subora's Home, in the app's own words
 * (`subora/app/domain/setup-guide/setup-guide-words.ts`). Lines before `next`
 * are done, `next` is open with its button, later ones are to do, and the two
 * default lines are always ticked.
 */

export type GuideLine = "plan" | "product" | "storefront" | "portal";

const PLAN_NAME = "Subscribe & Save";

type Row = {
  key: GuideLine | "notifications" | "recovery";
  name: string;
  /** The open row's sentence when it is next, and its button. */
  todo?: { sentence: string; button: string; extra?: string };
};

const ROWS: Row[] = [
  {
    key: "plan",
    name: "Subscription plan created",
    todo: { sentence: "Choose the products, how often they ship, and the discount.", button: "Create a plan" },
  },
  {
    key: "product",
    name: "Product selected",
    todo: {
      sentence: `Turn on “${PLAN_NAME}” so buyers can choose it on its 3 products.`,
      button: "Turn on the plan",
    },
  },
  {
    key: "storefront",
    name: "Storefront widget enabled",
    todo: {
      sentence: "Add the subscription picker to your product page, so buyers can choose Subscribe.",
      button: "Add the subscription picker to your product page",
      extra: "Using an older theme? Turn on the picker embed instead",
    },
  },
  {
    key: "portal",
    name: "Customer portal configured",
    todo: {
      sentence: "Add the Subscriptions page to customer accounts, so customers can skip, pause or cancel.",
      button: "Add the Subscriptions page",
      extra: "Optional: Add “Manage subscription” to order pages",
    },
  },
  { key: "notifications", name: "Notifications configured" },
  { key: "recovery", name: "Payment recovery configured" },
];

const ORDER: GuideLine[] = ["plan", "product", "storefront", "portal"];

type Tick = "done" | "default" | "next" | "todo";

function tickOf(key: Row["key"], next: GuideLine): Tick {
  if (key === "notifications" || key === "recovery") return "default";
  const at = ORDER.indexOf(key);
  const nextAt = ORDER.indexOf(next);
  return at < nextAt ? "done" : at === nextAt ? "next" : "todo";
}

const TAG: Record<Exclude<Tick, "next">, string> = { done: "Done", default: "On by default", todo: "To do" };

function TickMark({ tick }: { tick: Tick }) {
  if (tick === "done" || tick === "default") {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-slate text-paper">
        <Check className="size-3" strokeWidth={3} />
      </span>
    );
  }
  return <span className="size-5 shrink-0 rounded-full border-[1.5px] border-dashed border-slate/45" />;
}

export function SetupGuideMock({
  next,
  className,
  label,
}: {
  /** The first line still missing; it opens with its button. */
  next: GuideLine;
  className?: string;
  label?: string;
}) {
  const ticks = ROWS.map((row) => tickOf(row.key, next));
  const done = ticks.filter((t) => t === "done" || t === "default").length;

  return (
    <AdminFrame title="Home" store={STORES.coffee.name} className={className} label={label}>
      <div className="rounded-xl bg-paper p-3.5 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line sm:p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[0.9375rem] font-bold">Setup guide</p>
          <p className="shrink-0 text-[0.75rem] text-muted">Hide setup guide</p>
        </div>
        <p className="mt-1 text-[0.8125rem] text-muted">
          Use this guide to start selling subscriptions. {done} of {ROWS.length} done.
        </p>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#E3E3E3]">
          <div className="h-full rounded-full bg-slate" style={{ width: `${(done / ROWS.length) * 100}%` }} />
        </div>

        <ul className="mt-3 space-y-0.5">
          {ROWS.map((row, i) => {
            const tick = ticks[i];
            const open = tick === "next" && row.todo;
            return (
              <li key={row.key} className={cn("rounded-lg px-2 py-2", open && "bg-[#F7F7F7]")}>
                <div className="flex items-center gap-2.5">
                  <TickMark tick={tick} />
                  <span className={cn("min-w-0 flex-1 text-[0.8125rem]", open ? "font-bold" : "font-medium")}>
                    {row.name}
                  </span>
                  {tick === "next" ? (
                    <span className="shrink-0 rounded-md bg-[#EAF4FF] px-1.5 py-0.5 text-[0.6875rem] font-semibold text-[#00527C]">
                      Next
                    </span>
                  ) : (
                    <span className="shrink-0 text-[0.6875rem] text-muted max-[23rem]:hidden">{TAG[tick]}</span>
                  )}
                </div>
                {open ? (
                  <div className="mt-1.5 pl-[1.875rem]">
                    <p className="text-[0.8125rem] leading-5 text-muted">{row.todo!.sentence}</p>
                    <span className="mt-2.5 inline-flex min-h-7 items-center rounded-lg bg-slate px-3 py-1 text-[0.75rem] font-semibold text-paper">
                      {row.todo!.button}
                    </span>
                    {row.todo!.extra ? (
                      <p className="mt-2 text-[0.75rem] text-muted underline underline-offset-2">{row.todo!.extra}</p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </AdminFrame>
  );
}
