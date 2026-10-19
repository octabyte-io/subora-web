import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Mark } from "./logo";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[74rem] px-4 sm:px-6 lg:px-10", className)} {...props} />;
}

const CTA_STYLES = {
  /** Slate with the woven-rings chip: the install action, and only that. */
  primary: "bg-slate text-paper hover:bg-slate-deep in-[.on-slate]:bg-amber in-[.on-slate]:text-slate in-[.on-slate]:hover:bg-[#f0b45a]",
  secondary:
    "bg-paper text-slate ring-1 ring-line ring-inset hover:ring-slate/40 in-[.on-slate]:bg-transparent in-[.on-slate]:text-paper in-[.on-slate]:ring-white/30",
} as const;

export function CtaLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof CTA_STYLES;
  className?: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(
    "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 font-semibold transition-colors",
    CTA_STYLES[variant],
    className,
  );
  return external ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function InstallLink({
  className,
  children = "Install on Shopify",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <CtaLink href={siteConfig.installUrl} className={cn("pl-2", className)}>
      <span className="grid size-8 place-items-center rounded-full bg-paper">
        <Mark className="size-7" />
      </span>
      {children}
    </CtaLink>
  );
}

/** A visible stand-in for legal details that have not been filled in yet. */
export function Placeholder({ value, label }: { value: string | null; label: string }) {
  if (value) return <>{value}</>;
  return <mark className="rounded-sm bg-amber-tint px-1 font-semibold text-slate">[{label}]</mark>;
}
