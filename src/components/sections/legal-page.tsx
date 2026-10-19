import Link from "next/link";
import { Container } from "@/components/site/primitives";
import { hasOpenPlaceholders, renderLegal } from "@/lib/legal-markdown";

export function LegalPage({
  file,
  title,
  intro,
  other,
}: {
  file: "privacy" | "dpa";
  title: string;
  intro: string;
  other: { href: string; label: string };
}) {
  const { body, headings } = renderLegal(file);

  return (
    <>
      <section className="pt-12 pb-8 sm:pt-20">
        <Container>
          <h1 className="max-w-4xl text-d1 font-semibold tracking-[-0.035em]">{title}</h1>
          <p className="mt-6 max-w-2xl text-lead text-muted">{intro}</p>
          {hasOpenPlaceholders ? (
            <p className="mt-8 max-w-2xl border-l-4 border-amber bg-paper px-5 py-4 text-small">
              This is a pre-publication draft. Highlighted details are still to be filled in, and the text has not
              yet been reviewed by a lawyer.
            </p>
          ) : null}
        </Container>
      </section>
      <Container className="pb-10">
        <div className="grid grid-cols-1 gap-12 rounded-2xl bg-paper px-5 py-10 ring-1 ring-line sm:px-10 sm:py-14 lg:grid-cols-[14rem_minmax(0,1fr)] lg:px-14">
          <nav aria-label="Sections" className="lg:sticky lg:top-24 lg:self-start">
            <ol className="space-y-1.5 text-small">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-muted underline-offset-4 hover:text-slate hover:underline">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-small">
              <Link href={other.href} className="link">
                {other.label}
              </Link>
            </p>
          </nav>
          <article className="measure [&>*:first-child]:mt-0 [&>h2:first-child]:border-t-0 [&>h2:first-child]:pt-0">
            {body}
          </article>
        </div>
      </Container>
    </>
  );
}
