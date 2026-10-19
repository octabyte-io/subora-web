import Link from "next/link";
import type { ReactNode } from "react";
import { Band, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

/**
 * One feature section: text on one side, the product on the other. The text
 * holds still (sticky) while a tall stack of mocks scrolls past it.
 */
export function FeatureSplit({
  title,
  continuation,
  intro,
  points,
  href,
  linkLabel,
  mock,
  flip,
  tone,
  children,
}: {
  title: ReactNode;
  continuation?: ReactNode;
  intro?: ReactNode;
  points?: ReactNode[];
  href?: string;
  linkLabel?: string;
  mock: ReactNode;
  flip?: boolean;
  tone: "frost" | "paper";
  /** Anything else under the points, such as a SettingList. */
  children?: ReactNode;
}) {
  return (
    <Band tone={tone}>
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-12 lg:gap-16",
          flip
            ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
            : "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
        )}
      >
        <div className={cn("lg:sticky lg:top-28", flip && "lg:order-2")}>
          <SectionHeading title={title} continuation={continuation} intro={intro} />
          {points?.length ? (
            <ul className="mt-8 space-y-3 border-l-2 border-line pl-5">
              {points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          ) : null}
          {children}
          {href && linkLabel ? (
            <Link href={href} className="link mt-8 inline-block">
              {linkLabel}
            </Link>
          ) : null}
        </div>
        <div className={cn("min-w-0", flip && "lg:order-1")}>{mock}</div>
      </div>
    </Band>
  );
}
