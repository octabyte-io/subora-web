import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "./primitives";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-frost/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" className="shrink-0" aria-label="Subora home">
          <Logo />
        </Link>
        <a
          href={siteConfig.installUrl}
          className="ml-auto inline-flex h-10 items-center rounded-full bg-slate px-5 text-small font-semibold text-paper hover:bg-slate-deep"
        >
          Install on Shopify
        </a>
      </Container>
    </header>
  );
}
