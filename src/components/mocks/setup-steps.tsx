import type { ReactNode } from "react";
import { Check, ChevronDown, GripVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { Mark } from "@/components/site/logo";
import { STORES, discounted } from "@/content/demo-stores";
import { AdminFrame } from "./admin";
import { MockShell } from "./frame";
import { ProductArt } from "./product-art";

/**
 * Mocks for the /setup/ steps. Subora's own screens follow the app's labels
 * (`subora/app/routes/app.plans.new`, `app.subscriptions._index`); the two
 * Shopify editors are simplified and carry the extension names Subora ships.
 */

const coffee = STORES.coffee;
const coffeePrice = discounted(coffee.product.price, coffee.product.save);

/** A white Polaris-like card with an optional section heading. */
function Section({ heading, className, children }: { heading?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl bg-paper p-3.5 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line", className)}>
      {heading ? <p className="mb-2.5 text-[0.8125rem] font-semibold">{heading}</p> : null}
      {children}
    </div>
  );
}

/** A labelled text field, filled in. */
function Field({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.75rem]">{label}</p>
      <div className="mt-1 flex h-8 items-center justify-between gap-2 rounded-lg bg-paper px-2.5 text-[0.8125rem] ring-1 ring-[#8A8A8A]/60">
        <span className="truncate">{value}</span>
        {suffix ? <span className="text-muted">{suffix}</span> : null}
      </div>
    </div>
  );
}

function Box({ on, label }: { on?: boolean; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[0.8125rem]">
      <span
        className={cn(
          "grid size-4 shrink-0 place-items-center rounded-[0.3rem]",
          on ? "bg-slate text-paper" : "ring-1 ring-[#8A8A8A] ring-inset",
        )}
      >
        {on ? <Check className="size-3" strokeWidth={3} /> : null}
      </span>
      {label}
    </span>
  );
}

/** Step 2: a new Subscribe & Save plan, filled in and about to be saved as Active. */
export function PlanFormMock({ className, label }: { className?: string; label?: string }) {
  const { frequencies, save } = coffee.product;
  return (
    <AdminFrame title="New subscribe & save plan" action="Save" store={coffee.name} className={className} label={label}>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <Section heading="Name">
            <div className="grid gap-2.5">
              <Field label="Plan name" value="Subscribe & Save" />
              <Field label="Title buyers see" value={`Subscribe and save ${save}%`} />
            </div>
          </Section>
          <Section heading="Products">
            <div className="flex flex-wrap gap-1.5">
              {[coffee.product.title, "Ridge Blend", "Decaf Night"].map((p) => (
                <span key={p} className="rounded-md bg-[#EBEBEB] px-2 py-0.5 text-[0.75rem] font-medium">
                  {p}
                </span>
              ))}
            </div>
          </Section>
          <Section heading="Deliveries">
            <div className="grid gap-1.5">
              {frequencies.map((f) => (
                <Box key={f} on label={f} />
              ))}
            </div>
          </Section>
        </div>
        <div className="space-y-3">
          <Section heading="Price">
            <Field label="Percent off" value={String(save)} suffix="%" />
            <p className="mt-2 text-[0.75rem] text-muted">
              {coffee.product.title}: <Money amount={coffee.product.price} /> becomes <Money amount={coffeePrice} />
            </p>
          </Section>
          <Section>
            <p className="text-[0.75rem]">Status</p>
            <div className="mt-1 flex h-8 items-center justify-between rounded-lg bg-paper px-2.5 text-[0.8125rem] ring-1 ring-[#8A8A8A]/60">
              Active
              <ChevronDown className="size-4 text-muted" />
            </div>
            <p className="mt-1.5 text-[0.75rem] text-muted">A save puts this plan on your store.</p>
          </Section>
        </div>
      </div>
    </AdminFrame>
  );
}

