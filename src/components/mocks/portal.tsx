import { cn } from "@/lib/utils";
import { STORES, discounted, type StoreKey } from "@/content/demo-stores";
import { Money } from "@/components/site/primitives";
import { StoreFrame } from "./frame";
import { ProductArt } from "./product-art";

/**
 * The customer portal inside a demo store's customer account, in the portal
 * extension's real wording. Change date only moves a delivery earlier, so the
 * mock never suggests pushing one back.
 */

/** Every 4 weeks for coffee and pet food; Mira Skin's serum comes monthly. */
const UPCOMING = {
  weekly: [
    { day: "Thursday, November 5", note: "Next" },
    { day: "Thursday, December 3", note: "Skipped" },
    { day: "Thursday, December 31", note: null },
  ],
  monthly: [
    { day: "Thursday, November 12", note: "Next" },
    { day: "Saturday, December 12", note: "Skipped" },
    { day: "Tuesday, January 12", note: null },
  ],
};

const ACTIONS = ["Skip this delivery", "Change date", "Pause subscription", "Swap to another product"];

export function PortalMock({
  store = "pet",
  className,
  label,
}: {
  store?: StoreKey;
  className?: string;
  label?: string;
}) {
  const { title, variant, price, save, frequencies } = STORES[store].product;
  const frequency = frequencies.find((f) => f === "Every 4 weeks") ?? frequencies[0];
  const upcoming = UPCOMING[frequency === "Every month" ? "monthly" : "weekly"];
  return (
    <StoreFrame store={store} nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="p-5 text-[0.875rem]">
        <p className="text-[0.8125rem] text-current/70 underline underline-offset-2">Subscriptions</p>

        <div className="mt-3 flex items-center gap-3">
          <ProductArt store={store} className="w-14 shrink-0 rounded-lg" />
          <div className="min-w-0">
            <p className="text-[1rem] font-bold leading-snug tracking-[-0.01em]">{title}</p>
            <p className="text-[0.75rem] text-current/70">{variant}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-current/15 bg-white/60 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div>
              <p className="text-[0.75rem] text-current/70">Your next delivery</p>
              <p className="text-[1.0625rem] font-bold">{upcoming[0].day}</p>
            </div>
            <Money amount={discounted(price, save)} className="text-[1.0625rem] font-semibold" />
          </div>
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-[0.8125rem] font-semibold">
            {ACTIONS.map((action) => (
              <span key={action} className="flex min-h-9 items-center justify-center rounded-lg border border-current/25 px-2 py-1.5 text-center leading-tight">
                {action}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-5 font-semibold">Upcoming deliveries</p>
        <ul className="mt-1.5 divide-y divide-current/15">
          {upcoming.map((d) => (
            <li key={d.day} className="flex items-center justify-between gap-3 py-2">
              <span className={cn(d.note === "Skipped" && "text-current/50 line-through")}>{d.day}</span>
              {d.note ? <span className="text-[0.75rem] text-current/70">{d.note}</span> : null}
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-current/15 pt-4">
          <div className="flex flex-wrap justify-between gap-x-4">
            <dt className="text-current/70">How often</dt>
            <dd className="font-semibold">
              {frequency} · save {save}%
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4">
            <dt className="text-current/70">Payment</dt>
            <dd>
              Visa ending in 4242 · <span className="font-semibold underline underline-offset-2">Update your card</span>
            </dd>
          </div>
        </dl>
      </div>
    </StoreFrame>
  );
}
