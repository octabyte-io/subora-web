import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, discounted } from "@/content/demo-stores";
import { AdminFrame } from "./admin";
import { MockShell, StoreFrame } from "./frame";
import { ProductArt } from "./product-art";

/**
 * Customer portal mocks for /features/customer-portal/. Every word follows
 * `subora/extensions/subora-portal/locales/en.default.json` and the admin's
 * `app/domain/portal/labels.ts`. One subscriber throughout: Sam Okafor at
 * Fernlee, $48.60 every 4 weeks, deliveries Nov 5, Dec 3 (skipped), Dec 31.
 */

const pet = STORES.pet;
const PRICE = discounted(pet.product.price, pet.product.save);

/** The Customer actions a merchant can turn off (`DISALLOWABLE_ACTIONS` in the app's `values.ts`). */
export type PortalAction = "skip" | "pause" | "reschedule" | "quantity" | "frequency" | "variant-change" | "address";

export const ALL_PORTAL_ACTIONS: readonly PortalAction[] = [
  "skip",
  "pause",
  "reschedule",
  "quantity",
  "frequency",
  "variant-change",
  "address",
];

const DELIVERIES = [
  { day: "Thursday, November 5", skipped: false },
  { day: "Thursday, December 3", skipped: true },
  { day: "Thursday, December 31", skipped: false },
];

/** A Shopify customer-account button, in the store's own ink. */
function PortalButton({ children, primary }: { children: ReactNode; primary?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 shrink-0 items-center rounded-lg px-3 text-[0.75rem] font-semibold whitespace-nowrap",
        primary ? "text-white" : "border border-current/25",
      )}
      style={primary ? { backgroundColor: pet.theme.accent } : undefined}
    >
      {children}
    </span>
  );
}

function DetailRow({ name, value, actions }: { name: string; value: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5">
      <div className="min-w-0">
        <p className="text-[0.75rem] text-current/70">{name}</p>
        <div className="font-semibold">{value}</div>
      </div>
      {actions ? <div className="flex flex-wrap gap-1.5">{actions}</div> : null}
    </div>
  );
}

/**
 * Fernlee's subscription page in the Customer portal. `allowed` hides each
 * control a merchant has turned off, as the real portal does; Cancel and the
 * card are always there. `menuOpen` draws the first delivery's menu open.
 */
