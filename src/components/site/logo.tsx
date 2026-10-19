import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * The Subora mark: two woven rings, the Shop (slate, left) and the Customer
 * (amber, right), each passing over the other once. Geometry is copied from
 * `subora/docs/brand/subora-mark.svg`; the masks make the crossings, so the
 * mark sits on any ground. Never mirror, rotate or recolour it.
 */
export function Mark({
  className,
  tone = "slate",
  title,
}: {
  className?: string;
  /** `white` for slate or other dark grounds. */
  tone?: "slate" | "white";
  title?: string;
}) {
  const id = useId();
  const a = `${id}a`;
  const b = `${id}b`;
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("size-8 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <mask id={a} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <path d="M65.3 68.71A19 19 0 0 1 43.07 51.66" fill="none" stroke="#000" strokeWidth="16" />
        </mask>
        <mask id={b} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <path d="M34.7 31.29A19 19 0 0 1 56.93 48.34" fill="none" stroke="#000" strokeWidth="16" />
        </mask>
      </defs>
      <circle
        cx="38"
        cy="50"
        r="19"
        fill="none"
        stroke={tone === "white" ? "#FFFFFF" : "#2B3038"}
        strokeWidth="9"
        mask={`url(#${a})`}
      />
      <circle cx="62" cy="50" r="19" fill="none" stroke="#E8A33D" strokeWidth="9" mask={`url(#${b})`} />
    </svg>
  );
}

/** Mark plus name. The name is Manrope SemiBold, as in the outlined wordmark. */
export function Logo({ className, tone = "slate" }: { className?: string; tone?: "slate" | "white" }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-[1.375rem] font-semibold tracking-[-0.02em]", className)}>
      <Mark tone={tone} className="-ml-1.5 size-10" />
      Subora
    </span>
  );
}
