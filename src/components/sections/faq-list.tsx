import { Plus } from "lucide-react";
import type { Faq } from "@/content/faq";

/** Native disclosure: works without JavaScript and keeps answers findable with find-in-page. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-[1.125rem] font-semibold [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus aria-hidden="true" className="size-5 shrink-0 transition-transform group-open:rotate-45" />
          </summary>
          <div className="measure space-y-3 pb-6 text-muted">
            {item.a.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
