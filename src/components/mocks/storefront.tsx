import { ChevronDown } from "lucide-react";
import { PickerList } from "./features-1-picker";
import { cn } from "@/lib/utils";
import { STORES, discounted, type StoreKey } from "@/content/demo-stores";
import { Money } from "@/components/site/primitives";
import { StoreFrame } from "./frame";
import { ProductArt } from "./product-art";

/**
 * Subora's theme blocks on a demo store's own pages, in the extension's real
 * default wording. Everything takes the store's colours, as the extension
 * takes the theme's: saving pills are outlined, not amber.
 */

function SavePill({ percent, className }: { percent: number; className?: string }) {
  return (
    <span className={cn("rounded-full border border-current/40 px-2 py-0.5 text-[0.75rem] font-semibold", className)}>
      Save {percent}%
    </span>
  );
}

export function PickerMock({
  store = "coffee",
  className,
  label,
}: {
  store?: StoreKey;
  className?: string;
  label?: string;
}) {
  const s = STORES[store];
  const { title, variant, price, save, frequencies } = s.product;
  const frequency = frequencies.find((f) => f === "Every 4 weeks") ?? frequencies[0];
  return (
    <StoreFrame store={store} className={className} label={label}>
      <div className="@container">
        {/* The product photo stays a thumbnail so the Picker gets the full width, as on a phone-first theme. */}
        <div className="p-5 @md:p-6">
          <div className="flex items-center gap-4">
            <ProductArt store={store} className="w-24 shrink-0 @md:w-28" />
            <div className="min-w-0">
              <p className="text-[1.125rem] font-bold leading-snug tracking-[-0.01em]">{title}</p>
              <p className="mt-0.5 text-[0.8125rem] text-current/70">{variant}</p>
              <p className="mt-2 text-[1.0625rem] font-semibold">
                <Money amount={discounted(price, save)} />
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <PickerList
              className="mt-4"
              rows={[
                { label: "One time", note: "Delivered once", price },
                ...frequencies.map((f) => ({
                  label: f,
                  note: "Cancel any time",
                  price: discounted(price, save),
                  was: price,
                  tag: `Save ${save}%`,
                  selected: f === frequency,
                })),
              ]}
            />

            <div
              className="mt-4 flex h-11 items-center justify-center rounded-lg text-[0.875rem] font-semibold"
              style={{ backgroundColor: s.theme.accent, color: s.theme.accentInk }}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}

const COFFEE_RANGE = [
  { title: STORES.coffee.product.title, price: STORES.coffee.product.price, accent: "#2A1F1A", badge: "save" },
  { title: "Ridge Blend", price: 17, accent: "#5E6B4A", badge: "save" },
  { title: "Decaf Night", price: 19, accent: "#3B4560", badge: "Free trial" },
] as const;

export function CollectionMock({ className, label }: { className?: string; label?: string }) {
  const { save, variant } = STORES.coffee.product;
  return (
    <StoreFrame store="coffee" className={className} label={label}>
      <div className="@container p-5">
        <p className="text-[1.0625rem] font-bold tracking-[-0.01em]">Coffee</p>
        <div className="mt-4 grid gap-3 @xl:grid-cols-3">
          {COFFEE_RANGE.map((p) => (
            <div key={p.title} className="flex gap-3 @xl:block">
              <ProductArt store="coffee" accent={p.accent} className="w-24 shrink-0 @xl:w-auto" />
              <div className="min-w-0 self-center @xl:mt-2.5">
                <p className="text-[0.875rem] font-semibold">{p.title}</p>
                <p className="text-[0.75rem] text-current/70">{variant}</p>
                <Money amount={p.price} className="mt-1 block text-[0.875rem] font-semibold" />
                {p.badge === "save" ? (
                  <SavePill percent={save} className="mt-1.5 inline-block" />
                ) : (
                  <span className="mt-1.5 inline-block rounded-full border border-current/20 px-2 py-0.5 text-[0.75rem] font-semibold">
                    {p.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StoreFrame>
  );
}

export function CartOfferMock({ className, label }: { className?: string; label?: string }) {
  const s = STORES.coffee;
  const { title, variant, price, save } = s.product;
  const ridge = COFFEE_RANGE[1];
  return (
    <StoreFrame store="coffee" nav={["Shop", "Cart"]} className={className} label={label}>
      <div className="p-5">
        <p className="text-[1.0625rem] font-bold tracking-[-0.01em]">Your cart</p>
        <div className="mt-3 divide-y divide-current/15 text-[0.875rem]">
          <div className="py-3">
            <div className="flex gap-3">
              <ProductArt store="coffee" className="w-14 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{title}</p>
                <p className="text-[0.75rem] text-current/70">{variant} · Qty 1</p>
              </div>
              <Money amount={price} className="font-semibold" />
            </div>
            {/* Coffee has three frequencies, so the offer carries a chooser: a frequency can't change in the cart later. */}
            <div className="mt-2.5 pl-[4.25rem]">
              <p className="font-bold">Subscribe &amp; save {save}%</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="flex h-8 items-center gap-3 rounded-md border border-current/25 px-2 text-[0.8125rem]">
                  Every 4 weeks · <Money amount={discounted(price, save)} />
                  <ChevronDown className="size-3.5 opacity-70" />
                </span>
                <span className="rounded-full border border-current/20 px-3.5 py-1 text-[0.8125rem]">Subscribe</span>
              </div>
            </div>
          </div>
          <div className="py-3">
            <div className="flex gap-3">
              <ProductArt store="coffee" accent={ridge.accent} className="w-14 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{ridge.title}</p>
                <p className="text-[0.75rem] text-current/70">{variant} · Qty 1</p>
                <p className="mt-1 text-[0.75rem] text-current/70">Every 4 weeks</p>
              </div>
              <Money amount={discounted(ridge.price, save)} className="font-semibold" />
            </div>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}
