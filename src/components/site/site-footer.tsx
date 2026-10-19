import Link from "next/link";
import { featureNav, mainNav, siteConfig } from "@/config/site";
import { Container } from "./primitives";
import { Logo } from "./logo";

const LEGAL = [
  { href: "/privacy/", label: "Privacy policy" },
  { href: "/dpa/", label: "Data protection agreement" },
];

export function SiteFooter() {
  return (
    <footer className="on-slate mt-24 bg-slate-deep text-paper">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-3 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div className="max-w-sm sm:col-span-3 md:col-span-1">
          <Logo tone="white" />
          <p className="mt-4 text-white/75">
            Subscriptions for Shopify stores. Every feature and unlimited subscriptions on every plan. Made by{" "}
            {siteConfig.company}.
          </p>
          <p className="mt-5">
            <a href={`mailto:${siteConfig.supportEmail}`} className="link">
              {siteConfig.supportEmail}
            </a>
          </p>
        </div>
        <FooterColumn title="Features" links={featureNav.map(({ href, label }) => ({ href, label }))} />
        <FooterColumn title="Subora" links={[{ href: "/", label: "Overview" }, ...mainNav]} />
        <FooterColumn title="Legal" links={LEGAL} />
      </Container>
      <Container className="border-t border-white/10 py-6 text-small text-white/60">
        <p>
          © {new Date().getFullYear()} {siteConfig.company}. Shopify is a trademark of Shopify Inc. Subora is an
          independent app, not made by Shopify.
        </p>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-small font-semibold text-white/60">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
