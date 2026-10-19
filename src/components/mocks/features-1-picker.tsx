import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, type StoreKey } from "@/content/demo-stores";
import { MockShell } from "./frame";

/**
 * The Picker as the theme app extension draws it (`subora-picker/snippets/subora-picker.liquid`
 * and `assets/subora-picker.css`): a heading, one bordered list of rows, the theme's own colour and
 * font, an outline on the chosen row, and the recurring-charge line under the list while a plan row
 * is chosen. Every word is the extension's English default.
 */

export type PickerRowData = {
  /** The frequency, e.g. "Every 4 weeks", or "One time". */
  label: string;
  /** The plan's buyer sentence, else the Picker's own "Cancel any time". */
  note: string;
  /** Per delivery on a Prepaid row. */
  price: number;
  /** The price from a later order: "$0.00, then $28.80". */
  then?: number;
  /** A Prepaid row: "$48.60 each", with what is paid today under it. */
  today?: number;
  /** The crossed-out regular price. */
  was?: number;
  /** "Save 10%", "Free trial" or "Trial offer". */
  tag?: string;
  selected?: boolean;
  /** A plan with more than 4 frequencies folds into one "Subscribe" row with a dropdown. */
  dropdown?: string;
};

/** A plain surface in a demo store's colours, for a Picker or a cart line out of its page. */
export function StoreSurface({
  store,
  className,
  label,
  children,
}: {
  store: StoreKey;
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  const { theme } = STORES[store];
  return (
    <MockShell label={label} className={className} style={{ backgroundColor: theme.ground, color: theme.ink }}>
      {children}
    </MockShell>
  );
}

function Radio({ on }: { on?: boolean }) {
  return (
    <span className="grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] border-current">
      {on ? <span className="size-2 rounded-full bg-current" /> : null}
    </span>
  );
}

function PriceText({ row }: { row: PickerRowData }) {
  const each = row.today !== undefined;
  const one = (amount: number) => (
    <>
      <Money amount={amount} />
      {each ? " each" : null}
    </>
  );
  return (
    <span className="col-start-2 flex flex-col items-start text-left @sm:col-start-auto @sm:items-end @sm:text-right">
      <span className="font-semibold">
        {one(row.price)}
        {row.then !== undefined ? <>, then {one(row.then)}</> : null}
      </span>
      {row.today !== undefined ? (
        <span className="text-[0.85em] text-current/85">
          <Money amount={row.today} /> today
        </span>
      ) : null}
      {row.was !== undefined ? <Money amount={row.was} className="text-[0.85em] text-current/85 line-through" /> : null}
      {row.tag ? <span className="text-[0.85em]">{row.tag}</span> : null}
    </span>
  );
}

/** One Picker: its heading, rows and, while a plan row is chosen, the terms line. */
export function PickerList({
  rows,
  heading = "Purchase options",
  className,
}: {
  rows: PickerRowData[];
  heading?: string;
  className?: string;
}) {
  const planChosen = rows.some((r) => r.selected && r.label !== "One time");
  return (
    <div className={cn("@container text-[0.875rem]", className)}>
      <p className="mb-2 font-bold">{heading}</p>
      <div className="overflow-hidden rounded-lg border border-current/20">
        {rows.map((row, i) => (
          <div
            key={row.label + i}
            className={cn(
              "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 px-3.5 py-3 @sm:grid-cols-[auto_minmax(0,1fr)_auto]",
              i > 0 && "border-t border-current/20",
              row.selected && "outline -outline-offset-1 outline-current",
            )}
          >
            <Radio on={row.selected} />
            <span className="flex min-w-0 flex-col">
              <span className="font-semibold">{row.dropdown ? "Subscribe" : row.label}</span>
              {row.dropdown ? (
                <span className="mt-1 flex h-8 w-fit items-center gap-6 rounded-md border border-current/25 px-2 text-[0.8125rem]">
                  {row.dropdown}
                  <ChevronDown className="size-3.5 opacity-70" />
                </span>
              ) : null}
              <span className="text-[0.85em] text-current/85">{row.note}</span>
            </span>
            <PriceText row={row} />
          </div>
        ))}
      </div>
      {planChosen ? (
        <p className="mt-2 text-[0.85em] leading-relaxed">
          This is a recurring charge. You pay automatically until the subscription ends or you cancel.{" "}
          <span className="underline underline-offset-2">Subscription policy</span>
        </p>
      ) : null}
    </div>
  );
}
