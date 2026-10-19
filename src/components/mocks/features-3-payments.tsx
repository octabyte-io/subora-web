import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, discounted, money, type StoreKey } from "@/content/demo-stores";
import { AdminFrame, ANALYTICS_TABS } from "./admin";
import { MockShell, StoreFrame } from "./frame";
import { ProductArt } from "./product-art";

/**
 * Mocks for /features/failed-payments/. Words follow the app:
 * `domain/subscription/run-banner.ts` and `trouble.ts` (the Subscription page's banner),
 * `domain/notification/payment-card.ts` and `payment-follow-up-card.ts` (the emails),
 * `extensions/subora-portal/locales/en.default.json` (the portal) and
 * `routes/app.analytics.failed-payments` (the Recovery numbers).
 *
 * Fernlee's story matches the home page: Sam's renewal fails on Oct 6 on the
 * default Retry rules (retries on Oct 7, 10 and 15, last day Oct 20).
 */

const pet = STORES.pet;
const PET_PRICE = discounted(pet.product.price, pet.product.save);
const PET_SHORT = pet.product.title.split(" Adult")[0];

/** A white admin card, as in `admin.tsx`. */
export function Panel({ title, className, children }: { title?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl bg-paper p-3.5 shadow-[0_1px_0_rgb(43_48_56/0.1)] ring-1 ring-line sm:p-4", className)}>
      {title ? <p className="mb-2.5 text-[0.8125rem] font-semibold">{title}</p> : null}
      {children}
    </div>
  );
}

/** One figure. `good` is money moving the merchant's way: an amber-tint fill, slate text. */
export function Stat({
  name,
  value,
  note,
  good = false,
}: {
  name: string;
  value: ReactNode;
  note?: string;
  good?: boolean;
}) {
  return (
    <div className={cn("min-w-0 rounded-xl p-3 ring-1", good ? "bg-amber-tint ring-amber/40" : "bg-paper ring-line")}>
      <p className={cn("flex items-center gap-1.5 text-[0.75rem] leading-4", good ? "text-slate" : "text-muted")}>
        {good ? <span className="size-1.5 shrink-0 rounded-full bg-amber" /> : null}
        {name}
      </p>
      <p className="mt-1 text-[1.25rem] leading-tight font-bold tracking-[-0.02em] tnum">{value}</p>
      {note ? <p className="mt-0.5 text-[0.6875rem] leading-snug text-muted">{note}</p> : null}
    </div>
  );
}

/** Shopify-style badges: a status in grey, a trouble kind in rose. */
export function Badge({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "trouble" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-px text-[0.6875rem] leading-4 font-semibold whitespace-nowrap",
        tone === "trouble" ? "bg-[#FDE2E1] text-[#8A1C14]" : "bg-[#E8E8E8] text-slate",
      )}
    >
      {children}
    </span>
  );
}

/** The Subscription page's money banner: a heading, one paragraph, then a line each. */
function TroubleBanner({
  heading,
  body,
  lines,
  action,
}: {
  heading: string;
  body: string;
  lines: string[];
  action?: string;
}) {
  return (
    <div className="rounded-xl bg-[#FDF0EE] p-3.5 ring-1 ring-[#F2CDC7] sm:p-4">
      <p className="flex items-center gap-2 text-[0.8125rem] font-semibold">
        <span className="grid size-4 place-items-center rounded-full bg-[#8A1C14] text-[0.625rem] font-bold text-paper">
          !
        </span>
        {heading}
      </p>
      <p className="mt-2 text-[0.8125rem] leading-5">{body}</p>
      <ul className="mt-2 space-y-1 text-[0.75rem] leading-[1.15rem] text-[#4A3F3D]">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {action ? (
        <span className="mt-3 inline-flex h-7 items-center rounded-lg bg-slate px-3 text-[0.75rem] font-semibold text-paper">
          {action}
        </span>
      ) : null}
    </div>
  );
}

/**
 * The merchant's view of one failed payment: Sam's subscription on Oct 8,
 * after Retry 1 failed, with the banner, Retry now and Billing history.
 */
