import { ChevronDown } from "lucide-react";
import { Money } from "@/components/site/primitives";
import { STORES, discounted } from "@/content/demo-stores";
import { StoreFrame } from "./frame";
import { ProductArt } from "./product-art";

/**
 * Prepaid on Mira Skin: the Picker with a Prepaid row, and the Customer
 * portal once the payment is taken. Wording follows the Picker's locale
 * (`subora.picker.each`, `prepaid_total`), the plan's buyer sentence
 * (`prepaidSentence` in `subora/app/domain/plan/prepaid.ts`) and the portal's
 * `page.prepaid` strings.
 */

const store = STORES.skincare;
const { title, variant, price, save } = store.product;
const each = discounted(price, save);

/** Six monthly deliveries, paid once. */
export const PREPAID_DELIVERIES = 6;
export const PREPAID_TOTAL = Math.round(each * PREPAID_DELIVERIES * 100) / 100;

function Radio({ on }: { on?: boolean }) {
  return (
    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] border-current">
      {on ? <span className="size-2 rounded-full bg-current" /> : null}
    </span>
  );
}

export function PrepaidPickerMock({ className, label }: { className?: string; label?: string }) {
  return (
    <StoreFrame store="skincare" className={className} label={label}>
      <div className="@container">
        <div className="grid gap-5 p-5 @md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] @md:gap-6 @md:p-6">
          <ProductArt store="skincare" className="max-h-48 w-full @md:max-h-none" />
          <div className="min-w-0">
            <p className="text-[1.125rem] leading-snug font-bold tracking-[-0.01em]">{title}</p>
            <p className="mt-0.5 text-[0.8125rem] text-current/70">{variant}</p>

            <p className="mt-4 text-[0.8125rem] font-semibold">Purchase options</p>
            <div className="mt-2 space-y-2 text-[0.875rem]">
              <div className="flex gap-2.5 rounded-lg border border-current/20 px-3 py-2.5">
                <Radio />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">One time</p>
                  <p className="text-[0.75rem] text-current/70">Delivered once</p>
                </div>
                <Money amount={price} className="font-semibold" />
              </div>
              <div className="flex gap-2.5 rounded-lg border border-current/20 px-3 py-2.5">
                <Radio />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Subscribe</p>
                  <div className="mt-1.5 flex h-8 items-center justify-between rounded-md border border-current/25 px-2.5 text-[0.8125rem]">
                    Every month
                    <ChevronDown className="size-4 opacity-70" />
                  </div>
                </div>
                <Money amount={each} className="font-semibold" />
              </div>
              <div className="flex gap-2.5 rounded-lg border-2 border-current px-3 py-2.5">
                <Radio on />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Every month · {PREPAID_DELIVERIES} prepaid</p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-current/70">
                    Pay once for {PREPAID_DELIVERIES} months of deliveries. Renews every {PREPAID_DELIVERIES} months
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold whitespace-nowrap">
                    <Money amount={each} /> each
                  </p>
                  <p className="text-[0.75rem] whitespace-nowrap text-current/70">
                    <Money amount={PREPAID_TOTAL} /> today
                  </p>
                  <span className="mt-1 inline-block rounded-full bg-amber-tint px-2 py-0.5 text-[0.75rem] font-semibold text-slate">
                    Save {save}%
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mt-4 flex h-11 items-center justify-center rounded-lg text-[0.875rem] font-semibold"
              style={{ backgroundColor: store.theme.accent, color: store.theme.accentInk }}
            >
              Add to cart
            </div>
            <p className="mt-3 text-[0.75rem] leading-relaxed text-current/70">
              This is a recurring charge. You pay automatically until the subscription ends or you cancel.{" "}
              <span className="underline underline-offset-2">Subscription policy</span>
            </p>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}

const UPCOMING = ["Monday, November 2", "Wednesday, December 2", "Saturday, January 2"];

/** The portal for a prepaid subscription: no Skip or Change date, and the paid period named. */
export function PrepaidPortalMock({ className, label }: { className?: string; label?: string }) {
  return (
    <StoreFrame store="skincare" nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="p-5 text-[0.875rem]">
        <p className="text-[0.8125rem] text-current/70 underline underline-offset-2">Subscriptions</p>

        <div className="mt-3 flex items-center gap-3">
          <ProductArt store="skincare" className="w-14 shrink-0 rounded-lg" />
          <div className="min-w-0">
            <p className="text-[1rem] leading-snug font-bold tracking-[-0.01em]">{title}</p>
            <p className="text-[0.75rem] text-current/70">{variant}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-current/15 bg-white/60 p-4">
          <p className="font-bold">Prepaid</p>
          <p className="mt-0.5">{PREPAID_DELIVERIES} deliveries paid on October 2</p>
          <p className="mt-2 text-[0.8125rem] text-current/70">
            Deliveries of a prepaid subscription cannot be skipped or moved.
          </p>
        </div>

        <p className="mt-5 font-semibold">Upcoming deliveries</p>
        <ul className="mt-1.5 divide-y divide-current/15">
          {UPCOMING.map((day) => (
            <li key={day} className="py-2">
              {day}
            </li>
          ))}
        </ul>

        <dl className="mt-3 space-y-2 border-t border-current/15 pt-4">
          <div className="flex flex-wrap justify-between gap-x-4">
            <dt className="text-current/70">How often</dt>
            <dd className="font-semibold">Every month · save {save}%</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4">
            <dt className="text-current/70">Ship to</dt>
            <dd>
              Berlin · <span className="font-semibold underline underline-offset-2">Change</span>
            </dd>
          </div>
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-2 text-[0.8125rem] font-semibold">
          <span className="flex min-h-9 items-center justify-center rounded-lg border border-current/25 px-2 py-1.5">
            Pause subscription
          </span>
          <span className="flex min-h-9 items-center justify-center rounded-lg border border-current/25 px-2 py-1.5">
            Cancel subscription
          </span>
        </div>
      </div>
    </StoreFrame>
  );
}
