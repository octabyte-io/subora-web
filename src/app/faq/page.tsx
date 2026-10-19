import { Container } from "@/components/site/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { FaqList } from "@/components/sections/faq-list";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pages } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { FAQ } from "@/content/faq";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.faq);

/** The page as an FAQPage, every question with its answer's paragraphs joined. */
const faqJsonLd = {
  ...webPageJsonLd(pages.faq, "FAQPage"),
  mainEntity: FAQ.flatMap((group) => group.items).map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
  })),
};

export default function FaqPage() {
  const count = FAQ.reduce((n, group) => n + group.items.length, 0);

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <PageHero
        title="Questions and answers."
        continuation="About Subora as it ships today."
        intro={`${count} questions merchants ask about Subora, from setup and pricing to failed payments. Open a topic, or use find in page: every answer is on this page.`}
      />

      <section aria-label="Questions by topic" className="bg-paper py-16 sm:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
          {/* Topics: wrapped links on phones, a sticky list beside the answers on wide screens. */}
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l-2 lg:border-line">
              {FAQ.map((group) => (
                <li key={group.key}>
                  <a
                    href={`#${group.key}`}
                    className="inline-flex min-h-10 items-center rounded-full px-3.5 text-small font-semibold ring-1 ring-line hover:ring-slate/40 lg:-ml-0.5 lg:min-h-0 lg:rounded-none lg:border-l-2 lg:border-transparent lg:px-4 lg:py-2 lg:ring-0 lg:hover:border-slate"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-16 sm:space-y-20">
            {FAQ.map((group) => (
              <section key={group.key} id={group.key} aria-labelledby={`${group.key}-title`} className="scroll-mt-24">
                <h2 id={`${group.key}-title`} className="mb-4 text-d3 font-semibold tracking-[-0.02em]">
                  {group.title}
                </h2>
                <FaqList items={group.items} />
              </section>
            ))}

            <p className="text-lead text-muted">
              Still have a question? Write to{" "}
              <a href={`mailto:${siteConfig.supportEmail}`} className="link text-slate">
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