export function PortalSubscriptionPage({
  allowed = ALL_PORTAL_ACTIONS,
  menuOpen = true,
  compact = false,
  className,
  label,
}: {
  allowed?: readonly PortalAction[];
  menuOpen?: boolean;
  /** Leave out the heading and the next-delivery card, for a smaller mock. */
  compact?: boolean;
  className?: string;
  label?: string;
}) {
  const on = (action: PortalAction) => allowed.includes(action);
  const menuItems = [on("skip") && "Skip this delivery", on("reschedule") && "Change date"].filter(Boolean);

  return (
    <StoreFrame store="pet" nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="p-4 text-[0.8125rem] sm:p-5">
        {compact ? null : (
          <>
            <p className="text-current/70 underline underline-offset-2">Subscriptions</p>
            <div className="mt-3 flex items-center gap-3">
              <ProductArt store="pet" className="w-12 shrink-0 rounded-lg" />
              <div className="min-w-0">
                <p className="text-[1rem] leading-snug font-bold tracking-[-0.01em]">{pet.product.title}</p>
                <p className="text-[0.75rem] text-current/70">Active</p>
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4 rounded-xl border border-current/15 bg-white/60 p-4">
              <div>
                <p className="text-[0.75rem] text-current/70">Your next delivery</p>
                <p className="text-[1rem] font-bold">{DELIVERIES[0].day}</p>
              </div>
              <Money amount={PRICE} className="text-[1rem] font-semibold" />
            </div>
          </>
        )}

        <p className={cn("font-semibold", !compact && "mt-5")}>Upcoming deliveries</p>
        <ul className="mt-1 divide-y divide-current/15">
          {DELIVERIES.map((d, i) => {
            const first = i === 0;
            // A skipped delivery can always be brought back, so its menu never goes away.
            const hasMenu = d.skipped || menuItems.length > 0;
            return (
              <li key={d.day} className="relative flex min-h-11 items-center justify-between gap-3 py-1.5">
                <span className={cn(d.skipped && "text-current/55")}>{d.day}</span>
                <span className="flex items-center gap-2">
                  {d.skipped ? <span className="text-[0.75rem] text-current/70">Skipped</span> : null}
                  {hasMenu ? (
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-lg border border-current/20",
                        first && menuOpen && "bg-current/10",
                      )}
                    >
                      <MoreHorizontal className="size-4" strokeWidth={2} />
                    </span>
                  ) : null}
                </span>
                {first && menuOpen && menuItems.length > 0 ? (
                  <span className="absolute top-[calc(100%-0.25rem)] right-0 z-10 w-44 rounded-lg bg-white p-1 font-semibold shadow-[0_12px_32px_-12px_rgb(31_51_38/0.45)] ring-1 ring-current/15">
                    {menuItems.map((item) => (
                      <span key={String(item)} className="block rounded-md px-2.5 py-2 first:bg-current/[0.06]">
                        {item}
                      </span>
                    ))}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>

        <p className="mt-5 font-semibold">Your subscription</p>
        <div className="mt-1 divide-y divide-current/15 border-y border-current/15">
          <DetailRow
            name="Product"
            value={
              <>
                {pet.product.title}
                <span className="block text-[0.75rem] font-normal text-current/70">{pet.product.variant}</span>
              </>
            }
            actions={
              <>
                {on("variant-change") ? <PortalButton>Change option</PortalButton> : null}
                <PortalButton>Change product</PortalButton>
              </>
            }
          />
          <DetailRow name="Quantity" value="1" actions={on("quantity") ? <PortalButton>Change</PortalButton> : null} />
          <DetailRow
            name="How often"
            value={`Every 4 weeks · save ${pet.product.save}%`}
            actions={on("frequency") ? <PortalButton>Change</PortalButton> : null}
          />
          <DetailRow
            name="Ship to"
            value="14 Alder Lane, Portland"
            actions={on("address") ? <PortalButton>Change</PortalButton> : null}
          />
          <DetailRow name="Payment" value="Visa ending in 4242" actions={<PortalButton>Change</PortalButton>} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {on("pause") ? <PortalButton>Pause subscription</PortalButton> : null}
          <PortalButton>Cancel subscription</PortalButton>
        </div>
      </div>
    </StoreFrame>
  );
}

/**
 * The Preview a customer sees before a change that moves the price: "Check
 * your change", now beside after, then Confirm change or Keep as is.
 */
export function PortalPreviewMock({ className, label }: { className?: string; label?: string }) {
  const rows: [string, ReactNode, ReactNode][] = [
    ["Items", `${pet.product.title.split(" Adult")[0]} × 1`, `${pet.product.title.split(" Adult")[0]} × 2`],
    ["Delivery", "Free", "Free"],
    ["Each delivery", <Money key="now" amount={PRICE} />, <Money key="after" amount={PRICE * 2} />],
  ];
  return (
    <StoreFrame store="pet" nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="p-4 sm:p-5">
        <div className="mx-auto max-w-[24rem] rounded-xl bg-white p-4 text-[0.8125rem] shadow-[0_16px_40px_-20px_rgb(31_51_38/0.5)] ring-1 ring-current/15">
          <p className="text-[1rem] font-bold tracking-[-0.01em]">Check your change</p>
          <table className="mt-3 w-full text-left tnum">
            <thead className="text-[0.75rem] text-current/70">
              <tr className="border-b border-current/15">
                <th className="py-1.5 pr-2 font-medium" />
                <th className="py-1.5 pr-2 font-medium">Now</th>
                <th className="py-1.5 font-medium">After the change</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([name, now, after]) => (
                <tr key={name} className="border-b border-current/10 align-top">
                  <td className="py-2 pr-2 text-current/70">{name}</td>
                  <td className="py-2 pr-2">{now}</td>
                  <td className="py-2 font-semibold">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-current/75">Applies to every delivery from now on.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <PortalButton primary>Confirm change</PortalButton>
            <PortalButton>Keep as is</PortalButton>
          </div>
        </div>
      </div>
    </StoreFrame>
  );
}

/** The foot of a subscription page on a plan with Minimum orders: the condition, said up front. */
export function CancelHoldMock({ className, label }: { className?: string; label?: string }) {
  return (
    <StoreFrame store="pet" nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4 text-[0.8125rem] sm:p-5">
        <PortalButton>Pause subscription</PortalButton>
        <p className="min-w-0 flex-1 basis-56 text-current/75">You can cancel after 3 orders. You have had 1 so far.</p>
      </div>
    </StoreFrame>
  );
}

const SWAP_LIST = [
  { title: "Turkey & Rice Adult Dry Food", note: "6 kg bag" },
  { title: "Grain-Free Lamb Adult Dry Food", note: "6 kg bag" },
];

/** The admin's Swap list group on the Customer portal settings page. */
export function SwapListMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title="Customer portal" store={pet.name} className={className} label={label}>
      <div className="rounded-xl bg-paper p-3.5 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line sm:p-4">
        <p className="text-[0.8125rem] font-semibold">Products customers can swap to</p>
        <p className="mt-1 text-[0.75rem] leading-5 text-muted">
          With no products here, customers cannot swap.
        </p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {SWAP_LIST.map((p, i) => (
            <li key={p.title} className="flex items-center gap-3 py-2">
              <ProductArt store="pet" accent={i ? "#7A5A2F" : "#9A3B2E"} className="w-8 shrink-0 rounded-md" />
              <span className="min-w-0 flex-1 text-[0.8125rem]">{p.title}</span>
              <span className="text-[0.75rem] text-muted">Remove</span>
            </li>
          ))}
        </ul>
        <span className="mt-3 inline-flex h-7 items-center rounded-lg bg-paper px-3 text-[0.75rem] font-semibold ring-1 ring-line">
          Choose products
        </span>
      </div>
    </AdminFrame>
  );
}

/**
 * The merchant's side of the same subscription: Subora's Subscription page,
 * with Pause in the header, each delivery's action and each product's changes.
 */
export function AdminSubscriptionMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title={pet.customer} action="More actions" store={pet.name} className={className} label={label}>
      <span className="inline-flex h-7 items-center rounded-lg bg-paper px-3 text-[0.75rem] font-semibold ring-1 ring-line">
        Pause
      </span>

      <div className="rounded-xl bg-paper shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line">
        <p className="px-3.5 pt-3.5 text-[0.8125rem] font-semibold sm:px-4">Upcoming deliveries</p>
        <table className="mt-2 w-full text-left text-[0.8125rem]">
          <thead className="text-[0.75rem] text-muted">
            <tr className="border-b border-line">
              <th className="py-2 pl-3.5 font-medium sm:pl-4">Delivery</th>
              <th className="px-2 py-2 font-medium">Status</th>
              <th className="py-2 pr-3.5 text-right font-medium sm:pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {DELIVERIES.map((d) => (
              <tr key={d.day} className="border-b border-line last:border-0">
                <td className="py-2 pl-3.5 whitespace-nowrap sm:pl-4">{d.day.replace("Thursday, ", "")}</td>
                <td className="px-2 py-2">
                  {d.skipped ? <span className="rounded-md bg-frost px-1.5 py-0.5 text-[0.75rem]">Skipped</span> : null}
                </td>
                <td className="py-2 pr-3.5 text-right text-[0.75rem] font-semibold sm:pr-4">
                  {d.skipped ? "Bring it back" : "Skip · Change date"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl bg-paper p-3.5 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line sm:p-4">
        <p className="text-[0.8125rem] font-semibold">Products</p>
        <div className="mt-2.5 flex items-start gap-3">
          <ProductArt store="pet" className="w-9 shrink-0 rounded-md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.8125rem] font-semibold">{pet.product.title}</p>
            <p className="text-[0.75rem] text-muted">
              {pet.product.variant} · Qty 1 · <Money amount={PRICE} />
            </p>
          </div>
          <span className="relative">
            <span className="grid size-7 place-items-center rounded-lg bg-[#E3E3E3]">
              <MoreHorizontal className="size-4" />
            </span>
            <span className="absolute top-8 right-0 z-10 w-36 rounded-lg bg-paper p-1 text-[0.75rem] font-semibold shadow-[0_12px_28px_-12px_rgb(28_32_38/0.45)] ring-1 ring-line">
              {["Change quantity", "Change variant", "Swap product"].map((item) => (
                <span key={item} className="block rounded-md px-2 py-1.5">
                  {item}
                </span>
              ))}
            </span>
          </span>
        </div>
        <div aria-hidden="true" className="h-14" />
      </div>
    </AdminFrame>
  );
}

/** "Your delivery is skipped", the email a customer gets after a Skip, in Fernlee's name. */
export function SkippedEmailMock({ className, label }: { className?: string; label?: string }) {
  return (
    <MockShell label={label} className={cn("text-[0.875rem]", className)}>
      <div className="space-y-1 border-b border-line bg-frost px-4 py-3 text-[0.8125rem] leading-5">
        <p className="flex items-center gap-2">
          <span className="w-14 shrink-0 text-muted">From</span>
          <span className="truncate font-semibold">{pet.name}</span>
        </p>
        <p className="flex gap-2">
          <span className="w-14 shrink-0 text-muted">Subject</span>
          <span className="min-w-0 font-semibold">{pet.name}: your delivery is skipped</span>
        </p>
      </div>
      <div className="bg-[#F1EFEA] px-3 pt-4 pb-5 sm:px-5">
        <div className="mx-auto max-w-[28rem] overflow-hidden rounded-xl">
          <div
            className="px-5 py-4 text-center font-serif text-[1.125rem] font-semibold tracking-[0.06em]"
            style={{ backgroundColor: pet.theme.accent, color: pet.theme.accentInk }}
          >
            {pet.name}
          </div>
          <div className="bg-paper px-5 pt-5 pb-5 text-[#3D3D3D]">
            <p className="text-[1.125rem] leading-tight font-bold text-[#1A1A1A]">Your delivery is skipped</p>
            <p className="mt-2.5 text-[0.8125rem] leading-5">
              Your delivery from {pet.name} on the date below is skipped. You will not get this delivery, and you will
              not be charged for it.
            </p>
            <div className="mt-3.5 space-y-2 rounded-[10px] bg-[#FAF8F4] px-4 py-3">
              <p className="text-[0.8125rem] leading-5 text-[#6B6B6B]">
                Your plan
                <span className="block text-[0.875rem] font-semibold text-[#1A1A1A] tnum">
                  {pet.product.title} · ${PRICE.toFixed(2)} every 4 weeks
                </span>
              </p>
              <p className="text-[0.8125rem] leading-5 text-[#6B6B6B]">
                Your delivery
                <span className="block text-[0.875rem] font-semibold text-[#1A1A1A] tnum">Dec 3, 2026</span>
              </p>
            </div>
            <span
              className="mt-4 inline-flex h-9 items-center rounded-full px-4 text-[0.8125rem] font-semibold"
              style={{ backgroundColor: pet.theme.accent, color: pet.theme.accentInk }}
            >
              Manage your subscription
            </span>
          </div>
        </div>
      </div>
    </MockShell>
  );
}
