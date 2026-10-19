import Link from "next/link";
import { Band, SectionHeading } from "@/components/site/primitives";
import { featureNav } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The other feature pages, near the foot of a feature page. Pass the page's
 * own path to leave it out, and `only` to pick and order a shorter list.
 */
export function RelatedFeatures({
  current,
  only,
  title = "The rest of Subora.",
  continuation = "Included on every plan.",
  tone = "paper",
}: {
  current?: string;
  only?: string[];
  title?: string;
  continuation?: string;
  tone?: "frost" | "paper";
}) {
  const items = only
    ? only.map((href) => featureNav.find((item) => item.href === href)).filter((item) => item !== undefined)
    : featureNav.filter((item) => item.href !== current);

  return (
    <Band tone={tone} aria-labelledby="related-title">
      <SectionHeading id="related-title" title={title} continuation={continuation} />
      <ul className="mt-12 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item.href}
            className={cn(
              "border-b border-line",
              // Vertical rules between columns only, so the grid reads as a ledger, not as cards.
              i % 2 === 1 && "sm:border-l sm:pl-6",
              "lg:border-l-0 lg:pl-0",
              i % 3 !== 0 && "lg:border-l lg:pl-6",
            )}
          >
            <Link href={item.href} className="group block h-full py-6 pr-6">
              <span className="block text-[1.125rem] font-semibold group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                {item.label}
              </span>
              <span className="mt-1.5 block text-muted">{item.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}
