import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STORES, type StoreKey } from "@/content/demo-stores";

/**
 * The outer shell every product mock sits in. Mocks are decorative pictures
 * of the product, so the shell is `aria-hidden` by default with a text
 * alternative alongside; pass `label` to expose it as one image instead.
 */
export function MockShell({
  className,
  label,
  style,
  children,
}: {
  className?: string;
  label?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={style}
      className={cn(
        "overflow-hidden rounded-[1.25rem] bg-paper text-left text-slate ring-1 ring-line",
        "shadow-[0_1px_0_rgb(43_48_56/0.04),0_28px_56px_-32px_rgb(28_32_38/0.45)]",
        // Mocks never take focus or text selection: they are pictures.
        "select-none [&_*]:pointer-events-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * A page of one demo store's own theme: its header and colours, so what sits
 * inside reads as the merchant's storefront or customer account, not Subora.
 */
export function StoreFrame({
  store,
  nav = ["Shop", "Subscriptions", "About"],
  className,
  label,
  children,
}: {
  store: StoreKey;
  nav?: string[];
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  const s = STORES[store];
  return (
    <MockShell label={label} className={className} style={{ backgroundColor: s.theme.ground, color: s.theme.ink }}>
      <div className="flex items-center gap-5 border-b px-5 py-3.5" style={{ borderColor: `${s.theme.ink}1f` }}>
        <span className="text-[0.9375rem] font-bold tracking-[-0.01em]">{s.name}</span>
        <span className="ml-auto hidden gap-4 text-[0.8125rem] opacity-75 sm:flex">
          {nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>
      {children}
    </MockShell>
  );
}
