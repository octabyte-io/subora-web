import { cn } from "@/lib/utils";
import { STORES, discounted, money, type StoreKey } from "@/content/demo-stores";
import { MockShell } from "./frame";

/**
 * Wording follows `subora/app/domain/notification/card.ts`, `payment-card.ts`
 * and `payment-follow-up-card.ts`. Dates are the app's `Oct 22, 2026` form;
 * the plan line is "{product} · {price} {frequency}", as `planLine` builds it.
 */
type EmailKind = "renewal-upcoming" | "payment-recovered" | "payment-failed";

type Wording = {
  subject: string;
  heading: string;
  fact: string;
  rows: [string, string][];
  /** What happens on the last day, under the panel. */
  end?: string;
  button: string;
  /** The reply line under the button. */
  line?: string;
};

function wordingFor(kind: EmailKind, store: StoreKey): Wording {
  const s = STORES[store];
  const first = s.customer.split(" ")[0];
  const plan = `${s.product.title} · ${money(discounted(s.product.price, s.product.save))} ${(s.product.frequencies.find((f) => f === "Every 4 weeks") ?? s.product.frequencies[0]).toLowerCase()}`;

  switch (kind) {
    case "renewal-upcoming":
      return {
        subject: `${s.name}: your next order is coming`,
        heading: "Your next order is coming",
        fact: `Your subscription with ${s.name} renews on the date below, and we will take the payment then.`,
        rows: [
          ["Your plan", plan],
          ["Your next order", "Oct 22, 2026"],
        ],
        button: "Manage your subscription",
        line: `Reply to this email and ${s.name} will help.`,
      };
    case "payment-recovered":
      return {
        subject: `${s.name}: your payment went through`,
        heading: "Your payment went through",
        fact: `Hi ${first}. Thank you. Your payment went through, so your order is placed.`,
        rows: [["Your plan", plan]],
        button: "Manage your subscription",
      };
    case "payment-failed":
      return {
        subject: `${s.name}: your payment did not go through`,
        heading: "Your payment did not go through",
        fact: `Hi ${first}. Your payment did not go through, so your order is not placed yet.`,
        rows: [
          ["Your plan", plan],
          ["Next try", "Oct 7, 2026"],
          ["Last day", "Oct 20, 2026"],
        ],
        end: "If we cannot take the payment by Oct 20, 2026, you can still add a new card before Oct 27, 2026 to get this order. Otherwise we skip it and charge your next order on Nov 3, 2026 as usual.",
        button: "Update your card",
        line: `Reply to this email and ${s.name} will help you update your payment.`,
      };
  }
}

/**
 * A Subora email as the subscriber reads it: sent in the store's name, with
 * its wordmark on a band of its brand colour and its colour on the button.
 * A plain mail-client header on top so it reads as an email, not a page.
 */
export function EmailMock({
  store,
  kind,
  className,
  label,
}: {
  store: StoreKey;
  kind: EmailKind;
  className?: string;
  label?: string;
}) {
  const s = STORES[store];
  const w = wordingFor(kind, store);
  const good = kind === "payment-recovered";

  return (
    <MockShell label={label} className={cn("text-[0.875rem]", className)}>
      <div className="space-y-1 border-b border-line bg-frost px-4 py-3 text-[0.8125rem] leading-5 sm:px-5">
        <p className="flex items-center gap-2">
          <span className="w-14 shrink-0 text-muted">From</span>
          <span className="truncate font-semibold">{s.name}</span>
          <span className="ml-auto shrink-0 text-muted tnum">9:02 AM</span>
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

            <div className={cn("mt-4 space-y-2 rounded-[10px] px-4 py-3.5", good ? "bg-amber-tint" : "bg-[#FAF8F4]")}>
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

            {w.line ? <p className="mt-4 text-[0.8125rem] leading-5">{w.line}</p> : null}
          </div>

          <div className="border-t border-[#EDE9E2] bg-paper px-5 pt-3.5 pb-4 text-center text-[0.75rem] leading-[1.15rem] text-[#6B6B6B]">
            <p>{s.name}</p>
            <p className="mt-0.5 text-[#9A9A9A]">You are getting this because you subscribe to {s.name}.</p>
          </div>
        </div>
      </div>
    </MockShell>
  );
}
