import Link from "next/link";
import { Band, SectionHeading } from "@/components/site/primitives";
import { FaqList } from "@/components/sections/faq-list";
import type { Faq } from "@/content/faq";

/** A page's own questions beside a link to the rest, as on the home page. */
export function FaqSection({
  items,
  title = "Questions about this.",
  tone = "paper",
}: {
  items: Faq[];
  title?: string;
  tone?: "frost" | "paper";
}) {
  return (
    <Band tone={tone} aria-labelledby="faq-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <SectionHeading id="faq-title" title={title} />
          <Link href="/faq/" className="link mt-6 inline-block">
            All questions
          </Link>
        </div>
        <FaqList items={items} />
      </div>
    </Band>
  );
}
