import { Container, CtaLink, InstallLink } from "@/components/site/primitives";
import { pages } from "@/config/pages";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.home);

// A holding page until the full home page is built from research/README.md.
export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.home)} />
      <section className="py-20 sm:py-28">
        <Container>
          <h1 className="max-w-4xl text-d1 font-semibold tracking-[-0.035em]">
            Every feature. Unlimited subscriptions. <span className="text-muted">Choose how you pay.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-muted">
            Subora lets your Shopify store sell subscriptions, lets customers manage their own, and retries failed
            payments. Free at $0 + 2%, Growth at $49 + 0.5%, Pro at $99 + 0%.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <InstallLink />
            <CtaLink href="/privacy/" variant="secondary">
              Privacy policy
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