export function SubscriptionRunMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame title={pet.customer} store={pet.name} className={className} label={label}>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge>Active</Badge>
        <Badge tone="trouble">Payment failed</Badge>
        <span className="ml-auto text-[0.75rem] text-muted">
          {PET_SHORT} · <Money amount={PET_PRICE} /> every 4 weeks
        </span>
      </div>

      <TroubleBanner
        heading="Payment failed"
        body="Shopify declined the charge on Oct 7, 2026: the card was declined (CARD_DECLINED). The customer must update their card."
        lines={[
          "Next retry: Oct 10, 2026 (retry 2 of 3).",
          "Last day: Oct 20, 2026. If no payment goes through by then, Subora waits for the customer to update their card until Oct 27, 2026, then skips this delivery.",
          "Customer emailed: Oct 6, 2026 (payment failed).",
        ]}
        action="Retry now"
      />

      <Panel title="Billing history" className="pb-1.5 sm:pb-2">
        <table className="w-full text-left text-[0.75rem] tnum">
          <thead className="text-muted">
            <tr className="border-b border-line">
              <th className="py-1.5 font-medium">Date</th>
              <th className="py-1.5 font-medium max-sm:hidden">Tries</th>
              <th className="py-1.5 text-right font-medium">Result</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Oct 6, 2026", "First charge, Retry 1", "Payment failed", true],
              ["Sep 8, 2026", "First charge", "Billed", false],
              ["Aug 11, 2026", "First charge", "Billed", false],
            ].map(([date, tries, result, trouble]) => (
              <tr key={String(date)} className="border-b border-line last:border-0">
                <td className="py-1.5">{date}</td>
                <td className="py-1.5 text-muted max-sm:hidden">{tries}</td>
                <td className="py-1.5 text-right">
                  <Badge tone={trouble ? "trouble" : "plain"}>{result}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </AdminFrame>
  );
}

/**
 * A store problem's banner: the product sold out, so the words are about the
 * order, never the card, and the customer is not emailed.
 */
export function StoreProblemMock({ className, label }: { className?: string; label?: string }) {
  const coffee = STORES.coffee;
  return (
    <AdminFrame title="Jonah Lee" store={coffee.name} className={className} label={label}>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge>Active</Badge>
        <Badge tone="trouble">Could not be ordered</Badge>
      </div>
      <TroubleBanner
        heading="Could not be ordered"
        body="Shopify could not place the order on Oct 12, 2026: not enough stock (INSUFFICIENT_INVENTORY). Restock the product, then press Retry now."
        lines={[
          "Next retry: Oct 15, 2026 (retry 2 of 3).",
          "The customer has not been emailed. Subora does not email the customer about a store problem.",
        ]}
        action="Retry now"
      />
    </AdminFrame>
  );
}

/**
 * The customer's view: Fernlee's customer account on Oct 8, with the
 * portal's payment panel and Shopify's own Update your card button.
 */
export function PortalPaymentMock({ className, label }: { className?: string; label?: string }) {
  const { title, variant } = pet.product;
  return (
    <StoreFrame store="pet" nav={["Orders", "Subscriptions", "Profile"]} className={className} label={label}>
      <div className="p-5 text-[0.875rem]">
        <p className="text-[0.8125rem] text-current/70 underline underline-offset-2">Subscriptions</p>
        <div className="mt-3 flex items-center gap-3">
          <ProductArt store="pet" className="w-14 shrink-0 rounded-lg" />
          <div className="min-w-0">
            <p className="text-[1rem] leading-snug font-bold tracking-[-0.01em]">{title}</p>
            <p className="text-[0.75rem] text-current/70">
              {variant} · <span className="font-semibold">Payment failed</span>
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-current/20 bg-white/70 p-4">
          <p className="text-[1.0625rem] font-bold">Your payment did not go through</p>
          <p className="mt-1.5 leading-6">Your order is not placed yet. We will try the payment again on Oct 10, 2026.</p>
          <p className="mt-1.5 text-[0.8125rem] leading-5 text-current/75">
            If we cannot take the payment by Oct 20, 2026, we will wait a few more days for a new card, then skip
            this order.
          </p>
          <span
            className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg text-[0.875rem] font-semibold"
            style={{ backgroundColor: pet.theme.accent, color: pet.theme.accentInk }}
          >
            Update your card
          </span>
          <ol className="mt-3 space-y-1 text-[0.75rem] leading-5 text-current/75">
            <li>Tap Update your card and add your new card.</li>
            <li>Then choose your new card under Replace with.</li>
          </ol>
        </div>

        <dl className="mt-4 space-y-2 border-t border-current/15 pt-4">
          <div className="flex flex-wrap justify-between gap-x-4">
            <dt className="text-current/70">Payment</dt>
            <dd>Visa ending in 4242</dd>
          </div>
        </dl>
      </div>
    </StoreFrame>
  );
}

/** The customer's view a moment later: the new card is being tried. */
export function NewCardNoteMock({ className, label }: { className?: string; label?: string }) {
  return (
    <StoreFrame store="pet" nav={[]} className={className} label={label}>
      <p className="px-5 py-4 text-[0.875rem] leading-6">
        Thank you. We are trying your new card now. Check again in a few minutes.
      </p>
    </StoreFrame>
  );
}

type PaymentEmail = {
  subject: string;
  heading: string;
  fact: string;
  rows: [string, string][];
  end?: string;
  button: string;
  line: string;
};

