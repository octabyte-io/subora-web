import { Container, CtaLink } from "@/components/site/primitives";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h1 className="text-d1 font-semibold tracking-[-0.035em]">This page is not here</h1>
        <p className="mt-6 max-w-xl text-lead text-muted">
          The link may be old, or the page may have moved. Start again from the home page.
        </p>
        <div className="mt-9">
          <CtaLink href="/">Go to the home page</CtaLink>
        </div>
      </Container>
    </section>
  );
}