/** Shopify's editor chrome: a white top bar with Save, a sidebar, and the store's page beside it. */
function EditorShell({
  where,
  sidebar,
  preview,
  className,
  label,
}: {
  where: string;
  sidebar: ReactNode;
  preview: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <MockShell label={label} className={cn("bg-[#F1F1F1] text-[0.8125rem]", className)}>
      <div className="flex h-10 items-center gap-3 border-b border-line bg-paper px-3 sm:px-4">
        <span className="truncate font-semibold">{where}</span>
        <span className="ml-auto inline-flex h-7 shrink-0 items-center rounded-lg bg-slate px-3 text-[0.75rem] font-semibold text-paper">
          Save
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b border-line bg-paper p-3 sm:border-r sm:border-b-0">{sidebar}</div>
        <div className="p-3 sm:p-4">{preview}</div>
      </div>
    </MockShell>
  );
}

/** One row of the editor's block tree. */
function TreeRow({ children, active, app }: { children: ReactNode; active?: boolean; app?: boolean }) {
  return (
    <li
      className={cn(
        "flex items-center gap-1.5 rounded-md px-1.5 py-1.5",
        active ? "bg-[#EBEBEB] font-semibold ring-1 ring-slate/30" : "text-slate/80",
      )}
    >
      <GripVertical className="size-3.5 shrink-0 text-muted" />
      {app ? <Mark className="size-4" /> : null}
      <span className="truncate">{children}</span>
    </li>
  );
}

/** Step 3: the theme editor opened by the Setup guide, the Subscription picker block already in place. */
export function ThemeEditorMock({ className, label }: { className?: string; label?: string }) {
  const { title, price, save } = coffee.product;
  return (
    <EditorShell
      where="Default product"
      className={className}
      label={label}
      sidebar={
        <div>
          <p className="px-1.5 text-[0.75rem] font-semibold text-muted">Product information</p>
          <ul className="mt-1.5 space-y-0.5">
            <TreeRow>Title</TreeRow>
            <TreeRow>Price</TreeRow>
            <TreeRow>Variant picker</TreeRow>
            <TreeRow active app>
              Subscription picker
            </TreeRow>
            <TreeRow>Quantity selector</TreeRow>
            <TreeRow>Buy buttons</TreeRow>
          </ul>
          <p className="mt-2 flex items-center gap-1.5 px-1.5 text-[0.75rem] text-[#005BD3]">
            <Plus className="size-3.5" /> Add block
          </p>
        </div>
      }
      preview={
        <div
          className="rounded-lg p-3 ring-1 ring-black/5"
          style={{ backgroundColor: coffee.theme.ground, color: coffee.theme.ink }}
        >
          <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
            <ProductArt store="coffee" className="w-full rounded-lg" />
            <div className="min-w-0">
              <p className="font-bold leading-snug">{title}</p>
              <p className="mt-0.5 font-semibold">
                <Money amount={coffeePrice} />
              </p>
            </div>
          </div>
          {/* The block the guide just added, outlined as the editor outlines a selected block. */}
          <div className="mt-3 space-y-1.5 rounded-md p-1 outline-2 outline-offset-2 outline-[#005BD3]">
            <div className="flex items-center justify-between rounded-md border border-current/20 px-2.5 py-1.5">
              <span>One time</span>
              <Money amount={price} />
            </div>
            <div className="flex items-center justify-between gap-2 rounded-md border-2 border-current px-2.5 py-1.5">
              <span className="flex flex-wrap items-center gap-1.5 font-semibold">
                Subscribe
                <span className="rounded-full bg-amber-tint px-1.5 text-[0.6875rem] text-slate">Save {save}%</span>
              </span>
              <Money amount={coffeePrice} className="font-semibold" />
            </div>
          </div>
          <div
            className="mt-3 flex h-8 items-center justify-center rounded-md text-[0.75rem] font-semibold"
            style={{ backgroundColor: coffee.theme.accent, color: coffee.theme.accentInk }}
          >
            Add to cart
          </div>
        </div>
      }
    />
  );
}

