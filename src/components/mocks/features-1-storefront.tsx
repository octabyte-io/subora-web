import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, discounted } from "@/content/demo-stores";
import { MockShell, StoreFrame } from "./frame";
import { ProductArt } from "./product-art";
import { PickerList, StoreSurface, type PickerRowData } from "./features-1-picker";

/**
 * Subora's storefront parts for the Storefront page, drawn as the extension draws them
 * (`subora/extensions/subora-picker`): theme colours and fonts, thin lines in a share of the
 * theme's colour, outlined pills. Words are the extension's English defaults.
 */

const pet = STORES.pet;
const petSub = discounted(pet.product.price, pet.product.save);

/** Fernlee's three frequencies, each its own row as the Picker draws a plan with 4 or fewer. */
const PET_ROWS: PickerRowData[] = [
  { label: "One time", note: "Delivered once", price: pet.product.price },
  ...pet.product.frequencies.map((label) => ({
    label,
    note: "Cancel any time",
    price: petSub,
    was: pet.product.price,
    tag: `Save ${pet.product.save}%`,
    selected: label === "Every 4 weeks",
  })),
];

/** Fernlee's product page with the Picker under the variant, above Add to cart. */
export function ProductPickerMock({ className, label }: { className?: string; label?: string }) {
  const { title, variant } = pet.product;
  return (
    <StoreFrame store="pet" className={className} label={label}>
      <div className="@container">
        {/* A thumbnail, so the Picker gets the full width and each row keeps its price beside it. */}
        <div className="p-5 @lg:p-6">
          <div className="flex items-center gap-4">
            <ProductArt store="pet" className="w-24 shrink-0 @lg:w-28" />
            <div className="min-w-0">
              <p className="text-[1.125rem] font-bold leading-snug tracking-[-0.01em]">{title}</p>
              <p className="mt-0.5 text-[0.8125rem] text-current/70">{variant}</p>
            </div>
          </div>
          <div className="min-w-0">
            <PickerList rows={PET_ROWS} className="mt-4" />
            <div
              className="mt-4 flex h-11 items-center justify-center rounded-lg text-[0.875rem] font-semibold"
              style={{ backgroundColor: pet.theme.accent, color: pet.theme.accentInk }}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}

/** Mira Skin's serum, sold only as a subscription, on a plan with five frequencies: one folded row. */
export function FoldedPickerMock({ className, label }: { className?: string; label?: string }) {
  const { price, save } = STORES.skincare.product;
  return (
    <StoreSurface store="skincare" className={cn("p-4 sm:p-5", className)} label={label}>
      <PickerList
        rows={[
          {
            label: "Subscribe",
            dropdown: "Every month",
            note: "Cancel any time",
            price: discounted(price, save),
            was: price,
            tag: `Save ${save}%`,
            selected: true,
          },
        ]}
      />
    </StoreSurface>
  );
}

/** One theme-editor control in Shopify's sidebar. */
function EditorSetting({ kind, label, value }: { kind: "check" | "text" | "select"; label: string; value?: string }) {
  if (kind === "check") {
    return (
      <p className="flex items-center gap-2">
        <span className="grid size-4 shrink-0 place-items-center rounded-[0.3rem] bg-slate text-paper">
          <Check className="size-3" strokeWidth={3} />
        </span>
        {label}
      </p>
    );
  }
  return (
    <div>
      <p className="text-[0.75rem]">{label}</p>
      <p className="mt-1 flex h-8 items-center justify-between rounded-lg px-2.5 ring-1 ring-[#8A8A8A]/60">
        <span className={cn(!value && "text-muted")}>{value ?? ""}</span>
        {kind === "select" ? <ChevronDown className="size-3.5 text-muted" /> : null}
      </p>
    </div>
  );
}

/** The Subscription picker block's settings in Shopify's theme editor, at their defaults. */
export function ThemeEditorMock({ className, label }: { className?: string; label?: string }) {
  return (
    <MockShell label={label} className={cn("text-[0.8125rem]", className)}>
      <div className="flex h-10 items-center border-b border-line px-4 font-semibold">Subscription picker</div>
      <div className="space-y-4 p-4">
        <div>
          <EditorSetting kind="check" label="Hide the theme’s own price" />
          <p className="mt-1 pl-6 text-[0.75rem] text-muted">The Picker already shows a price for every option.</p>
        </div>
        <EditorSetting kind="text" label="Heading" />
        <EditorSetting kind="text" label="One-time option name" />
        <EditorSetting kind="text" label="One-time option note" />
        <EditorSetting kind="select" label="Selected when the page opens" value="One time" />
        <div>
          <EditorSetting kind="check" label="Show savings" />
          <p className="mt-1 pl-6 text-[0.75rem] text-muted">Shows “Save N%” beside a subscription price.</p>
        </div>
      </div>
    </MockShell>
  );
}

/** Ember Hill's range, one card per badge text, plus a sold-out bag that earns none. */
const RANGE = [
  { title: STORES.coffee.product.title, price: 18, accent: "#2A1F1A", badge: "Save 15%" },
  { title: "Ridge Blend", price: 17, accent: "#5E6B4A", badge: "Save 15%" },
  { title: "Decaf Night", price: 19, accent: "#3B4560", badge: "Free trial" },
  { title: "Roaster’s Sampler", price: 24, accent: "#7A4B2E", badge: "Trial offer" },
  { title: "Cold Brew Grind", price: 16, accent: "#4F5B66", badge: "Subscription available" },
  { title: "Harvest Reserve", price: 26, accent: "#8C6342", badge: null },
];

export function BadgeGridMock({ className, label }: { className?: string; label?: string }) {
  const { variant } = STORES.coffee.product;
  return (
    <StoreFrame store="coffee" className={className} label={label}>
      <div className="@container p-5">
        <p className="text-[1.0625rem] font-bold tracking-[-0.01em]">Coffee</p>
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 @xl:grid-cols-3">
          {RANGE.map((p) => (
            <div key={p.title} className="min-w-0">
              <ProductArt store="coffee" accent={p.accent} />
              <p className="mt-2.5 truncate text-[0.875rem] font-semibold">{p.title}</p>
              <p className="truncate text-[0.75rem] text-current/70">{variant}</p>
              <Money amount={p.price} className="mt-1 block text-[0.875rem] font-semibold" />
              {p.badge ? (
                <span className="mt-1.5 inline-block rounded-full border border-current/20 px-2 py-0.5 text-[0.75rem]">
                  {p.badge}
                </span>
              ) : (
                <span className="mt-1.5 inline-block rounded-full bg-current/10 px-2 py-0.5 text-[0.75rem]">
                  Sold out
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </StoreFrame>
  );
}

/** Fernlee's cart: a one-time bag with the Cart offer's chooser, and a line that is already a subscription. */
export function CartChooserMock({ className, label }: { className?: string; label?: string }) {
  const { title, variant, price } = pet.product;
  return (
    <StoreFrame store="pet" nav={["Shop", "Cart"]} className={className} label={label}>
      <div className="p-5 text-[0.875rem]">
        <p className="text-[1.0625rem] font-bold tracking-[-0.01em]">Your cart</p>
        <div className="mt-3 divide-y divide-current/15">
          <div className="py-3.5">
            <div className="flex gap-3">
              <ProductArt store="pet" className="w-14 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{title}</p>
                <p className="text-[0.75rem] text-current/70">{variant}</p>
                <p className="mt-2.5 font-bold">Subscribe &amp; save {pet.product.save}%</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="flex h-8 items-center gap-3 rounded-md border border-current/25 px-2 text-[0.8125rem]">
                    Every 4 weeks · <Money amount={petSub} />
                    <ChevronDown className="size-3.5 opacity-70" />
                  </span>
                  <span className="rounded-full border border-current/20 px-3.5 py-1 text-[0.8125rem]">Subscribe</span>
                </div>
              </div>
              <Money amount={price} className="font-semibold" />
            </div>
          </div>
          <div className="py-3.5">
            <div className="flex gap-3">
              <ProductArt store="pet" accent="#6B4E2E" className="w-14 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Turkey &amp; Rice Senior Dry Food</p>
                <p className="text-[0.75rem] text-current/70">3 kg bag</p>
                <p className="mt-1 text-[0.75rem] text-current/70">Every 4 weeks</p>
              </div>
              <Money amount={discounted(32, pet.product.save)} className="font-semibold" />
            </div>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}