/** Mira Skin's "last try" email: a different brand colour on the same card. */
function lastTryEmail(store: StoreKey): PaymentEmail {
  const s = STORES[store];
  const first = s.customer.split(" ")[0];
  const plan = `${s.product.title} · ${money(discounted(s.product.price, s.product.save))} every month`;
  return {
    subject: `${s.name}: we try your payment one last time`,
    heading: "We try your payment one last time",
    fact: `Hi ${first}. Your payment has still not gone through, so your order is not placed yet. We try one last time on Oct 10, 2026.`,
    rows: [
      ["Your plan", plan],
      ["Next try", "Oct 10, 2026"],
      ["Last day", "Oct 15, 2026"],
    ],
    end: "If we cannot take the payment by Oct 15, 2026, your subscription will be paused.",
    button: "Update your card",
    line: `Reply to this email and ${s.name} will help you update your payment.`,
  };
}

/**
 * A payment email as the subscriber reads it, in the store's name and colour.
 * Drawn like `EmailMock`, for the one kind that mock does not cover.
 */
export function LastTryEmailMock({
  store = "skincare",
  className,
  label,
}: {
  store?: StoreKey;
  className?: string;
  label?: string;
}) {
  const s = STORES[store];
  const w = lastTryEmail(store);
  return (
    <MockShell label={label} className={cn("text-[0.875rem]", className)}>
      <div className="space-y-1 border-b border-line bg-frost px-4 py-3 text-[0.8125rem] leading-5 sm:px-5">
        <p className="flex items-center gap-2">
          <span className="w-14 shrink-0 text-muted">From</span>
          <span className="truncate font-semibold">{s.name}</span>
          <span className="ml-auto shrink-0 text-muted tnum">9:00 AM</span>
        </p>
        <p className="flex gap-2">
          <span className="w-14 shrink-0 text-muted">Subject</span>
          <span className="min-w-0 font-semibold">{w.subject}</span>
        </p>
      </div>
      <div className="bg-[#F1EFEA] px-3 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6">
        <div className="mx-auto max-w-[30rem] overflow-hidden rounded-xl">
          <div
            className="px-5 py-5 text-center font-serif text-[1.25rem] font-semibold tracking-[0.06em]"
            style={{ backgroundColor: s.theme.accent, color: s.theme.accentInk }}
          >
            {s.name}
          </div>
          <div className="bg-paper px-5 pt-6 pb-5 text-[#3D3D3D] sm:px-6">
            <p className="text-[1.25rem] leading-tight font-bold tracking-[-0.01em] text-[#1A1A1A]">{w.heading}</p>
            <p className="mt-3 leading-6">{w.fact}</p>
            <div className="mt-4 space-y-2 rounded-[10px] bg-[#FAF8F4] px-4 py-3.5">
              {w.rows.map(([name, value]) => (
                <p key={name} className="text-[0.8125rem] leading-5 text-[#6B6B6B]">
                  {name}
                  <span className="block text-[0.875rem] font-semibold text-[#1A1A1A] tnum">{value}</span>
                </p>
              ))}
            </div>
            {w.end ? <p className="mt-4 text-[0.8125rem] leading-5">{w.end}</p> : null}
            <span
              className="mt-5 inline-flex h-10 items-center rounded-full px-5 text-[0.875rem] font-semibold"
              style={{ backgroundColor: s.theme.accent, color: s.theme.accentInk }}
            >
              {w.button}
            </span>
            <p className="mt-4 text-[0.8125rem] leading-5">{w.line}</p>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

/**
 * Analytics, Failed payments tab: all six Recovery numbers for Fernlee in
 * The last 30 days, every run finished. 29 recovered and 13 not, at $48.60 each.
 */
export function RecoveryNumbersMock({ className, label }: { className?: string; label?: string }) {
  return (
    <AdminFrame
      title="Failed payments"
      action="Export"
      tabs={ANALYTICS_TABS}
      activeTab="Failed payments"
      store={pet.name}
      className={className}
      label={label}
    >
      <span className="inline-flex h-7 items-center rounded-lg bg-paper px-2.5 text-[0.75rem] font-semibold ring-1 ring-line">
        Last 30 days
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
        <Stat name="Failed payments" value="42" />
        <Stat name="Retries" value="71" />
        <Stat name="Recovered" value="29" />
        <Stat name="Recovery rate" value="69%" note="29 recovered of 42 finished" />
        <Stat name="Recovered revenue" value={<Money amount={PET_PRICE * 29} />} good />
        <Stat name="Unrecoverable revenue" value={<Money amount={PET_PRICE * 13} />} />
      </div>
    </AdminFrame>
  );
}