/** Step 4: Shopify's customer account editor, Subora's page and order action, the page being added. */
export function AccountEditorMock({ className, label }: { className?: string; label?: string }) {
  const pet = STORES.pet;
  const petPrice = discounted(pet.product.price, pet.product.save);
  return (
    <EditorShell
      where="Customer accounts"
      className={className}
      label={label}
      sidebar={
        <div>
          <p className="flex items-center gap-1.5 px-1 font-semibold">
            <Mark className="size-5" /> Subora
          </p>
          <div className="mt-2.5 space-y-2">
            <div className="rounded-lg p-2.5 ring-1 ring-slate/30">
              <p className="font-semibold">Subscriptions</p>
              <p className="mt-0.5 text-[0.75rem] text-muted">A full page in the customer account</p>
              <span className="mt-2 inline-flex h-7 items-center rounded-lg bg-slate px-2.5 text-[0.75rem] font-semibold text-paper">
                Add page to Accounts
              </span>
            </div>
            <div className="rounded-lg p-2.5 ring-1 ring-line">
              <p className="font-semibold">Manage subscription</p>
              <p className="mt-0.5 text-[0.75rem] text-muted">Optional, on order pages</p>
              <span className="mt-2 inline-flex min-h-7 items-center rounded-lg px-2.5 py-1 text-[0.75rem] font-semibold ring-1 ring-line">
                Add action to Orders and Order status
              </span>
            </div>
          </div>
        </div>
      }
      preview={
        <div className="rounded-lg ring-1 ring-black/5" style={{ backgroundColor: pet.theme.ground, color: pet.theme.ink }}>
          <div className="flex items-center gap-3 border-b px-3 py-2" style={{ borderColor: `${pet.theme.ink}1f` }}>
            <span className="font-bold">{pet.name}</span>
            <span className="ml-auto text-[0.6875rem] opacity-75">Orders · Subscriptions</span>
          </div>
          <div className="p-3">
            <p className="font-bold">Subscriptions</p>
            <div className="mt-2 flex items-center gap-2.5 rounded-lg border border-current/15 bg-white/60 p-2.5">
              <ProductArt store="pet" className="w-10 shrink-0 rounded-md" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{pet.product.title}</p>
                <p className="text-[0.75rem] opacity-75">Next delivery Thursday, November 5</p>
              </div>
              <Money amount={petPrice} className="shrink-0 font-semibold max-[23rem]:hidden" />
            </div>
          </div>
        </div>
      }
    />
  );
}

/** Step 5: the test order, now a subscription in Subora's Subscriptions list. */
export function TestOrderMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title="Subscriptions" action="Export" store={coffee.name} className={className} label={label}>
      <div className="flex items-start gap-2.5 rounded-xl bg-paper p-3 ring-1 ring-line">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-slate text-paper">
          <Check className="size-3" strokeWidth={3} />
        </span>
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-semibold">Setup complete</p>
          <p className="text-[0.75rem] leading-5 text-muted">
            Your plan is on, buyers can subscribe, and customers can manage their subscriptions.
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl bg-paper ring-1 ring-line">
        <table className="w-full text-left text-[0.8125rem]">
          <thead className="text-[0.75rem] text-muted">
            <tr className="border-b border-line bg-[#F7F7F7]">
              <th className="py-2 pl-3 font-medium">Customer</th>
              <th className="px-2 py-2 font-medium">Status</th>
              <th className="px-2 py-2 font-medium max-sm:hidden">Products</th>
              <th className="px-2 py-2 font-medium max-[23rem]:hidden">Next billing</th>
              <th className="py-2 pr-3 pl-2 text-right font-medium">Price per billing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2.5 pl-3 font-semibold">Jo Hill</td>
              <td className="px-2 py-2.5">
                <span className="rounded-md bg-[#CDFEE1] px-1.5 py-0.5 text-[0.6875rem] font-semibold text-[#0C5132]">
                  Active
                </span>
              </td>
              <td className="px-2 py-2.5 max-sm:hidden">{coffee.product.title}</td>
              <td className="px-2 py-2.5 whitespace-nowrap max-[23rem]:hidden">Nov 16, 2026</td>
              <td className="py-2.5 pr-3 pl-2 text-right">
                <Money amount={coffeePrice} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminFrame>
  );
}
