import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Setting = {
  /** The setting's name as the Subora admin shows it. */
  name: string;
  /** What it does, in a sentence or two. */
  detail: ReactNode;
  /** Its default or range, e.g. "Default: 3 retries. From 1 to 6." */
  value?: ReactNode;
};

/**
 * The real setting names from the Subora admin, with what they do and their
 * default. No plan badges: every setting is on every plan.
 */
export function SettingList({ settings, className }: { settings: Setting[]; className?: string }) {
  return (
    <dl className={cn("divide-y divide-line border-y border-line in-[.on-slate]:divide-white/15 in-[.on-slate]:border-white/15", className)}>
      {settings.map((setting) => (
        <div
          key={setting.name}
          className="grid grid-cols-1 gap-x-8 gap-y-1.5 py-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
        >
          <dt className="font-semibold">{setting.name}</dt>
          <dd className="text-muted in-[.on-slate]:text-white/75">
            {setting.detail}
            {setting.value ? (
              <span className="mt-1.5 block text-small font-medium text-slate tnum in-[.on-slate]:text-paper">
                {setting.value}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A plain two-column prose block: a short heading on the left, words on the right. */
export function Explainer({
  title,
  children,
  className,
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-12 gap-y-3 border-t border-line pt-8 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] in-[.on-slate]:border-white/15",
        className,
      )}
    >
      <h3 className="text-d3 font-semibold tracking-[-0.02em]">{title}</h3>
      <div className="measure space-y-4 text-muted in-[.on-slate]:text-white/75">{children}</div>
    </div>
  );
}
