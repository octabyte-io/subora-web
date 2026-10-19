import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaLink } from "@/components/site/primitives";
import { pages } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Page not found" };

/** Where most people were headed: the pages a stale link is likely to have pointed at. */
const DESTINATIONS = [
  { page: pages.pricing, label: "Pricing", note: "Every feature on every plan. See which is cheapest for you." },
  { page: pages.subscriptionPlans, label: "Subscription plans", note: "Subscribe & Save, Prepaid, Trial and Fixed-length." },
  { page: pages.useCases, label: "Use cases", note: "Practical answers for selling subscriptions." },
  { page: pages.setup, label: "Setup", note: "Selling subscriptions in five steps, with no code." },
  { page: pages.faq, label: "FAQ", note: "Questions merchants ask about Subora." },
];

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h1 className="text-d1 font-semibold tracking-[-0.035em]">This page is not here</h1>
        <p className="mt-6 max-w-xl text-lead text-muted">
          The link may be old, or the page may have moved. One of these is probably what you were after.
        </p>
        <ul className="mt-10 grid max-w-4xl grid-cols-1 border-t border-line sm:grid-cols-2">
          {DESTINATIONS.map(({ page, label, note }, i) => (
            <li key={page.path} className={cn("border-b border-line", i % 2 === 1 && "sm:border-l sm:pl-6")}>
              <Link href={page.path} className="group block py-4 pr-6">
                <span className="block font-semibold group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                  {label}
                </span>
                <span className="mt-1 block text-small text-muted">{note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <CtaLink href="/" variant="secondary">
            Go to the home page
          </CtaLink>
          <p className="text-small text-muted">
            Still lost? Write to{" "}
            <a href={`mailto:${siteConfig.supportEmail}`} className="link text-slate">
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
